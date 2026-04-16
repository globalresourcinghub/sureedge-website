import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Individual Tax Return Quote",
  description: "Fill out our individual tax intake form and receive a personalized fee quote within 2 business days.",
  alternates: { canonical: "/tax-intake" },
  openGraph: {
    title: "Individual Tax Return Quote | SureEdge Tax & Accounting",
    description: "Personalized fee quote within 2 business days.",
    url: "/tax-intake",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
