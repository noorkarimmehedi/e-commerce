type MerchantSuiteEvent = "cart" | "checkout" | "purchased";

declare global {
  interface Window {
    MerchantSuiteTracker?: {
      track: (eventName: MerchantSuiteEvent) => void;
    };
  }
}

export function trackMerchantSuiteEvent(eventName: MerchantSuiteEvent) {
  window.MerchantSuiteTracker?.track(eventName);
}
