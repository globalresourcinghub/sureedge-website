import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { C } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Full-service tax and advisory for individuals and small businesses. Prepared by a licensed Enrolled Agent, serving clients nationwide.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | SureEdge Tax & Advisory",
    description: "Full-service tax and advisory for individuals and small businesses. Prepared by a licensed Enrolled Agent, serving clients nationwide.",
    url: "/services",
  },
};

/* ── Mock panels ─────────────────────────────────────────────────── */

function SampleNote() {
  return (
    <div style={{ marginTop: "16px", fontSize: "10px", color: C.muted, textAlign: "center", letterSpacing: "0.5px" }}>
      Sample data for illustration purposes
    </div>
  );
}

function SampleBadge() {
  return (
    <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.62)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", letterSpacing: "1px", textTransform: "uppercase", padding: "2px 7px", borderRadius: "10px", whiteSpace: "nowrap" }}>
      Sample
    </span>
  );
}

function IndividualPanel() {
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>Federal Return · 2024</span>
          <SampleBadge />
        </div>
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
          Reviewed &amp; signed by a licensed tax pro
        </div>
        <SampleNote />
      </div>
    </div>
  );
}

function SmallBizPanel() {
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>S-Corp Return · Form 1120-S</span>
          <SampleBadge />
        </div>
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
        <SampleNote />
      </div>
    </div>
  );
}

function BookkeepingPanel() {
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>April 2025 · Monthly Report</span>
          <SampleBadge />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", color: C.green, fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "12px" }}>
          Report Ready ✓
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        {[
          { label: "Total Revenue", val: "$24,800", color: C.green,  bold: false },
          { label: "Total Expenses", val: "−$14,200", color: C.white, bold: false },
          { label: "Net Income",    val: "$10,600",  color: C.gold,  bold: true  },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
            <span style={{ fontSize: "12px", color: r.bold ? C.white : C.muted, fontWeight: r.bold ? 700 : 400 }}>{r.label}</span>
            <span style={{ fontSize: r.bold ? "18px" : "13px", fontWeight: 700, color: r.color, letterSpacing: r.bold ? "-0.5px" : "0" }}>{r.val}</span>
          </div>
        ))}
        <div style={{ margin: "16px 0", background: "rgba(201,168,76,0.08)", borderRadius: "10px", padding: "14px 16px", border: `1px solid ${C.goldBorder}` }}>
          <div style={{ fontSize: "9px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>AI Commentary</div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
            Revenue grew 18% vs. March, driven by new client onboarding. Operating costs stayed flat. Cash position remains strong.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span style={{ fontSize: "11px", color: C.muted }}>Delivered to your portal · Included free with bookkeeping</span>
        </div>
        <SampleNote />
      </div>
    </div>
  );
}

function IrsPanel() {
  const steps = ["Notice Received", "Agent Assigned", "Response Filed", "Case Closed"];
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>IRS Notice CP2000</span>
          <SampleBadge />
        </div>
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
        <SampleNote />
      </div>
    </div>
  );
}

function PayrollPanel() {
  return (
    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(26,46,74,0.14)" }}>
      <div style={{ background: C.navy, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>Payroll · April 2025</span>
          <SampleBadge />
        </div>
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
        <SampleNote />
      </div>
    </div>
  );
}

function PlanningPanel() {
  return (
    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(26,46,74,0.14)" }}>
      <div style={{ background: C.navy, padding: "12px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>2025 Tax Strategy</span>
          <SampleBadge />
        </div>
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
        <SampleNote />
      </div>
    </div>
  );
}

/* ── Services data ───────────────────────────────────────────────── */

const SERVICES = [
  {
    eyebrow: "Individual returns",
    title: "Personal Tax Preparation",
    desc: "Federal and state returns for W-2 employees, freelancers, investors, rental owners, and retirees. Every deduction reviewed by a licensed tax professional. Nothing left on the table.",
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
    title: "Bookkeeping & Monthly Financials",
    desc: "Monthly reconciliation and categorization via QuickBooks. Clean books you can actually use to run your business, delivered with P&L, balance sheet, and cash flow reports on a monthly or quarterly cycle, depending on your bookkeeping plan.",
    bullets: [
      "Monthly transaction reconciliation",
      "QuickBooks managed for you",
      "P&L, balance sheet, and cash flow reports",
      "Organized and review-ready at any time",
      "Free CFO report with AI commentary, delivered to your portal",
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
    desc: "Received a notice or facing an IRS audit? Our licensed Enrolled Agent represents you directly before the IRS with unlimited practice rights so you never face them alone.",
    bullets: [
      "CP notices, IRS audits, and appeals",
      "Enrolled Agent with unlimited IRS practice rights",
      "We manage every IRS deadline and response for you",
      "We challenge proposed amounts that are not supported",
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
    desc: "Proactive, year-round strategies to legally reduce what you owe. We identify deductions and savings opportunities before the year closes, not after it's too late.",
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
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "5px 12px", borderRadius: "20px", marginBottom: "24px" }}>
              <span style={{ width: "6px", height: "6px", background: C.gold, borderRadius: "50%" }} />
              What We Offer
            </div>
            <h1 style={{ fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 800, color: C.white, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "16px", maxWidth: "640px" }}>
              Full-Service Tax<br />&amp; Advisory.
            </h1>
            <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.75, maxWidth: "520px", marginBottom: "32px" }}>
              From individual returns to complex small business filings, all prepared by a licensed Enrolled Agent on our team.
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
      </section>

      {/* ── Trust bar ── */}
      <div style={{ background: C.navy, borderBottom: `1px solid ${C.border}`, display: "flex" }}>
        {[
          "Licensed Enrolled Agent on our team",
          "Federal + state returns for all 50 states",
          "Flat-fee pricing. No surprise billing.",
          "Year-round support, not just April",
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "14px 12px", borderRight: i < 3 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* ── Included with every plan ── */}
      <section style={{ background: C.offWhite, padding: "56px 44px", borderBottom: `1px solid ${C.borderLight}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "10px" }}>Included with every plan</div>
            <h2 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 800, color: C.textDark, letterSpacing: "-0.8px", lineHeight: 1.15, margin: 0 }}>
              More than just tax and advisory.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

            {/* Card 1: Financial Planning Dashboard — all clients */}
            <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, padding: "28px 32px", boxShadow: "0 4px 24px rgba(26,46,74,0.06)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "12px", marginBottom: "16px" }}>
                All clients · Free
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: C.textDark, letterSpacing: "-0.4px", marginBottom: "10px", lineHeight: 1.25 }}>
                Personal Financial Planning Dashboard
              </h3>
              <p style={{ fontSize: "13px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "18px" }}>
                Every client gets access to a full household planning dashboard. Track your net worth, set financial goals, model retirement scenarios, and see your complete financial picture in one place.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {[
                  "Net worth and asset tracking",
                  "Budget, income, and expense categories",
                  "Goal projections and retirement scenarios",
                  "Social Security and college savings estimators",
                ].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "12px", color: C.mutedDark }}>
                    <span style={{ color: C.gold, fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Monthly CFO Report — bookkeeping clients */}
            <div style={{ background: C.dark, borderRadius: "16px", border: `1px solid rgba(255,255,255,0.08)`, padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", color: C.green, fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "12px", marginBottom: "16px" }}>
                Bookkeeping clients · Free
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: C.white, letterSpacing: "-0.4px", marginBottom: "10px", lineHeight: 1.25 }}>
                CFO Report
              </h3>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.75, marginBottom: "18px" }}>
                Your books close and a plain-language report lands in your client portal. P&amp;L summary, cash flow, and an AI-generated narrative that explains what your numbers actually mean. Reporting runs monthly or quarterly, depending on your bookkeeping plan and transaction activity.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {[
                  "Monthly P&L, balance sheet, and cash flow",
                  "AI-generated narrative in plain language",
                  "Revenue trends and expense breakdowns",
                  "Delivered automatically, no extra charge",
                ].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "12px", color: C.muted }}>
                    <span style={{ color: C.green, fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

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
          <p style={{ fontSize: "14px", color: C.muted }}>Reach out and we&apos;ll guide you to the right solution with no commitment.</p>
        </div>
        <Link href="/contact" style={{ flexShrink: 0, background: C.gold, color: C.dark, fontSize: "14px", fontWeight: 700, padding: "14px 32px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "7px" }}>
          Contact Us
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </section>
    </>
  );
}
