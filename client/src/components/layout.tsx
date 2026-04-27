import { Link, useLocation } from "wouter";
import { ArrowUpRight, Instagram, Twitter, Mail, Menu, Globe, Clock, ShieldCheck, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/cart-context";
import CartDrawer from "@/components/cart-drawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [time, setTime] = useState('');
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const { setIsOpen: setCartOpen, itemCount } = useCart();
  const announcements = [
    "Private Atelier Appointments Now Open",
    "Complimentary Couture Consultation This Week"
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnnouncementIndex((current) => (current + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [announcements.length]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-black selection:bg-brand-gold selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-brand-ivory/80 backdrop-blur-md transition-all duration-300">
        <div className="bg-[#f2f1f0] border-b border-black/5 px-4 md:px-16">
          <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-center md:justify-between">
            <div className="hidden md:flex items-center gap-4 text-[9px] uppercase tracking-[0.45em] font-bold text-black/45">
              <span>Seraphine Dispatch</span>
              <span className="h-px w-10 bg-black/15" />
              <span>SS26</span>
            </div>
            <div className="relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden md:flex-none md:min-w-[480px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={announcementIndex}
                  initial={{ opacity: 0, y: "-20%" }}
                  animate={{ opacity: 1, y: "-50%" }}
                  exit={{ opacity: 0, y: "-80%" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-1/2 text-center text-[8px] uppercase tracking-[0.18em] md:text-[9px] md:tracking-[0.5em] font-medium text-black/65"
                >
                  {announcements[announcementIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[9px] uppercase tracking-[0.45em] font-bold text-black/45">
              <span>Dhaka</span>
              <span className="h-px w-10 bg-black/15" />
              <span>{time} BST</span>
            </div>
          </div>
        </div>
        <div className="flex h-14 items-center justify-between px-4 md:h-24 md:px-16">
          <div className="flex-1 flex items-center justify-start">
            <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium opacity-70">
              <Link href="/collection"><a className="hover:text-brand-gold transition-colors">Collection</a></Link>
              <Link href="/atelier"><a className="hover:text-brand-gold transition-colors">Atelier</a></Link>
            </div>

            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="group flex h-9 w-auto items-center justify-center rounded-none px-0 md:h-12">
                    <span className="text-[9px] uppercase tracking-[0.24em] font-bold opacity-70 transition-opacity group-hover:opacity-100">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="top-0 bottom-0 w-full h-screen max-h-screen bg-brand-ivory border-none p-0 overflow-hidden supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh [&>button]:hidden">
                  {/* Background Branding */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
                    <h2 className="text-[40vw] font-display font-light uppercase tracking-tighter rotate-90 leading-none">
                      Seraphine
                    </h2>
                  </div>

                  <div className="flex flex-col h-full relative z-10 p-8 md:p-24 justify-between">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-gold">Menu</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="rounded-none hover:bg-black hover:text-white transition-all border border-black/5"
                      >
                        <div className="relative w-6 h-6">
                          <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-current -translate-x-1/2 rotate-45" />
                          <div className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-current -translate-x-1/2 -rotate-45" />
                        </div>
                      </Button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4 md:gap-10 py-12">
                      {["Collection", "Atelier", "Journal", "Booking"].map((item, idx) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -50 }}
                          animate={isOpen ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.8,
                            delay: idx * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          <Link href={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                            <a className="group flex items-baseline gap-4 md:gap-6">
                              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold opacity-40 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                              <span className="text-5xl md:text-8xl font-display font-light uppercase tracking-tight text-black group-hover:translate-x-4 transition-transform duration-500">
                                {item}
                              </span>
                            </a>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="space-y-12">
                      <div className="h-px w-12 bg-black/10" />
                      <div className="flex justify-between items-end">
                        <div className="space-y-4">
                          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold block">Dhaka Studio</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-40 block">{time} BST</span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold">Archive</span>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-40">Vol. 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Link href="/">
              <a className="flex flex-col items-center text-black">
                <span className="text-xl font-display font-light uppercase tracking-[0.22em] md:text-4xl md:tracking-[0.18em]">
                  Seraphine
                </span>
                <span className="mt-0.5 text-[7px] uppercase tracking-[0.35em] font-bold text-black/45 md:mt-1 md:text-[8px] md:tracking-[0.45em]">
                  Bangladesh
                </span>
              </a>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-6 md:gap-10">
            {/* Cart Button - Mobile & Desktop */}
            <Button
              variant="ghost"
              onClick={() => setCartOpen(true)}
              className="group relative flex h-9 items-center justify-center rounded-none px-2 hover:bg-transparent md:h-12 md:px-3"
            >
              <span className="text-[9px] uppercase tracking-[0.24em] font-bold opacity-70 transition-opacity group-hover:opacity-100 md:text-[10px] md:tracking-[0.3em]">
                Cart
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium opacity-70">
              <Link href="/journal"><a className="hover:text-brand-gold transition-colors">Journal</a></Link>
              <Link href="/booking"><a className="hover:text-brand-gold transition-colors">Booking</a></Link>

            </div>

            <Button variant="ghost" className="hidden md:flex h-12 px-8 rounded-none border border-black/10 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all">
              Private Fitting
            </Button>

          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Main Content with Transition */}
      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Swiss Grid Footer */}
      <footer className="border-t border-black/5 bg-brand-ivory text-black pt-24">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-w-[1440px] mx-auto px-8 md:px-16 gap-16 mb-24">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-8">
            <span className="text-2xl font-display font-light uppercase tracking-widest text-brand-gold">Seraphine</span>
            <p className="text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-medium leading-[1.8] md:leading-[2.4] text-black/50 md:max-w-md md:text-balance leading-relaxed">
              Defining the future of luxury couture through Swiss modernist principles and master craftsmanship.
            </p>
            <div className="flex gap-6">
              <Instagram className="w-4 h-4 stroke-[1px] hover:text-brand-gold cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 stroke-[1px] hover:text-brand-gold cursor-pointer transition-colors" />
              <Mail className="w-4 h-4 stroke-[1px] hover:text-brand-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-gold block">Explore</span>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest font-medium text-black/60">
              <li><a href="#" className="hover:text-black transition-colors block">Collections</a></li>
              <li><a href="#" className="hover:text-black transition-colors block">Bespoke Fitting</a></li>
              <li><a href="#" className="hover:text-black transition-colors block">Fabric Archive</a></li>
              <li><a href="#" className="hover:text-black transition-colors block">Journal</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-gold block">Maison</span>
            <ul className="space-y-4 text-[10px] uppercase tracking-widest font-medium text-black/60">
              <li><a href="#" className="hover:text-black transition-colors block">Studio Dhaka</a></li>
              <li><a href="#" className="hover:text-black transition-colors block">Client Care</a></li>
              <li><a href="#" className="hover:text-black transition-colors block">Press</a></li>
              <li><a href="#" className="hover:text-black transition-colors block">Legal</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-gold block">Newsletter</span>
            <div className="flex border-b border-black/10 pb-4">
              <input
                type="email"
                placeholder="JOIN THE ATELIER"
                className="bg-transparent border-none outline-none flex-grow text-[9px] uppercase tracking-[0.4em] font-medium placeholder:text-black/20"
              />
              <button className="text-[9px] uppercase tracking-[0.4em] font-bold hover:text-brand-gold transition-colors">Join</button>
            </div>
          </div>
        </div>

        {/* Massive Logo Section */}
        <div className="border-t border-black/5 pt-12 pb-2 overflow-hidden relative group cursor-default">
          <h2 className="text-[25vw] font-display font-light uppercase tracking-tighter leading-[0.7] text-center text-black/5 select-none transition-all duration-1000 group-hover:text-brand-gold/10 group-hover:tracking-[0.1em]">
            Seraphine
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white border-t border-black/5 px-8 md:px-16 py-8">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[9px] uppercase tracking-[0.4em] text-black/40 text-center md:text-left">
              Website by <a href="https://api.whatsapp.com/send/?phone=8801733670129" className="text-black font-bold">Arc Lab Technology</a> / © 2026 Seraphine Studio
            </div>
            <div className="flex gap-8 text-[9px] uppercase tracking-[0.4em] text-black/40">
              <div className="flex items-center gap-2"><Globe className="w-3 h-3" /> Dhaka</div>
              <div className="hidden md:flex items-center gap-2 font-modern">{time} BST</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
