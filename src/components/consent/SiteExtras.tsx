import CookieConsent from "@/components/consent/CookieConsent";
import TermsGate from "@/components/consent/TermsGate";

// Main-site-only extras: the Adobe Fonts stylesheet (Professor / Benguiat) and
// the consent prompts. Campaign pages load no third-party resources, so they
// skip all of this.
// `hoistFonts` is off for the root 404: that page ships in every route's
// payload, and React adds a preload hint for any stylesheet <link> it sees,
// so the fonts would be fetched on every page (including campaign pages).
// An @import inside <style> isn't hinted and only loads when the 404 renders.
export default function SiteExtras({ hoistFonts = true }: { hoistFonts?: boolean }) {
  const fontsHref = "https://use.typekit.net/acl6kai.css";
  return (
    <>
      {hoistFonts ? (
        // React hoists this into <head>.
        <link rel="stylesheet" href={fontsHref} precedence="default" />
      ) : (
        <style>{`@import url("${fontsHref}");`}</style>
      )}
      {/* Cookie consent banner. Shows once per new visitor, persisted in
          localStorage; injects nothing before consent is granted. */}
      <CookieConsent />
      {/* Arbitration / class-action notice, shown once right after the cookie
          decision so it is never buried only in the footer. */}
      <TermsGate />
    </>
  );
}
