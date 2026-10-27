"use client";

import { useSyncExternalStore } from "react";

// Whether the visitor has dismissed the Terms notice this session. Kept per
// session, like the splash, so the notice comes back every time they enter.
// It only appears after the cookie choice, so the two never stack.
const STORAGE_KEY = "cj-terms-gate";
const EVENT = "terms-acknowledged";

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function getSnapshot(): boolean {
  try {
    return !!sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function useTermsAcknowledged(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function acknowledgeTerms(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, new Date().toISOString());
  } catch {
    /* storage unavailable -- the event below still hides the notice */
  }
  window.dispatchEvent(new Event(EVENT));
}
