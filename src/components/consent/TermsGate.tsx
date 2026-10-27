"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSplashEntered, markSplashEntered } from "./useSplashEntered";
import { useTermsAcknowledged, acknowledgeTerms } from "./useTermsAcknowledged";
import { useCookieDecided } from "./useCookieDecided";

// Puts the arbitration / class-action-waiver notice in front of the visitor
// instead of burying it in a footer link. Two cases:
//
//   Case A -- deep-linked to /legal without having entered. The splash is
//     hidden on that route, so there is no "Enter Site" button anywhere on the
//     page. This notice becomes the way in, so the visitor is never stranded.
//   Case B -- the visitor entered past the splash and has made their cookie
//     choice. Shown every session until they click Got It, so the order is
//     splash, cookie banner, then this notice.
export default function TermsGate() {
  const pathname = usePathname();
  const router = useRouter();
  const entered = useSplashEntered();
  const acknowledged = useTermsAcknowledged();
  const cookieDecided = useCookieDecided();

  const onExempt = pathname.startsWith("/legal");
  const show = entered ? cookieDecided && !acknowledged : onExempt;

  const dismiss = () => {
    acknowledgeTerms();
    // Case A: treat this click as the entry action they never got to make, and
    // send them to the site rather than leaving them sitting on a legal page.
    if (!entered && onExempt) {
      markSplashEntered();
      router.push("/");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:left-auto sm:right-4 sm:max-w-[420px]">
      <div className="border border-text-body/40 bg-background-alt p-4 shadow-2xl sm:p-6">
        <p className="font-body text-[12.5px] leading-relaxed text-text-accent sm:text-sm">
          Your use of this website constitutes your consent to our{" "}
          <Link href="/legal/terms" className="font-semibold underline hover:opacity-70">
            Terms &amp; Conditions
          </Link>
          , which includes your agreement to{" "}
          <Link href="/legal/terms#section-17" className="font-semibold underline hover:opacity-70">
            arbitrate any claims
          </Link>{" "}
          as well as a{" "}
          <Link
            href="/legal/terms#class-action-waiver"
            className="font-semibold underline hover:opacity-70"
          >
            waiver of any class action rights
          </Link>
          .
        </p>
        <button type="button" onClick={dismiss} className="cc-btn cc-btn-primary mt-3 w-full sm:mt-5">
          {entered ? "Got It" : "Enter Site"}
        </button>
      </div>
    </div>
  );
}
