import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowDownRight, ShieldCheck, Globe, Truck, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout";
import imgNoir from "@assets/image_1768632448516.png";
import imgSherwani from "@assets/image_1768632387917.png";
import imgCrimson from "@assets/image_1768632401640.png";
import imgSilk from "@assets/image_1768632422582.png";
import imgBridal from "@assets/image_1768632436038.png";
import imgEarth from "@assets/image_1768632360954.png";

const products = {
  "1": { id: 1, title: "Noir Kurta", price: "BDT 45,000", image: imgNoir, description: "A study in absolute black. Constructed from hand-spun Swiss cotton and silk blend, featuring architectural stitching and hidden fasteners.", material: "80% Cotton, 20% Silk", origin: "Studio Dhaka", care: "Professional Dry Clean Only" },
  "2": { id: 2, title: "Sherwani", price: "BDT 120,000", image: imgSherwani, description: "Exquisite hand-embroidery meets radical modern silhouettes. A masterpiece of time and precision.", material: "Premium Raw Silk", origin: "Artisan Workshop", care: "Specialist Care" },
  "3": { id: 3, title: "Crimson", price: "BDT 89,000", image: imgCrimson, description: "Deep pigments and structured velvet. A garment designed for presence and permanence.", material: "Silk Velvet", origin: "Studio Dhaka", care: "Dry Clean" },
  "4": { id: 4, title: "Silk Blend", price: "BDT 65,000", image: imgSilk, description: "The intersection of comfort and luxury. Light-catching fibers woven with surgical precision.", material: "Fine Silk Blend", origin: "Studio Dhaka", care: "Hand Wash" },
  "5": { id: 5, title: "Bridal", price: "Enquiry", image: imgBridal, description: "Bespoke bridal couture. A collaborative journey between client and atelier to create a legacy piece.", material: "Custom Selection", origin: "Bespoke Atelier", care: "Legacy Preservation" },
  "6": { id: 6, title: "Earth Classic", price: "BDT 52,000", image: imgEarth, description: "Neutral tones derived from natural pigments. A timeless staple for the contemporary wardrobe.", material: "Linen & Wool", origin: "Studio Dhaka", care: "Gentle Cycle" }
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id as keyof typeof products];
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!product) return <div>Product not found</div>;

  return (
    <Layout>
      <div className="bg-brand-ivory min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Side - Immersive & Premium */}
          <div className="lg:col-span-7 relative bg-neutral-100 overflow-hidden">
            <div className="lg:sticky lg:top-0 h-[80vh] lg:h-screen group">
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover grayscale brightness-75 contrast-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]"
              />

              {/* Gold Frame Detail overlay */}
              <div className="absolute inset-8 md:inset-16 border border-brand-gold/20 pointer-events-none" />

              {/* Back Link */}
              <div className="absolute top-12 left-12 z-20">
                <Link href="/">
                  <a className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white font-bold hover:text-brand-gold transition-colors">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                    Back to Collection
                  </a>
                </Link>
              </div>

              {/* Vertical Label */}
              <div className="absolute bottom-12 left-12 z-20 hidden md:block opacity-40">
                <div className="rotate-[-90deg] origin-left flex items-center gap-8">
                  <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-white whitespace-nowrap">Seraphine Studio / Atelier</span>
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
            <div className="p-8 md:p-20 flex-grow space-y-20">
              {/* Product Info */}
              <div className="space-y-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.6em] font-medium text-brand-gold">
                    Collection 2026 / Archive
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 italic">
                    REF.{product.id.toString().padStart(4, '0')}
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-display font-light uppercase tracking-tight leading-none text-black">
                  {product.title}
                </h1>

                <div className="flex items-center gap-6">
                  <span className="text-3xl font-display font-light text-black italic">{product.price}</span>
                  <div className="h-px flex-grow bg-black/5" />
                </div>
              </div>

              {/* Manifesto Description */}
              <div className="space-y-8">
                <p className="text-sm md:text-base uppercase leading-loose tracking-[0.15em] text-black/60 max-w-md">
                  {product.description}
                </p>
                <div className="flex gap-12 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-1">Origin</span>
                    <span className="text-[10px] uppercase tracking-widest font-medium">Handcrafted in Dhaka</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-1">Time</span>
                    <span className="text-[10px] uppercase tracking-widest font-medium">14 Business Days</span>
                  </div>
                </div>
              </div>

              {/* Size Selector - Luxury Style */}
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Select Dimension</span>
                  <button className="text-[9px] uppercase tracking-widest font-bold underline opacity-40 hover:opacity-100 transition-opacity">Size Guide</button>
                </div>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL', 'Custom'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 h-14 border transition-all flex items-center justify-center text-[10px] uppercase tracking-[0.4em] font-bold ${selectedSize === s
                        ? 'border-brand-gold bg-white/50 text-black'
                        : 'border-black/5 text-black/40 hover:border-brand-gold hover:text-black hover:bg-white/50'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Premium Call to Action */}
              <div className="pt-8 space-y-4">
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
                        selectedSize
                      );
                    }}
                    className="h-16 rounded-none bg-transparent border border-black/20 text-black text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 group"
                  >
                    Add to Cart
                  </Button>
                  <Button className="h-16 rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-brand-gold transition-all flex items-center justify-center gap-4 group">
                    Buy it Now
                    <ArrowDownRight className="w-5 h-5 stroke-[1px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
                <p className="text-center text-[9px] uppercase tracking-widest text-black/30 font-medium">
                  Inclusive of VAT and Insured Global Freight
                </p>
              </div>

              {/* Product Specifications - Minimal Swiss Grid */}
              <div className="space-y-0 border-y border-black/5 mt-12">
                {[
                  { label: "Origin", val: "Handcrafted in Dhaka" },
                  { label: "Time", val: "14 Business Days" },
                  { label: "Material", val: "80% Cotton, 20% Silk" },
                  { label: "Care", val: "Professional Dry Clean Only" },
                  { label: "Shipping", val: "Complimentary Express" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-8 md:gap-16 py-6 border-b border-black/5 last:border-b-0 group hover:bg-black/[0.01] transition-colors"
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
        <section className="py-24 md:py-48 px-0 border-t border-black/5 bg-brand-ivory">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left px-8 md:px-16">
              <div className="space-y-4">
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
              {Object.values(products)
                .filter(p => p.id.toString() !== params.id)
                .slice(0, 4)
                .map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group"
                  >
                    <Link href={`/product/${p.id}`}>
                      <a className="block space-y-6">
                        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 shadow-sm">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]"
                          />
                          <div className="absolute inset-0 bg-black/5 group-hover:opacity-0 transition-opacity" />
                        </div>
                        <div className="flex justify-between items-baseline px-4 md:px-8">
                          <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-tight text-black">{p.title}</h3>
                          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">{p.price}</span>
                        </div>
                      </a>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
