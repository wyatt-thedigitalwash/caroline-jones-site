import Link from "next/link";
import { legalLinks } from "@/components/Footer";
import CookieChoicesLink from "@/components/legal/CookieChoicesLink";

// Stripped-down footer for the campaign page: keeps the label's required legal
// links without the main site's logo, socials and subscribe form.
export default function FuneralFooter() {
  return (
    <footer className="fi-footer">
      <Link href="/" className="fi-footer-home">
        carolinejones.com
      </Link>
      <nav aria-label="Legal links" className="fi-footer-legal">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <CookieChoicesLink />
      </nav>
      <p>&copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records</p>
    </footer>
  );
}
