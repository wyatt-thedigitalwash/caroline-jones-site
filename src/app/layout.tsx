import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://carolinejones.com";

export const metadata: Metadata = {
  title: "Caroline Jones | Singer-Songwriter & Multi-Instrumentalist",
  description:
    "Official site of Caroline Jones, singer-songwriter and multi-instrumentalist. Listen to Good Omen, watch music videos, shop merch, and stay connected.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#DDE2CD",
  openGraph: {
    title: "Caroline Jones | Singer-Songwriter & Multi-Instrumentalist",
    description:
      "Official site of Caroline Jones, singer-songwriter and multi-instrumentalist. Listen to Good Omen, watch music videos, shop merch, and stay connected.",
    url: siteUrl,
    siteName: "Caroline Jones",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caroline Jones | Singer-Songwriter & Multi-Instrumentalist",
    description:
      "Official site of Caroline Jones, singer-songwriter and multi-instrumentalist. Listen to Good Omen, watch music videos, shop merch, and stay connected.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Caroline Jones",
  url: siteUrl,
  description:
    "Singer-songwriter and multi-instrumentalist Caroline Jones. Member of Zac Brown Band with an impressive solo career including albums Good Omen, Homesite, and Antipodes.",
  genre: ["Country", "Pop-Country"],
  sameAs: [
    "https://www.facebook.com/carolinejonesmusic",
    "https://www.instagram.com/carolinejones",
    "https://www.tiktok.com/@carolinejonesmusic",
    "https://www.youtube.com/channel/UCB8e-AfK22U3VvLlwBqqXKA",
  ],
  image: `${siteUrl}/og-image.png`,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/acl6kai.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 :z-[100] focus:bg-[#5D3635] focus:text-[#DDE2CD] focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
