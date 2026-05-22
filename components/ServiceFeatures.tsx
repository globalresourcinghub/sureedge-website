import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { C } from "@/lib/tokens";

function DotGrid() {
  return (
    <div style={{
      position: "absolute", inset: 0, borderRadius: "inherit",
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      backgroundSize: "22px 22px", pointerEvents: "none",
    }} />
  );
}

function IndividualTaxPanel() {
  return (
    <div style={{ position: "relative", background: C.darkMid, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "36px 32px", overflow: "hidden", minHeight: "340px" }}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div style={{ fontSize: "12px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>Your 2024 Return</div>
          <div style={{ background: "rgba(110,231,183,0.12)", border: "1px solid rgba(110,231,183,0.25)", color: C.green, fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "12px" }}>
            Filed ✓
          </div>
        </div>

        {/* Refund numbers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "18px 16px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "10px", color: C.muted, marginBottom: "6px" }}>Federal Refund</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: C.gold, letterSpacing: "-1px", lineHeight: 1 }}>$3,240</div>
            <div style={{ fontSize: "10px", color: C.green, marginTop: "4px" }}>↑ vs last year</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "18px 16px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "10px", color: C.muted, marginBottom: "6px" }}>State Refund</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: C.white, letterSpacing: "-1px", lineHeight: 1 }}>$480</div>
            <div style={{ fontSize: "10px", color: C.muted, marginTop: "4px" }}>TX · Filed ✓</div>
          </div>
        </div>

        {/* Document checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {["W-2 Wages", "1099-NEC Income", "Schedule A Deductions", "Investment Statements"].map(doc => (
            <div key={doc} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: C.muted }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "rgba(110,231,183,0.12)", border: "1px solid rgba(110,231,183,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              {doc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SmallBizPanel() {
  const bars = [62, 78, 85, 91, 73, 96];
  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  return (
    <div style={{ position: "relative", background: C.darkMid, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "36px 32px", overflow: "hidden", minHeight: "340px" }}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>Business Entity</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["S-Corp", "LLC", "Schedule K-1"].map(tag => (
              <div key={tag} style={{ background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "12px" }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Savings highlight */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px", border: `1px solid ${C.border}`, marginBottom: "20px" }}>
          <div style={{ fontSize: "10px", color: C.muted, marginBottom: "4px" }}>Tax Savings Found</div>
          <div style={{ fontSize: "32px", fontWeight: 800, color: C.gold, letterSpacing: "-1px", lineHeight: 1 }}>$12,800</div>
          <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px" }}>Average for S-Corp clients · Strategy Applied ✓</div>
        </div>

        {/* Mini bar chart */}
        <div>
          <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>Quarterly Revenue Trend</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "60px" }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${h}%`, background: C.blue, borderRadius: "3px 3px 0 0", opacity: 0.75, minHeight: "3px" }} />
                </div>
                <div style={{ fontSize: "8px", color: C.muted }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BookkeepingPanel() {
  const months = [
    { label: "Feb", rev: 9200, exp: 3100 },
    { label: "Mar", rev: 11400, exp: 3800 },
    { label: "Apr", rev: 10700, exp: 3300 },
  ];
  return (
    <div style={{ position: "relative", background: C.darkMid, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "36px 32px", overflow: "hidden", minHeight: "340px" }}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>Monthly Books</div>
          <div style={{ background: "rgba(147,197,253,0.1)", border: "1px solid rgba(147,197,253,0.25)", color: C.blue, fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "12px" }}>
            Reconciled ✓
          </div>
        </div>

        {/* Month columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "20px" }}>
          {months.map((m, i) => (
            <div key={m.label} style={{ background: i === months.length - 1 ? "rgba(147,197,253,0.06)" : "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "14px 12px", border: `1px solid ${i === months.length - 1 ? "rgba(147,197,253,0.2)" : C.border}` }}>
              <div style={{ fontSize: "10px", color: C.muted, marginBottom: "10px", fontWeight: 600 }}>{m.label}</div>
              <div style={{ fontSize: "11px", color: C.green, fontWeight: 600, marginBottom: "4px" }}>+${(m.rev / 1000).toFixed(1)}k</div>
              <div style={{ fontSize: "11px", color: "#fc8181" }}>-${(m.exp / 1000).toFixed(1)}k</div>
              <div style={{ marginTop: "8px", fontSize: "11px", fontWeight: 700, color: C.white }}>
                ${((m.rev - m.exp) / 1000).toFixed(1)}k
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 12px", border: `1px solid ${C.border}`, textAlign: "center" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: C.white }}>99.4%</div>
            <div style={{ fontSize: "9px", color: C.muted, marginTop: "2px" }}>Match Rate</div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 12px", border: `1px solid ${C.border}`, textAlign: "center" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: C.white }}>48h</div>
            <div style={{ fontSize: "9px", color: C.muted, marginTop: "2px" }}>Close Time</div>
          </div>
          <div style={{ flex: 2, background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 12px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "#2CA01C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "9px", fontWeight: 800, color: "#fff" }}>Q</span>
            </div>
            <span style={{ fontSize: "10px", color: C.muted }}>QuickBooks Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IrsPanel() {
  return (
    <div style={{ position: "relative", background: C.darkMid, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "36px 32px", overflow: "hidden", minHeight: "340px" }}>
      <DotGrid />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>IRS Notice CP2000</div>
          <div style={{ background: "rgba(201,168,76,0.12)", border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "12px" }}>
            EA Assigned
          </div>
        </div>

        {/* Shield + central stat */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
          <div style={{ flexShrink: 0 }}>
            <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
              <path d="M28 2L4 12v20c0 16 10.5 29.5 24 32 13.5-2.5 24-16 24-32V12L28 2z" fill="rgba(201,168,76,0.1)" stroke={C.gold} strokeWidth="1.5"/>
              <polyline points="18 32 25 39 38 26" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: C.muted, marginBottom: "4px" }}>Enrolled Agent Defense</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: C.white, lineHeight: 1.4 }}>Your EA responds directly<br/>to the IRS on your behalf</div>
          </div>
        </div>

        {/* Result comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "10px", color: C.muted, marginBottom: "4px" }}>IRS Proposed</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: C.white, letterSpacing: "-0.5px" }}>$4,800</div>
          </div>
          <div style={{ background: "rgba(201,168,76,0.06)", borderRadius: "10px", padding: "14px", border: `1px solid ${C.goldBorder}` }}>
            <div style={{ fontSize: "10px", color: C.muted, marginBottom: "4px" }}>Final Owed</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: C.gold, letterSpacing: "-0.5px" }}>$0</div>
          </div>
        </div>

        <div style={{ fontSize: "11px", color: C.muted, textAlign: "center" }}>
          Average resolution · 18 days · Case closed ✓
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    label: "Individual Tax Preparation",
    title: "Taxes filed accurately, every year.",
    desc: "Federal and state returns prepared by a licensed CPA. From simple W-2s to complex investor portfolios, multi-state filings, and rental income — we handle it all.",
    bullets: ["W-2, freelance, investor & retiree returns", "Multi-state filers welcome", "Direct e-file tracking to IRS acceptance"],
    href: "/tax-intake",
    cta: "Get your free quote",
    panel: <IndividualTaxPanel />,
    imageLeft: false,
  },
  {
    label: "Small Business Tax",
    title: "More money stays in your business.",
    desc: "S-Corp elections, Schedule C, LLC returns, partnership K-1s — filed on time with every legal strategy applied. We find the savings most preparers miss.",
    bullets: ["S-Corp, LLC, and Partnership returns", "Quarterly estimated payments managed", "Year-round tax strategy included"],
    href: "/business-tax-intake",
    cta: "Get your free quote",
    panel: <SmallBizPanel />,
    imageLeft: true,
  },
  {
    label: "Bookkeeping & QuickBooks",
    title: "Clean books, month after month.",
    desc: "Monthly transaction reconciliation and categorization via QuickBooks. Get real P&Ls, balance sheets, and cash flow statements you can actually trust.",
    bullets: ["Monthly close within 48 hours", "QuickBooks managed end-to-end", "P&L, balance sheet & cash flow reports"],
    href: "/business-tax-intake",
    cta: "Get started",
    panel: <BookkeepingPanel />,
    imageLeft: false,
  },
  {
    label: "IRS Representation",
    title: "IRS on your doorstep? We’ve got it.",
    desc: "Our Enrolled Agent has the same authority to represent you before the IRS as an attorney. Audits, CP notices, appeals — handled from first letter to final resolution.",
    bullets: ["Full EA representation rights", "Audit, notice & appeals handling", "Average case resolution under 18 days"],
    href: "/contact",
    cta: "Talk to us",
    panel: <IrsPanel />,
    imageLeft: true,
  },
];

export default function ServiceFeatures() {
  return (
    <section style={{ background: C.offWhite, padding: "96px 44px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: "64px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
              What we offer
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, margin: 0, maxWidth: "440px" }}>
                Full-service tax &amp; accounting.
              </h2>
              <Link href="/services" className="btn-ghost" style={{ color: C.mutedDark, fontSize: "13px", fontWeight: 500, padding: "10px 20px", borderRadius: "8px", border: `1px solid ${C.borderLight}`, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                View all services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div>
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.label} delay={0}>
              <div
                className="svc-row"
                style={{ flexDirection: svc.imageLeft ? "row" : "row" } as React.CSSProperties}
              >
                {/* Text side */}
                <div style={{ order: svc.imageLeft ? 2 : 1 }}>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
                    {svc.label}
                  </div>
                  <h3 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: C.textDark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: "16px", margin: "0 0 16px" }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "24px", margin: "0 0 24px" }}>
                    {svc.desc}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {svc.bullets.map(b => (
                      <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: C.mutedDark }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href={svc.href} className="btn-gold" style={{ background: C.gold, color: C.dark, fontSize: "13px", fontWeight: 700, padding: "12px 24px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {svc.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                </div>

                {/* Illustration side */}
                <div style={{ order: svc.imageLeft ? 1 : 2 }}>
                  {svc.panel}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
