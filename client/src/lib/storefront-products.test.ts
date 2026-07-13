import assert from "node:assert/strict";
import { test } from "node:test";

import { getProductImage, hasPublishedProducts } from "./storefront-products.ts";

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
