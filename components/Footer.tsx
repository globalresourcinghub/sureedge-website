import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white" style={{ borderTop: "1px solid #f0ede6" }}>
      <div className="max-w-screen-xl mx-auto px-8 pt-10 pb-6">
        <div className="grid gap-8" style={{ gridTemplateColumns: "1.6fr 1fr 1fr", marginBottom: "28px" }}>
          {/* Brand col */}
          <div>
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#999", maxWidth: "220px" }}>
              Licensed CPA &amp; EA firm based in Texas. Serving individuals and small businesses nationwide — 100% virtual.
            </p>
            <p className="text-xs mt-3" style={{ color: "#bbb" }}>
              contact@sureedgetax.com · Mon–Fri 9am–6pm CT
            </p>
          </div>

          {/* Services col */}
          <div>
            <div className="text-xs font-semibold mb-4" style={{ color: "#b8962e", letterSpacing: "2px", textTransform: "uppercase" }}>Services</div>
            <div className="flex flex-col gap-2">
              {["Individual Tax Preparation","Small Business Tax","Bookkeeping & Payroll","IRS Representation","Tax Planning"].map(s => (
                <Link key={s} href="/services" className="text-xs" style={{ color: "#777" }}>{s}</Link>
              ))}
            </div>
          </div>

          {/* Quick links col */}
          <div>
            <div className="text-xs font-semibold mb-4" style={{ color: "#b8962e", letterSpacing: "2px", textTransform: "uppercase" }}>Quick Links</div>
            <div className="flex flex-col gap-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Get a Quote", href: "/tax-intake" },
                { label: "Book a Consultation", href: "/booking" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="text-xs" style={{ color: "#777" }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #f0ede6" }}>
          <span className="text-xs" style={{ color: "#bbb" }}>© 2026 SureEdge Tax &amp; Accounting. All rights reserved.</span>
          <Link href="/privacy" className="text-xs" style={{ color: "#bbb" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
