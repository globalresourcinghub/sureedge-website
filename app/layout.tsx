import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SureEdge Tax & Accounting | CPA Firm Texas",
  description: "Licensed CPA & Enrolled Agent firm in Frisco, TX. Individual & business tax returns, bookkeeping, payroll, and IRS representation — 100% virtual, nationwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
