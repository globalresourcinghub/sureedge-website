import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: "Schedule a free 30-minute consultation with a licensed Enrolled Agent. No commitment required.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book a Free Consultation | SureEdge Tax & Advisory",
    description: "Free 30-minute consultation with a licensed Enrolled Agent.",
    url: "/booking",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
