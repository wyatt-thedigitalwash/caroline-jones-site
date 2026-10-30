import type { Metadata, Viewport } from "next";
import FuneralInvite from "@/components/funeral/FuneralInvite";
import FuneralFooter from "@/components/funeral/FuneralFooter";
import FuneralFrame from "@/components/funeral/FuneralFrame";
import { FUNERAL_GATED } from "@/lib/funeral";
import { cormorant } from "@/lib/funeralFont";
import "@/components/funeral/funeral.css";

const title = "The Funeral of Her | Caroline Jones";
const description =
  "You are cordially invited to the funeral of Her. \"Your Wife Is Dead,\" the new song from Caroline Jones, is out now. Listen now.";

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
        <FuneralInvite />
      </main>
      <FuneralFooter />
    </div>
  );
}
