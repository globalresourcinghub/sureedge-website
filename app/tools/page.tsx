import type { Metadata } from "next";
import Link from "next/link";
import { C } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Free Financial Planning Tools",
  description:
    "Free tax and retirement calculators from SureEdge Tax & Advisory. Roth vs Traditional IRA comparison, tax bracket estimator, and more. No sign-up required.",
  alternates: { canonical: "/tools" },
};

const tools = [
  {
    href: "/tools/roth-vs-traditional",
    badge: "Most Popular",
    title: "Roth vs Traditional IRA",
    desc: "Compare after-tax value side-by-side based on your income, tax bracket, and retirement timeline. Instantly see which account puts more money in your pocket.",
    tags: ["Retirement", "Tax Savings"],
    img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=480&h=200&fit=crop&auto=format&q=70",
    imgAlt: "Retirement investment planning",
  },
  {
    href: "/tools/tax-bracket",
    badge: "Quick Estimate",
    title: "Tax Bracket Estimator",
    desc: "Enter your income and filing status to see your effective tax rate, marginal bracket, and a full breakdown of what you owe across each federal bracket.",
    tags: ["Federal Tax", "2025 / 2026"],
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=480&h=200&fit=crop&auto=format&q=70",
    imgAlt: "Tax documents and calculator",
  },
  {
    href: "/tools/quarterly-tax",
    badge: "For Self-Employed",
    title: "Quarterly Tax Estimator",
    desc: "Self-employed or freelancer? Calculate your federal estimated quarterly payment including SE tax, with safe-harbor protection from IRS penalties.",
    tags: ["Self-Employed", "2025 / 2026"],
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=480&h=200&fit=crop&auto=format&q=70",
    imgAlt: "Freelancer working at desk",
  },
  {
    href: "/tools/retirement-projector",
    badge: "Long-Term Planning",
    title: "Retirement Savings Projector",
    desc: "Project your 401(k) or IRA balance at retirement. See growth chart, monthly retirement income at the 4% rule, and the impact of contributing more.",
    tags: ["Retirement", "Projections"],
    img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=480&h=200&fit=crop&auto=format&q=70",
    imgAlt: "Retirement planning by the ocean",
  },
  {
    href: "/tools/social-security",
    badge: "Pre-Retirees",
    title: "Social Security Breakeven",
    desc: "Find out when waiting until 70 beats claiming at 62. See breakeven ages and lifetime totals based on your expected benefit and life expectancy.",
    tags: ["Social Security", "Retirement"],
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=480&h=200&fit=crop&crop=top&auto=format&q=70",
    imgAlt: "Couple planning retirement",
  },
  {
    href: "/tools/net-worth",
    badge: "Quick Snapshot",
    title: "Net Worth Tracker",
    desc: "Add up your assets and debts to see your net worth, asset allocation, and how you compare to others your age based on Federal Reserve data.",
    tags: ["Net Worth", "Planning"],
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=480&h=200&fit=crop&auto=format&q=70",
    imgAlt: "Financial dashboard and charts",
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: C.navy, padding: "64px 44px 56px" }}>
        <div style={{ maxWidth: "760px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.28)", color: C.gold, fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", marginBottom: "20px" }}>
            <div style={{ width: 5, height: 5, background: C.gold, borderRadius: "50%" }}/>
            Free · No account required
          </div>
          <h1 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "14px", letterSpacing: "-1px" }}>
            Free Financial Planning Tools
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: "560px" }}>
            Tax-focused calculators built by an Enrolled Agent-led team. Use them free, no email or sign-up required. When you&apos;re ready to turn the numbers into a real plan, we&apos;re one click away.
          </p>
        </div>
      </section>

      {/* DISCLAIMER BANNER */}
      <div style={{ background: "#f5f5f5", borderBottom: "1px solid #e0e0e0", padding: "9px 44px", display: "flex", gap: "8px", alignItems: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" stroke="#999" strokeWidth="2"/>
          <path d="M12 8v5M12 15.5v.5" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p style={{ fontSize: "11px", color: "#888", lineHeight: 1.5, margin: 0 }}>
          General estimates for reference only, not tax or financial advice. Consult a licensed tax professional for your specific situation.
        </p>
      </div>

      {/* TOOLS GRID */}
      <section style={{ padding: "60px 44px", background: C.offWhite }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, overflow: "hidden", boxShadow: "0 2px 10px rgba(26,46,74,0.06)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>
              {/* Image */}
              <div style={{ position: "relative", height: "160px", overflow: "hidden", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.img}
                  alt={tool.imgAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {/* Overlay with badge */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,25,41,0.15) 0%, rgba(11,25,41,0.55) 100%)" }} />
                <span style={{
                  position: "absolute", top: "12px", right: "12px",
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px",
                  padding: "4px 10px", borderRadius: "20px",
                  background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold,
                }}>
                  {tool.badge}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ fontSize: "15px", fontWeight: 700, color: C.navy, lineHeight: 1.35 }}>{tool.title}</div>
                <div style={{ fontSize: "12px", color: C.mutedDark, lineHeight: 1.65, flex: 1 }}>{tool.desc}</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {tool.tags.map(tag => (
                    <span key={tag} style={{ fontSize: "10px", color: C.mutedDark, background: C.offWhite, border: `1px solid ${C.borderLight}`, borderRadius: "20px", padding: "2px 9px" }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: "12px", color: C.gold, fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                  Open calculator
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: C.white, padding: "52px 44px", borderTop: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: C.navy, marginBottom: "6px", letterSpacing: "-0.3px" }}>
            Want a real tax strategy behind the numbers?
          </h2>
          <p style={{ fontSize: "13px", color: C.mutedDark }}>
            Our Enrolled Agent-led team reviews your full picture and builds a plan, not just a calculator result.
          </p>
        </div>
        <Link href="/booking" style={{ background: C.gold, color: "#0B1929", fontSize: "13px", fontWeight: 700, padding: "13px 28px", borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
          Book a Free Consultation →
        </Link>
      </section>
    </>
  );
}
