"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import FuneralFrame from "@/components/funeral/FuneralFrame";
import FuneralInvite from "@/components/funeral/FuneralInvite";
import { PRESAVE_URL } from "@/lib/funeral";
import { cormorant } from "@/lib/funeralFont";
import { SPLASH_KEY } from "@/lib/splash";
import "@/components/funeral/funeral.css";

// Must match the #splash-overlay opacity transition in globals.css.
const EXIT_MS = 800;

// "Your Wife Is Dead" splash: the /yourwifeisdead funeral invitation, with
// Pre-Save and Enter Site buttons in place of the RSVP. The Terms notice
// follows on entry (TermsGate).
//
// `released` comes from the server layout rather than the clock here, so the
// prerendered copy and the hydrated copy always agree.
export default function Splash({ released }: { released: boolean }) {
  const pathname = usePathname();

  // The pre-paint script handles the first paint; this handles client-side
  // client-side navigation into or out of /legal.
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("splash-entered")) return;
    root.classList.toggle("splash-exempt", pathname.startsWith("/legal"));
  }, [pathname]);

  // Entering is an explicit click only (no Escape shortcut).
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

  const cta = (
    <>
      <p className="fi-cordial">You are cordially invited.</p>
      <div className="fi-splash-actions">
        <a href={PRESAVE_URL} target="_blank" rel="noopener noreferrer" className="fi-rsvp">
          <span className="fi-rsvp-label">{released ? "Listen Now" : "Pre-Save"}</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        <button type="button" onClick={enterSite} className="fi-rsvp">
          <span className="fi-rsvp-label">Enter Site</span>
        </button>
      </div>
      <p className="fi-song">
        {released ? "Listen to" : "Pre-save"} <cite>Your Wife Is Dead</cite>, the new song from
        Caroline Jones.
      </p>
    </>
  );

  return (
    <div
      id="splash-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="The Funeral of Her: Your Wife Is Dead, the new song from Caroline Jones"
      className={`fi-page ${cormorant.variable}`}
    >
      <div className="fi-stage">
        <div className="fi-atmos" aria-hidden="true">
          <div className="fi-glow" />
          <div className="fi-dust" />
          <div className="fi-dust fi-dust-2" />
          <div className="fi-vignette" />
        </div>
        <FuneralFrame />
        <FuneralInvite released={released} cta={cta} titleAs="h2" />
      </div>
    </div>
  );
}
