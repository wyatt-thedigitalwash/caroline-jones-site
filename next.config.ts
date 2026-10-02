import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 301s from the previous Squarespace site. The old URL set was taken from the
  // live site's own sitemap.xml plus the links on its homepage, and every source
  // below was confirmed returning HTTP 200 before the cutover (except /blog*,
  // which already 404s but is still linked from the old homepage).
  // Next.js forwards query strings automatically, so none are restated here.
  // Both slash forms are listed because Next.js matches them separately.
  async redirects() {
    return [
      // Canonical domain: www -> non-www. Vercel also enforces this at the
      // domain level once www.carolinejones.com is added and carolinejones.com
      // is set as primary; this is a code-level guarantee.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.carolinejones.com' }],
        destination: 'https://carolinejones.com/:path*',
        permanent: true,
      },

      // Old site: duplicate/legacy homepage variants -> new single page
      { source: '/home', destination: '/', permanent: true },
      { source: '/home/', destination: '/', permanent: true },
      { source: '/home-2', destination: '/', permanent: true },
      { source: '/home-2/', destination: '/', permanent: true },
      { source: '/home-old', destination: '/', permanent: true },
      { source: '/home-old/', destination: '/', permanent: true },

      // Old site: /about -> the About section of the new single page
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/about/', destination: '/#about', permanent: true },

      // Old site: Squarespace template leftovers with no new equivalent -> home
      { source: '/testimonials', destination: '/', permanent: true },
      { source: '/testimonials/', destination: '/', permanent: true },
      { source: '/consultations', destination: '/', permanent: true },
      { source: '/consultations/', destination: '/', permanent: true },

      // Old site: Squarespace cart -> the Shop section, which links out to the
      // Richards & Southern store that replaced it.
      { source: '/cart', destination: '/#shop', permanent: true },
      { source: '/cart/', destination: '/#shop', permanent: true },

      // Old site: blog is gone. Catch-all so any indexed or shared post lands
      // on the homepage instead of a 404.
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/', destination: '/', permanent: true },
      { source: '/blog/:slug*', destination: '/', permanent: true },

      // "Your Wife Is Dead" campaign: short link for bios and captions.
      // Temporary, so /rsvp can be repointed at the next campaign.
      { source: '/rsvp', destination: '/yourwifeisdead', permanent: false },
      { source: '/rsvp/', destination: '/yourwifeisdead', permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
