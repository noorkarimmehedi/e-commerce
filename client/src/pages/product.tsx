import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowDownRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import Layout from "@/components/layout";
import OrderDialog, { type OrderDialogBundle } from "@/components/order-dialog";
import { createEventId, trackMetaEvent } from "@/lib/meta";

const productData = {
  id: "massage-insoles",
  title: "Stepprs Massage Insoles",
  image: "/hero-insoles.png",
  description: "Instant pain relief in every step. Engineered with targeted massage nodes, biomechanical arch support, and breathable vents. Trimmable for a perfect fit.",
  origin: "Imported",
};

const bundles = [
  { id: 1, title: "1 Pair", price: "৳500", amount: 500 },
  { id: 2, title: "2 Pairs", price: "৳850", amount: 850 },
  { id: 3, title: "3 Pairs", price: "৳1350", amount: 1350 },
];

const insoleCarouselImages = [
  {
    src: "/insoles.png",
    alt: "Stepprs Massage Insoles - Biomechanical Arch Support",
    fit: "cover",
  }
];

const formatTimelineDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

const featureGroups = [
  {
    label: "Core Feature",
    details: ["Targeted Massage Nodes"],
  },
  {
    label: "Support & Comfort",
    details: ["Biomechanical Arch Support", "Thick Heel Cup & Cushioning"],
  },
  {
    label: "Fit & Material",
    details: ["Trimmable to Fit", "Breathable Vents"],
  },
];

export default function ProductPage({ params }: { params?: { id: string } }) {
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const [orderOpen, setOrderOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedBundleIdx, setSelectedBundleIdx] = useState(0);
  const [openFeature, setOpenFeature] = useState<string | null>(null);
  const selectedBundle = bundles[selectedBundleIdx];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    loop: false,
    skipSnaps: false,
  });

  useEffect(() => {
    const eventId = createEventId();
    trackMetaEvent({
      eventName: "ViewContent",
      eventId,
      capi: true,
      customData: {
        currency: "BDT",
        value: selectedBundle.amount,
        content_type: "product",
        content_ids: [productData.id],
        contents: [{ id: productData.id, quantity: 1, item_price: selectedBundle.amount }],
      },
    });
  }, [selectedBundle]);

  const goToImage = (idx: number) => {
    emblaApi?.scrollTo(idx);
  };

  const syncActiveImage = useCallback(() => {
    if (!emblaApi) return;
    setActiveImage(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0, true);
    setActiveImage(0);
    syncActiveImage();
    emblaApi.on("select", syncActiveImage);
    emblaApi.on("reInit", syncActiveImage);

    return () => {
      emblaApi.off("select", syncActiveImage);
      emblaApi.off("reInit", syncActiveImage);
    };
  }, [emblaApi, syncActiveImage]);

  const productImages = [
    {
      src: productData.image,
      alt: productData.title,
      fit: "cover",
    },
    ...insoleCarouselImages
  ];

  const today = new Date();
  const processedDate = new Date(today);
  processedDate.setDate(today.getDate() + 1);
  const deliveredDate = new Date(processedDate);
  deliveredDate.setDate(processedDate.getDate() + 1);
  const deliveryTimeline = [
    { title: "Order Placed", date: formatTimelineDate(today) },
    { title: "Order Processed", date: formatTimelineDate(processedDate) },
    { title: "Delivered", date: formatTimelineDate(deliveredDate) },
  ];

  const productOrder: OrderDialogBundle = {
    title: productData.title,
    details: selectedBundle.title,
    price: selectedBundle.amount,
    images: [{ src: productData.image, alt: productData.title }]
  };

  return (
    <Layout>
      <div className="bg-brand-ivory min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Side */}
          <div className="lg:col-span-7 relative bg-neutral-100 overflow-hidden">
            <div className="group h-[64vh] min-h-[430px] lg:sticky lg:top-0 lg:h-screen">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-[#f2f1f0]"
              >
                <div ref={emblaRef} className="h-full cursor-grab overflow-hidden active:cursor-grabbing">
                  <div className="flex h-full touch-pan-y">
                    {productImages.map((image, i) => (
                      <div key={image.src + i} className="relative h-full min-w-0 flex-[0_0_100%]">
                        <img
                          src={image.src}
                          alt={image.alt}
                          draggable={false}
                          className={`absolute inset-0 h-full w-full select-none object-center brightness-95 contrast-105 transition-transform duration-[2s] group-hover:scale-105 ${
                            image.fit === "cover"
                              ? "object-cover"
                              : "object-contain mix-blend-multiply"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line Indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToImage(idx)}
                      className={`h-[2px] transition-all duration-300 ${
                        activeImage === idx ? 'w-8 bg-black' : 'w-8 bg-black/20'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Gold Frame Detail overlay */}
              <div className="hidden md:block absolute inset-16 border border-brand-gold/20 pointer-events-none" />


            </div>
          </div>

          {/* Details Side */}
          <motion.div
            className="lg:col-span-5 flex flex-col bg-brand-ivory"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-grow space-y-6 px-4 py-6 md:space-y-12 md:p-16 xl:p-20">
              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.6em] font-medium text-brand-gold">
                    Wellness / Insoles
                  </span>
                </div>

                <h1 className="max-w-full break-words font-sans text-4xl sm:text-5xl font-semibold tracking-tight text-black md:text-7xl whitespace-normal leading-tight">
                  {productData.title}
                </h1>

                <div className="flex items-center gap-6">
                  <span className="font-sans text-2xl font-semibold text-black">{selectedBundle.price}</span>
                  <div className="h-px flex-grow bg-black/5" />
                </div>
                
                <p className="text-xs font-medium leading-[1.8] text-black/60 md:text-sm">
                  Transform every step with Stepprs Massage Insoles. Features targeted massage nodes, biomechanical arch support, and breathable vents for instant foot pain relief. Trimmable to fit any shoe perfectly.
                </p>
              </div>

              {/* Bundle Selection */}
              <div className="space-y-3 md:space-y-4">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/60">Select Bundle</span>
                <div className="grid grid-cols-3 gap-2 md:pt-3">
                  {bundles.map((bundle, idx) => (
                    <button
                      key={bundle.id}
                      onClick={() => setSelectedBundleIdx(idx)}
                      className={`relative flex flex-col items-center justify-center border px-1 py-1.5 text-center transition-all md:px-3 md:py-2.5 ${
                        selectedBundleIdx === idx 
                          ? 'border-black bg-black text-white' 
                          : 'border-black/20 bg-transparent text-black hover:border-black/50'
                      }`}
                    >
                      <span className="block text-[11px] uppercase tracking-widest font-bold mb-1">{bundle.title}</span>
                      <span className="block text-[13px] font-garet">{bundle.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Premium Call to Action */}
              <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      addToCart(
                        {
                          id: Number(`${productData.id}${selectedBundle.id}`), // Using bundle ID for distinct cart items
                          title: `${productData.title} (${selectedBundle.title})`,
                          price: selectedBundle.price,
                          image: productData.image
                        },
                        "Default"
                      );
                    }}
                    className="h-16 rounded-none bg-transparent border border-black/20 text-black text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4 group"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => setOrderOpen(true)}
                    className="h-16 rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-brand-gold transition-all flex items-center justify-center gap-4 group"
                  >
                    Buy it Now
                    <ArrowDownRight className="w-5 h-5 stroke-[1px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
                <div className="border border-black/10 bg-white/35 px-4 py-5 md:px-5">
                  <div className="relative pb-1 pt-5">
                    <div className="absolute left-[12%] right-[12%] top-8 h-px bg-black/15" />
                    <div className="relative z-20 grid grid-cols-3 gap-3">
                      {deliveryTimeline.map((item) => (
                        <div key={item.title} className="flex flex-col items-center text-center">
                          <span className="mb-3 h-3 w-3 rounded-full border border-brand-gold bg-brand-ivory shadow-[0_0_0_4px_rgba(242,241,240,0.95)]" />
                          <span className="font-garet text-[11px] font-bold uppercase tracking-[0.12em] text-brand-gold">
                            {item.date}
                          </span>
                          <span className="mt-2 block text-[8px] font-bold uppercase leading-4 tracking-[0.18em] text-black md:text-[9px] md:tracking-[0.24em]">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="border border-black/10 bg-white/35 p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-black/10 pb-4">
                  <span className="text-[9px] uppercase tracking-[0.36em] font-bold text-brand-gold">
                    Details
                  </span>
                  <span className="h-px flex-1 bg-black/10" />
                  <span className="font-garet text-[10px] font-bold uppercase tracking-[0.24em] text-black/35">
                    Features
                  </span>
                </div>
                <div className="w-full">
                  {featureGroups.map((item) => {
                    const isOpen = openFeature === item.label;

                    return (
                      <div key={item.label} className="border-b border-black/5 last:border-b-0">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFeature(isOpen ? null : item.label)}
                          className="flex w-full items-center justify-between py-4 text-left"
                        >
                          <span className="text-[8px] uppercase tracking-[0.28em] font-bold text-black/35">
                            {item.label}
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="text-black/35"
                            aria-hidden="true"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <motion.div
                                initial={{ y: -6 }}
                                animate={{ y: 0 }}
                                exit={{ y: -6 }}
                                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                                className="grid gap-2 pb-4 pt-0"
                              >
                                {item.details.map((detail) => (
                                  <span
                                    key={detail}
                                    className="block text-[11px] uppercase tracking-[0.16em] font-medium leading-6 text-black/75 md:text-[12px]"
                                  >
                                    {detail}
                                  </span>
                                ))}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <OrderDialog
        open={orderOpen}
        onOpenChange={setOrderOpen}
        bundle={productOrder}
      />
    </Layout>
  );
}
