import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertSupabaseOrder, orderRequestSchema } from "./order-service";

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
