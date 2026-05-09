import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tax Bracket Estimator",
  description: "Calculate your 2025 or 2026 federal tax bracket, effective rate, and refund or amount owed — including FICA and state tax. Free tool by SureEdge CPA & EA.",
  alternates: { canonical: "/tools/tax-bracket" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
