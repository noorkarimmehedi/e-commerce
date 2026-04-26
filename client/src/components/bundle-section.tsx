import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import makeupPen from "@assets/makeup_pen_4_in_1.png";
import tintBordeaux from "@assets/peptide_lip_tint_bordeaux.png";
import tintPlum from "@assets/peptide_lip_tint_plum.png";
import tintRose from "@assets/peptide_lip_tint_rosy.png";
import tintMauve from "@assets/peptide_lip_tint_mauve.png";

const lipTints = [
  { name: "Bordeaux", tone: "Burnt red", image: tintBordeaux, swatch: "#8f3329" },
  { name: "Plum Veil", tone: "Deep berry", image: tintPlum, swatch: "#452234" },
  { name: "Rosy Bloom", tone: "Petal pink", image: tintRose, swatch: "#d85d86" },
  { name: "Mauve Nude", tone: "Soft rose", image: tintMauve, swatch: "#b96f79" }
];

const deliveryOptions = [
  { label: "Inside Dhaka", charge: 80 },
  { label: "Outside Dhaka", charge: 130 }
];

export default function BundleSection() {
  const [selectedTint, setSelectedTint] = useState(lipTints[0]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<{
    title: string;
    details: string;
    price: number;
    images: { src: string; alt: string }[];
  } | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState(deliveryOptions[0].charge);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const openOrderForm = (bundle: NonNullable<typeof selectedBundle>) => {
    setSelectedBundle(bundle);
    setDeliveryCharge(deliveryOptions[0].charge);
    setOrderSubmitted(false);
    setOrderOpen(true);
  };

  const placeOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderSubmitted(true);
  };

  return (
    <section className="bg-[#f2f1f0] border-y border-black/5 px-4 py-20 md:px-16 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 border-y border-black/10 py-8 md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-10 md:py-10">
          <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.45em] font-bold text-brand-gold">
            <span>Beauty System</span>
            <span className="h-px w-10 bg-black/15" />
            <span>01</span>
          </div>

          <h2 className="text-center text-4xl md:text-7xl font-display font-light uppercase tracking-tight leading-none">
            Everyday <span className="font-bold">Edit</span>
          </h2>

          <div className="flex items-center justify-start gap-4 text-[9px] uppercase tracking-[0.45em] font-bold text-black/35 md:justify-end">
            <span>Makeup Pen</span>
            <span className="h-px w-10 bg-black/15" />
            <span>Lip Tint</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:mt-20">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid overflow-hidden border border-black/10 bg-brand-ivory md:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="relative grid grid-cols-2 gap-px bg-black/10">
              <div className="relative aspect-[4/5] bg-[#ebe8e4] p-6">
                <img
                  src={makeupPen}
                  alt="4-in-1 Makeup Pen"
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-black/10 bg-brand-ivory/90 text-lg font-light text-black shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                +
              </div>
              <div className="relative aspect-[4/5] bg-[#ebe8e4] p-6">
                <img
                  src={selectedTint.image}
                  alt={`${selectedTint.name} Peptide Lip Tint`}
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 md:p-12">
              <div className="space-y-8">
                <div className="flex items-start justify-between gap-6 border-b border-black/10 pb-6">
                  <div>
                    <span className="mb-4 block text-[9px] uppercase tracking-[0.5em] font-bold text-brand-gold">
                      The Everyday Edit - Classic
                    </span>
                    <h3 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight leading-none">
                      Makeup Pen + <span className="font-bold">1 Lip Tint</span>
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl md:text-4xl font-display font-light">৳1,499</span>
                    <span className="mt-2 block text-[9px] uppercase tracking-[0.35em] font-bold text-black/35">
                      ৳300+ off
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[9px] uppercase tracking-[0.45em] font-bold text-black/40">
                      Choose one flavour
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-gold">
                      {selectedTint.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                    {lipTints.map((tint) => (
                      <button
                        key={tint.name}
                        onClick={() => setSelectedTint(tint)}
                        className={`group border p-3 text-left transition-all ${
                          selectedTint.name === tint.name
                            ? "border-black bg-white"
                            : "border-black/10 bg-transparent hover:border-black/30"
                        }`}
                      >
                        <span
                          className="mb-4 block h-5 w-5 rounded-full border border-black/10"
                          style={{ backgroundColor: tint.swatch }}
                        />
                        <span className="block text-[10px] uppercase tracking-[0.25em] font-bold text-black">
                          {tint.name}
                        </span>
                        <span className="mt-1 block text-[8px] uppercase tracking-[0.25em] font-medium text-black/35">
                          {tint.tone}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={() =>
                  openOrderForm({
                    title: "The Everyday Edit - Classic",
                    details: `Makeup Pen + ${selectedTint.name} Lip Tint`,
                    price: 1499,
                    images: [
                      { src: makeupPen, alt: "4-in-1 Makeup Pen" },
                      { src: selectedTint.image, alt: `${selectedTint.name} Peptide Lip Tint` }
                    ]
                  })
                }
                className="mt-8 h-14 w-full rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.35em] hover:bg-brand-gold transition-all flex items-center justify-center"
              >
                Buy Classic Bundle
              </Button>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="grid overflow-hidden border border-black/10 bg-brand-ivory md:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="grid grid-cols-6 gap-px bg-black/10">
              <div className="relative col-span-2 aspect-[4/5] bg-[#f2f1f0] p-6 md:p-8">
                <img
                  src={makeupPen}
                  alt="4-in-1 Makeup Pen"
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </div>
              {lipTints.map((tint) => (
                <div key={tint.name} className="relative aspect-[2/5] bg-[#f2f1f0] p-3 md:p-5">
                  <img
                    src={tint.image}
                    alt={`${tint.name} Peptide Lip Tint`}
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-between p-6 md:p-12">
              <div className="space-y-8">
                <div className="border-b border-black/10 pb-6">
                  <span className="mb-4 block text-[9px] uppercase tracking-[0.5em] font-bold text-brand-gold">
                    The Everyday Edit - Quad
                  </span>
                  <h3 className="text-3xl md:text-5xl font-display font-light uppercase tracking-tight leading-none">
                    Makeup Pen + <span className="font-bold">All 4 Lip Tints</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.35em] font-bold text-black/35">
                      Bundle Price
                    </span>
                    <span className="mt-2 block text-3xl md:text-5xl font-display font-light">
                      ৳2,499
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.35em] font-bold text-black/35">
                      Savings
                    </span>
                    <span className="mt-3 block text-[10px] uppercase tracking-[0.35em] font-bold text-brand-gold">
                      ৳700+ off
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {lipTints.map((tint) => (
                    <div key={tint.name} className="flex items-center gap-3 border border-black/10 px-3 py-3">
                      <span
                        className="h-4 w-4 rounded-full border border-black/10"
                        style={{ backgroundColor: tint.swatch }}
                      />
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-black/55">
                        {tint.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() =>
                  openOrderForm({
                    title: "The Everyday Edit - Quad",
                    details: "Makeup Pen + All 4 Lip Tints",
                    price: 2499,
                    images: [
                      { src: makeupPen, alt: "4-in-1 Makeup Pen" },
                      ...lipTints.map((tint) => ({
                        src: tint.image,
                        alt: `${tint.name} Peptide Lip Tint`
                      }))
                    ]
                  })
                }
                className="mt-8 h-14 w-full rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.35em] hover:bg-brand-gold transition-all flex items-center justify-center"
              >
                Buy Quad Bundle
              </Button>
            </div>
          </motion.article>
        </div>
      </div>

      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <AnimatePresence>
          {orderOpen && selectedBundle && (
            <DialogContent
              forceMount
              className="max-h-[92vh] overflow-y-auto rounded-none border-none bg-[#f2f1f0] p-0 shadow-[0_80px_180px_rgba(0,0,0,0.28)] data-[state=open]:animate-none data-[state=closed]:animate-none sm:max-w-[900px] [&>button]:rounded-none [&>button]:border [&>button]:border-black/10 [&>button]:bg-white/70"
            >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-[0.86fr_1.14fr]"
            >
              <div className="relative hidden bg-[#e7e3df] p-10 md:block">
                <div className="absolute inset-6 border border-black/10" />
                <div className="relative z-10 grid h-full min-h-[620px] grid-cols-2 gap-px bg-black/10">
                  {selectedBundle.images.map((image, index) => (
                    <div
                      key={`${image.alt}-${index}`}
                      className={`bg-[#f2f1f0] p-5 ${selectedBundle.images.length > 2 && index === 0 ? "col-span-2" : ""}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-contain mix-blend-multiply"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-10">
                <DialogHeader className="border-b border-black/10 pb-6 text-left">
                  <DialogDescription className="text-[9px] uppercase tracking-[0.5em] font-bold text-brand-gold">
                    Secure Order Request
                  </DialogDescription>
                  <DialogTitle className="font-display text-3xl md:text-5xl font-light uppercase tracking-tight leading-none text-black">
                    Place <span className="font-bold">Order</span>
                  </DialogTitle>
                </DialogHeader>

                {orderSubmitted ? (
                  <div className="py-16 text-center">
                    <span className="mx-auto mb-8 block h-px w-20 bg-brand-gold" />
                    <h3 className="font-display text-3xl font-light uppercase tracking-tight">
                      Order Request Received
                    </h3>
                    <p className="mx-auto mt-5 max-w-md text-[10px] uppercase tracking-[0.28em] leading-7 text-black/45">
                      Our studio team will contact you shortly to confirm delivery and payment.
                    </p>
                    <Button
                      onClick={() => setOrderOpen(false)}
                      className="mt-10 h-12 rounded-none bg-black px-10 text-[10px] uppercase tracking-[0.35em] text-white hover:bg-brand-gold"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={placeOrder} className="mt-8 space-y-8">
                    <div className="grid gap-4 border border-black/10 bg-white/45 p-4 md:grid-cols-[140px_1fr] md:p-5">
                      <div
                        className={`relative grid gap-px bg-black/10 ${
                          selectedBundle.images.length > 2
                            ? "h-28 grid-cols-5 md:h-auto md:aspect-[4/5] md:grid-cols-2"
                            : "aspect-[4/5] grid-cols-2"
                        }`}
                      >
                        {selectedBundle.images.map((image, index) => (
                          <div
                            key={`${image.alt}-summary-${index}`}
                            className={`bg-[#ebe8e4] p-1.5 md:p-2 ${
                              selectedBundle.images.length > 2 && index === 0 ? "md:col-span-2" : ""
                            }`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="h-full w-full object-contain mix-blend-multiply"
                            />
                          </div>
                        ))}
                        {selectedBundle.images.length === 2 && (
                          <div className="absolute left-1/2 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-black/10 bg-brand-ivory/90 text-base font-light text-black shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
                            +
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-between gap-5">
                        <div>
                          <span className="mb-2 block text-[9px] uppercase tracking-[0.35em] font-bold text-brand-gold">
                            Selected Bundle
                          </span>
                          <h3 className="font-display text-2xl font-light uppercase tracking-tight">
                            {selectedBundle.title}
                          </h3>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] leading-5 text-black/45">
                            {selectedBundle.details}
                          </p>
                        </div>
                        <div className="flex items-end justify-between border-t border-black/10 pt-4">
                          <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-black/35">
                            Total
                          </span>
                          <span className="font-display text-3xl font-light">
                            ৳{(selectedBundle.price + deliveryCharge).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-black/45">
                          Full Name
                        </span>
                        <input
                          required
                          name="name"
                          className="h-12 w-full rounded-none border border-black/10 bg-white/70 px-4 text-sm outline-none transition-colors focus:border-black"
                          placeholder="Your name"
                        />
                      </label>
                      <label className="space-y-2">
                        <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-black/45">
                          Phone Number
                        </span>
                        <input
                          required
                          name="phone"
                          type="tel"
                          className="h-12 w-full rounded-none border border-black/10 bg-white/70 px-4 text-sm outline-none transition-colors focus:border-black"
                          placeholder="01XXXXXXXXX"
                        />
                      </label>
                    </div>

                    <label className="block space-y-2">
                      <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-black/45">
                        Delivery Address
                      </span>
                      <textarea
                        required
                        name="address"
                        rows={4}
                        className="w-full resize-none rounded-none border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none transition-colors focus:border-black"
                        placeholder="House, road, area, city"
                      />
                    </label>

                    <div className="grid gap-3">
                      <span className="text-[9px] uppercase tracking-[0.35em] font-bold text-black/45">
                        Delivery Charge
                      </span>
                      <div className="grid gap-2 md:grid-cols-2">
                        {deliveryOptions.map((option) => (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() => setDeliveryCharge(option.charge)}
                            className={`border p-4 text-left transition-all ${
                              deliveryCharge === option.charge
                                ? "border-black bg-white"
                                : "border-black/10 bg-transparent hover:border-black/30"
                            }`}
                          >
                            <span className="block text-[10px] uppercase tracking-[0.28em] font-bold">
                              {option.label}
                            </span>
                            <span className="mt-2 block font-display text-2xl font-light">
                              ৳{option.charge}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-y border-black/10 py-4">
                      <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-black/45">
                        <span>Bundle</span>
                        <span>৳{selectedBundle.price.toLocaleString()}</span>
                      </div>
                      <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.3em] text-black/45">
                        <span>Delivery</span>
                        <span>৳{deliveryCharge}</span>
                      </div>
                    </div>

                    <Button className="h-14 w-full rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.35em] hover:bg-brand-gold transition-all">
                      Place Order
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </section>
  );
}
