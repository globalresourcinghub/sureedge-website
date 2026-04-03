import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to SureEdge Tax & Accounting with any questions. We respond within 2 business days.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
