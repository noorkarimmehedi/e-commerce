import Layout from "@/components/layout";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full bg-[#fcfaf7] px-4 pt-0 pb-0 flex justify-center md:px-16 md:pt-8 md:pb-16 xl:px-20">
        <div className="w-full max-w-[800px] px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full aspect-[3/4] md:aspect-[4/5] bg-[#ececec] overflow-hidden relative group cursor-pointer"
          >
            <Link href="/product/massage-insoles" className="block w-full h-full">
              <img 
                src="/insoles.png" 
                alt="Massage Insoles Hero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Collection Section */}
      <section className="w-full bg-[#fcfaf7] pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl text-center font-normal mb-16 tracking-tight text-black"
          >
            The Collection
          </motion.h2>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-12 pt-4 justify-center no-scrollbar">
            {/* Single Product Showcase */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col group cursor-pointer w-full max-w-[500px]"
            >
              <Link href="/product/massage-insoles" className="block">
                <div className="bg-[#e5e5e5] aspect-[4/5] flex items-center justify-center p-8 md:p-16 mb-6 overflow-hidden">
                  <img 
                    src="/insoles.png" 
                    alt="Massage Insoles" 
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl mix-blend-multiply"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-normal text-black text-center">Stepprs Massage Insoles</h3>
                <p className="text-lg md:text-xl text-black/60 text-center mt-3 uppercase tracking-widest text-[11px]">Bundle Options Available</p>
              </Link>
            </motion.div>
          </div>

          {/* Shop All Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Link href="/product/massage-insoles" className="inline-block border border-black bg-white px-16 py-4 text-[13px] font-medium tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300 uppercase">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
