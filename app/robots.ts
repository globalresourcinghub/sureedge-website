import { MetadataRoute } from 'next';

/**
 * Serves /robots.txt at the root of the site.
 *
 * Without this file, /robots.txt returned 404 — Google couldn't
 * discover the sitemap efficiently and crawl budget was wasted on
 * the 404 itself.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do not let bots crawl API endpoints or Next.js internals
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://www.sureedgetax.com/sitemap.xml',
    host: 'https://www.sureedgetax.com',
  };
}
