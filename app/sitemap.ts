import { posts } from "@/lib/posts";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use canonical www hostname — apex redirects to www, so listing apex URLs
  // in the sitemap forces Google to follow a 301 for every crawl.
  const baseUrl = "https://www.sureedgetax.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tax-intake`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/business-tax-intake`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tools/roth-vs-traditional`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/tools/tax-bracket`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
