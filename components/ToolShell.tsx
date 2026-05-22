import Link from "next/link";

interface ToolShellProps {
  children: React.ReactNode;
  disclaimerText: string;
  ctaHeading?: string;
  ctaHref?: string;
}

export default function ToolShell({
  children,
  disclaimerText,
  ctaHeading = "Want a real tax review?",
  ctaHref = "/tax-intake",
}: ToolShellProps) {
  return (
    <>
      {children}
      <section style={{ background: "#fff", padding: "36px 44px", borderTop: "1px solid #f0ede6" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ background: "#fff8e6", border: "1px solid #f0d98a", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
              <path d="M12 2L2 20h20L12 2z" stroke="#b8962e" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M12 9v5M12 16.5v.5" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <p style={{ fontSize: "11px", color: "#7a6010", lineHeight: 1.8, margin: 0 }}>
              {disclaimerText}
            </p>
          </div>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>{ctaHeading}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our CPA &amp; EA team finds deductions and credits that calculators miss.</div>
            </div>
            <Link href={ctaHref} style={{ background: "#b8962e", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "11px 22px", borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Get a Free Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
