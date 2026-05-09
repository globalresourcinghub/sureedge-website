"use client";
import { useState, useRef, useEffect } from "react";

const C = {
  dark: "#0B1929", darkMid: "#0f2035", navy: "#1a2e4a",
  gold: "#C9A84C", goldSoft: "rgba(201,168,76,0.12)", goldBorder: "rgba(201,168,76,0.28)",
  muted: "#8A9BB0", border: "rgba(255,255,255,0.08)", white: "#fff",
  green: "#6ee7b7", blue: "#93c5fd", violet: "#c4b5fd",
};

function TaxMock() {
  return (
    <div style={{ background: C.darkMid, borderRadius: "20px", border: `1px solid ${C.border}`, overflow: "hidden" }}>
      {/* Window chrome */}
      <div style={{ background: C.navy, padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>Federal Return · 2024</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 28px 24px" }}>
        {/* Status badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", color: C.green, fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", marginBottom: "20px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.green }} />
          Filed &amp; Accepted
        </div>

        {/* Refund amount */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>Federal Refund</div>
          <div style={{ fontSize: "44px", fontWeight: 800, color: C.white, letterSpacing: "-2px", lineHeight: 1 }}>$3,240</div>
          <div style={{ fontSize: "12px", color: C.green, marginTop: "4px" }}>↑ $412 vs. last year</div>
        </div>

        {/* Progress steps */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Filing Progress</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {["Prepare", "Review", "E-File", "Accepted"].map((step, i, arr) => (
              <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: "9px", color: C.muted, marginTop: "4px", whiteSpace: "nowrap" }}>{step}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ flex: 1, height: "2px", background: C.green, margin: "0 4px", marginBottom: "16px" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* State return */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "12px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "11px", color: C.muted }}>TX State Return</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: C.white, marginTop: "2px" }}>$480</div>
          </div>
          <div style={{ background: "rgba(110,231,183,0.12)", color: C.green, fontSize: "10px", fontWeight: 600, padding: "4px 10px", borderRadius: "12px", border: "1px solid rgba(110,231,183,0.2)" }}>
            Filed ✓
          </div>
        </div>
      </div>
    </div>
  );
}

function BooksMock() {
  const rows = [
    { label: "Stripe — Client Payment", amount: "+$8,400.00", pos: true },
    { label: "AWS Infrastructure",       amount: "−$312.50",  pos: false },
    { label: "Google Workspace",          amount: "−$48.00",   pos: false },
    { label: "Contractor Payment",        amount: "−$2,500.00",pos: false },
    { label: "Office Supplies",           amount: "−$156.30",  pos: false },
  ];
  return (
    <div style={{ background: C.darkMid, borderRadius: "20px", border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <div style={{ background: C.navy, padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>April 2025 · Books</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 28px" }}>
        {/* Reconciled badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(147,197,253,0.1)", border: "1px solid rgba(147,197,253,0.25)", color: C.blue, fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", marginBottom: "20px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.blue }} />
          All Transactions Reconciled
        </div>

        {/* Transaction rows */}
        <div style={{ marginBottom: "20px" }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontSize: "12px", color: C.muted }}>{r.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: r.pos ? C.green : C.white, fontVariantNumeric: "tabular-nums" }}>{r.amount}</div>
            </div>
          ))}
        </div>

        {/* Net total */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px 16px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: C.white }}>Net Income</div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: C.green, letterSpacing: "-0.5px" }}>+$5,383.20</div>
        </div>

        {/* QB badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "20px", height: "20px", borderRadius: "5px", background: "#2CA01C", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, color: "#fff" }}>Q</span>
          </div>
          <span style={{ fontSize: "11px", color: C.muted }}>QuickBooks synced · 99.4% match rate</span>
        </div>
      </div>
    </div>
  );
}

function IrsMock() {
  const steps = ["Notice Received", "EA Assigned", "Response Filed", "Case Closed"];
  return (
    <div style={{ background: C.darkMid, borderRadius: "20px", border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <div style={{ background: C.navy, padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>IRS Notice CP2000</span>
        <div style={{ display: "flex", gap: "6px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map(c => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 28px" }}>
        {/* Resolved badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(196,181,253,0.1)", border: "1px solid rgba(196,181,253,0.25)", color: C.violet, fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "20px", marginBottom: "20px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.violet }} />
          Resolved · 18 days
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "12px" }}>Case Timeline</div>
          {steps.map((step, i) => (
            <div key={step} style={{ display: "flex", gap: "12px", marginBottom: i < steps.length - 1 ? "0" : "0" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20px", flexShrink: 0 }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(249,168,212,0.15)", border: "1px solid rgba(249,168,212,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.violet} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                {i < steps.length - 1 && <div style={{ width: "1px", flex: 1, minHeight: "20px", background: "rgba(196,181,253,0.2)", marginTop: "3px", marginBottom: "3px" }} />}
              </div>
              <div style={{ paddingBottom: i < steps.length - 1 ? "12px" : "0" }}>
                <div style={{ fontSize: "12px", color: C.white, fontWeight: 500 }}>{step}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Result cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "14px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: "10px", color: C.muted, marginBottom: "4px" }}>Proposed Amount</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: C.white, letterSpacing: "-0.5px" }}>$4,800</div>
          </div>
          <div style={{ background: "rgba(249,168,212,0.06)", borderRadius: "10px", padding: "14px", border: "1px solid rgba(196,181,253,0.2)" }}>
            <div style={{ fontSize: "10px", color: C.muted, marginBottom: "4px" }}>Final Amount Owed</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: C.violet, letterSpacing: "-0.5px" }}>$0</div>
          </div>
        </div>

        <div style={{ marginTop: "14px", fontSize: "11px", color: C.muted, textAlign: "center" }}>
          Enrolled Agent representation · $4,800 saved
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    id: "tax",
    label: "01",
    title: "Your return, done right — every deduction found.",
    desc: "A licensed CPA reviews every line of your return — not a software algorithm. You get your maximum refund and never have to refile.",
    bullets: ["All types: W-2, freelance, rental, investor", "Multi-state returns handled", "Tracked step-by-step to IRS acceptance"],
    mock: <TaxMock />,
  },
  {
    id: "books",
    label: "02",
    title: "You run the business. We keep the books.",
    desc: "Monthly reconciliation and categorization via QuickBooks. Your finances are always audit-ready, and you actually understand your P&L.",
    bullets: ["Monthly transaction reconciliation", "QuickBooks managed for you", "P&L, balance sheet, cash flow delivered"],
    mock: <BooksMock />,
  },
  {
    id: "irs",
    label: "03",
    title: "You focus on your life. We handle the IRS.",
    desc: "Received a notice? Our Enrolled Agent steps in and deals directly with the IRS on your behalf — so you never have to face them alone.",
    bullets: ["Direct EA representation — unlimited rights", "Audits, CP notices & appeals", "Average resolution: 18 days"],
    mock: <IrsMock />,
  },
];

export default function StickyFeatures() {
  const [active, setActive] = useState(0);
  const panelRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    const observers = panelRefs.map((ref, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: "-30% 0px -30% 0px" }
      );
      if (ref.current) obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(obs => obs.disconnect());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollTo(i: number) {
    panelRefs[i].current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section style={{ background: C.dark, padding: "96px 44px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "72px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
            Peace of mind
          </div>
          <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0, maxWidth: "520px" }}>
            Your finances,<br />in good hands.
          </h2>
        </div>

        {/* Two-column sticky layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "80px", alignItems: "start" }}>

          {/* LEFT: sticky feature nav */}
          <div style={{ position: "sticky", top: "100px" }}>
            {FEATURES.map((f, i) => {
              const isActive = active === i;
              return (
                <div
                  key={f.id}
                  onClick={() => scrollTo(i)}
                  style={{
                    padding: "28px 0",
                    borderBottom: `1px solid ${C.border}`,
                    cursor: "pointer",
                    transition: "opacity 0.4s ease",
                    opacity: isActive ? 1 : 0.35,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    {/* Number + indicator */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: isActive ? C.goldSoft : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isActive ? C.goldBorder : C.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", fontWeight: 700,
                        color: isActive ? C.gold : C.muted,
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}>
                        {f.label}
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: C.white, marginBottom: "8px", lineHeight: 1.3 }}>
                        {f.title}
                      </div>

                      {/* Expandable content */}
                      <div style={{
                        maxHeight: isActive ? "200px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
                      }}>
                        <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.7, margin: "0 0 12px" }}>
                          {f.desc}
                        </p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                          {f.bullets.map(b => (
                            <li key={b} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: C.muted }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: stacked mock panels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                ref={panelRefs[i]}
                style={{
                  opacity: active === i ? 1 : 0.3,
                  transform: `scale(${active === i ? 1 : 0.96})`,
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {f.mock}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
