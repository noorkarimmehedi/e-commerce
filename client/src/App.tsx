import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProductPage from "@/pages/product";
import BookingPage from "@/pages/booking";
import { createEventId, initMetaPixel, trackMetaEvent } from "@/lib/meta";
import { useEffect, useRef } from "react";

function Router() {
  const [location] = useLocation();
  const scrollPositions = useRef(new Map<string, number>());
  const previousLocation = useRef(location);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    trackMetaEvent({ eventName: "PageView", eventId: createEventId(), capi: true });
  }, [location]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const markHistoryNavigation = () => {
      isHistoryNavigation.current = true;
    };

    window.addEventListener("popstate", markHistoryNavigation);

    return () => {
      window.removeEventListener("popstate", markHistoryNavigation);
    };
  }, []);

  useEffect(() => {
    const fromLocation = previousLocation.current;
    scrollPositions.current.set(fromLocation, window.scrollY);
    previousLocation.current = location;

    const savedY = scrollPositions.current.get(location);
    const targetY = isHistoryNavigation.current && savedY !== undefined ? savedY : 0;
    isHistoryNavigation.current = false;

    const restoreScroll = () => window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
    window.requestAnimationFrame(restoreScroll);
    const timeoutId = window.setTimeout(restoreScroll, 360);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Home />
          </motion.div>
        </Route>
        <Route path="/booking" component={BookingPage} />
        <Route path="/product/:id">
          {(params) => (
            <motion.div
              key={params.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductPage params={params} />
            </motion.div>
          )}
        </Route>
        <Route>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NotFound />
          </motion.div>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
