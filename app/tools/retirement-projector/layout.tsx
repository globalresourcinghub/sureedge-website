import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Retirement Savings Projector",
  description: "Project your 401(k) or IRA balance at retirement. See growth chart, monthly income at the 4% rule, shortfall analysis, and the impact of saving more.",
  alternates: { canonical: "/tools/retirement-projector" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
