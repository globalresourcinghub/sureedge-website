import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Business Tax Return Quote",
  description: "Fill out our business tax intake form and receive a personalized fee quote within 2 business days.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
