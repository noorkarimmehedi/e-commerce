import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertSupabaseOrder, orderRequestSchema } from "./order-service";
import { getMetaUserDataFromRequest, sendMetaCapiEvent } from "./meta-capi";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/orders", async (req, res, next) => {
    try {
      const order = orderRequestSchema.parse(req.body);
      const result = await insertSupabaseOrder(order);

      // Fire-and-forget Purchase CAPI (do not block checkout).
      void sendMetaCapiEvent({
        event_name: "Purchase",
        event_id: (req.body as any)?.metaEventId,
        event_source_url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
        user_data: getMetaUserDataFromRequest({
          headers: req.headers as unknown as Record<string, unknown>,
          phone: order.phone,
        }),
        custom_data: {
          currency: "BDT",
          value: order.bundlePrice + order.deliveryCharge,
          content_type: "product",
          contents: [{ id: order.bundleTitle, quantity: 1, item_price: order.bundlePrice }],
          order_id: result.orderRef,
        },
      }).catch((error) => {
        console.error("Meta Purchase CAPI failed:", error);
      });

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
