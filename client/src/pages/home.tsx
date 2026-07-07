import Layout from "@/components/layout";
import { motion } from "framer-motion";
import { Link } from "wouter";

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
            <Link href="/product/massage-insoles" className="block w-full h-full">
              <img 
                src="/insoles.png" 
                alt="Massage Insoles Hero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>

            {/* Action Buttons Overlay */}
            <div className="absolute bottom-4 left-0 w-full px-4 md:px-8 flex flex-col items-center gap-2.5 z-10">
              <Link 
                href="/product/massage-insoles" 
                className="w-full max-w-[500px] bg-black text-white py-2.5 text-center text-lg md:text-xl font-medium tracking-wide hover:bg-black/90 transition-colors"
              >
                Shop now
              </Link>
              <Link 
                href="/collection" 
                className="w-full max-w-[500px] bg-white text-black py-2.5 text-center text-lg md:text-xl font-medium tracking-wide hover:bg-neutral-50 transition-colors"
              >
                Discover New Arrival
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Collection Section */}
      <section className="w-full bg-[#fcfaf7] pb-24 pt-8 md:pt-12">
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
              <Link href="/product/massage-insoles" className="block w-full">
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
