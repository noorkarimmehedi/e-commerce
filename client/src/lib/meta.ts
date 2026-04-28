declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: unknown;
  }
}

export function getMetaPixelId() {
  return (import.meta as any).env?.VITE_META_PIXEL_ID as string | undefined;
}

export function initMetaPixel() {
  const pixelId = getMetaPixelId();
  if (!pixelId) return;

  if (typeof window === "undefined") return;
  if (window.fbq) return;

  // Meta Pixel base code (script injection)
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      // Match Meta's official snippet: queue calls until script loads.
      // Important: use n.queue.push (not n.queue) to avoid runtime crashes.
      (n.callMethod ? n.callMethod : n.queue.push).apply(n, arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

  try {
    (window as any).fbq?.("init", pixelId);
    (window as any).fbq?.("track", "PageView");
  } catch {
    // If blocked by extensions/network, don't crash the app.
  }
}

export function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function trackPixel(
  eventName: string,
  customData?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window === "undefined") return;
  const fbq = (window as any).fbq as undefined | ((...args: any[]) => void);
  if (!fbq) return;

  const options = eventId ? { eventID: eventId } : undefined;
  fbq("track", eventName, customData ?? {}, options);
}

export async function trackCapi(
  eventName: string,
  customData?: Record<string, unknown>,
  eventId?: string,
  eventSourceUrl?: string,
) {
  try {
    await fetch("/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: eventSourceUrl ?? window.location.href,
        custom_data: customData ?? {},
      }),
    });
  } catch {
    // Don't block UX on tracking failures.
  }
}

export function trackMetaEvent(opts: {
  eventName: string;
  customData?: Record<string, unknown>;
  eventId?: string;
  capi?: boolean;
}) {
  trackPixel(opts.eventName, opts.customData, opts.eventId);
  if (opts.capi) {
    void trackCapi(opts.eventName, opts.customData, opts.eventId);
  }
}

