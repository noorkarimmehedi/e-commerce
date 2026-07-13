export const STOREFRONT_ID = "da1aecbc-a969-4b93-a5d3-40e7c80c8987";
export const STOREFRONT_API_BASE = `https://suite.arclabtechnology.com/api/public/storefronts/${STOREFRONT_ID}`;

type ProductImage = string | { url?: string; src?: string; image_url?: string };

export type StorefrontVariant = {
  id?: string | number;
  name?: string;
  title?: string;
  option?: string;
  price?: string | number;
  available?: boolean;
  stock_quantity?: number;
};

export type StorefrontProduct = {
  id?: string | number;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  images?: ProductImage[] | null;
  price?: string | number | null;
  compare_at_price?: string | number | null;
  available?: boolean;
  stock_quantity?: number | null;
  variants?: StorefrontVariant[] | null;
};

export function getProductImage(product: Pick<StorefrontProduct, "images" | "image_url">) {
  const firstImage = product.images?.find(Boolean);

  if (typeof firstImage === "string") {
    return firstImage;
  }

  return firstImage?.url || firstImage?.src || firstImage?.image_url || product.image_url || "";
}

export function hasPublishedProducts(products: StorefrontProduct[]) {
  return products.length > 0;
}

export function formatProductPrice(price: StorefrontProduct["price"]) {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "৳0";
  }

  return `৳${amount.toLocaleString()}`;
}

export function getProductAmount(price: StorefrontProduct["price"]) {
  const amount = Number(price);
  return Number.isFinite(amount) ? Math.round(amount) : 0;
}

export function getProductNumericId(product: Pick<StorefrontProduct, "id" | "slug">) {
  const numericId = Number(product.id);

  if (Number.isInteger(numericId) && numericId > 0) {
    return numericId;
  }

  return Array.from(product.slug).reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

export async function fetchStorefrontProducts() {
  const res = await fetch(`${STOREFRONT_API_BASE}/products`);

  if (!res.ok) {
    throw new Error("Could not load products.");
  }

  const data = await res.json();
  return (data.products || []) as StorefrontProduct[];
}

export async function fetchStorefrontProduct(slug: string) {
  const res = await fetch(`${STOREFRONT_API_BASE}/products/${slug}`);

  if (!res.ok) {
    throw new Error("Could not load product.");
  }

  const data = await res.json();
  return (data.product || null) as StorefrontProduct | null;
}
