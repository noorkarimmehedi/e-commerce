import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowDownRight, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import Layout from "@/components/layout";
import OrderDialog, { type OrderDialogBundle } from "@/components/order-dialog";
import { createEventId, trackMetaEvent } from "@/lib/meta";
import { Counter } from "@/components/ui/animated-counter";
import {
  fetchStorefrontProduct,
  formatProductPrice,
  getProductAmount,
  getProductImage,
  getProductNumericId,
  type StorefrontVariant,
} from "@/lib/storefront-products";

function getVariantLabel(variant: StorefrontVariant, index: number) {
  return variant.name || variant.title || variant.option || `Option ${index + 1}`;
}

function formatTimelineDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ProductPage({ params }: { params?: { id: string } }) {
  const slug = params?.id || "";
  const { addToCart } = useCart();
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["merchant-suite-product", slug],
    queryFn: () => fetchStorefrontProduct(slug),
    enabled: Boolean(slug),
  });

  const variants = product?.variants?.length ? product.variants : null;
  const selectedVariant = variants?.[selectedVariantIdx] || null;
  const selectedPrice = selectedVariant?.price ?? product?.price ?? 0;
  const selectedAmount = getProductAmount(selectedPrice);
  const productImage = product ? getProductImage(product) : "";
  const isUnavailable = product?.available === false || selectedVariant?.available === false;

  useEffect(() => {
    if (!product) return;

    const eventId = createEventId();
    trackMetaEvent({
      eventName: "ViewContent",
      eventId,
      capi: true,
      customData: {
        currency: "BDT",
        value: selectedAmount,
        content_type: "product",
        content_ids: [product.slug],
        contents: [{ id: product.slug, quantity: 1, item_price: selectedAmount }],
      },
    });
  }, [product, selectedAmount]);

  const today = new Date();
  const processedDate = new Date(today);
  processedDate.setDate(today.getDate() + 1);
  const deliveredDate = new Date(processedDate);
  deliveredDate.setDate(processedDate.getDate() + 1);
  const deliveryTimeline = [
    { title: "Order Placed", date: formatTimelineDate(today) },
    { title: "Order Processed", date: formatTimelineDate(processedDate) },
    { title: "Delivered", date: formatTimelineDate(deliveredDate) },
  ];

  const orderBundle: OrderDialogBundle | null = product
    ? {
        title: product.name,
        details: selectedVariant ? getVariantLabel(selectedVariant, selectedVariantIdx) : "Default",
        price: selectedAmount,
        images: [{ src: productImage, alt: product.name }],
      }
    : null;

  return (
    <Layout>
      <div className="min-h-screen bg-brand-ivory">
        <div className="px-4 py-5 md:px-16">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-black/45 hover:text-black">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {isLoading ? (
          <div className="px-5 py-24 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-black/35">
            Loading product...
          </div>
        ) : isError || !product ? (
          <div className="px-5 py-24 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-black">Product not found.</h1>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black/35">
              This product is not published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 bg-brand-ivory p-[10px] md:p-16 xl:p-20">
              <motion.div
                initial={{ scale: 1.04, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto aspect-square w-full max-w-[1080px] overflow-hidden rounded-[8px] bg-[#f2f1f0]"
              >
                {productImage ? (
                  <img
                    src={productImage}
                    alt={product.name}
                    width={1080}
                    height={1080}
                    className="h-full w-full object-contain p-8 mix-blend-multiply transition-transform duration-[2s] hover:scale-105 md:p-16"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] font-bold uppercase tracking-[0.35em] text-black/25">
                    No image
                  </div>
                )}
              </motion.div>
            </div>

            <motion.div
              className="lg:col-span-5 flex flex-col bg-brand-ivory"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex-grow space-y-6 px-4 pb-10 pt-2 md:space-y-10 md:p-16 xl:p-20">
                <div className="space-y-4 md:space-y-6">
                  <h1 className="max-w-full break-words font-sans text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl md:text-7xl">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center font-sans text-2xl font-semibold text-black">
                      <span>৳</span>
                      <Counter end={selectedAmount} fontSize={24} className="text-black font-semibold !px-0" />
                    </div>
                    {product.compare_at_price ? (
                      <span className="text-sm font-semibold text-black/35 line-through">
                        {formatProductPrice(product.compare_at_price)}
                      </span>
                    ) : null}
                    <div className="h-px flex-grow bg-black/5" />
                  </div>

                  {product.description ? (
                    <p className="text-xs font-medium leading-[1.8] text-black/60 md:text-sm">
                      {product.description}
                    </p>
                  ) : null}
                </div>

                {variants ? (
                  <div className="space-y-3 md:space-y-4">
                    <span className="block pb-1 text-[10px] font-bold uppercase tracking-[0.4em] text-black/60 md:pb-2">
                      Select Option
                    </span>
                    <div className="grid grid-cols-2 gap-2 md:pt-3">
                      {variants.map((variant, idx) => (
                        <button
                          key={variant.id || idx}
                          type="button"
                          onClick={() => setSelectedVariantIdx(idx)}
                          className={`relative flex flex-col items-center justify-center rounded-[8px] border px-3 py-2.5 text-center transition-all ${
                            selectedVariantIdx === idx
                              ? "border-black bg-black text-white"
                              : "border-black/20 bg-transparent text-black hover:border-black/50"
                          }`}
                        >
                          <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest">
                            {getVariantLabel(variant, idx)}
                          </span>
                          <span className="block text-[13px] font-garet">
                            {formatProductPrice(variant.price ?? product.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="grid grid-cols-2 gap-3 rounded-[8px] border border-black/10 bg-white/35 p-4">
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-black/35">Status</span>
                    <span className="mt-2 block text-sm font-semibold text-black">
                      {isUnavailable ? "Unavailable" : "Available"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-black/35">Stock</span>
                    <span className="mt-2 block text-sm font-semibold text-black">
                      {selectedVariant?.stock_quantity ?? product.stock_quantity ?? 0}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Button
                      disabled={isUnavailable || selectedAmount <= 0}
                      onClick={() => {
                        addToCart(
                          {
                            id: getProductNumericId(product),
                            title: selectedVariant ? `${product.name} (${getVariantLabel(selectedVariant, selectedVariantIdx)})` : product.name,
                            price: formatProductPrice(selectedPrice),
                            image: productImage,
                          },
                          selectedVariant ? getVariantLabel(selectedVariant, selectedVariantIdx) : "Default",
                        );
                      }}
                      className="group flex h-12 items-center justify-center gap-2 rounded-[8px] border border-black/20 bg-transparent px-2 text-[10px] font-bold uppercase tracking-[0.4em] text-black transition-all hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      disabled={isUnavailable || selectedAmount <= 0}
                      onClick={() => setOrderOpen(true)}
                      className="group flex h-12 items-center justify-center gap-2 rounded-[8px] bg-black px-2 text-[10px] font-bold uppercase tracking-[0.4em] text-white transition-all hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Buy it Now
                      <ArrowDownRight className="h-5 w-5 stroke-[1px] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Button>
                  </div>

                  <div className="rounded-[8px] border border-black/10 bg-white/35 px-4 py-5 md:px-5">
                    <div className="relative pb-1 pt-5">
                      <div className="absolute left-[12%] right-[12%] top-8 h-px bg-black/15" />
                      <div className="relative z-20 grid grid-cols-3 gap-3">
                        {deliveryTimeline.map((item) => (
                          <div key={item.title} className="flex flex-col items-center text-center">
                            <span className="mb-3 h-3 w-3 rounded-full border border-brand-gold bg-brand-ivory shadow-[0_0_0_4px_rgba(242,241,240,0.95)]" />
                            <span className="font-garet text-[11px] font-bold uppercase tracking-[0.12em] text-brand-gold">
                              {item.date}
                            </span>
                            <span className="mt-2 block text-[8px] font-bold uppercase leading-4 tracking-[0.18em] text-black md:text-[9px] md:tracking-[0.24em]">
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <OrderDialog open={orderOpen} onOpenChange={setOrderOpen} bundle={orderBundle} />
    </Layout>
  );
}
