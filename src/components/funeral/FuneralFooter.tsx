import Link from "next/link";
import { legalLinks } from "@/components/Footer";

// Stripped-down footer for the campaign page: keeps the label's required legal
// links without the main site's logo, socials and subscribe form. Prefetch is
// off so this page never pulls in the main site's third-party font stylesheet.
export default function FuneralFooter() {
  return (
    <footer className="fi-footer">
      <Link href="/" prefetch={false} className="fi-footer-home">
        carolinejones.com
      </Link>
      <nav aria-label="Legal links" className="fi-footer-legal">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href} prefetch={false}>
            {link.label}
          </Link>
        ))}
      </nav>
      <p>&copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records</p>
    </footer>
  );
}
