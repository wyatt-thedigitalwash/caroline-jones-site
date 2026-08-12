"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Music", href: "#music" },
  { label: "Videos", href: "#videos" },
  { label: "Shop", href: "https://www.richardsandsouthern.com/collections/caroline-jones" },
  { label: "About", href: "#about" },
  { label: "Subscribe", href: "#subscribe" },
];

const mobileNavLinks = [
  { label: "Home", href: "#" },
  ...navLinks,
];

const socialIconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/carolinejonesmusic",
    icon: (
      <svg {...socialIconProps} aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/carolinejones",
    icon: (
      <svg {...socialIconProps} aria-hidden="true">
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
      <svg {...socialIconProps} aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCB8e-AfK22U3VvLlwBqqXKA",
    icon: (
      <svg {...socialIconProps} aria-hidden="true">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  // The nav targets are in-page sections on the home route. From any other
  // route (e.g. /legal/*) a bare "#music" would look for that section on the
  // current page and go nowhere, so prefix with "/" to navigate home first and
  // then scroll to the section. The logo "#" becomes "/" (home) off-route.
  const resolveHref = (href: string) => {
    if (href.startsWith("http")) return href;
    if (href === "#") return onHome ? "#" : "/";
    return onHome ? href : `/${href}`;
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("hero");
      if (!hero) {
        setScrolled(true);
        return;
      }
      setScrolled(window.scrollY >= hero.offsetHeight - 64);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key === "Tab" && mobileNavRef.current) {
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen && mobileNavRef.current) {
      const firstLink = mobileNavRef.current.querySelector<HTMLElement>("a");
      firstLink?.focus();
    }
  }, [menuOpen]);

  const textColor = scrolled ? "text-[#5D3635]" : "text-[#DDE2CD]";
  const logoSrc = scrolled
    ? "/logos/CarolineJones_LogoBlack.png"
    : "/logos/CarolineJones_LogoWhite.png";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-[#DDE2CD]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 items-center justify-between px-6 md:h-16 md:px-10">
        <a href={resolveHref("#")} aria-label="Caroline Jones - Back to top">
          <Image
            src={menuOpen ? "/logos/CarolineJones_LogoBlack.png" : logoSrc}
            alt="Caroline Jones"
            width={250}
            height={58}
            sizes="250px"
            className="h-auto w-[150px] md:w-[200px]"
            priority
          />
        </a>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] ${textColor} no-underline hover:underline hover:underline-offset-4 hover:decoration-[0.5px] transition-colors duration-300`}
              >
                {link.label}
                {isExternal && <span className="sr-only"> (opens in new tab)</span>}
              </a>
            );
          })}
        </nav>

        <button
          ref={menuButtonRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center ${menuOpen ? "text-[#5D3635]" : textColor} transition-colors duration-300`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <div className="flex flex-col justify-center gap-[5px] w-[22px]" aria-hidden="true">
            <span
              className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 top-14 bg-[#DDE2CD] transition-all duration-500 ease-in-out ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav
          id="mobile-menu"
          ref={mobileNavRef}
          aria-label="Mobile navigation"
          className="flex flex-col items-center justify-center h-full gap-2 pb-20"
          role="navigation"
        >
          {mobileNavLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                onClick={() => closeMenu()}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="min-h-[44px] flex items-center font-[family-name:var(--font-heading)] text-2xl italic text-[#5D3635] transition-opacity hover:opacity-60"
              >
                {link.label}
                {isExternal && <span className="sr-only"> (opens in new tab)</span>}
              </a>
            );
          })}

          <div className="mt-8 flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in new tab)`}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] text-[#5D3635] transition-opacity hover:opacity-60"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
