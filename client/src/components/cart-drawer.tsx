import { useCart } from "@/contexts/cart-context";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
    const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, itemCount } = useCart();

    // Calculate subtotal
    const subtotal = items.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9]/g, ''));
        return total + (price * item.quantity);
    }, 0);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent
                side="right"
                className="top-0 bottom-0 w-full h-screen max-h-screen bg-brand-ivory border-l border-black/5 p-0 overflow-hidden supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh md:w-[500px] [&>button]:hidden"
            >
                {/* Background Branding */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none z-0">
                    <ShoppingBag className="w-[60vw] md:w-[300px] h-[60vw] md:h-[300px] stroke-[0.5px]" />
                </div>

                <div className="flex flex-col h-full relative z-10">
                    {/* Header */}
                    <div className="border-b border-black/5 p-8 md:p-12">
                        <div className="flex justify-between items-center mb-6">
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-brand-gold block">
                                    Your Cart
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-black/40">
                                    {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="rounded-none hover:bg-black hover:text-white transition-all border border-black/5 h-10 w-10"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto">
                        <AnimatePresence mode="popLayout">
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex flex-col items-center justify-center h-full p-12 text-center space-y-6"
                                >
                                    <ShoppingBag className="w-16 h-16 stroke-[1px] text-black/10" />
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-display font-light uppercase tracking-tight text-black/60">
                                            Your cart is empty
                                        </h3>
                                        <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/30">
                                            Discover our curated collection
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        className="h-12 px-8 rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-brand-gold transition-all"
                                    >
                                        Continue Shopping
                                    </Button>
                                </motion.div>
                            ) : (
                                <div className="divide-y divide-black/5">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: index * 0.1,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                            className="p-6 md:p-8 hover:bg-black/[0.01] transition-colors group"
                                        >
                                            <div className="flex gap-6">
                                                {/* Product Image */}
                                                <div className="relative w-24 h-32 md:w-28 md:h-36 bg-neutral-100 overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
                                                    />
                                                    <div className="absolute inset-0 border border-black/5" />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-grow space-y-4">
                                                    <div className="space-y-2">
                                                        <h3 className="text-lg md:text-xl font-display font-light uppercase tracking-tight text-black">
                                                            {item.title}
                                                        </h3>
                                                        <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-medium text-black/40">
                                                            <span>Size: {item.size}</span>
                                                        </div>
                                                        <span className="text-sm font-medium text-brand-gold">
                                                            {item.price}
                                                        </span>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center border border-black/10">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="h-10 w-10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="h-10 w-12 flex items-center justify-center text-[10px] font-bold border-x border-black/10">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="h-10 w-10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>

                                                        {/* Remove Button */}
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/30 hover:text-red-600 transition-colors"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer - Subtotal & Checkout */}
                    {items.length > 0 && (
                        <div className="border-t border-black/5 p-8 md:p-12 space-y-6 bg-white">
                            {/* Subtotal */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-baseline pb-4 border-b border-black/5">
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">
                                        Subtotal
                                    </span>
                                    <span className="text-2xl font-display font-light text-black">
                                        BDT {subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-black/30 text-center">
                                    Shipping and taxes calculated at checkout
                                </p>
                            </div>

                            {/* Checkout Button */}
                            <Button className="w-full h-16 rounded-none bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-brand-gold transition-all flex items-center justify-center gap-4 group">
                                Proceed to Checkout
                                <ArrowDownRight className="w-5 h-5 stroke-[1px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Button>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full text-[9px] uppercase tracking-[0.4em] font-bold text-black/40 hover:text-black transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
