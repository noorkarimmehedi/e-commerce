import Layout from "@/components/layout";
import { motion } from "framer-motion";
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

export default function Home() {
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
        <div className="mx-auto max-w-[1400px] px-4 md:px-16 xl:px-20">
          <div className="mb-10 flex items-center justify-between gap-4 md:mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-medium uppercase tracking-[0.24em] text-black md:text-[13px]"
            >
              Latest Drop
            </motion.h2>

            <Link
              href="/product/stepprs-massage-insoles"
              className="border border-black px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-colors hover:bg-black hover:text-white md:px-4 md:py-2 md:text-[11px]"
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
