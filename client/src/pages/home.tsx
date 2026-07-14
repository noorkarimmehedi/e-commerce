import Layout from "@/components/layout";
import { useCart } from "@/contexts/cart-context";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link } from "wouter";

const latestDropProducts = [
  {
    title: "Linen Baggy Trouser - Clean White",
    price: "Tk 799.00",
    image: "/new1.webp",
  },
  {
    title: "Linen Baggy Trouser - Earthy Olive",
    price: "Tk 799.00",
    image: "/new2.webp",
  },
  {
    title: "Linen Baggy Trouser - Black",
    price: "Tk 799.00",
    image: "/new3.webp",
  },
  {
    title: "Linen Baggy Trouser - Cocoa Brown",
    price: "Tk 799.00",
    image: "/new4.webp",
  },
];

const whatsNewProducts = [
  {
    id: 201,
    title: "Black Blazer Dress",
    price: "Tk 1,690.00",
    sizeLabel: "Default",
    image: "/new1.webp",
  },
  {
    id: 202,
    title: "Black High Leggings",
    price: "Tk 990.00",
    sizeLabel: "Default",
    image: "/new2.webp",
  },
  {
    id: 203,
    title: "Clean White Trouser",
    price: "Tk 799.00",
    sizeLabel: "Default",
    image: "/new3.webp",
  },
  {
    id: 204,
    title: "Cocoa Brown Trouser",
    price: "Tk 799.00",
    sizeLabel: "Default",
    image: "/new4.webp",
  },
];

const justArrivedProducts = [
  {
    id: 101,
    title: "Black Blazer Dress",
    price: "Tk 1,690.00",
    sizeLabel: "Default",
    sizes: 5,
    image: "/new1.webp",
  },
  {
    id: 102,
    title: "Black High Leggings",
    price: "Tk 990.00",
    sizeLabel: "Default",
    sizes: 4,
    image: "/new2.webp",
  },
  {
    id: 103,
    title: "Clean White Trouser",
    price: "Tk 799.00",
    sizeLabel: "Default",
    sizes: 5,
    image: "/new3.webp",
  },
  {
    id: 104,
    title: "Cocoa Brown Trouser",
    price: "Tk 799.00",
    sizeLabel: "Default",
    sizes: 3,
    image: "/new4.webp",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

export default function Home() {
  const { addToCart } = useCart();

  const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };

  const reveal = {
    hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  };

  const [heroRef, heroInView] = useReveal();
  const [whatsNewRef, whatsNewInView] = useReveal();
  const [latestDropRef, latestDropInView] = useReveal();
  const [justArrivedRef, justArrivedInView] = useReveal();
  const [collectionRef, collectionInView] = useReveal();

  function quickAddJustArrived(
    event: MouseEvent<HTMLButtonElement>,
    product: (typeof justArrivedProducts)[number],
  ) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      product.sizeLabel,
    );
  }

  function quickAddWhatsNew(
    event: MouseEvent<HTMLButtonElement>,
    product: (typeof whatsNewProducts)[number],
  ) {
    event.preventDefault();
    event.stopPropagation();
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      },
      product.sizeLabel,
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full bg-[#f6f6f6] pt-0 pb-0">
        <div className="w-full px-0">
          <div
            ref={heroRef}
            className="relative min-h-[640px] w-full overflow-hidden bg-black md:min-h-[760px]"
          >
            <Link href="/product/stepprs-massage-insoles" className="absolute inset-0 block">
              <img
                src="/hero1.webp"
                alt="Latest Fashion Drop"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </Link>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const, staggerChildren: 0.08, delayChildren: 0.1 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-10 text-center text-white md:items-center md:justify-center md:text-center md:px-16 md:pb-0"
            >
              <motion.p
                variants={reveal}
                className="mb-6 text-xs font-medium uppercase tracking-[0.36em] md:mb-7 md:text-base md:tracking-[0.36em]"
              >
                SS26 STATEMENT PIECES
              </motion.p>
              <motion.h1
                variants={reveal}
                className="max-w-[760px] text-[clamp(2.6rem,11vw,4rem)] font-bold leading-[0.9] tracking-[-0.06em] md:text-[clamp(4rem,5vw,7rem)] md:leading-[0.88] md:tracking-[-0.08em]"
              >
                Bold by<br />
                design
              </motion.h1>
              <motion.div variants={reveal}>
                <Link
                  href="/product/stepprs-massage-insoles"
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-full border-2 border-white px-8 py-3.5 text-xs font-medium uppercase tracking-[0.28em] text-white transition-colors hover:bg-white hover:text-black md:mt-10 md:px-12 md:py-5 md:text-base"
                >
                  DISCOVER MORE
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="w-full overflow-hidden bg-[#f6f6f6] py-10 md:py-16">
        <motion.div
          ref={whatsNewRef}
          className="mx-auto max-w-[1500px] pl-4 md:px-8 xl:px-12"
          initial="hidden"
          animate={whatsNewInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.p
            variants={reveal}
            transition={transition}
            className="text-center text-sm font-bold uppercase tracking-[0.55em] text-black md:text-2xl"
          >
            WHAT'S NEW
          </motion.p>

          <motion.div
            variants={reveal}
            transition={transition}
            className="mt-9 grid grid-cols-3 gap-2 text-center text-[clamp(2rem,5vw,2.6rem)] font-bold leading-none tracking-[-0.04em] md:mt-14 md:flex md:justify-center md:gap-12"
          >
            <span className="text-black">Jackets</span>
            <span className="text-black/25">Hoodies</span>
            <span className="text-black/25">T-Shirt</span>
          </motion.div>

          <motion.div
            transition={{ staggerChildren: 0.08 }}
            className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 md:mt-16 md:grid md:grid-cols-4 md:overflow-visible md:pr-0"
          >
            {whatsNewProducts.map((product, index) => (
              <motion.article
                key={product.title}
                variants={reveal}
                transition={transition}
                className="group min-w-[78vw] snap-start md:min-w-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ededed]">
                  <Link href="/product/stepprs-massage-insoles" className="block h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <span className="absolute left-5 top-5 bg-neutral-500/60 text-xs font-bold uppercase tracking-[0.35em] text-white backdrop-blur-md md:left-6 md:top-6 md:text-lg">
                    LAST FEW
                  </span>
                  <button
                    type="button"
                    aria-label={`Quick add ${product.title} from What's New to cart`}
                    onClick={(event) => quickAddWhatsNew(event, product)}
                      className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-2xl font-extralight leading-none text-white shadow-xl shadow-black/20 transition-transform duration-300 hover:scale-105 md:bottom-5 md:right-5 md:h-12 md:w-12 md:text-3xl"
                    >
                      +
                  </button>
                </div>

                <Link href="/product/stepprs-massage-insoles" className="block pb-2 pt-5 text-black md:pt-7">
                  <h3 className="text-lg font-medium uppercase leading-tight tracking-[0.08em] md:min-h-[2.4em] md:text-2xl">
                    {product.title}
                  </h3>
                  <p className="mt-3 text-xl font-normal tracking-[0.01em] text-black md:text-2xl">{product.price}</p>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Latest Drop Section */}
      <section className="w-full bg-[#f6f6f6] py-10 md:py-16">
        <motion.div
          ref={latestDropRef}
          className="mx-auto max-w-[1500px] px-4 md:px-8 xl:px-12"
          initial="hidden"
          animate={latestDropInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div
            variants={reveal}
            transition={transition}
            className="mb-7 flex items-start justify-between gap-6 md:mb-12"
          >
            <motion.h2
              className="text-[clamp(2rem,5vw,2.6rem)] font-bold leading-none tracking-[-0.04em] text-black"
            >
              Latest Drop
            </motion.h2>

            <Link
              href="/product/stepprs-massage-insoles"
              className="mt-1.5 shrink-0 border-b-2 border-black pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-60 md:mt-2 md:text-base md:tracking-[0.24em]"
            >
              Discover More
            </Link>
          </motion.div>

          <motion.div
            transition={{ staggerChildren: 0.08 }}
            className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4"
          >
            {latestDropProducts.map((product, index) => (
              <motion.article
                key={product.title}
                variants={reveal}
                transition={transition}
                className="group bg-[#f6f6f6]"
              >
                <Link href="/product/stepprs-massage-insoles" className="block h-full">
                  <div className="aspect-[3/4] overflow-hidden bg-[#e5e5e5]">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 px-3 pb-4 pt-3 md:px-4 md:pb-5">
                    <h3 className="line-clamp-2 min-h-[2.4em] text-sm font-bold uppercase leading-tight tracking-[0.06em] md:min-h-[2.35em] md:text-base md:tracking-[0.08em]">
                      {product.title}
                    </h3>
                    <p className="mt-4 text-xl font-normal tracking-[0.02em] md:text-2xl">{product.price}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Just Arrived Section */}
      <section className="w-full bg-[#f6f6f6] pb-12 pt-2 md:pb-20 md:pt-4">
        <motion.div
          ref={justArrivedRef}
          className="mx-auto max-w-[1500px] pl-4 md:px-8 xl:px-12"
          initial="hidden"
          animate={justArrivedInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div
            variants={reveal}
            transition={transition}
            className="mb-7 flex items-start justify-between gap-6 pr-4 md:mb-12 md:pr-0"
          >
            <motion.h2
              className="text-[clamp(2rem,5vw,2.6rem)] font-bold leading-none tracking-[-0.04em] text-black"
            >
              Just arrived
            </motion.h2>

            <Link
              href="/product/stepprs-massage-insoles"
              className="mt-1.5 shrink-0 border-b-2 border-black pb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-60 md:mt-2 md:text-base md:tracking-[0.24em]"
            >
              VIEW ALL
            </Link>
          </motion.div>

          <motion.div
            transition={{ staggerChildren: 0.08 }}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pr-4 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pr-0"
          >
            {justArrivedProducts.map((product, index) => (
              <motion.article
                key={product.title}
                variants={reveal}
                transition={transition}
                className="group min-w-[78vw] snap-start md:min-w-0"
              >
                <div className="h-full">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#eeeeee]">
                    <Link href="/product/stepprs-massage-insoles" className="block h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Quick add ${product.title} to cart`}
                      onClick={(event) => quickAddJustArrived(event, product)}
                      className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-2xl font-extralight leading-none text-white shadow-xl shadow-black/20 transition-transform duration-300 hover:scale-105 md:bottom-5 md:right-5 md:h-12 md:w-12 md:text-3xl"
                    >
                      +
                    </button>
                  </div>

                  <Link href="/product/stepprs-massage-insoles" className="block px-0 pb-2 pt-5 text-black md:pt-7">
                    <h3 className="text-base font-bold uppercase leading-tight tracking-[0.06em] md:min-h-[2.35em] md:text-xl md:tracking-[0.08em]">
                      {product.title}
                    </h3>
                    <p className="mt-4 text-xl font-normal tracking-[0.02em] md:text-2xl">{product.price}</p>
                    <p className="mt-8 text-lg font-normal tracking-[0.01em] text-black/45 md:text-2xl">
                      Available in {product.sizes} size
                    </p>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* The Collection Section */}
      <section id="collection" className="w-full bg-[#f6f6f6] pb-24 pt-8 md:pt-12">
        <motion.div
          ref={collectionRef}
          className="max-w-[1400px] mx-auto px-4 md:px-16 xl:px-20"
          initial="hidden"
          animate={collectionInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.h2
            variants={reveal}
            transition={transition}
            className="text-3xl md:text-4xl text-center font-normal mb-8 tracking-tight text-black"
          >
            The Collection
          </motion.h2>

          <div className="flex overflow-x-auto snap-x snap-mandatory justify-center no-scrollbar">
            {/* Single Product Showcase */}
            <motion.div
              variants={reveal}
              transition={transition}
              className="flex flex-col group cursor-pointer w-full max-w-[500px]"
            >
              <Link href="/product/stepprs-massage-insoles" className="block w-full">
                <div className="bg-[#e5e5e5] aspect-[4/5] flex items-center justify-center mb-5 overflow-hidden">
                  <img
                    src="/insoles.png"
                    alt="Massage Insoles"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-normal text-black text-center">Stepprs Massage Insoles</h3>
                <p className="text-lg md:text-xl text-black/60 text-center mt-3 uppercase tracking-widest text-[11px]">Bundle Options Available</p>

                <div className="mt-6 w-full pb-8">
                  <div className="bg-black w-full py-4 text-center text-[13px] font-medium tracking-widest text-white hover:bg-black/90 transition-colors duration-300 uppercase">
                    Shop Now
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
