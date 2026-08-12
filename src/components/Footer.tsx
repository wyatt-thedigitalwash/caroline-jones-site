import Image from "next/image";
import Link from "next/link";
import CookieChoicesLink from "@/components/legal/CookieChoicesLink";
import SubscribeForm from "@/components/SubscribeForm";

const legalLinks = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Copyright (DMCA)", href: "/legal/dmca" },
  { label: "Cybersecurity", href: "/legal/cybersecurity" },
  { label: "TCPA", href: "/legal/tcpa" },
  { label: "Do Not Sell My Personal Information", href: "/legal/privacy#s10-2" },
];

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/carolinejonesmusic",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/carolinejones",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@carolinejonesmusic",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCB8e-AfK22U3VvLlwBqqXKA",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="subscribe" aria-label="Footer and subscribe" className="bg-[#5D3635] text-[#DDE2CD] py-16 px-6 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <Image
          src="/logos/CarolineJones_LogoWhite.png"
          alt="Caroline Jones"
          width={225}
          height={75}
          sizes="225px"
          className="h-auto w-[225px]"
        />

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in new tab)`}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-[#DDE2CD] transition-opacity hover:opacity-70"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="w-full">
          <SubscribeForm />
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-4 border-t border-[#DDE2CD]/20 pt-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <p className="font-[family-name:var(--font-body)] text-xs tracking-wide opacity-70">
          &copy; Borchetta Entertainment Group, LLC d/b/a Big Machine Records
        </p>
        <nav aria-label="Legal links" className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-[family-name:var(--font-body)] text-xs tracking-wide opacity-70 md:justify-end">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:opacity-100">
              {link.label}
            </Link>
          ))}
          <CookieChoicesLink className="hover:opacity-100" />
        </nav>
      </div>
    </footer>
  );
}
