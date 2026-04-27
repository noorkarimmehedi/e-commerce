import type { IncomingMessage, ServerResponse } from "http";
import { z } from "zod";
import { insertSupabaseOrder, orderRequestSchema } from "../server/order-service";

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
    const order = orderRequestSchema.parse(body);
    const result = await insertSupabaseOrder(order);
    sendJson(res, 201, result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      sendJson(res, 400, {
        message: "Invalid order details",
        errors: error.flatten().fieldErrors,
      });
      return;
    }

    console.error("Order insert failed:", error);
    sendJson(res, 500, {
      message:
        error instanceof Error
          ? error.message
          : "Could not place order. Please try again.",
    });
  }
}
