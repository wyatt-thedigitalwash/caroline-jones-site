import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteExtras from "@/components/consent/SiteExtras";
import Splash from "@/components/splash/Splash";
import { isReleased } from "@/lib/funeral";

// Re-render at most every 5 minutes so the splash copy flips to "Out Now" on
// release day without a redeploy.
export const revalidate = 300;

// Main site chrome. Campaign pages under (campaign) skip this layout.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Splash comes first so it exists on first paint. Shown once per
          browser session; never on /legal routes. */}
      <Splash released={isReleased()} />
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <SiteExtras />
    </>
  );
}
