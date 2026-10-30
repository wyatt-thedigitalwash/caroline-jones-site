import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteExtras from "@/components/consent/SiteExtras";
import Splash from "@/components/splash/Splash";
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
      <Splash />
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <SiteExtras />
    </>
  );
}
