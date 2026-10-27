"use client";

import { useSyncExternalStore } from "react";
import { readConsent } from "./consent";

// Whether the visitor has made a cookie choice (saved in localStorage, so it
// carries across sessions). CookieConsent fires the event below on every
// choice. The Terms notice waits on this so it follows the cookie banner.
const EVENT = "cookie-consent-decided";

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function getSnapshot(): boolean {
  return readConsent() !== null;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useCookieDecided(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
