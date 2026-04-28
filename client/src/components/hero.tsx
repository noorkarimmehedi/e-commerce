import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  {
    src: "/hero_mobile_no_makeup.png",
    alt: "",
    fit: "cover",
  },
  {
    src: "/hf_20260311_145847_43310d40-2ddd-4227-9283-2c3fe9830d15.webp",
    alt: "",
    fit: "contain",
  },
  {
    src: "/hf_20260311_151900_cff2b5db-4d48-4ede-b8cf-67eaacfac089.webp",
    alt: "",
    fit: "contain",
  },
  {
    src: "/hf_20260311_155853_1d38cb61-6e7f-4e18-9f98-5b871c571abd.webp",
    alt: "",
    fit: "contain",
  },
];

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-brand-ivory px-0 pt-0 pb-12 overflow-hidden md:px-16 md:pt-8 md:pb-16">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto aspect-square w-full max-w-[min(100%,780px)] overflow-hidden bg-[#f4efea] md:max-w-[min(100%,880px)]"
      >
        {HERO_IMAGES.map((image, idx) => (
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: activeImage === idx ? 1 : 0,
              scale: activeImage === idx ? 1 : 1.02,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            loading="eager"
            className={`absolute inset-0 h-full w-full object-center brightness-95 contrast-105 ${
              image.fit === "cover" ? "object-cover" : "object-contain"
            }`}
          />
        ))}
        <div className="absolute inset-0 border border-black/10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/18 to-transparent pointer-events-none" />

        <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center">
          <div className="flex items-center gap-3 border border-white/20 bg-black/15 px-4 py-3 backdrop-blur-sm">
            {HERO_IMAGES.map((image, idx) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(idx)}
                aria-label={`Show hero image ${idx + 1}`}
                className="group flex h-5 w-5 items-center justify-center"
              >
                <span
                  className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                    activeImage === idx
                      ? "w-6 rounded-full bg-brand-gold"
                      : "bg-white/70 group-hover:bg-white"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
