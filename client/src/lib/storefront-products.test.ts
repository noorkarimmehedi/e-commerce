import assert from "node:assert/strict";
import { test } from "node:test";

import { getProductImage, hasPublishedProducts, isProductOrderable } from "./storefront-products.ts";

test("uses the first product image before falling back to image_url", () => {
  assert.equal(
    getProductImage({ image_url: "https://example.com/legacy.jpg", images: ["https://example.com/new.jpg"] }),
    "https://example.com/new.jpg",
  );
});

test("falls back to image_url when product images are unavailable", () => {
  assert.equal(
    getProductImage({ image_url: "https://example.com/legacy.jpg", images: [] }),
    "https://example.com/legacy.jpg",
  );
});

test("treats an empty product array as a valid empty storefront", () => {
  assert.equal(hasPublishedProducts([]), false);
});

test("does not allow ordering when product detail is missing", () => {
  assert.equal(isProductOrderable(null), false);
});

test("does not allow ordering when product is unavailable", () => {
  assert.equal(isProductOrderable({ name: "Test", slug: "test", available: false, stock_quantity: 10 }), false);
});

test("does not allow ordering when product stock is empty", () => {
  assert.equal(isProductOrderable({ name: "Test", slug: "test", available: true, stock_quantity: 0 }), false);
});

test("does not allow ordering when all variants are out of stock", () => {
  assert.equal(
    isProductOrderable({
      name: "Test",
      slug: "test",
      available: true,
      stock_quantity: 10,
      variants: [{ available: true, stock_quantity: 0 }],
    }),
    false,
  );
});

test("allows ordering when product is available with stock", () => {
  assert.equal(isProductOrderable({ name: "Test", slug: "test", available: true, stock_quantity: 1 }), true);
});
