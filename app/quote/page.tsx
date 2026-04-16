import type { Metadata } from "next";

// /quote is a convenience alias for /tax-intake. To avoid duplicate-content
// SEO penalties we set the canonical to /tax-intake so Google knows the
// primary URL, and mark this URL as noindex as a belt-and-suspenders.
export const metadata: Metadata = {
  title: "Individual Tax Return Quote",
  description: "Fill out our individual tax intake form and receive a personalized fee quote within 2 business days.",
  alternates: { canonical: "/tax-intake" },
  robots: { index: false, follow: true },
};

export { default } from "../tax-intake/page";
