import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import Layout from "@/components/layout";
import OrderDialog, { type OrderDialogBundle } from "@/components/order-dialog";
import { createEventId, trackMetaEvent } from "@/lib/meta";
import makeupPen from "@assets/makeup_pen_4_in_1.png";
import tintBordeaux from "@assets/peptide_lip_tint_bordeaux.png";
import tintPlum from "@assets/peptide_lip_tint_plum.png";
import tintRose from "@assets/peptide_lip_tint_rosy.png";
import tintMauve from "@assets/peptide_lip_tint_mauve.png";

const products = [
  { id: 1, slug: "4-in-1-makeup-pen", title: "4-in-1 Makeup Pen", price: "৳999", amount: 999, image: makeupPen, description: "A compact 4-in-1 makeup pen designed for quick definition, soft detail, and a polished no makeup look in one everyday tool.", material: "Multi-use eye, brow, and lip definition", origin: "Seraphine Bangladesh", care: "Keep capped and store in a cool, dry place" },
  { id: 2, slug: "bordeaux", title: "Bordeaux", price: "৳799", amount: 799, image: tintBordeaux, description: "A peptide lip tint with a warm burnt-red wash for soft color that still feels natural and easy.", material: "Peptide lip tint", origin: "Seraphine Bangladesh", care: "Apply to clean lips and reapply as needed" },
  { id: 3, slug: "plum-veil", title: "Plum Veil", price: "৳799", amount: 799, image: tintPlum, description: "A sheer deep-berry tint that gives lips a plush veil of color while keeping the look effortless.", material: "Peptide lip tint", origin: "Seraphine Bangladesh", care: "Apply to clean lips and reapply as needed" },
  { id: 4, slug: "rosy-bloom", title: "Rosy Bloom", price: "৳799", amount: 799, image: tintRose, description: "A fresh petal-pink tint made for soft daily glow, easy touch-ups, and a clean no makeup finish.", material: "Peptide lip tint", origin: "Seraphine Bangladesh", care: "Apply to clean lips and reapply as needed" },
  { id: 5, slug: "mauve-nude", title: "Mauve Nude", price: "৳799", amount: 799, image: tintMauve, description: "A muted soft-rose tint for natural-looking lips with just enough color to brighten the face.", material: "Peptide lip tint", origin: "Seraphine Bangladesh", care: "Apply to clean lips and reapply as needed" }
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((item) => item.slug === params.id || String(item.id) === params.id);
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  useEffect(() => {
    if (product && params.id !== product.slug) {
      setLocation(`/product/${product.slug}`, { replace: true });
    }
  }, [params.id, product, setLocation]);

  useEffect(() => {
    if (!product) return;

    const eventId = createEventId();
    trackMetaEvent({
      eventName: "ViewContent",
      eventId,
      capi: true,
      customData: {
        currency: "BDT",
        value: product.amount,
        content_type: "product",
        content_ids: [String(product.id)],
        contents: [{ id: String(product.id), quantity: 1, item_price: product.amount }],
      },
    });
  }, [product]);

  if (!product) return <div>Product not found</div>;

  const productOrder: OrderDialogBundle = {
    title: product.title,
    details: `1x ${product.title}`,
    price: product.amount,
    images: [{ src: product.image, alt: product.title }]
  };

  return (
    <Layout>
      <div className="bg-brand-ivory min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Side - Immersive & Premium */}
          <div className="lg:col-span-7 relative bg-neutral-100 overflow-hidden">
            <div className="group h-[64vh] min-h-[430px] lg:sticky lg:top-0 lg:h-screen">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                src={product.image}
                alt={product.title}
                className="h-full w-full bg-[#f2f1f0] object-contain p-10 mix-blend-multiply brightness-95 transition-all duration-[2s] group-hover:scale-105 md:p-24"
              />

              {/* Gold Frame Detail overlay */}
              <div className="absolute inset-8 md:inset-16 border border-brand-gold/20 pointer-events-none" />

              {/* Back Link */}
              <div className="absolute top-12 left-12 z-20">
                <Link href="/">
                  <a className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white font-bold hover:text-brand-gold transition-colors">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                    Back to Products
                  </a>
                </Link>
              </div>

              {/* Vertical Label */}
              <div className="absolute bottom-12 left-12 z-20 hidden md:block opacity-40">
                <div className="rotate-[-90deg] origin-left flex items-center gap-8">
                  <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-white whitespace-nowrap">Seraphine Studio / Beauty</span>
                  <div className="w-12 h-px bg-white/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Details Side - Editorial Typography */}
          <motion.div
            className="lg:col-span-5 flex flex-col bg-brand-ivory"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-grow space-y-10 p-8 md:space-y-12 md:p-16 xl:p-20">
              {/* Product Info */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.6em] font-medium text-brand-gold">
                    Beauty 2026 / Selected Product
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 italic">
                    REF.{product.id.toString().padStart(4, '0')}
                  </span>
                </div>

                <h1 className="whitespace-nowrap font-display text-[2.35rem] font-light uppercase leading-none tracking-tight text-black min-[390px]:text-[2.8rem] md:text-8xl">
                  {product.title}
                </h1>

                <div className="flex items-center gap-6">
                  <span className="font-garet text-3xl font-bold text-black">{product.price}</span>
                  <div className="h-px flex-grow bg-black/5" />
                </div>
              </div>

              {/* Manifesto Description */}
              <div className="space-y-6">
                <p className="text-sm md:text-base uppercase leading-loose tracking-[0.15em] text-black/60 max-w-md">
                  {product.description}
                </p>
                <div className="flex gap-12 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-1">Origin</span>
                    <span className="text-[10px] uppercase tracking-widest font-medium">{product.origin}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-1">Time</span>
                    <span className="text-[10px] uppercase tracking-widest font-medium">Everyday Beauty</span>
                  </div>
                </div>
              </div>

              {/* Premium Call to Action */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      addToCart(
                        {
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image
                        },
                        "Default"
                      );
                    }}
                    className="h-16 rounded-none bg-transparent border border-black/20 text-black text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 group"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => setOrderOpen(true)}
                    className="h-16 rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-brand-gold transition-all flex items-center justify-center gap-4 group"
                  >
                    Buy it Now
                    <ArrowDownRight className="w-5 h-5 stroke-[1px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
                <p className="text-center text-[9px] uppercase tracking-widest text-black/30 font-medium">
                  Available for individual order
                </p>
              </div>

              {/* Product Specifications - Minimal Swiss Grid */}
              <div className="space-y-0 border-y border-black/5">
                {[
                  { label: "Origin", val: product.origin },
                  { label: "Use", val: "No makeup look" },
                  { label: "Format", val: product.material },
                  { label: "Care", val: product.care },
                  { label: "Delivery", val: "Inside and outside Dhaka" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[120px_1fr] gap-6 border-b border-black/5 py-4 transition-colors last:border-b-0 hover:bg-black/[0.01] md:grid-cols-[150px_1fr] md:gap-10"
                  >
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30 group-hover:text-brand-gold transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-medium text-black/80 leading-relaxed text-center">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* YOU MAY ALSO LIKE SECTION */}
        <section className="border-t border-black/5 bg-brand-ivory px-0 pb-24 pt-12 md:pb-40 md:pt-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-10 flex flex-col items-end justify-between gap-5 px-8 text-center md:mb-12 md:flex-row md:px-16 md:text-left">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.6em] font-medium text-brand-gold block">Curated Selection</span>
                <h2 className="text-4xl md:text-6xl font-display font-light uppercase tracking-tight text-black italic">
                  You may also <span className="not-italic">Like</span>
                </h2>
              </div>
              <Link href="/">
                <a className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-black/20 pb-2 hover:text-brand-gold hover:border-brand-gold transition-all">
                  View Full Archive
                </a>
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 4)
                .map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group bg-brand-ivory"
                  >
                    <Link href={`/product/${p.slug}`}>
                      <a className="block space-y-5">
                        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 shadow-sm">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-contain p-8 mix-blend-multiply transition-transform duration-[1.5s] group-hover:scale-105 md:p-12"
                          />
                        </div>
                        <div className="flex justify-between items-baseline px-4 md:px-8">
                          <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-tight text-black">{p.title}</h3>
                          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">{p.price}</span>
                        </div>
                      </a>
                    </Link>
                    <div className="px-4 pt-5 md:px-8">
                      <Button
                        onClick={() =>
                          addToCart(
                            {
                              id: p.id,
                              title: p.title,
                              price: p.price,
                              image: p.image,
                            },
                            "Default",
                          )
                        }
                        className="h-11 w-full rounded-none border border-black/15 bg-transparent text-[9px] font-bold uppercase tracking-[0.32em] text-black transition-all hover:bg-black hover:text-white"
                      >
                        Quick Add
                      </Button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      </div>
      <OrderDialog
        open={orderOpen}
        onOpenChange={setOrderOpen}
        bundle={productOrder}
      />
    </Layout>
  );
}
