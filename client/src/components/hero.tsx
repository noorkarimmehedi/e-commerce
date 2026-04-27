import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-brand-ivory overflow-hidden">
      {/* Immersive Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet="/hero_desktop.png" />
          <img
            src="/hero_mobile_no_makeup.png"
            className="h-full w-full scale-110 object-cover brightness-75 contrast-105 md:scale-100"
            alt="Luxury Couture"
          />
        </picture>
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Elegant Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium text-white/80 mb-6 block">
            Seraphine Studio • Everyday Beauty
          </span>
          <h1 className="text-[12vw] md:text-[7vw] font-display font-light text-white leading-[0.9] tracking-tight uppercase mb-8">
            No Makeup <span className="font-bold">Look</span>
          </h1>
          <div className="w-24 h-px bg-brand-gold mx-auto mb-8" />
          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-white/90 max-w-lg mx-auto leading-relaxed font-light">
            4-in-1 makeup pen and peptide lip tint for soft, effortless glow.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-20 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Discover More</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDownRight className="w-6 h-6 text-white stroke-[1px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-12 left-12 z-20 hidden md:block">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Studio / CH-26</span>
      </div>
      <div className="absolute top-12 right-12 z-20 hidden md:block">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Genesis V.01</span>
      </div>
    </section>
  );
}
