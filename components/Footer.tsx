import Link from "next/link";

function FooterLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: 28, height: 28, background: "#1a2e4a", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="17" height="17" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 2L3 10v17c0 14 10 23 21 27 11-4 21-13 21-27V10L24 2z"
            fill="#1a2e4a" stroke="#b8962e" strokeWidth="2.5"/>
          <rect x="12" y="30" width="6" height="14" rx="1" fill="white" opacity="0.25"/>
          <rect x="20" y="22" width="6" height="22" rx="1" fill="white" opacity="0.5"/>
          <rect x="28" y="12" width="6" height="32" rx="1" fill="#b8962e"/>
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "-0.2px" }}>
          Sure<span style={{ color: "#b8962e" }}>Edge</span>
        </span>
        <span style={{ fontSize: "8px", color: "#666", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" }}>
          Tax &amp; Accounting
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #f0ede6" }}>
      <div style={{ padding: "40px 44px 24px" }}>
        {/* 3-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "32px", marginBottom: "28px" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "14px" }}>
              <FooterLogo />
            </div>
            <p style={{ fontSize: "11px", color: "#666", lineHeight: 1.7, maxWidth: "240px", margin: 0 }}>
              Virtual tax services with a licensed CPA and EA on our team, based in Texas. Serving individuals and small businesses nationwide. 100% virtual.
            </p>
            <p style={{ fontSize: "11px", color: "#666", marginTop: "10px" }}>
              contact@sureedgetax.com · Mon–Fri 9am–6pm CT
            </p>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Individual Tax Preparation", "Small Business Tax", "Bookkeeping & Payroll", "IRS Representation", "Tax Planning"].map(s => (
                <Link key={s} href="/services" style={{ fontSize: "11px", color: "#666", textDecoration: "none" }}>{s}</Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Get a Quote", href: "/tax-intake" },
                { label: "Business Tax Quote", href: "/business-tax-intake" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ fontSize: "11px", color: "#666", textDecoration: "none" }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#666" }}>© 2026 SureEdge Tax &amp; Accounting. All rights reserved.</span>
          <Link href="/privacy" style={{ fontSize: "11px", color: "#666", textDecoration: "none" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
