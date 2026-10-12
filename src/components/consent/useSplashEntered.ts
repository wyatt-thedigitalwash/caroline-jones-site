"use client";

import { useSyncExternalStore } from "react";
import { SPLASH_KEY } from "@/lib/splash";

// The splash signals its state with classes on <html>, set by the pre-paint
// script in the root layout and by Splash.tsx on dismissal:
//
//   splash-entered -- the visitor took an explicit entry action.
//   splash-exempt  -- the visitor deep-linked to a legal page, which is never
//                     gated. The splash is hidden, but they have NOT entered.
//
// "Entered" is consent; "exempt" is just a hidden overlay. Reading the Terms
// must never count as agreeing to them, so this hook reports only the first.
function subscribe(onChange: () => void): () => void {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

function getSnapshot(): boolean {
  return document.documentElement.classList.contains("splash-entered");
}

// The server cannot know the visitor's session, so it always renders as though
// the splash is up. The client corrects it on hydration.
function getServerSnapshot(): boolean {
  return false;
}

export function useSplashEntered(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Mark the visitor as entered immediately, with no exit animation. The escape
// hatch for someone who deep-linked to /legal before entering: the splash is
// hidden there, so TermsGate offers this instead of an "Enter Site" button.
export function markSplashEntered(): void {
  try {
    sessionStorage.setItem(SPLASH_KEY, "1");
  } catch {
    /* private mode throws -- enter regardless */
  }
  const root = document.documentElement;
  root.classList.remove("splash-exempt");
  root.classList.add("splash-entered");
}
