import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quarterly Tax Estimator",
  description: "Calculate your self-employment quarterly estimated tax payments including SE tax, safe-harbor protection, and IRS due dates. Free tool for freelancers and business owners.",
  alternates: { canonical: "/tools/quarterly-tax" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
