import Layout from "@/components/layout";
import { useCart } from "@/contexts/cart-context";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { Link } from "wouter";
import latestDropCleanWhite from "@assets/image_1768632422582.png";
import latestDropEarthyOlive from "@assets/image_1768632401640.png";
import latestDropBlack from "@assets/image_1768632436038.png";
import latestDropCocoaBrown from "@assets/image_1768632387917.png";

const latestDropProducts = [
  {
    title: "Linen Baggy Trouser - Clean White",
    price: "Tk 799.00",
    image: latestDropCleanWhite,
  },
  {
    title: "Linen Baggy Trouser - Earthy Olive",
    price: "Tk 799.00",
    image: latestDropEarthyOlive,
  },
  {
    title: "Linen Baggy Trouser - Black",
    price: "Tk 799.00",
    image: latestDropBlack,
  },
  {
    title: "Linen Baggy Trouser - Cocoa Brown",
    price: "Tk 799.00",
    image: latestDropCocoaBrown,
  },
];

const justArrivedProducts = [
  {
    id: 101,
    title: "Black Blazer Dress",
    price: "Tk 1,690.00",
    sizeLabel: "Default",
    sizes: 5,
    image: latestDropBlack,
  },
  {
    id: 102,
    title: "Black High Leggings",
    price: "Tk 990.00",
    sizeLabel: "Default",
    sizes: 4,
    image: latestDropEarthyOlive,
  },
  {
    id: 103,
    title: "Clean White Trouser",
    price: "Tk 799.00",
    sizeLabel: "Default",
    sizes: 5,
    image: latestDropCleanWhite,
  },
  {
    id: 104,
    title: "Cocoa Brown Trouser",
    price: "Tk 799.00",
    sizeLabel: "Default",
    sizes: 3,
    image: latestDropCocoaBrown,
  },
];

export default function Home() {
  const { addToCart } = useCart();

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full bg-[#fcfaf7] pt-0 pb-0 flex justify-center md:pt-8 md:pb-16">
        <div className="w-full max-w-[800px] px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full aspect-square md:aspect-[4/5] bg-[#ececec] overflow-hidden relative group cursor-pointer"
          >
            <Link href="/product/stepprs-massage-insoles" className="block w-full h-full">
                <img
                 src={latestDropEarthyOlive}
                 alt="Latest Fashion Drop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>

            {/* Action Buttons Overlay */}
            <div className="absolute bottom-4 left-0 w-full px-4 md:px-8 flex flex-col items-center gap-2.5 z-10">
              <Link
                href="/product/stepprs-massage-insoles"
                className="w-full max-w-[500px] bg-black text-white py-2.5 text-center text-lg md:text-xl font-medium tracking-wide hover:bg-black/90 transition-colors"
              >
                Shop now
              </Link>
              <a
                href="#collection"
                className="w-full max-w-[500px] bg-white text-black py-2.5 text-center text-lg md:text-xl font-medium tracking-wide hover:bg-neutral-50 transition-colors"
              >
                Discover New Arrival
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Drop Section */}
      <section className="w-full bg-[#fcfaf7] py-10 md:py-16">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 xl:px-12">
          <div className="mb-7 flex items-start justify-between gap-6 md:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.06em] text-black"
            >
              Latest Drop
            </motion.h2>

            <Link
              href="/product/stepprs-massage-insoles"
              className="mt-2 shrink-0 border-b-2 border-black pb-1.5 text-[13px] font-medium uppercase tracking-[0.22em] text-black transition-opacity hover:opacity-60 md:mt-5 md:text-2xl md:tracking-[0.28em]"
            >
              Discover More
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
            {latestDropProducts.map((product, index) => (
              <motion.article
                key={product.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group border border-black/10 bg-[#fcfaf7]"
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
                    <h3 className="line-clamp-2 min-h-[2.4em] text-[11px] font-medium uppercase leading-snug tracking-[0.1em] text-black md:text-[12px]">
                      {product.title}
                    </h3>
                    <p className="text-sm font-bold tracking-tight text-black md:text-base">{product.price}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Just Arrived Section */}
      <section className="w-full bg-[#fcfaf7] pb-12 pt-2 md:pb-20 md:pt-4">
        <div className="mx-auto max-w-[1500px] pl-4 md:px-8 xl:px-12">
          <div className="mb-7 flex items-start justify-between gap-6 pr-4 md:mb-12 md:pr-0">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.06em] text-black"
            >
              Just arrived
            </motion.h2>

            <Link
              href="/product/stepprs-massage-insoles"
              className="mt-2 shrink-0 border-b-2 border-black pb-1.5 text-[13px] font-medium uppercase tracking-[0.22em] text-black transition-opacity hover:opacity-60 md:mt-5 md:text-2xl md:tracking-[0.28em]"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pr-4 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pr-0">
            {justArrivedProducts.map((product, index) => (
              <motion.article
                key={product.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
          </div>
        </div>
      </section>

      {/* The Collection Section */}
      <section id="collection" className="w-full bg-[#fcfaf7] pb-24 pt-8 md:pt-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-16 xl:px-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl text-center font-normal mb-8 tracking-tight text-black"
          >
            The Collection
          </motion.h2>

          <div className="flex overflow-x-auto snap-x snap-mandatory justify-center no-scrollbar">
            {/* Single Product Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
        </div>
      </section>
    </Layout>
  );
}
