import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: "Schedule a free 30-minute consultation with a licensed CPA or EA. No commitment required.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
