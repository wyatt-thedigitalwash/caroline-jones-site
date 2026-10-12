"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRESAVE_URL } from "@/lib/funeral";
import { SPLASH_KEY } from "@/lib/splash";

// Hard ceiling on how long the reveal waits for the background photo. A slow
// connection or a broken image must never leave "Enter Site" invisible.
const REVEAL_TIMEOUT_MS = 1200;

// Must match the #splash-overlay opacity transition in globals.css.
const EXIT_MS = 800;

// "Your Wife Is Dead" splash. Fonts per the label spec: Cinzel Decorative for
// the headline, Avenir Next for everything else (Adobe kit in SiteExtras).
// Phones follow the label's vertical graphic (dark title in the sky, buttons
// at the bottom); from md up, the horizontal one (light title over the photo,
// release line and buttons beneath).
//
// `released` comes from the server layout rather than the clock here, so the
// prerendered copy and the hydrated copy always agree.
export default function Splash({ released }: { released: boolean }) {
  const pathname = usePathname();
  const [bgLoaded, setBgLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const ready = bgLoaded || timedOut;

  useEffect(() => {
    const t = window.setTimeout(() => setTimedOut(true), REVEAL_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, []);

  // The pre-paint script handles the first paint; this handles client-side
  // navigation, e.g. following the Terms link on the splash itself.
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("splash-entered")) return;
    root.classList.toggle("splash-exempt", pathname.startsWith("/legal"));
  }, [pathname]);

  // Entering is an explicit click only (no Escape shortcut), since it doubles
  // as agreeing to the Terms notice below the buttons.
  const enterSite = () => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* private mode throws -- dismiss regardless */
    }
    const overlay = document.getElementById("splash-overlay");
    if (overlay) {
      // Fade first, then display: none, so it dissolves instead of cutting.
      overlay.classList.add("is-exiting");
      window.setTimeout(() => document.documentElement.classList.add("splash-entered"), EXIT_MS);
    } else {
      document.documentElement.classList.add("splash-entered");
    }
  };

  const eyebrow = released ? "Out Now | Listen Now" : "Available October 30 | Pre-Save Now";
  const cta = released ? "Listen Now" : "Pre-Save";

  return (
    <div
      id="splash-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Your Wife Is Dead, the new song from Caroline Jones"
      className={ready ? "splash-ready" : undefined}
    >
      <Image
        src="/backgrounds/CarolineJones_YWID_BG.jpg"
        alt="Caroline Jones in a black dress, hand on hip and holding a shovel, in a dusty field with two women behind her."
        fill
        priority
        sizes="100vw"
        className="splash-bg"
        // The ref check catches a cached image that loaded before React
        // attached onLoad. onError reveals anyway -- fail open, always.
        ref={(img) => {
          if (img?.complete) setBgLoaded(true);
        }}
        onLoad={() => setBgLoaded(true)}
        onError={() => setBgLoaded(true)}
      />
      <div className="splash-shade" aria-hidden="true" />

      <div className="splash-content">
        <p className="splash-rise splash-eyebrow" style={{ animationDelay: "120ms" }}>
          {eyebrow}
        </p>

        {/* Title with the artist name set flush right beneath it, as in the
            label's lockup. */}
        <div className="splash-rise splash-lockup" style={{ animationDelay: "0ms" }}>
          <h2 className="splash-title">YOUR WIFE IS DEAD</h2>
          <p className="splash-artist">Caroline Jones</p>
        </div>

        <div className="splash-rise splash-actions" style={{ animationDelay: "260ms" }}>
          <a href={PRESAVE_URL} target="_blank" rel="noopener noreferrer" className="splash-btn splash-btn-solid">
            {cta}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <button type="button" onClick={enterSite} className="splash-btn splash-btn-outline">
            Enter Site
          </button>
        </div>

        {/* Arbitration / class-action notice directly under the entry buttons
            so no visitor can claim they had no notice of it. Each phrase
            deep-links to its own section of the Terms. */}
        <p className="splash-rise splash-legal" style={{ animationDelay: "380ms" }}>
          By entering, you consent to our <Link href="/legal/terms">Terms &amp; Conditions</Link>,
          including <Link href="/legal/terms#section-17">binding arbitration</Link> and a{" "}
          <Link href="/legal/terms#class-action-waiver">waiver of class action rights</Link>.
        </p>
      </div>
    </div>
  );
}
