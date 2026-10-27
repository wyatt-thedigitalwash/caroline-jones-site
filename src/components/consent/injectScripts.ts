// Injects analytics / advertising tags ONLY after the user consents to the
// matching category. Injection is idempotent: a category is only ever added
// once per page load, and nothing non-essential fires before consent.
//
// Advertising: Google Ads (gtag.js), Meta Pixel and TikTok Pixel. All three
// are conversion / remarketing tags, so they sit behind the Advertising
// category. The <noscript> fallbacks from the vendor snippets are deliberately
// left out: they fire without JavaScript, so they could never honour consent.

import type { Consent } from "./consent";

const GOOGLE_ADS_ID = "AW-17574539899";
const META_PIXEL_ID = "2958011011058625";
const TIKTOK_PIXEL_ID = "D6343JRC77U5AUBMND90";

// First-party cookies the advertising tags set on this domain. Cleared when
// Advertising consent is withdrawn (third-party cookies can't be reached).
const ADVERTISING_COOKIE_PREFIXES = ["_gcl_", "_fbp", "_fbc", "_ttp", "_tt_", "ttcsid"];

/* eslint-disable @typescript-eslint/no-explicit-any */
type Queue = ((...args: any[]) => void) & Record<string, any>;
type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Queue;
  fbq?: Queue;
  _fbq?: Queue;
  ttq?: any;
  TiktokAnalyticsObject?: string;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const injected = new Set<string>();

function once(id: string, run: () => void) {
  if (injected.has(id) || document.getElementById(id)) return;
  injected.add(id);
  run();
}

function addScript(id: string, src: string) {
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGoogleAds(w: TagWindow) {
  w.dataLayer = w.dataLayer || [];
  // gtag.js needs the real `arguments` object, not a rest array.
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  } as Queue;
  // Consent Mode v2: start denied, then grant only what the visitor accepted.
  // There is no Google Analytics on the site, so analytics_storage stays denied.
  w.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  w.gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
  w.gtag("js", new Date());
  w.gtag("config", GOOGLE_ADS_ID);
  addScript("cj-gtag", `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`);
}

function loadMetaPixel(w: TagWindow) {
  if (!w.fbq) {
    const n = function fbq(...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    } as Queue;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    addScript("cj-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  }
  w.fbq("consent", "grant");
  w.fbq("init", META_PIXEL_ID);
  w.fbq("track", "PageView");
}

function loadTikTokPixel(w: TagWindow) {
  // Vendor bootstrap, lightly reformatted: queues calls until events.js loads.
  w.TiktokAnalyticsObject = "ttq";
  const ttq = (w.ttq = w.ttq || []);
  ttq.methods = [
    "page", "track", "identify", "instances", "debug", "on", "off", "once", "ready",
    "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent",
  ];
  ttq.setAndDefer = (t: unknown[] & Record<string, unknown>, e: string) => {
    t[e] = (...args: unknown[]) => t.push([e, ...args]);
  };
  for (const m of ttq.methods) ttq.setAndDefer(ttq, m);
  ttq.instance = (t: string) => {
    const e = ttq._i[t] || [];
    for (const m of ttq.methods) ttq.setAndDefer(e, m);
    return e;
  };
  ttq.load = (e: string, n?: { partner?: string }) => {
    const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[e] = [];
    ttq._i[e]._u = r;
    ttq._t = ttq._t || {};
    ttq._t[e] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[e] = n || {};
    addScript("cj-tiktok-pixel", `${r}?sdkid=${e}&lib=ttq`);
  };
  ttq.load(TIKTOK_PIXEL_ID);
  ttq.page();
}

function loadAdvertising() {
  once("cj-advertising", () => {
    const w = window as TagWindow;
    loadGoogleAds(w);
    loadMetaPixel(w);
    loadTikTokPixel(w);
  });
}

/** Inject scripts for every category the user has consented to. Additive only. */
export function applyConsent(consent: Consent) {
  if (consent.advertising) loadAdvertising();
  // Analytics, Functional and Social have no active third-party scripts on
  // this site yet; they are reserved so the choice is recorded for future use.
}

/**
 * Report a client-side route change. The tags only see the first page load on
 * their own, so later navigations are sent here. No-op until consent is given.
 */
export function trackPageView() {
  if (!injected.has("cj-advertising")) return;
  const w = window as TagWindow;
  w.gtag?.("event", "page_view", { send_to: GOOGLE_ADS_ID });
  w.fbq?.("track", "PageView");
  w.ttq?.page();
}

/** Delete the advertising tags' first-party cookies on this host and its parents. */
export function clearAdvertisingCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => ADVERTISING_COOKIE_PREFIXES.some((p) => name.startsWith(p)));
  if (!names.length) return;
  // Tags usually set cookies on the registrable domain (".carolinejones.com"),
  // so try every suffix of the hostname plus a host-only delete.
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}
