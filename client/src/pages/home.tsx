import Layout from "@/components/layout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  fetchStorefrontProducts,
  formatProductPrice,
  getProductImage,
  hasPublishedProducts,
} from "@/lib/storefront-products";

export default function Home() {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["merchant-suite-products"],
    queryFn: fetchStorefrontProducts,
  });
  const featuredProduct = products[0];
  const featuredImage = featuredProduct ? getProductImage(featuredProduct) : "";
  const hasProducts = hasPublishedProducts(products);

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
            {featuredProduct && featuredImage ? (
              <Link href={`/product/${featuredProduct.slug}`} className="block w-full h-full">
                <img
                  src={featuredImage}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            ) : (
              <div className="flex h-full w-full items-center justify-center px-8 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/35">
                  {isLoading
                    ? "Loading products..."
                    : isError
                      ? "Could not load products."
                      : "No products published yet."}
                </span>
              </div>
            )}

            {/* Action Buttons Overlay */}
            {featuredProduct ? (
              <div className="absolute bottom-4 left-0 w-full px-4 md:px-8 flex flex-col items-center gap-2.5 z-10">
                <Link
                  href={`/product/${featuredProduct.slug}`}
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
            ) : null}
          </motion.div>
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

          {isLoading ? (
            <div className="py-16 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-black/35">
              Loading products...
            </div>
          ) : isError ? (
            <div className="py-16 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-red-700">
              Could not load products.
            </div>
          ) : !hasProducts ? (
            <div className="py-16 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-black/35">
              No products published yet.
            </div>
          ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory justify-center no-scrollbar">
              {products.map((product, index) => {
                const productImage = getProductImage(product);

                return (
                  <motion.div
                    key={product.id || product.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col group cursor-pointer w-full max-w-[500px] shrink-0 snap-center px-2"
                  >
                    <Link href={`/product/${product.slug}`} className="block w-full">
                      <div className="bg-[#e5e5e5] aspect-[4/5] flex items-center justify-center mb-5 overflow-hidden">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/25">
                            No image
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-normal text-black text-center">
                        {product.name}
                      </h3>
                      <p className="text-lg md:text-xl text-black/60 text-center mt-3 uppercase tracking-widest text-[11px]">
                        {formatProductPrice(product.price)}
                      </p>

                      <div className="mt-6 w-full pb-8">
                        <div className="bg-black w-full py-4 text-center text-[13px] font-medium tracking-widest text-white hover:bg-black/90 transition-colors duration-300 uppercase">
                          Shop Now
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
