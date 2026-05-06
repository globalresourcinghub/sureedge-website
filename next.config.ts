import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * - X-Frame-Options / frame-ancestors: block clickjacking (no other site
 *   can embed us in an iframe, except the booking iframe Calendly renders
 *   on our page — that's outbound, not inbound).
 * - X-Content-Type-Options: prevent MIME sniffing (browsers respect the
 *   Content-Type header strictly instead of guessing).
 * - Referrer-Policy: only send origin on cross-origin requests so URL
 *   paths aren't leaked to third parties.
 * - Permissions-Policy: disable sensitive browser APIs we don't use.
 * - Strict-Transport-Security: already set by Vercel at the edge — keeping
 *   here for defense in depth.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "accelerometer=()",
      "gyroscope=()",
    ].join(", "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sureedgetax.com" },
      { protocol: "https", hostname: "www.sureedgetax.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/personalized-financial-solutions-for-modern-entrepreneurs",
        destination: "/services",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply to every path
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
