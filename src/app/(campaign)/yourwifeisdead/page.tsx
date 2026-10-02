import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import FuneralInvite from "@/components/funeral/FuneralInvite";
import FuneralFooter from "@/components/funeral/FuneralFooter";
import FuneralFrame from "@/components/funeral/FuneralFrame";
import { FUNERAL_GATED, isReleased } from "@/lib/funeral";
import "./funeral.css";

// Re-render at most once a minute so the button flips from "Pre-Save to RSVP"
// to "Listen Now" at release without a redeploy.
export const revalidate = 60;

// Closest web match to the invite's spaced roman caps.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-funeral",
  display: "swap",
});

const title = "The Funeral of Her | Caroline Jones";
const description =
  "You are cordially invited to the funeral of Her. 10/30, midnight. Pre-save \"Your Wife Is Dead\" by Caroline Jones to RSVP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/yourwifeisdead" },
  // Kept out of search while the page is behind the approval password.
  robots: { index: !FUNERAL_GATED, follow: !FUNERAL_GATED },
  openGraph: {
    title,
    description,
    url: "/yourwifeisdead",
    siteName: "Caroline Jones",
    type: "website",
    images: [{ url: "/funeral/og-funeral.jpg", width: 1200, height: 630, alt: "The Funeral of Her invitation" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/funeral/og-funeral.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080707",
};

export default function YourWifeIsDeadPage() {
  return (
    <div className={`fi-page ${cormorant.variable}`}>
      <main id="main-content" className="fi-stage">
        <div className="fi-atmos" aria-hidden="true">
          <div className="fi-glow" />
          <div className="fi-dust" />
          <div className="fi-dust fi-dust-2" />
          <div className="fi-vignette" />
        </div>
        <FuneralFrame />
        <FuneralInvite released={isReleased()} />
      </main>
      <FuneralFooter />
    </div>
  );
}
