import { z } from "zod";
import fs from "fs";
import path from "path";

export const orderRequestSchema = z.object({
  bundleTitle: z.string().min(1),
  bundleDetails: z.string().min(1),
  bundlePrice: z.number().int().positive(),
  deliveryCharge: z.number().int().nonnegative(),
  customerName: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  address: z.string().min(5).max(500),
  paymentMethod: z.enum(["cash_on_delivery", "bkash"]).default("cash_on_delivery"),
  bkashTrxId: z.string().trim().max(80).optional().default(""),
}).refine(
  (order) => order.paymentMethod !== "bkash" || order.bkashTrxId.length > 0,
  {
    message: "bKash reference ID is required",
    path: ["bkashTrxId"],
  },
);

export type OrderRequest = z.infer<typeof orderRequestSchema>;

function createOrderRef() {
  const counterPath = path.resolve(process.cwd(), "order-counter.txt");
  let orderNumber = 1000;
  
  if (fs.existsSync(counterPath)) {
    try {
      const stored = parseInt(fs.readFileSync(counterPath, "utf-8"), 10);
      if (!isNaN(stored)) {
        orderNumber = stored;
      }
    } catch (e) {
      // ignore
    }
  }
  
  orderNumber += 1;
  
  try {
    fs.writeFileSync(counterPath, orderNumber.toString(), "utf-8");
  } catch (e) {
    console.error("Failed to write order counter", e);
  }
  
  return `#${orderNumber}`;
}

export async function processOrder(order: OrderRequest) {
  const orderRef = createOrderRef();
  const total = order.bundlePrice + order.deliveryCharge;

  try {
    await fetch("https://suite.arclabtechnology.com/api/custom-orders/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "stepprsbangladesh-098765"
      },
      body: JSON.stringify({
        order_id: orderRef,
        customer_name: order.customerName,
        phone: order.phone,
        address: order.address,
        product: `${order.bundleTitle} - ${order.bundleDetails}`,
        quantity: 1,
        price: order.bundlePrice,
        delivery_rate: order.deliveryCharge
      })
    });
  } catch (webhookErr) {
    console.error("Webhook failed:", webhookErr);
  }

  return { orderRef, order: { ...order, total, status: "confirmed" } };
}
