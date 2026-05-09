import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Social Security Breakeven Calculator",
  description: "Find out whether claiming Social Security at 62, full retirement age, or 70 maximizes your lifetime benefit. See breakeven ages and cumulative totals.",
  alternates: { canonical: "/tools/social-security" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
