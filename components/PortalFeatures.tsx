import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { C } from "@/lib/tokens";

const PLANNER_NAV = ["Dashboard", "Income", "Expenses", "Assets & Debts", "Goals", "Scenarios"];

const PLANNER_STATS = [
  { label: "NET WORTH",        val: "$284,200",  color: C.gold    },
  { label: "ANNUAL INCOME",   val: "$124,000",  color: C.textDark },
  { label: "ANNUAL EXPENSES", val: "$89,400",   color: C.textDark },
  { label: "TOTAL ASSETS",    val: "$318,500",  color: C.textDark },
  { label: "GOALS SET",       val: "4",         color: C.textDark },
  { label: "CASH FLOW",       val: "+$34,600",  color: "#16a34a"  },
];

function PortalMock() {
  return (
    <div style={{
      background: C.white,
      borderRadius: "20px",
      border: `1px solid ${C.borderLight}`,
      boxShadow: "0 24px 80px rgba(26,46,74,0.18)",
      overflow: "hidden",
    }}>
      {/* Top nav */}
      <div style={{ background: C.navy, padding: "13px 20px", display: "flex", alignItems: "center", gap: "16px", overflow: "hidden" }}>
        <span style={{ color: C.gold, fontWeight: 800, fontSize: "13px", letterSpacing: "-0.2px", flexShrink: 0 }}>SureEdge</span>
        <div style={{ display: "flex", gap: "14px", overflow: "hidden" }}>
          {PLANNER_NAV.map((item, i) => (
            <span key={item} style={{
              color: i === 0 ? C.gold : "rgba(255,255,255,0.45)",
              fontSize: "10px", fontWeight: i === 0 ? 600 : 400,
              borderBottom: i === 0 ? `2px solid ${C.gold}` : "2px solid transparent",
              paddingBottom: "2px", whiteSpace: "nowrap",
            }}>
              {item}
            </span>
          ))}
        </div>
        <div style={{ marginLeft: "auto", width: "28px", height: "28px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: C.gold }}>SK</span>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        {/* Page header */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "18px", fontWeight: 800, color: C.textDark, letterSpacing: "-0.3px" }}>Your Household</div>
          <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px" }}>Financial Planning Dashboard</div>
        </div>

        {/* Onboarding banner */}
        <div style={{ background: C.navy, borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: C.white, marginBottom: "2px" }}>Set up your plan in 5 minutes</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>Answer a few questions and we&#39;ll build your first financial projection.</div>
          </div>
          <div style={{ background: C.gold, color: C.dark, fontSize: "10px", fontWeight: 700, padding: "6px 12px", borderRadius: "6px", flexShrink: 0, whiteSpace: "nowrap" }}>
            Start Setup →
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "14px" }}>
          {PLANNER_STATS.map((s) => (
            <div key={s.label} style={{ background: C.offWhite, borderRadius: "8px", padding: "10px 12px", border: `1px solid ${C.borderLight}` }}>
              <div style={{ fontSize: "8px", color: C.muted, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: s.color, letterSpacing: "-0.5px", lineHeight: 1 }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Quick-start checklist */}
        <div style={{ background: C.offWhite, borderRadius: "8px", padding: "12px 14px", border: `1px solid ${C.borderLight}` }}>
          <div style={{ fontSize: "9px", fontWeight: 700, color: C.textDark, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Quick-Start Checklist</div>
          {["Add your income sources", "Add your expenses", "Set your financial goals"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "50%", border: `1.5px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.gold }} />
              </div>
              <span style={{ fontSize: "11px", color: C.gold }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Financial planning dashboard, included free",
    desc: "Every client gets a full household planning dashboard: net worth, budget, income, goals, retirement scenarios, Social Security estimator, college savings, and more. One place for your complete financial picture.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "Real-time return tracking",
    desc: "See every step: intake, CPA review, e-filed, accepted. No calling required. Estimated refund visible from day one.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    title: "Upload from any device",
    desc: "Drag & drop from your laptop or snap a photo from your phone. Encrypted, auto-organized by year and type.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Message your CPA directly",
    desc: "No phone tag, no email chains. Direct messaging with your CPA inside the portal, with full conversation history.",
  },
];

export default function PortalFeatures() {
  return (
    <section style={{ background: C.offWhite, padding: "96px 44px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ marginBottom: "64px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
              Client portal
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, margin: 0, maxWidth: "480px" }}>
                A complete financial picture,<br />included with your account.
              </h2>
              <Link
                href="/portal"
                className="btn-gold"
                style={{ background: C.gold, color: C.dark, fontSize: "13px", fontWeight: 700, padding: "12px 24px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                Explore the portal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "72px", alignItems: "center" }}>

          {/* Left: feature list */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {FEATURES.map((f, i) => (
                <ScrollReveal key={f.title} delay={i * 60}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "10px",
                      background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {f.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: C.textDark, marginBottom: "4px" }}>{f.title}</div>
                      <div style={{ fontSize: "13px", color: C.mutedDark, lineHeight: 1.65 }}>{f.desc}</div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={300}>
              <div style={{ marginTop: "36px", paddingTop: "28px", borderTop: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "13px", color: C.mutedDark }}>See document upload, identity verification, messaging &amp; more.</div>
                <Link href="/portal" style={{ fontSize: "13px", fontWeight: 600, color: C.gold, display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                  Full portal overview
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: portal mockup */}
          <ScrollReveal delay={100}>
            <PortalMock />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
