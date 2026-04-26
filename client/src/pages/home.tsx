import Layout from "@/components/layout";
import Hero from "@/components/hero";
import VideoReel from "@/components/video-reel";
import BundleSection from "@/components/bundle-section";
import ProductGrid from "@/components/product-grid";
import BookingSection from "@/components/booking-section";
import Categories from "@/components/categories";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <VideoReel />
      <BundleSection />

      {/* Brand Manifesto */}
      <section className="bg-brand-ivory pt-12 pb-24 md:py-48 px-8 md:px-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="max-w-5xl mx-auto text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-medium text-brand-gold mb-12 block">
            The Philosophy
          </span>
          <p className="text-4xl md:text-7xl font-display font-light leading-[1.1] tracking-tight lowercase">
            "Art is the <span className="font-bold">subtraction</span> of the unnecessary, <br className="hidden md:block" />
            revealing the <span className="font-medium text-brand-gold">soul</span> of the essential."
          </p>
          <div className="mt-16 flex justify-center items-center gap-6">
            <div className="w-12 h-px bg-black/10" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Seraphine Studio Manifesto</span>
            <div className="w-12 h-px bg-black/10" />
          </div>
        </motion.div>
      </section>

      <ProductGrid />
      <BookingSection />
      <Categories />
    </Layout>
  );
}
