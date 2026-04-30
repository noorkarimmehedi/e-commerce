import type { IncomingMessage, ServerResponse } from "http";

type OrderRequest = {
  bundleTitle: string;
  bundleDetails: string;
  bundlePrice: number;
  deliveryCharge: number;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: "cash_on_delivery" | "bkash";
  bkashTrxId?: string;
  metaEventId?: string;
};

async function readBody(req: IncomingMessage & { body?: unknown }) {
  if (req.body) {
    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  return rawBody ? JSON.parse(rawBody) : {};
}

function validateOrder(body: unknown): OrderRequest {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid order details");
  }

  const order = body as Record<string, unknown>;
  const bundleTitle = String(order.bundleTitle || "").trim();
  const bundleDetails = String(order.bundleDetails || "").trim();
  const bundlePrice = Number(order.bundlePrice);
  const deliveryCharge = Number(order.deliveryCharge);
  const customerName = String(order.customerName || "").trim();
  const phone = String(order.phone || "").trim();
  const address = String(order.address || "").trim();
  const paymentMethod =
    order.paymentMethod === "bkash" ? "bkash" : "cash_on_delivery";
  const bkashTrxId = String(order.bkashTrxId || "").trim();
  const metaEventId = typeof order.metaEventId === "string" ? order.metaEventId.trim() : "";

  if (
    !bundleTitle ||
    !bundleDetails ||
    !Number.isInteger(bundlePrice) ||
    bundlePrice <= 0 ||
    !Number.isInteger(deliveryCharge) ||
    deliveryCharge < 0 ||
    customerName.length < 2 ||
    phone.length < 6 ||
    address.length < 5 ||
    (paymentMethod === "bkash" && !bkashTrxId)
  ) {
    throw new Error("Invalid order details");
  }

  return {
    bundleTitle,
    bundleDetails,
    bundlePrice,
    deliveryCharge,
    customerName,
    phone,
    address,
    paymentMethod,
    ...(bkashTrxId ? { bkashTrxId } : {}),
    ...(metaEventId ? { metaEventId } : {}),
  };
}

function createOrderRef() {
  const datePart = new Date()
    .toISOString()
    .slice(2, 10)
    .replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `WEB-${datePart}-${randomPart}`;
}

async function insertSupabaseOrder(order: OrderRequest) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tableName = process.env.SUPABASE_ORDERS_TABLE || "orders";

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase environment variables are missing in Vercel");
  }

  const orderRef = createOrderRef();
  const total = order.bundlePrice + order.deliveryCharge;
  const now = new Date().toISOString();
  const paymentDetails =
    order.paymentMethod === "bkash"
      ? `Payment Method: bKash Send Money | Reference ID (TRXID): ${order.bkashTrxId}`
      : "Payment Method: Cash on Delivery";
  const productDetails = `${order.bundleDetails} | ${paymentDetails}`;
  const payload = {
    ref: orderRef,
    order_number: orderRef,
    customer_name: order.customerName,
    phone: order.phone,
    address: order.address,
    destination: order.address,
    product: productDetails,
    quantity: 1,
    price: order.bundlePrice,
    merchandise: productDetails,
    value: total,
    status: "confirmed",
    source: "website",
    order_date: now,
    bundle_title: order.bundleTitle,
    bundle_price: order.bundlePrice,
    delivery_charge: order.deliveryCharge,
    total,
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase insert failed: ${message}`);
  }

  const rows = await response.json();
  return { orderRef, order: rows?.[0] ?? payload };
}

async function sendPurchaseCapi(opts: {
  order: OrderRequest;
  orderRef: string;
  total: number;
  headers: Record<string, unknown>;
}) {
  const { getMetaUserDataFromRequest, sendMetaCapiEvent } = await import(
    "../server/meta-capi"
  );

  const user_data = getMetaUserDataFromRequest({
    headers: opts.headers,
    customerName: opts.order.customerName,
    phone: opts.order.phone,
    eventSourceUrl: String(opts.headers["referer"] || ""),
  });

  await sendMetaCapiEvent({
    event_name: "Purchase",
    event_id: opts.order.metaEventId,
    event_source_url: String(opts.headers["referer"] || ""),
    user_data,
    custom_data: {
      currency: "BDT",
      value: opts.total,
      content_type: "product",
      contents: [{ id: opts.order.bundleTitle, quantity: 1, item_price: opts.order.bundlePrice }],
      order_id: opts.orderRef,
    },
  });
}

function sendJson(res: ServerResponse, statusCode: number, body: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export default async function handler(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse,
) {
  if (req.method !== "POST") {
    sendJson(res, 405, { message: "Method not allowed" });
    return;
  }

  try {
    const body = await readBody(req);
    const order = validateOrder(body);
    const result = await insertSupabaseOrder(order);
    const total = order.bundlePrice + order.deliveryCharge;

    // Fire-and-forget Purchase CAPI (do not block checkout).
    void sendPurchaseCapi({
      order,
      orderRef: result.orderRef,
      total,
      headers: req.headers as unknown as Record<string, unknown>,
    }).catch((error) => {
      console.error("Meta Purchase CAPI failed:", error);
    });

    sendJson(res, 201, result);
  } catch (error) {
    console.error("Order insert failed:", error);
    sendJson(res, 500, {
      message:
        error instanceof Error
          ? error.message
          : "Could not place order. Please try again.",
    });
  }
}
