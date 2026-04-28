import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const deliveryOptions = [
  { label: "Inside Dhaka", charge: 80 },
  { label: "Outside Dhaka", charge: 130 }
];

export type OrderDialogBundle = {
  title: string;
  details: string;
  price: number;
  images: { src: string; alt: string }[];
};

export default function OrderDialog({
  open,
  onOpenChange,
  bundle,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bundle: OrderDialogBundle | null;
  onSuccess?: () => void;
}) {
  const [openInstance, setOpenInstance] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(deliveryOptions[0].charge);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [orderClosing, setOrderClosing] = useState(false);
  const previousOpen = useRef(open);

  useEffect(() => {
    if (!previousOpen.current && open) {
      setOpenInstance((current) => current + 1);
    }
    previousOpen.current = open;
  }, [open]);

  const resetDialog = (nextOpen: boolean) => {
    if (!nextOpen) {
      setOrderClosing(true);
      onOpenChange(false);
      return;
    }

    setOrderClosing(false);
    onOpenChange(nextOpen);
    setDeliveryCharge(deliveryOptions[0].charge);
    setOrderSubmitted(false);
    setOrderSubmitting(false);
    setOrderError("");
    setOrderRef("");
  };

  const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bundle) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    setOrderSubmitting(true);
    setOrderError("");

    try {
      const response = await apiRequest("POST", "/api/orders", {
        bundleTitle: bundle.title,
        bundleDetails: bundle.details,
        bundlePrice: bundle.price,
        deliveryCharge,
        customerName: String(formData.get("name") || ""),
        phone: String(formData.get("phone") || ""),
        address: String(formData.get("address") || ""),
      });
      const result = await response.json();
      setOrderRef(result.orderRef || "");
      setOrderSubmitted(true);
      onSuccess?.();
    } catch (error) {
      setOrderError(
        error instanceof Error
          ? error.message
          : "Could not place your order. Please try again.",
      );
    } finally {
      setOrderSubmitting(false);
    }
  };

  return (
    <Dialog open={open || orderClosing} onOpenChange={resetDialog}>
      {(open || orderClosing) && bundle && (
        <DialogContent
          forceMount
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="bottom-0 top-0 h-screen max-h-screen translate-y-0 overflow-y-auto rounded-none border-none bg-[#f2f1f0] p-0 shadow-[0_80px_180px_rgba(0,0,0,0.28)] data-[state=open]:animate-none data-[state=closed]:animate-none supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh md:bottom-auto md:top-[50%] md:h-auto md:max-h-[92dvh] md:translate-y-[-50%] md:max-w-[760px] [&>button]:rounded-none [&>button]:border [&>button]:border-black/10 [&>button]:bg-white/70"
        >
          <AnimatePresence
            initial={true}
            onExitComplete={() => setOrderClosing(false)}
          >
            {open && (
              <motion.div
                key={openInstance}
                initial={{ opacity: 0, y: 48, scale: 0.96, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: 48,
                  scale: 0.96,
                  filter: "blur(6px)",
                  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                }}
                className="min-h-full bg-[#f2f1f0] p-6 md:min-h-0 md:p-10"
              >
              <DialogHeader className="items-center border-b border-black/10 pb-6 text-center">
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
                  {orderRef && (
                    <p className="mx-auto mt-4 max-w-md text-[10px] uppercase tracking-[0.28em] leading-7 text-brand-gold">
                      Reference {orderRef}
                    </p>
                  )}
                  <Button
                    onClick={() => resetDialog(false)}
                    className="mt-10 h-12 rounded-none bg-black px-10 text-[10px] uppercase tracking-[0.35em] text-white hover:bg-brand-gold"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={placeOrder} className="mt-8 space-y-8">
                  <div className="grid grid-cols-[92px_1fr] items-center gap-4 border border-black/10 bg-white/45 p-3 md:grid-cols-[140px_1fr] md:items-stretch md:p-5">
                    <div className={`grid h-28 gap-px bg-black/10 md:h-auto md:aspect-[4/5] ${bundle.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {bundle.images.slice(0, 2).map((image) => (
                        <div key={image.alt} className="min-w-0 bg-[#ebe8e4] p-2">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-contain mix-blend-multiply"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="min-w-0">
                      <span className="mb-2 block text-[8px] uppercase tracking-[0.24em] font-bold text-brand-gold md:text-[9px] md:tracking-[0.35em]">
                        Selected Items
                      </span>
                      <h3 className="font-display text-xl font-light uppercase tracking-tight leading-none md:text-2xl">
                        {bundle.title}
                      </h3>
                      <p className="mt-2 text-[9px] uppercase tracking-[0.18em] leading-4 text-black/45 md:text-[10px] md:tracking-[0.25em] md:leading-5">
                        {bundle.details}
                      </p>
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

                  {orderError && (
                    <div className="border border-red-500/30 bg-red-50 px-4 py-3 text-[10px] uppercase tracking-[0.22em] leading-5 text-red-700">
                      {orderError}
                    </div>
                  )}

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
                          <span className="mt-2 block font-garet text-2xl font-bold">
                            ৳{option.charge}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-y border-black/10 py-4">
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-black/45">
                      <span>Items</span>
                      <span className="font-garet font-bold">৳{bundle.price.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.3em] text-black/45">
                      <span>Delivery</span>
                      <span className="font-garet font-bold">৳{deliveryCharge}</span>
                    </div>
                    <div className="mt-4 flex items-end justify-between border-t border-black/10 pt-4">
                      <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-black">
                        Total
                      </span>
                      <span className="font-garet text-3xl font-bold text-black">
                        ৳{(bundle.price + deliveryCharge).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    disabled={orderSubmitting}
                    className="h-14 w-full rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.35em] hover:bg-brand-gold transition-all disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {orderSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>
                </form>
              )}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      )}
    </Dialog>
  );
}
