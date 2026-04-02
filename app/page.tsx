import Link from "next/link";

const serviceCards = [
  {
    title: "Individual Tax Preparation",
    desc: "Federal & state returns — W-2, freelancers, investors, retirees, multi-state filers.",
    href: "/tax-intake",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="1" width="11" height="16" rx="2" stroke="#b8962e" strokeWidth="1.5"/>
        <line x1="6" y1="6" x2="11" y2="6" stroke="#b8962e" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="6" y1="9" x2="11" y2="9" stroke="#b8962e" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="6" y1="12" x2="9" y2="12" stroke="#b8962e" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Small Business Tax",
    desc: "Schedule C, S-Corp, Partnership — LLCs, sole proprietors, and corporations.",
    href: "/business-tax-intake",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="8" width="16" height="10" rx="2" stroke="#b8962e" strokeWidth="1.5"/>
        <path d="M6 8V6a4 4 0 018 0v2" stroke="#b8962e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Bookkeeping",
    desc: "Monthly reconciliation, categorization, and financial statements via QuickBooks.",
    href: "/business-tax-intake",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="12" width="4" height="7" rx="1" fill="#b8962e" opacity="0.4"/>
        <rect x="8" y="7" width="4" height="12" rx="1" fill="#b8962e" opacity="0.7"/>
        <rect x="15" y="2" width="4" height="17" rx="1" fill="#b8962e"/>
      </svg>
    ),
  },
  {
    title: "Payroll Services",
    desc: "End-to-end payroll, quarterly filings, W-2 and 1099 preparation.",
    href: "/business-tax-intake",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#b8962e" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="#b8962e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Tax Planning & Strategy",
    desc: "Year-round proactive planning to legally minimize your tax liability.",
    href: "/tax-intake",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 7v10h14V7L10 2z" stroke="#b8962e" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="7" y="11" width="6" height="6" rx="1" stroke="#b8962e" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: "IRS Representation",
    desc: "Audit support and IRS notice response by a licensed Enrolled Agent.",
    href: "/contact",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.5 5h5l-4 3.5 1.5 5L10 13l-5 2.5 1.5-5L2.5 7h5z" stroke="#b8962e" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const featureCards = [
  { title: "CPA & Enrolled Agent", desc: "Dual credentials — full tax preparation and IRS representation under one roof." },
  { title: "Direct Access to Your CPA", desc: "Speak directly with us — no call centers, no junior staff, no waiting." },
  { title: "100% Virtual, Nationwide", desc: "Based in Texas, serving clients across the country. No office visit required." },
  { title: "Year-Round Support", desc: "We're here all year — proactive planning, not just April filing." },
];

const stats = [
  { val: "CPA & EA", lbl: "Dual Credentials" },
  { val: "100%", lbl: "Virtual Service" },
  { val: "Nationwide", lbl: "Client Coverage" },
  { val: "2 Days", lbl: "Quote Response" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{ display: "flex", minHeight: "420px" }}>
        {/* Left — dark city skyline */}
        <div style={{ flex: 1, background: "#0d1928", position: "relative", overflow: "hidden" }}>
          {/* City skyline SVG */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 480 420" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#050e1c"/>
                <stop offset="100%" stopColor="#0d1f35"/>
              </linearGradient>
            </defs>
            <rect width="480" height="420" fill="url(#skyg)"/>
            {/* Stars */}
            <circle cx="60" cy="30" r="1" fill="#fff" opacity="0.4"/>
            <circle cx="120" cy="18" r="1.2" fill="#fff" opacity="0.5"/>
            <circle cx="200" cy="25" r="0.8" fill="#fff" opacity="0.35"/>
            <circle cx="310" cy="15" r="1" fill="#fff" opacity="0.45"/>
            <circle cx="390" cy="35" r="0.8" fill="#fff" opacity="0.3"/>
            <circle cx="450" cy="20" r="1" fill="#fff" opacity="0.4"/>
            <circle cx="170" cy="10" r="0.8" fill="#fff" opacity="0.3"/>
            <circle cx="260" cy="8" r="1" fill="#fff" opacity="0.4"/>
            <circle cx="420" cy="12" r="0.7" fill="#fff" opacity="0.35"/>
            {/* Buildings */}
            <rect x="0" y="200" width="42" height="220" fill="#152336"/>
            <rect x="8" y="188" width="26" height="16" fill="#152336"/>
            <rect x="4" y="210" width="7" height="7" fill="#f5d060" opacity="0.9"/>
            <rect x="18" y="210" width="7" height="7" fill="#f5d060" opacity="0.6"/>
            <rect x="4" y="226" width="7" height="7" fill="#f5d060" opacity="0.4"/>
            <rect x="18" y="226" width="7" height="7" fill="#f5d060" opacity="0.85"/>
            <rect x="4" y="242" width="7" height="7" fill="#f5d060" opacity="0.7"/>
            <rect x="18" y="242" width="7" height="7" fill="#f5d060" opacity="0.3"/>
            <rect x="52" y="230" width="32" height="190" fill="#112030"/>
            <rect x="56" y="240" width="8" height="8" fill="#f5d060" opacity="0.8"/>
            <rect x="70" y="240" width="8" height="8" fill="#f5d060" opacity="0.5"/>
            <rect x="56" y="256" width="8" height="8" fill="#f5d060" opacity="0.35"/>
            <rect x="70" y="256" width="8" height="8" fill="#f5d060" opacity="0.9"/>
            <rect x="94" y="155" width="54" height="265" fill="#1a3255"/>
            <rect x="104" y="140" width="34" height="20" fill="#1a3255"/>
            <rect x="98" y="168" width="10" height="10" fill="#f5d060" opacity="0.95"/>
            <rect x="114" y="168" width="10" height="10" fill="#f5d060" opacity="0.6"/>
            <rect x="130" y="168" width="10" height="10" fill="#f5d060" opacity="0.8"/>
            <rect x="98" y="186" width="10" height="10" fill="#f5d060" opacity="0.45"/>
            <rect x="114" y="186" width="10" height="10" fill="#f5d060" opacity="0.9"/>
            <rect x="130" y="186" width="10" height="10" fill="#f5d060" opacity="0.65"/>
            <rect x="98" y="204" width="10" height="10" fill="#f5d060" opacity="0.75"/>
            <rect x="114" y="204" width="10" height="10" fill="#f5d060" opacity="0.35"/>
            <rect x="130" y="204" width="10" height="10" fill="#f5d060" opacity="0.9"/>
            <rect x="158" y="210" width="26" height="210" fill="#112030"/>
            <rect x="162" y="220" width="8" height="8" fill="#f5d060" opacity="0.85"/>
            <rect x="176" y="220" width="8" height="8" fill="#f5d060" opacity="0.5"/>
            <rect x="162" y="236" width="8" height="8" fill="#f5d060" opacity="0.7"/>
            <rect x="194" y="105" width="66" height="315" fill="#203f68"/>
            <rect x="206" y="88" width="42" height="22" fill="#203f68"/>
            <rect x="198" y="118" width="11" height="11" fill="#f5d060" opacity="0.95"/>
            <rect x="216" y="118" width="11" height="11" fill="#f5d060" opacity="0.65"/>
            <rect x="234" y="118" width="11" height="11" fill="#f5d060" opacity="0.85"/>
            <rect x="198" y="138" width="11" height="11" fill="#f5d060" opacity="0.45"/>
            <rect x="216" y="138" width="11" height="11" fill="#f5d060" opacity="0.95"/>
            <rect x="234" y="138" width="11" height="11" fill="#f5d060" opacity="0.6"/>
            <rect x="198" y="158" width="11" height="11" fill="#f5d060" opacity="0.8"/>
            <rect x="216" y="158" width="11" height="11" fill="#f5d060" opacity="0.35"/>
            <rect x="234" y="158" width="11" height="11" fill="#f5d060" opacity="0.95"/>
            <rect x="198" y="178" width="11" height="11" fill="#f5d060" opacity="0.65"/>
            <rect x="216" y="178" width="11" height="11" fill="#f5d060" opacity="0.85"/>
            <rect x="234" y="178" width="11" height="11" fill="#f5d060" opacity="0.5"/>
            <rect x="270" y="178" width="44" height="242" fill="#1a3255"/>
            <rect x="278" y="164" width="28" height="18" fill="#1a3255"/>
            <rect x="274" y="190" width="9" height="9" fill="#f5d060" opacity="0.9"/>
            <rect x="290" y="190" width="9" height="9" fill="#f5d060" opacity="0.55"/>
            <rect x="306" y="190" width="9" height="9" fill="#f5d060" opacity="0.8"/>
            <rect x="274" y="208" width="9" height="9" fill="#f5d060" opacity="0.4"/>
            <rect x="290" y="208" width="9" height="9" fill="#f5d060" opacity="0.9"/>
            <rect x="324" y="218" width="30" height="202" fill="#112030"/>
            <rect x="328" y="226" width="8" height="8" fill="#f5d060" opacity="0.85"/>
            <rect x="342" y="226" width="8" height="8" fill="#f5d060" opacity="0.5"/>
            <rect x="364" y="148" width="56" height="272" fill="#1a3255"/>
            <rect x="374" y="132" width="36" height="20" fill="#1a3255"/>
            <rect x="368" y="160" width="10" height="10" fill="#f5d060" opacity="0.9"/>
            <rect x="386" y="160" width="10" height="10" fill="#f5d060" opacity="0.6"/>
            <rect x="404" y="160" width="10" height="10" fill="#f5d060" opacity="0.85"/>
            <rect x="368" y="180" width="10" height="10" fill="#f5d060" opacity="0.5"/>
            <rect x="386" y="180" width="10" height="10" fill="#f5d060" opacity="0.9"/>
            <rect x="404" y="180" width="10" height="10" fill="#f5d060" opacity="0.4"/>
            <rect x="430" y="200" width="50" height="220" fill="#152336"/>
            <rect x="438" y="208" width="9" height="9" fill="#f5d060" opacity="0.9"/>
            <rect x="454" y="208" width="9" height="9" fill="#f5d060" opacity="0.55"/>
            <rect x="438" y="226" width="9" height="9" fill="#f5d060" opacity="0.7"/>
            <rect x="454" y="226" width="9" height="9" fill="#f5d060" opacity="0.85"/>
            <line x1="0" y1="395" x2="480" y2="395" stroke="#b8962e" strokeWidth="1" opacity="0.3"/>
          </svg>
          {/* Overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,20,38,0.65) 0%, rgba(14,26,44,0.4) 100%)" }}/>
          {/* Content */}
          <div style={{ position: "relative", zIndex: 2, padding: "52px 44px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(184,150,46,0.15)", border: "1px solid rgba(184,150,46,0.4)", color: "#b8962e", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", marginBottom: "22px", width: "fit-content" }}>
              <div style={{ width: "5px", height: "5px", background: "#b8962e", borderRadius: "50%" }}/>
              Licensed CPA &amp; EA · Texas
            </div>
            <h1 style={{ fontSize: "clamp(28px,3vw,38px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.5px" }}>
              Tax &amp; Accounting<br/>Done <span style={{ color: "#b8962e" }}>Right</span>
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "360px" }}>
              Virtual CPA &amp; Enrolled Agent firm serving individuals and small businesses nationwide. Expert guidance, personal service, year-round support.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              <Link href="/tax-intake" style={{ background: "#b8962e", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "13px 28px", borderRadius: "7px", textDecoration: "none", letterSpacing: "0.2px" }}>
                Get Your Free Quote →
              </Link>
              <Link href="/booking" style={{ background: "transparent", color: "#fff", fontSize: "13px", fontWeight: 500, padding: "12px 28px", borderRadius: "7px", border: "1.5px solid rgba(255,255,255,0.35)", textDecoration: "none" }}>
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Right — feature cards on warm off-white */}
        <div style={{ flex: 1.05, background: "#faf9f6", display: "flex", flexDirection: "column", justifyContent: "center", padding: "44px 40px" }}>
          <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "20px" }}>
            Why clients choose us
          </div>
          {featureCards.map((fc, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "10px", padding: "16px 18px", marginBottom: i < featureCards.length - 1 ? "12px" : 0, borderLeft: "3px solid #b8962e", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a2e4a", marginBottom: "4px" }}>{fc.title}</div>
              <div style={{ fontSize: "12px", color: "#777", lineHeight: 1.55 }}>{fc.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: "#1a2e4a", display: "flex" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "18px 12px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#b8962e", letterSpacing: "-0.3px" }}>{s.val}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "3px", letterSpacing: "0.5px" }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section style={{ padding: "64px 44px", background: "#fff", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "8px" }}>What We Offer</div>
        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#1a2e4a", marginBottom: "6px", letterSpacing: "-0.4px" }}>Full-Service Tax &amp; Accounting</h2>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "36px", lineHeight: 1.6 }}>From individual returns to complex small business accounting — all handled with precision.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {serviceCards.map((svc) => (
            <div key={svc.title} style={{ background: "#faf9f6", borderRadius: "10px", padding: "20px", border: "1px solid #f0ede6" }}>
              <div style={{ width: "36px", height: "36px", background: "rgba(184,150,46,0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                {svc.icon}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a2e4a", marginBottom: "6px" }}>{svc.title}</div>
              <div style={{ fontSize: "11px", color: "#888", lineHeight: 1.55 }}>{svc.desc}</div>
              <Link href={svc.href} style={{ fontSize: "11px", color: "#b8962e", fontWeight: 600, marginTop: "10px", display: "block", textDecoration: "none" }}>Get a quote →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "#f5f3ee", padding: "52px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", borderTop: "1px solid #ede9e0" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a2e4a", marginBottom: "6px", letterSpacing: "-0.3px" }}>Ready to get started?</h2>
          <p style={{ fontSize: "13px", color: "#888" }}>Book a free 30-minute consultation — no commitment required.</p>
        </div>
        <Link href="/booking" style={{ background: "#b8962e", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "13px 28px", borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
          Book a Free Call →
        </Link>
      </section>
    </>
  );
}
