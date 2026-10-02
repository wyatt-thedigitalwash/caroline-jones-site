import { MetadataRoute } from 'next';
import { FUNERAL_GATED } from '@/lib/funeral';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://carolinejones.com';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    // Listed only once the campaign page is public.
    ...(FUNERAL_GATED
      ? []
      : [{ url: `${baseUrl}/yourwifeisdead`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }]),
  ];
}
