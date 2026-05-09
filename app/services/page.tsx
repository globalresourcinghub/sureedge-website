import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Services | Tax & Accounting",
  description: "Full-service tax and accounting for individuals and small businesses. Prepared by a licensed CPA and Enrolled Agent, serving clients nationwide.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Tax & Accounting",
    description: "Full-service tax and accounting for individuals and small businesses. Prepared by a licensed CPA and Enrolled Agent, serving clients nationwide.",
    url: "/services",
  },
};

const C = {
  dark: "#0B1929", darkMid: "#0f2035", navy: "#1a2e4a",
  gold: "#C9A84C", goldSoft: "rgba(201,168,76,0.12)", goldBorder: "rgba(201,168,76,0.28)",
  offWhite: "#F8F7F4", white: "#FFFFFF", textDark: "#1a2e4a",
  muted: "#8A9BB0", mutedDark: "#6b7a8d",
  borderLight: "#EDEAE3", border: "rgba(255,255,255,0.08)",
  green: "#6ee7b7",
};

/* ── Mock panels ─────────────────────────────────────────────────── */

function IndividualPanel() {
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>Federal Return · 2024</span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", color: C.green, fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block" }} />
          Filed &amp; Accepted
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>Federal Refund</div>
        <div style={{ fontSize: "40px", fontWeight: 800, color: C.white, letterSpacing: "-2px", lineHeight: 1, marginBottom: "4px" }}>$3,240</div>
        <div style={{ fontSize: "12px", color: C.green, marginBottom: "24px" }}>↑ $412 more than last year</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
          {[
            { label: "W-2 Income", val: "$68,400" },
            { label: "Freelance", val: "$12,200" },
            { label: "Deductions", val: "$18,300" },
            { label: "Effective Rate", val: "12.4%" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "10px 12px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: "9px", color: C.muted, marginBottom: "3px" }}>{s.label}</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: C.white }}>{s.val}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "10px", color: C.muted, display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Reviewed &amp; signed by licensed CPA
        </div>
      </div>
    </div>
  );
}

function SmallBizPanel() {
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>S-Corp Return · Form 1120-S</span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(147,197,253,0.1)", border: "1px solid rgba(147,197,253,0.25)", color: "#93c5fd", fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#93c5fd", display: "inline-block" }} />
          Under Review
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>Gross Revenue</div>
        <div style={{ fontSize: "40px", fontWeight: 800, color: C.white, letterSpacing: "-2px", lineHeight: 1, marginBottom: "20px" }}>$284,600</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { label: "Business Income", val: "$284,600", color: C.green },
            { label: "Officer Salary (W-2)", val: "−$72,000", color: C.white },
            { label: "Business Expenses", val: "−$98,400", color: C.white },
            { label: "Net S-Corp Income", val: "$114,200", color: C.gold },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ fontSize: "12px", color: C.muted }}>{r.label}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: r.color }}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookkeepingPanel() {
  const rows = [
    { label: "Stripe — Client Revenue", amount: "+$8,400", pos: true },
    { label: "AWS Infrastructure",       amount: "−$312",   pos: false },
    { label: "Contractor Payment",       amount: "−$2,500", pos: false },
    { label: "Office Supplies",          amount: "−$156",   pos: false },
  ];
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>April 2025 · Books</span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(147,197,253,0.1)", border: "1px solid rgba(147,197,253,0.25)", color: "#93c5fd", fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px" }}>
          All Transactions Reconciled
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ fontSize: "12px", color: C.muted }}>{r.label}</span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: r.pos ? C.green : C.white }}>{r.amount}</span>
          </div>
        ))}
        <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: C.white }}>Net Income</span>
          <span style={{ fontSize: "20px", fontWeight: 800, color: C.green, letterSpacing: "-0.5px" }}>+$5,432</span>
        </div>
        <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#2CA01C", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "9px", fontWeight: 800, color: "#fff" }}>Q</span>
          </div>
          <span style={{ fontSize: "11px", color: C.muted }}>QuickBooks synced · 99.4% match rate</span>
        </div>
      </div>
    </div>
  );
}

function IrsPanel() {
  const steps = ["Notice Received", "EA Assigned", "Response Filed", "Case Closed"];
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>IRS Notice CP2000</span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(196,181,253,0.1)", border: "1px solid rgba(196,181,253,0.25)", color: "#c4b5fd", fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px" }}>
          Resolved · 18 days
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        {steps.map((step, i) => (
          <div key={step} style={{ display: "flex", gap: "12px", marginBottom: i < steps.length - 1 ? "0" : "0" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20px", flexShrink: 0 }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(196,181,253,0.15)", border: "1px solid rgba(196,181,253,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              {i < steps.length - 1 && <div style={{ width: "1px", flex: 1, minHeight: "20px", background: "rgba(196,181,253,0.2)", margin: "3px 0" }} />}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? "12px" : "16px" }}>
              <div style={{ fontSize: "12px", color: C.white, fontWeight: 500 }}>{step}</div>
            </div>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "12px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "9px", color: C.muted, marginBottom: "3px" }}>IRS Proposed</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: C.white }}>$4,800</div>
          </div>
          <div style={{ background: "rgba(196,181,253,0.06)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(196,181,253,0.2)" }}>
            <div style={{ fontSize: "9px", color: C.muted, marginBottom: "3px" }}>Final Owed</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#c4b5fd" }}>$0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PayrollPanel() {
  return (
    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(26,46,74,0.14)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>Payroll · April 2025</span>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px" }}>
          Processed ✓
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        {[
          { name: "Sarah K.", role: "Owner / Officer", gross: "$6,000", net: "$4,820" },
          { name: "James R.", role: "Part-Time Staff",  gross: "$2,400", net: "$1,992" },
          { name: "Maria L.", role: "Contractor 1099",  gross: "$1,800", net: "$1,800" },
        ].map((e, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.borderLight}` : "none" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "9px", fontWeight: 700, color: C.gold }}>{e.name.split(" ").map(w => w[0]).join("")}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: C.textDark }}>{e.name}</div>
              <div style={{ fontSize: "10px", color: C.muted }}>{e.role}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: C.textDark }}>{e.net}</div>
              <div style={{ fontSize: "9px", color: C.muted }}>of {e.gross}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "14px", padding: "10px 14px", background: C.offWhite, borderRadius: "8px", border: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", color: C.mutedDark }}>W-2s &amp; 1099s prepared</span>
          <span style={{ fontSize: "11px", fontWeight: 600, color: C.gold }}>Year-end ✓</span>
        </div>
      </div>
    </div>
  );
}

function PlanningPanel() {
  return (
    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(26,46,74,0.14)" }}>
      <div style={{ background: C.navy, padding: "12px 18px" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>2025 Tax Strategy</span>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ fontSize: "10px", color: C.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>Savings Opportunities Identified</div>
        {[
          { strategy: "Max out Solo 401(k)", saving: "−$5,850", status: "Actioned" },
          { strategy: "HSA contribution",    saving: "−$920",   status: "Actioned" },
          { strategy: "Home office deduction",saving: "−$2,100", status: "Pending"  },
          { strategy: "Vehicle mileage log", saving: "−$1,440", status: "In Review" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: i < 3 ? `1px solid ${C.borderLight}` : "none" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", fontWeight: 500, color: C.textDark }}>{s.strategy}</div>
            </div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: C.green }}>{s.saving}</div>
            <div style={{ fontSize: "9px", color: s.status === "Actioned" ? C.green : C.gold, background: s.status === "Actioned" ? "rgba(110,231,183,0.1)" : C.goldSoft, border: `1px solid ${s.status === "Actioned" ? "rgba(110,231,183,0.3)" : C.goldBorder}`, padding: "2px 6px", borderRadius: "8px", fontWeight: 600, whiteSpace: "nowrap" }}>{s.status}</div>
          </div>
        ))}
        <div style={{ marginTop: "14px", padding: "10px 14px", background: C.offWhite, borderRadius: "8px", border: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", color: C.mutedDark }}>Estimated tax savings</span>
          <span style={{ fontSize: "13px", fontWeight: 800, color: C.gold }}>$10,310</span>
        </div>
      </div>
    </div>
  );
}

/* ── Services data ───────────────────────────────────────────────── */

const SERVICES = [
  {
    eyebrow: "Individual returns",
    title: "Personal Tax Preparation",
    desc: "Federal and state returns for W-2 employees, freelancers, investors, rental owners, and retirees. Every deduction reviewed by a licensed CPA — nothing left on the table.",
    bullets: [
      "W-2, 1099, freelance, rental, and investment income",
      "Multi-state filers handled",
      "E-filed and tracked to IRS acceptance",
      "Compared year-over-year for patterns",
    ],
    cta: "Get a quote",
    href: "/tax-intake",
    panel: <IndividualPanel />,
    dark: false,
    imageLeft: true,
  },
  {
    eyebrow: "Business returns",
    title: "Small Business Tax",
    desc: "Schedule C, Form 1120-S, and Form 1065 for LLCs, S-Corps, C-Corps, and partnerships. Accurate, on-time filing with a full entity-level review and officer compensation analysis.",
    bullets: [
      "LLC, S-Corp, C-Corp, and partnership returns",
      "Officer salary optimization",
      "Entity-level review for compliance",
      "Quarterly estimated payment calculation",
    ],
    cta: "Get a business quote",
    href: "/business-tax-intake",
    panel: <SmallBizPanel />,
    dark: true,
    imageLeft: false,
  },
  {
    eyebrow: "Monthly bookkeeping",
    title: "Bookkeeping & Financial Statements",
    desc: "Monthly reconciliation and categorization via QuickBooks. Clean books you can actually use to run your business — delivered with P&L, balance sheet, and cash flow every month.",
    bullets: [
      "Monthly transaction reconciliation",
      "QuickBooks managed for you",
      "P&L, balance sheet, and cash flow reports",
      "Audit-ready at any time",
    ],
    cta: "Get a quote",
    href: "/business-tax-intake",
    panel: <BookkeepingPanel />,
    dark: false,
    imageLeft: true,
  },
  {
    eyebrow: "IRS representation",
    title: "IRS Defense & Representation",
    desc: "Received a notice or facing an audit? Our licensed Enrolled Agent represents you directly before the IRS with unlimited practice rights — so you never face them alone.",
    bullets: [
      "CP notices, audits, and appeals",
      "Enrolled Agent with unlimited IRS practice rights",
      "Average resolution in 18 days",
      "$0 owed in most CP2000 cases we handle",
    ],
    cta: "Get help now",
    href: "/contact",
    panel: <IrsPanel />,
    dark: true,
    imageLeft: false,
  },
  {
    eyebrow: "Payroll processing",
    title: "Payroll Services",
    desc: "End-to-end payroll processing, quarterly filings, and year-end W-2 and 1099 preparation. We keep you compliant so you can focus on your people.",
    bullets: [
      "Weekly, bi-weekly, or monthly payroll runs",
      "940/941 quarterly filings handled",
      "Year-end W-2 and 1099 preparation",
      "Direct deposit setup and management",
    ],
    cta: "Get a quote",
    href: "/business-tax-intake",
    panel: <PayrollPanel />,
    dark: false,
    imageLeft: true,
  },
  {
    eyebrow: "Year-round planning",
    title: "Tax Planning & Strategy",
    desc: "Proactive, year-round strategies to legally reduce what you owe. We identify deductions and savings opportunities before the year closes — not after it's too late.",
    bullets: [
      "Retirement account contribution optimization",
      "Business structure and entity selection",
      "Real estate and depreciation strategies",
      "Quarterly check-ins, not just April",
    ],
    cta: "Start planning",
    href: "/contact",
    panel: <PlanningPanel />,
    dark: true,
    imageLeft: false,
  },
];

export default function Services() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-gradient" style={{ padding: "80px 44px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "5px 12px", borderRadius: "20px", marginBottom: "24px" }}>
              <span style={{ width: "6px", height: "6px", background: C.gold, borderRadius: "50%" }} />
              What We Offer
            </div>
            <h1 style={{ fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 800, color: C.white, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "16px", maxWidth: "560px" }}>
              Full-Service Tax<br />&amp; Accounting.
            </h1>
            <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.75, maxWidth: "480px", marginBottom: "32px" }}>
              From individual returns to complex small business accounting — all prepared by a licensed CPA and Enrolled Agent on our team.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link href="/tax-intake" className="btn-gold" style={{ background: C.gold, color: C.dark, fontSize: "13px", fontWeight: 700, padding: "12px 28px", borderRadius: "7px" }}>
                Get a Free Quote
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ background: "transparent", color: C.white, fontSize: "13px", fontWeight: 500, padding: "12px 28px", borderRadius: "7px", border: "1.5px solid rgba(255,255,255,0.22)" }}>
                Ask a Question
              </Link>
            </div>
          </div>
          {/* Human element — professional photo */}
          <div className="hero-advisor-card" style={{ flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=280&h=320&fit=crop&crop=top&auto=format&q=80"
              alt="Tax professional"
              width={200} height={240}
              style={{ width: 200, height: 240, objectFit: "cover", borderRadius: "16px", border: `2px solid rgba(201,168,76,0.3)`, boxShadow: "0 20px 60px rgba(0,0,0,0.4)", display: "block" }}
            />
            <div style={{ marginTop: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 14px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: C.white }}>Licensed CPA &amp; EA</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>Nationwide · All 50 states</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div style={{ background: C.navy, borderBottom: `1px solid ${C.border}`, display: "flex" }}>
        {[
          "Licensed CPA & Enrolled Agent on our team",
          "Federal + state returns for all 50 states",
          "Flat-fee pricing — no surprise billing",
          "Year-round support, not just April",
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "14px 12px", borderRight: i < 3 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* ── Alternating service rows ── */}
      {SERVICES.map((svc) => (
        <section key={svc.eyebrow} style={{ background: svc.dark ? C.dark : C.offWhite, padding: "88px 44px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <ScrollReveal>
              <div className="svc-row" style={{ gridTemplateColumns: svc.imageLeft ? "1.1fr 1fr" : "1fr 1.1fr" }}>
                {svc.imageLeft ? (
                  <>
                    <div>{svc.panel}</div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>{svc.eyebrow}</div>
                      <h2 style={{ fontSize: "clamp(24px,2.8vw,36px)", fontWeight: 800, color: svc.dark ? C.white : C.textDark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: "14px" }}>{svc.title}</h2>
                      <p style={{ fontSize: "15px", color: svc.dark ? "rgba(255,255,255,0.6)" : C.mutedDark, lineHeight: 1.75, marginBottom: "22px" }}>{svc.desc}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                        {svc.bullets.map(b => (
                          <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                              <span style={{ fontSize: "8px", color: C.gold, fontWeight: 700 }}>✓</span>
                            </div>
                            <span style={{ fontSize: "13px", color: svc.dark ? "rgba(255,255,255,0.7)" : C.mutedDark, lineHeight: 1.6 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                      <Link href={svc.href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: C.gold }}>
                        {svc.cta}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>{svc.eyebrow}</div>
                      <h2 style={{ fontSize: "clamp(24px,2.8vw,36px)", fontWeight: 800, color: svc.dark ? C.white : C.textDark, letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: "14px" }}>{svc.title}</h2>
                      <p style={{ fontSize: "15px", color: svc.dark ? "rgba(255,255,255,0.6)" : C.mutedDark, lineHeight: 1.75, marginBottom: "22px" }}>{svc.desc}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                        {svc.bullets.map(b => (
                          <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                              <span style={{ fontSize: "8px", color: C.gold, fontWeight: 700 }}>✓</span>
                            </div>
                            <span style={{ fontSize: "13px", color: svc.dark ? "rgba(255,255,255,0.7)" : C.mutedDark, lineHeight: 1.6 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                      <Link href={svc.href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: C.gold }}>
                        {svc.cta}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                    </div>
                    <div>{svc.panel}</div>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="hero-gradient" style={{ padding: "80px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: C.white, letterSpacing: "-0.8px", marginBottom: "8px" }}>Not sure which service fits?</h2>
          <p style={{ fontSize: "14px", color: C.muted }}>Reach out — we&apos;ll guide you to the right solution with no commitment.</p>
        </div>
        <Link href="/contact" style={{ flexShrink: 0, background: C.gold, color: C.dark, fontSize: "14px", fontWeight: 700, padding: "14px 32px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "7px" }}>
          Contact Us
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </section>
    </>
  );
}
