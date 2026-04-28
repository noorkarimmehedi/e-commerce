import { motion, useMotionValue } from "framer-motion";
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
  const dragX = useMotionValue(0);

  const goToImage = (idx: number) => {
    setActiveImage((idx + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

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
        <motion.div
          className="flex h-full touch-pan-y cursor-grab active:cursor-grabbing"
          style={{ x: dragX }}
          animate={{ x: `-${activeImage * 100}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            const swipePower = Math.abs(info.offset.x) * info.velocity.x;

            if (info.offset.x < -56 || swipePower < -8000) {
              goToImage(activeImage + 1);
            } else if (info.offset.x > 56 || swipePower > 8000) {
              goToImage(activeImage - 1);
            } else {
              goToImage(activeImage);
            }
          }}
        >
          {HERO_IMAGES.map((image) => (
            <div key={image.src} className="relative h-full w-full shrink-0">
              <img
                src={image.src}
                alt={image.alt}
                aria-hidden="true"
                loading="eager"
                draggable={false}
                className={`absolute inset-0 h-full w-full select-none object-center brightness-95 contrast-105 ${
                  image.fit === "cover" ? "object-cover" : "object-contain"
                }`}
              />
            </div>
          ))}
        </motion.div>
        <div className="absolute inset-0 border border-black/10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/18 to-transparent pointer-events-none" />

        <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center">
          <div className="flex items-center gap-3 border border-white/20 bg-black/15 px-4 py-3 backdrop-blur-sm">
            {HERO_IMAGES.map((image, idx) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goToImage(idx)}
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
