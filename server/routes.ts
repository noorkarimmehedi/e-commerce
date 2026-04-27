import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const orderRequestSchema = z.object({
  bundleTitle: z.string().min(1),
  bundleDetails: z.string().min(1),
  bundlePrice: z.number().int().positive(),
  deliveryCharge: z.number().int().nonnegative(),
  customerName: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  address: z.string().min(5).max(500),
});

function createOrderRef() {
  const datePart = new Date()
    .toISOString()
    .slice(2, 10)
    .replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `WEB-${datePart}-${randomPart}`;
}

async function insertSupabaseOrder(order: z.infer<typeof orderRequestSchema>) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tableName = process.env.SUPABASE_ORDERS_TABLE || "orders";

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase order integration is not configured");
  }

  const orderRef = createOrderRef();
  const total = order.bundlePrice + order.deliveryCharge;
  const now = new Date().toISOString();
  const payload = {
    ref: orderRef,
    customer_name: order.customerName,
    phone: order.phone,
    destination: order.address,
    merchandise: order.bundleDetails,
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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/orders", async (req, res, next) => {
    try {
      const order = orderRequestSchema.parse(req.body);
      const result = await insertSupabaseOrder(order);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid order details",
          errors: error.flatten().fieldErrors,
        });
        return;
      }

      next(error);
    }
  });

  return httpServer;
}
