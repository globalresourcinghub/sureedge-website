import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Roth vs Traditional IRA Calculator",
  description: "Compare Roth vs Traditional IRA after-tax value based on your income, tax bracket, and retirement timeline. Free calculator by a licensed CPA & EA team.",
  alternates: { canonical: "/tools/roth-vs-traditional" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
