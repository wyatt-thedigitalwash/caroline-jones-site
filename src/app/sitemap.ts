import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://carolinejones.com';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/yourwifeisdead`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ];
}
