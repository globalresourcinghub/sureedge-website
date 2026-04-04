import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "SureEdge Tax & Accounting | CPA Firm Texas",
  description: "Licensed CPA and Enrolled Agent firm based in Texas. Individual and business tax returns, bookkeeping, payroll, and IRS representation. 100% virtual, serving clients nationwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
