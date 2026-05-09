import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Net Worth Tracker",
  description: "Calculate your net worth, see your asset and liability breakdown, and compare to Federal Reserve benchmarks for your age group. Free tool, no sign-up required.",
  alternates: { canonical: "/tools/net-worth" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
