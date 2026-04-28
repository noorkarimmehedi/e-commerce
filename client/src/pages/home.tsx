import Layout from "@/components/layout";
import Hero from "@/components/hero";
import { Component as ImageAutoSlider } from "@/components/ui/image-auto-slider";
import VideoReel from "@/components/video-reel";
import BundleSection from "@/components/bundle-section";
import ProductGrid from "@/components/product-grid";
import BookingSection from "@/components/booking-section";
import CustomerReviews from "@/components/customer-reviews";
import Categories from "@/components/categories";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ImageAutoSlider />
      <BundleSection />
      <VideoReel />

      {/* Brand Manifesto */}
      <section className="bg-brand-ivory pt-12 pb-12 md:pt-36 md:pb-20 px-8 md:px-16 overflow-hidden">
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
            "beauty is the <span className="font-bold">quiet ritual</span> of feeling ready, <br className="hidden md:block" />
            polished, and <span className="font-medium text-brand-gold">effortlessly</span> yourself."
          </p>
          <div className="mt-10 md:mt-14 flex justify-center items-center gap-6">
            <div className="w-12 h-px bg-black/10" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Seraphine Beauty Manifesto</span>
            <div className="w-12 h-px bg-black/10" />
          </div>
        </motion.div>
      </section>

      <BookingSection />
      <ProductGrid />
      <CustomerReviews />
      <Categories />
    </Layout>
  );
}
