import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Business Tax Return Quote",
  description: "Fill out our business tax intake form and receive a personalized fee quote within 2 business days.",
  alternates: { canonical: "/business-tax-intake" },
  openGraph: {
    title: "Business Tax Return Quote | SureEdge Tax & Accounting",
    description: "Personalized fee quote within 2 business days.",
    url: "/business-tax-intake",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
