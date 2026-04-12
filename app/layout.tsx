import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import VisitTracker from "@/components/VisitTracker";

export const metadata: Metadata = {
  title: {
    default: "SureEdge Tax & Accounting | CPA Firm Texas",
    template: "%s | SureEdge Tax & Accounting",
  },
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
        <VisitTracker />
      </body>
    </html>
  );
}
