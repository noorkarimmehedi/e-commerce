import crypto from "node:crypto";

type MetaUserData = {
  em?: string[] | string;
  ph?: string[] | string;
  fn?: string[] | string;
  ln?: string[] | string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
  external_id?: string[] | string;
};

export type MetaEvent = {
  event_name: string;
  event_time?: number;
  event_id?: string;
  action_source?: "website";
  event_source_url?: string;
  user_data?: MetaUserData;
  custom_data?: Record<string, unknown>;
};

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeText(valueRaw: string) {
  return valueRaw.trim().toLowerCase().replace(/\s+/g, " ");
}

function hashText(valueRaw: string) {
  const normalized = normalizeText(valueRaw);
  return normalized ? sha256(normalized) : "";
}

function hashEmail(emailRaw: string) {
  const normalized = emailRaw.trim().toLowerCase();
  return normalized ? sha256(normalized) : "";
}

function splitName(nameRaw: string) {
  const parts = normalizeText(nameRaw).split(" ").filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

export function normalizePhone(phoneRaw: string) {
  const digits = (phoneRaw || "").replace(/\D/g, "");
  if (!digits) return "";

  // Bangladesh-friendly normalization:
  // 01XXXXXXXXX -> 8801XXXXXXXXX
  if (digits.length === 11 && digits.startsWith("01")) return `88${digits}`;
  if (digits.length === 10 && digits.startsWith("1")) return `880${digits}`;
  return digits;
}

export function hashPhone(phoneRaw: string) {
  const normalized = normalizePhone(phoneRaw);
  return normalized ? sha256(normalized) : "";
}

function parseCookie(cookieHeader: string | undefined) {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (!key) continue;
    result[key] = decodeURIComponent(rest.join("=") || "");
  }
  return result;
}

function parseFbclidFromUrl(urlRaw: string | undefined) {
  if (!urlRaw) return "";
  try {
    const url = new URL(urlRaw);
    return url.searchParams.get("fbclid") || "";
  } catch {
    return "";
  }
}

function createFbcFromFbclid(fbclid: string) {
  const cleaned = String(fbclid || "").trim();
  if (!cleaned) return "";
  // Meta format: fb.1.<unix_timestamp>.<fbclid>
  const ts = Math.floor(Date.now() / 1000);
  return `fb.1.${ts}.${cleaned}`;
}

function getClientIp(headers: Record<string, unknown>) {
  const xff = String(headers["x-forwarded-for"] || "");
  if (xff) return xff.split(",")[0].trim();
  const xrip = String(headers["x-real-ip"] || "");
  return xrip || undefined;
}

export function getMetaUserDataFromRequest(opts: {
  headers: Record<string, unknown>;
  browserUserData?: Partial<MetaUserData>;
  customerName?: string;
  email?: string;
  phone?: string;
  eventSourceUrl?: string;
}) {
  const cookies = parseCookie(String(opts.headers["cookie"] || ""));
  const fbp = cookies["_fbp"];
  const cookieFbc = cookies["_fbc"];
  const headerReferer = String(opts.headers["referer"] || "");
  const fbclid =
    parseFbclidFromUrl(opts.eventSourceUrl) || parseFbclidFromUrl(headerReferer);
  const fbc = cookieFbc || (fbclid ? createFbcFromFbclid(fbclid) : undefined);

  const user_data: MetaUserData = {
    client_ip_address: getClientIp(opts.headers),
    client_user_agent: String(opts.headers["user-agent"] || ""),
  };

  const browserFbp = String(opts.browserUserData?.fbp || "");
  const browserFbc = String(opts.browserUserData?.fbc || "");
  if (fbp || browserFbp) user_data.fbp = fbp || browserFbp;
  if (fbc || browserFbc) user_data.fbc = fbc || browserFbc;

  const phHash = opts.phone ? hashPhone(opts.phone) : "";
  if (phHash) user_data.ph = [phHash];

  const emHash = opts.email ? hashEmail(opts.email) : "";
  if (emHash) user_data.em = [emHash];

  if (opts.customerName) {
    const { firstName, lastName } = splitName(opts.customerName);
    const fnHash = firstName ? hashText(firstName) : "";
    const lnHash = lastName ? hashText(lastName) : "";
    if (fnHash) user_data.fn = [fnHash];
    if (lnHash) user_data.ln = [lnHash];
  }

  const externalId = String(opts.browserUserData?.external_id || "");
  if (externalId) user_data.external_id = externalId;

  return user_data;
}

export async function sendMetaCapiEvent(event: MetaEvent) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return { ok: false, skipped: true, reason: "missing_env" as const };
  }

  const event_time = event.event_time ?? Math.floor(Date.now() / 1000);
  const payload = {
    data: [
      {
        ...event,
        event_time,
        action_source: "website",
        user_data: event.user_data ?? {},
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  const response = await fetch(
    `https://graph.facebook.com/v20.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  const text = await response.text();
  if (!response.ok) {
    return { ok: false, skipped: false, status: response.status, body: text };
  }

  return { ok: true, status: response.status, body: text };
}
