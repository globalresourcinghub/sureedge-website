import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Financial Planning Tools",
  description:
    "Free tax and retirement calculators from SureEdge Tax & Accounting. Roth vs Traditional IRA comparison, tax bracket estimator, and more — no sign-up required.",
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    href: "/tools/roth-vs-traditional",
    badge: "Most Popular",
    title: "Roth vs Traditional IRA",
    desc: "Compare after-tax value side-by-side based on your income, tax bracket, and retirement timeline. Instantly see which account puts more money in your pocket.",
    tags: ["Retirement", "Tax Savings"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#b8962e" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/tools/tax-bracket",
    badge: "Quick Estimate",
    title: "Tax Bracket Estimator",
    desc: "Enter your income and filing status to see your effective tax rate, marginal bracket, and a full breakdown of what you owe across each federal bracket for 2025.",
    tags: ["Federal Tax", "2025"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="18" rx="1.5" fill="#b8962e" opacity="0.35"/>
        <rect x="13" y="8" width="8" height="13" rx="1.5" fill="#b8962e" opacity="0.65"/>
        <rect x="3" y="3" width="18" height="2" rx="1" fill="#b8962e"/>
      </svg>
    ),
  },
  {
    href: "#",
    badge: "Coming Soon",
    title: "Quarterly Tax Estimator",
    desc: "Self-employed or have freelance income? Calculate your estimated quarterly tax payments to avoid underpayment penalties.",
    tags: ["Self-Employed", "Estimated Tax"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="#b8962e" strokeWidth="1.8"/>
        <path d="M3 9h18" stroke="#b8962e" strokeWidth="1.5"/>
        <path d="M8 2v4M16 2v4" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 14h4M7 17h6" stroke="#b8962e" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "#",
    badge: "Coming Soon",
    title: "Retirement Savings Projector",
    desc: "Project your 401(k) or IRA balance at retirement based on current savings, contributions, and assumed growth rate.",
    tags: ["Retirement", "Projections"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline points="3 17 8 12 13 15 21 7" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="17 7 21 7 21 11" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "#",
    badge: "Coming Soon",
    title: "Social Security Breakeven",
    desc: "Find out at what age claiming Social Security early vs. waiting until 70 breaks even — based on your expected benefit amount.",
    tags: ["Social Security", "Retirement"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#b8962e" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "#",
    badge: "Coming Soon",
    title: "Net Worth Tracker",
    desc: "Enter your assets and liabilities to calculate your net worth and see a simple snapshot of your financial position.",
    tags: ["Net Worth", "Planning"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="5" height="14" rx="1" fill="#b8962e" opacity="0.4"/>
        <rect x="9.5" y="3" width="5" height="18" rx="1" fill="#b8962e" opacity="0.7"/>
        <rect x="17" y="10" width="5" height="11" rx="1" fill="#b8962e"/>
      </svg>
    ),
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: "#1a2e4a", padding: "56px 44px 52px" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(184,150,46,0.15)", border: "1px solid rgba(184,150,46,0.4)", color: "#b8962e", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", marginBottom: "20px" }}>
            <div style={{ width: 5, height: 5, background: "#b8962e", borderRadius: "50%" }}/>
            Free · No account required
          </div>
          <h1 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "14px", letterSpacing: "-0.5px" }}>
            Free Financial Planning Tools
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.75, maxWidth: "560px" }}>
            Tax-focused calculators built by a CPA &amp; EA team. Use them free — no email, no sign-up. When you&apos;re ready to turn the numbers into a real plan, we&apos;re one click away.
          </p>
        </div>
      </section>

      {/* DISCLAIMER BANNER */}
      <div style={{ background: "#fff8e6", borderBottom: "1px solid #f0d98a", padding: "12px 44px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
          <path d="M12 2L2 20h20L12 2z" stroke="#b8962e" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M12 9v5M12 16.5v.5" stroke="#b8962e" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p style={{ fontSize: "11px", color: "#7a6010", lineHeight: 1.7, margin: 0 }}>
          <strong>For high-level estimation only.</strong> All tools on this page provide general estimates for educational purposes and do not constitute tax, financial, or legal advice. SureEdge Tax &amp; Accounting and its team are not liable for any decisions made based on these calculations. Results may not reflect your actual tax liability. Consult a licensed CPA or EA for advice specific to your situation.
        </p>
      </div>

      {/* TOOLS GRID */}
      <section style={{ padding: "52px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "18px", maxWidth: "1100px" }}>
          {tools.map((tool) => {
            const isLive = tool.href !== "#";
            const card = (
              <div style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #f0ede6",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                opacity: isLive ? 1 : 0.6,
                transition: "box-shadow 0.15s, transform 0.15s",
                cursor: isLive ? "pointer" : "default",
                textDecoration: "none",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(184,150,46,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {tool.icon}
                  </div>
                  <span style={{
                    fontSize: "10px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase",
                    padding: "3px 9px", borderRadius: "20px",
                    background: isLive ? "rgba(184,150,46,0.12)" : "rgba(0,0,0,0.06)",
                    color: isLive ? "#b8962e" : "#999",
                  }}>{tool.badge}</span>
                </div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a2e4a", marginBottom: "6px" }}>{tool.title}</div>
                  <div style={{ fontSize: "12px", color: "#666", lineHeight: 1.65 }}>{tool.desc}</div>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {tool.tags.map(tag => (
                    <span key={tag} style={{ fontSize: "10px", color: "#888", background: "#f5f3ee", borderRadius: "20px", padding: "2px 9px" }}>{tag}</span>
                  ))}
                </div>
                {isLive && (
                  <div style={{ fontSize: "12px", color: "#b8962e", fontWeight: 600, marginTop: "4px" }}>
                    Open calculator →
                  </div>
                )}
              </div>
            );

            return isLive ? (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
                {card}
              </Link>
            ) : (
              <div key={tool.title}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: "#fff", padding: "52px 44px", borderTop: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a2e4a", marginBottom: "6px", letterSpacing: "-0.3px" }}>
            Want a real tax strategy behind the numbers?
          </h2>
          <p style={{ fontSize: "13px", color: "#555" }}>
            Our CPA &amp; EA team reviews your full picture and builds a plan — not just a calculator result.
          </p>
        </div>
        <Link href="/booking" style={{ background: "#b8962e", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "13px 28px", borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
          Book a Free Consultation →
        </Link>
      </section>
    </>
  );
}
