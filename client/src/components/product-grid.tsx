import { motion } from "framer-motion";
import { useLocation } from "wouter";

// Import images
import imgNoir from "@assets/image_1768632448516.png";
import imgSherwani from "@assets/image_1768632387917.png";
import imgCrimson from "@assets/image_1768632401640.png";
import imgSilk from "@assets/image_1768632422582.png";
import imgBridal from "@assets/image_1768632436038.png";
import imgEarth from "@assets/image_1768632360954.png";

const products = [
  { id: 1, title: "Noir Kurta", price: "BDT 45,000", image: imgNoir },
  { id: 2, title: "Sherwani", price: "BDT 120,000", image: imgSherwani },
  { id: 3, title: "Crimson", price: "BDT 89,000", image: imgCrimson },
  { id: 4, title: "Silk Blend", price: "BDT 65,000", image: imgSilk },
  { id: 5, title: "Bridal", price: "Enquiry", image: imgBridal },
  { id: 6, title: "Earth Classic", price: "BDT 52,000", image: imgEarth }
];

export default function ProductGrid() {
  const [, setLocation] = useLocation();

  return (
    <section className="bg-brand-ivory">

      {/* ── Section Header ─────────────────────────────────── */}
      <div className="px-5 md:px-16 pt-14 md:pt-24 pb-8 md:pb-14 flex flex-col md:flex-row justify-between items-end gap-4 md:gap-8">
        <div>
          <span className="text-[9px] uppercase tracking-[0.55em] font-medium text-brand-gold mb-3 block">
            Archive 2026
          </span>
          <h2 className="text-[2.2rem] md:text-7xl font-display font-light uppercase tracking-tight leading-none">
            Selected <span className="font-bold">Works</span>
          </h2>
        </div>
        <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] font-bold opacity-25 mb-1">
          <span>Vol. 01</span>
          <span>Studio Collection</span>
        </div>
      </div>

      {/* Hairline divider */}
      <div className="h-px bg-black/10 mx-5 md:mx-16" />

      {/* ── Product Grid ───────────────────────────────────────
          Mobile  : full-bleed, 1px separators between cards
          Desktop : padded, generous column gaps
      ─────────────────────────────────────────────────────── */}
      <div
        className="
          grid grid-cols-2 lg:grid-cols-3
          gap-[1px] bg-black/[0.07]
          md:gap-6 lg:gap-8 md:bg-transparent md:px-16 md:pt-12 md:pb-0
        "
      >
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            onClick={() => setLocation(`/product/${p.id}`)}
            className="group flex flex-col cursor-pointer bg-brand-ivory"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <img
                src={p.image}
                className="w-full h-full object-cover grayscale brightness-95 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                alt={p.title}
              />
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* View label */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                <span className="text-[7px] md:text-[8px] text-white uppercase tracking-[0.4em] font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1">
                  View
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="px-3 md:px-0 pt-3 pb-4 md:pt-5 md:pb-8 border-t border-black/[0.07] flex flex-col gap-1.5">
              <h3 className="text-[0.85rem] md:text-2xl font-display font-light uppercase tracking-tight leading-tight text-black">
                {p.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-brand-gold font-medium">
                  {p.price}
                </span>
                <span className="text-[7px] md:text-[9px] uppercase tracking-[0.35em] font-medium opacity-20">
                  Bespoke
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom breathing room */}
      <div className="h-14 md:h-24" />
    </section>
  );
}
