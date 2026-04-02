import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid #f0ede6" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 44px 24px" }}>
        {/* 3-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "32px", marginBottom: "28px" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "14px" }}>
              <Logo size="md" />
            </div>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.7, maxWidth: "240px", margin: 0 }}>
              Licensed CPA &amp; EA firm based in Texas. Serving individuals and small businesses nationwide — 100% virtual.
            </p>
            <p style={{ fontSize: "12px", color: "#bbb", marginTop: "10px" }}>
              contact@sureedgetax.com · Mon–Fri 9am–6pm CT
            </p>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {["Individual Tax Preparation", "Small Business Tax", "Bookkeeping & Payroll", "IRS Representation", "Tax Planning"].map(s => (
                <Link key={s} href="/services" style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>{s}</Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Get a Quote", href: "/tax-intake" },
                { label: "Book a Consultation", href: "/booking" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#bbb" }}>© 2026 SureEdge Tax &amp; Accounting. All rights reserved.</span>
          <Link href="/privacy" style={{ fontSize: "12px", color: "#bbb", textDecoration: "none" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
