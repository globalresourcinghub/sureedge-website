"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type ServiceId = "individual" | "business" | "bookkeeping" | "irs";

const C = {
  dark: "#0B1929", darkMid: "#0f2035", navy: "#1a2e4a",
  gold: "#C9A84C", goldSoft: "rgba(201,168,76,0.12)", goldBorder: "rgba(201,168,76,0.28)",
  muted: "#8A9BB0", border: "rgba(255,255,255,0.08)", white: "#fff",
};

const TABS: { id: ServiceId; label: string; desc: string; href: string }[] = [
  { id: "individual", label: "Individual Tax", desc: "Federal & state returns for W-2 employees, freelancers, retirees, and investors.", href: "/tax-intake" },
  { id: "business",   label: "Small Business", desc: "S-Corp, Partnership, and Schedule C returns filed accurately, on time.", href: "/business-tax-intake" },
  { id: "bookkeeping",label: "Bookkeeping",    desc: "Monthly reconciliation and clean financials via QuickBooks, year-round.", href: "/business-tax-intake" },
  { id: "irs",        label: "IRS Defense",    desc: "Enrolled Agent represents you before the IRS. Audits, notices, appeals.", href: "/contact" },
];

/* Bar chart data per service — 6 months of mock data (0–100) */
const BAR_DATA: Record<ServiceId, { vals: number[]; label: string; color: string }> = {
  individual:  { vals: [42, 68, 55, 82, 64, 91], label: "Avg. Refund Trend",  color: C.gold },
  business:    { vals: [58, 73, 88, 62, 95, 78], label: "Revenue Recognized", color: "#6ee7b7" },
  bookkeeping: { vals: [33, 52, 71, 89, 67, 84], label: "Books Reconciled",   color: "#93c5fd" },
  irs:         { vals: [85, 44, 63, 32, 57, 74], label: "Cases Resolved",     color: "#c4b5fd" },
};
const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* Status cards per service */
const STATUS_CARDS: Record<ServiceId, { title: string; value: string; sub: string; badge: string }> = {
  individual:  { title: "Avg. Federal Refund",  value: "$3,240",  sub: "for our individual clients",  badge: "Filed & Accepted ✓" },
  business:    { title: "Tax Savings Found",    value: "$12,800", sub: "avg. for S-Corp clients",      badge: "Strategy Applied ✓" },
  bookkeeping: { title: "Transactions Matched", value: "99.4%",   sub: "accuracy rate, last quarter",  badge: "Books Closed ✓" },
  irs:         { title: "Avg. Resolution Time", value: "18 days", sub: "IRS notice to resolution",    badge: "Case Closed ✓" },
};

/* Animated counter hook */
function useCounter(target: number, active: boolean, duration = 900) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const from = 0;
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * ease));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, active, duration]);
  return val;
}

/* Bar chart visual */
function BarChart({ service, visible }: { service: ServiceId; visible: boolean }) {
  const { vals, label, color } = BAR_DATA[service];
  const max = 100;
  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: "10px", fontWeight: 600, color: C.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
        {vals.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                width: "100%",
                height: visible ? `${(v / max) * 100}%` : "4px",
                background: color,
                borderRadius: "4px 4px 0 0",
                opacity: visible ? 0.85 : 0.2,
                transition: `height 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, opacity 0.4s ease ${i * 60}ms`,
                minHeight: "4px",
              }} />
            </div>
            <div style={{ fontSize: "9px", color: C.muted, whiteSpace: "nowrap" }}>{MONTHS[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Status card visual */
function StatusCard({ service, visible }: { service: ServiceId; visible: boolean }) {
  const card = STATUS_CARDS[service];

  // Parse numeric part for counter animation
  const numMatch = card.value.match(/[\d,]+/);
  const numStr = numMatch ? numMatch[0].replace(/,/g, "") : "";
  const numVal = parseInt(numStr, 10) || 0;
  const prefix = card.value.replace(/[\d,%.]+.*/, "");
  const suffix = card.value.replace(/^[^0-9]*[\d,]+/, "");
  const counted = useCounter(numVal, visible);

  const displayValue = numVal
    ? `${prefix}${counted.toLocaleString()}${suffix}`
    : card.value;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${C.border}`,
      borderRadius: "12px",
      padding: "20px 20px 16px",
      transition: "opacity 0.4s ease",
      opacity: visible ? 1 : 0.3,
    }}>
      <div style={{ fontSize: "11px", color: C.muted, marginBottom: "8px" }}>{card.title}</div>
      <div style={{ fontSize: "32px", fontWeight: 800, color: C.white, letterSpacing: "-1px", lineHeight: 1, marginBottom: "4px" }}>
        {displayValue}
      </div>
      <div style={{ fontSize: "11px", color: C.muted, marginBottom: "12px" }}>{card.sub}</div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)",
        color: "#6ee7b7", fontSize: "11px", fontWeight: 600,
        padding: "4px 10px", borderRadius: "20px",
      }}>
        {card.badge}
      </div>
    </div>
  );
}

export default function InteractiveShowcase() {
  const [active, setActive] = useState<ServiceId>("individual");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Re-trigger counter + bar animation on tab switch
  const [chartKey, setChartKey] = useState(0);
  function switchTab(id: ServiceId) {
    setVisible(false);
    setActive(id);
    setTimeout(() => { setVisible(true); setChartKey(k => k + 1); }, 60);
  }

  return (
    <section
      ref={ref}
      style={{ background: C.dark, padding: "96px 44px", borderTop: `1px solid ${C.border}` }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
            How it works
          </div>
          <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, color: C.white, letterSpacing: "-1px", lineHeight: 1.15, margin: 0, maxWidth: "500px" }}>
            See what we do for you.
          </h2>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "48px", alignItems: "start" }}>

          {/* LEFT — tab list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onMouseEnter={() => switchTab(tab.id)}
                  onClick={() => switchTab(tab.id)}
                  style={{
                    background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                    border: `1px solid ${isActive ? C.goldBorder : "transparent"}`,
                    borderRadius: "12px",
                    padding: "20px 24px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  {/* Tab indicator + label */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isActive ? "8px" : "0" }}>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: isActive ? C.gold : C.muted,
                      transition: "background 0.2s ease",
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: "15px", fontWeight: 700, color: isActive ? C.white : C.muted, transition: "color 0.2s ease" }}>
                      {tab.label}
                    </span>
                  </div>
                  {/* Expandable description */}
                  <div style={{
                    maxHeight: isActive ? "100px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
                    paddingLeft: "16px",
                  }}>
                    <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.65, margin: "0 0 12px" }}>
                      {tab.desc}
                    </p>
                    <Link
                      href={tab.href}
                      style={{ fontSize: "12px", fontWeight: 600, color: C.gold, display: "inline-flex", alignItems: "center", gap: "4px" }}
                    >
                      Get started
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — animated visual panel */}
          <div style={{
            background: C.darkMid,
            border: `1px solid ${C.border}`,
            borderRadius: "20px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "sticky",
            top: "88px",
          }}>
            {/* Panel header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: C.muted, letterSpacing: "1px", textTransform: "uppercase" }}>
                {TABS.find(t => t.id === active)?.label}
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => (
                  <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.7 }} />
                ))}
              </div>
            </div>

            {/* Status card with animated counter */}
            <StatusCard key={`${active}-status`} service={active} visible={visible} />

            {/* Bar chart */}
            <BarChart key={`${active}-chart-${chartKey}`} service={active} visible={visible} />

            {/* Bottom label */}
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", textAlign: "center", letterSpacing: "0.5px" }}>
              Sample data for illustration purposes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
