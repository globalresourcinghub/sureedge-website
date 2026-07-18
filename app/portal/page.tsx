import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { C } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Manage your return, upload documents from any device, message your tax pro directly, and access a free financial planning dashboard. All in the SureEdge client portal.",
  alternates: { canonical: "/portal" },
  openGraph: {
    title: "Client Portal | SureEdge Tax & Advisory",
    description: "Upload documents, message your tax pro, track your return, and access 6 free financial tools. All in one secure place.",
    url: "/portal",
  },
};

const NAV = ["Dashboard", "Returns", "Books", "Tools", "Documents", "Messages"];

function PortalNav({ active }: { active: number }) {
  return (
    <div style={{ background: C.navy, padding: "11px 18px", display: "flex", alignItems: "center", gap: "14px", overflow: "hidden" }}>
      <span style={{ color: C.gold, fontWeight: 800, fontSize: "12px", flexShrink: 0 }}>SureEdge</span>
      <div style={{ display: "flex", gap: "12px", overflow: "hidden" }}>
        {NAV.map((item, i) => (
          <span key={item} style={{
            color: i === active ? C.gold : "rgba(255,255,255,0.38)",
            fontSize: "10px", fontWeight: i === active ? 600 : 400,
            borderBottom: i === active ? `2px solid ${C.gold}` : "2px solid transparent",
            paddingBottom: "2px", whiteSpace: "nowrap",
          }}>{item}</span>
        ))}
      </div>
      <div style={{ marginLeft: "auto", width: "24px", height: "24px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: "8px", fontWeight: 700, color: C.gold }}>SK</span>
      </div>
    </div>
  );
}

function SampleNote() {
  return (
    <div style={{ marginTop: "16px", fontSize: "10px", color: C.muted, textAlign: "center", letterSpacing: "0.5px" }}>
      Sample data for illustration purposes
    </div>
  );
}

function SampleBadge({ light = false }: { light?: boolean }) {
  return (
    <span style={{
      fontSize: "9px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
      color: light ? C.mutedDark : "rgba(255,255,255,0.62)",
      background: light ? "rgba(26,46,74,0.06)" : "rgba(255,255,255,0.08)",
      border: `1px solid ${light ? "rgba(26,46,74,0.18)" : "rgba(255,255,255,0.2)"}`,
      padding: "2px 7px", borderRadius: "10px", whiteSpace: "nowrap",
    }}>
      Sample
    </span>
  );
}

function DashboardMock() {
  const steps = [
    { label: "Intake form completed", done: true, active: false },
    { label: "Documents received", done: true, active: false },
    { label: "Under expert review", done: true, active: true },
    { label: "E-filed to IRS", done: false, active: false },
    { label: "Refund received", done: false, active: false },
  ];
  return (
    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, boxShadow: "0 24px 80px rgba(26,46,74,0.16)", overflow: "hidden" }}>
      <PortalNav active={0} />
      <div style={{ padding: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ fontSize: "15px", fontWeight: 800, color: C.textDark }}>Welcome back, Sarah K.</div>
          <SampleBadge light />
        </div>
        <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px", marginBottom: "16px" }}>Tax Year 2024 · Under Review by your tax pro</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "14px" }}>
          {[
            { label: "Est. Refund", val: "$3,240", color: C.gold },
            { label: "Progress",    val: "94%",    color: C.textDark },
            { label: "Documents",   val: "4 / 5",  color: C.green },
          ].map(s => (
            <div key={s.label} style={{ background: C.offWhite, borderRadius: "8px", padding: "10px 12px", border: `1px solid ${C.borderLight}` }}>
              <div style={{ fontSize: "9px", color: C.muted, marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: s.color, letterSpacing: "-0.5px" }}>{s.val}</div>
            </div>
          ))}
        </div>
        <div style={{ height: "4px", background: C.borderLight, borderRadius: "2px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ width: "94%", height: "100%", background: `linear-gradient(90deg, ${C.gold}, #e8c56a)`, borderRadius: "2px" }} />
        </div>
        <div style={{ fontSize: "9px", color: C.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>Return Timeline</div>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 0", borderBottom: i < 4 ? `1px solid ${C.borderLight}` : "none" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: s.done ? "rgba(110,231,183,0.15)" : "rgba(0,0,0,0.03)", border: `1px solid ${s.done ? "rgba(110,231,183,0.4)" : C.borderLight}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {s.done && <span style={{ fontSize: "7px", color: C.green }}>✓</span>}
            </div>
            <span style={{ flex: 1, fontSize: "11px", color: s.active ? C.textDark : s.done ? C.mutedDark : C.muted, fontWeight: s.active ? 700 : 400 }}>{s.label}</span>
            {s.active && <span style={{ fontSize: "9px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, padding: "2px 6px", borderRadius: "10px", flexShrink: 0 }}>Active</span>}
          </div>
        ))}
        <SampleNote />
      </div>
    </div>
  );
}

function DocumentUploadMock() {
  const files = [
    { name: "W-2 · Employer Inc.",         status: "Received",  statusColor: C.green, time: "2h ago"     },
    { name: "1099-NEC · Freelance Work",   status: "Received",  statusColor: C.green, time: "Yesterday"  },
    { name: "1099-INT · First National",   status: "Received",  statusColor: C.green, time: "Mar 1"      },
    { name: "1099-B · Brokerage",          status: "Received",  statusColor: C.green, time: "Feb 28"     },
    { name: "Schedule B",                  status: "Requested", statusColor: C.gold,  time: "Pending"    },
  ];
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, boxShadow: "0 24px 80px rgba(0,0,0,0.35)", overflow: "hidden" }}>
      <PortalNav active={4} />
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ fontSize: "13px", fontWeight: 800, color: C.white }}>Documents</div>
          <div style={{ fontSize: "10px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>+ Upload</div>
        </div>
        {/* Upload options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "14px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1.5px dashed rgba(255,255,255,0.14)", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "5px" }}>💻</div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: C.white, marginBottom: "2px" }}>From computer</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>Drag & drop or browse</div>
          </div>
          <div style={{ background: C.goldSoft, border: `1.5px dashed ${C.goldBorder}`, borderRadius: "10px", padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "5px" }}>📱</div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: C.gold, marginBottom: "2px" }}>From phone</div>
            <div style={{ fontSize: "9px", color: "rgba(201,168,76,0.5)" }}>Snap & upload instantly</div>
          </div>
        </div>
        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Tax Year 2024 · 4 of 5 uploaded</div>
        {files.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "5px", background: f.status === "Requested" ? C.goldSoft : "rgba(255,255,255,0.05)", border: `1px solid ${f.status === "Requested" ? C.goldBorder : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "7px", color: f.status === "Requested" ? C.gold : "rgba(255,255,255,0.35)" }}>{f.status === "Requested" ? "?" : "PDF"}</span>
            </div>
            <span style={{ flex: 1, fontSize: "10px", color: C.white, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
            <span style={{ fontSize: "9px", color: f.statusColor, fontWeight: 600, flexShrink: 0 }}>{f.status}</span>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.18)", flexShrink: 0 }}>{f.time}</span>
          </div>
        ))}
        <div style={{ marginTop: "10px", padding: "7px 10px", background: "rgba(110,231,183,0.05)", border: "1px solid rgba(110,231,183,0.14)", borderRadius: "7px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px" }}>🔒</span>
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)" }}>All uploads encrypted · 256-bit AES · Secure storage</span>
        </div>
      </div>
    </div>
  );
}

function IdentityMock() {
  const checks = [
    { label: "Email address verified",       detail: "sarah@example.com"              },
    { label: "Government ID uploaded",       detail: "Driver's License · expires 2028" },
    { label: "Identity confirmed by our team", detail: "Reviewed and approved"           },
    { label: "Two-factor authentication",    detail: "SMS to ···· 4821 · Enabled"     },
  ];
  return (
    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, boxShadow: "0 24px 80px rgba(26,46,74,0.16)", overflow: "hidden" }}>
      <PortalNav active={0} />
      <div style={{ padding: "22px" }}>
        <div style={{ fontSize: "13px", fontWeight: 800, color: C.textDark, marginBottom: "3px" }}>Identity & Security</div>
        <div style={{ fontSize: "11px", color: C.muted, marginBottom: "14px" }}>Your account is fully verified and secured</div>
        <div style={{ background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.3)", borderRadius: "10px", padding: "11px 14px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "rgba(110,231,183,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "12px" }}>✓</span>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#166534" }}>Identity Verified</div>
            <div style={{ fontSize: "10px", color: "#4ade80" }}>Confirmed Jan 15, 2025</div>
          </div>
        </div>
        {checks.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "9px 0", borderBottom: i < 3 ? `1px solid ${C.borderLight}` : "none" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(110,231,183,0.15)", border: "1px solid rgba(110,231,183,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
              <span style={{ fontSize: "8px", color: "#22c55e" }}>✓</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: C.textDark }}>{item.label}</div>
              <div style={{ fontSize: "10px", color: C.muted }}>{item.detail}</div>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "12px", padding: "10px 12px", background: C.offWhite, borderRadius: "8px", border: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "9px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "2px" }}>Last Login</div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.textDark }}>Today, 9:41 AM · Austin, TX</div>
          </div>
          <div style={{ fontSize: "10px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>Secure</div>
        </div>
      </div>
    </div>
  );
}

function PlannerMock() {
  const stats = [
    { label: "NET WORTH",        val: "$284,200",  color: "#b8962e" },
    { label: "ANNUAL INCOME",   val: "$124,000",  color: C.textDark },
    { label: "ANNUAL EXPENSES", val: "$89,400",   color: C.textDark },
    { label: "TOTAL ASSETS",    val: "$318,500",  color: C.textDark },
    { label: "GOALS SET",       val: "4",         color: C.textDark },
    { label: "CASH FLOW",       val: "+$34,600",  color: "#16a34a"  },
  ];
  const navItems = ["Dashboard", "Income", "Expenses", "Assets & Debts", "Goals", "Scenarios"];
  return (
    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, boxShadow: "0 24px 80px rgba(26,46,74,0.16)", overflow: "hidden" }}>
      <PortalNav active={-1} />
      {/* Planner sub-nav */}
      <div style={{ background: C.offWhite, borderBottom: `1px solid ${C.borderLight}`, padding: "8px 18px", display: "flex", gap: "12px", overflow: "hidden" }}>
        {navItems.map((item, i) => (
          <span key={item} style={{
            fontSize: "10px", fontWeight: i === 0 ? 700 : 400,
            color: i === 0 ? C.gold : C.muted,
            borderBottom: i === 0 ? `2px solid ${C.gold}` : "2px solid transparent",
            paddingBottom: "4px", whiteSpace: "nowrap", cursor: "pointer",
          }}>{item}</span>
        ))}
      </div>
      <div style={{ padding: "18px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: C.textDark }}>Your Household</div>
            <SampleBadge light />
          </div>
          <div style={{ fontSize: "10px", color: C.muted, marginTop: "1px" }}>Financial Planning Dashboard</div>
        </div>
        {/* Onboarding banner */}
        <div style={{ background: C.navy, borderRadius: "8px", padding: "10px 14px", marginBottom: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, color: C.white, marginBottom: "1px" }}>Set up your plan in 5 minutes</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.45)" }}>Answer a few questions and we&apos;ll build your first financial projection.</div>
          </div>
          <div style={{ background: C.gold, color: C.dark, fontSize: "9px", fontWeight: 700, padding: "5px 10px", borderRadius: "5px", flexShrink: 0 }}>
            Start Setup →
          </div>
        </div>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "7px", marginBottom: "12px" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: C.offWhite, borderRadius: "7px", padding: "9px 10px", border: `1px solid ${C.borderLight}` }}>
              <div style={{ fontSize: "7px", color: C.muted, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: "3px" }}>{s.label}</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: s.color, letterSpacing: "-0.3px", lineHeight: 1 }}>{s.val}</div>
            </div>
          ))}
        </div>
        {/* Quick-start checklist */}
        <div style={{ background: C.offWhite, borderRadius: "7px", padding: "10px 12px", border: `1px solid ${C.borderLight}` }}>
          <div style={{ fontSize: "8px", fontWeight: 700, color: C.textDark, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "7px" }}>Quick-Start Checklist</div>
          {[
            "Add your income sources",
            "Add your expenses",
            "Add your assets & debts",
            "Set your financial goals",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "3px 0" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", border: `1.5px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: C.gold }} />
              </div>
              <span style={{ fontSize: "10px", color: C.gold }}>{item}</span>
            </div>
          ))}
        </div>
        <SampleNote />
      </div>
    </div>
  );
}

function MessagesMock() {
  return (
    <div style={{ background: C.darkMid, borderRadius: "16px", border: `1px solid ${C.border}`, boxShadow: "0 24px 80px rgba(0,0,0,0.35)", overflow: "hidden" }}>
      <PortalNav active={5} />
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <div style={{ fontSize: "13px", fontWeight: 800, color: C.white }}>Messages</div>
          <div style={{ background: C.gold, color: C.dark, fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "10px" }}>1 new</div>
          <SampleBadge />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Tax pro message */}
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "7px", fontWeight: 700, color: C.gold }}>SE</span>
            </div>
            <div style={{ maxWidth: "78%" }}>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>Your Tax Pro · 10:15 AM</div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "0 10px 10px 10px", padding: "9px 11px", fontSize: "11px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                Hi Sarah! I&apos;ve reviewed your W-2 and 1099-NEC. Just need your 1099-INT from your bank and we&apos;re all set!
              </div>
            </div>
          </div>
          {/* Client reply */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: "70%" }}>
              <div style={{ background: C.goldSoft, border: `1px solid ${C.goldBorder}`, borderRadius: "10px 0 10px 10px", padding: "9px 11px", fontSize: "11px", color: C.gold, lineHeight: 1.6 }}>
                Just uploaded it! Give me 2 minutes.
              </div>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", textAlign: "right", marginTop: "3px" }}>10:17 AM · Delivered</div>
            </div>
          </div>
          {/* Tax pro response */}
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "7px", fontWeight: 700, color: C.gold }}>SE</span>
            </div>
            <div style={{ maxWidth: "78%" }}>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "0 10px 10px 10px", padding: "9px 11px", fontSize: "11px", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                Got it! You&apos;re looking at a <span style={{ color: C.gold, fontWeight: 600 }}>$3,240 refund</span>. Filing tonight! 🎉
              </div>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", marginTop: "3px" }}>10:19 AM</div>
            </div>
          </div>
        </div>
        {/* Input */}
        <div style={{ marginTop: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ flex: 1, fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>Type a message...</span>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", color: C.dark, fontWeight: 700 }}>→</span>
          </div>
        </div>
        <SampleNote />
      </div>
    </div>
  );
}

function Bullet({ text, dark }: { text: string; dark: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: dark ? "rgba(110,231,183,0.12)" : C.goldSoft, border: `1px solid ${dark ? "rgba(110,231,183,0.3)" : C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
        <span style={{ fontSize: "9px", color: dark ? C.green : C.gold, fontWeight: 700 }}>✓</span>
      </div>
      <span style={{ fontSize: "14px", color: dark ? "rgba(255,255,255,0.7)" : C.mutedDark, lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

export default function PortalPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-gradient" style={{ padding: "96px 44px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <ScrollReveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "6px 14px", borderRadius: "20px", marginBottom: "32px" }}>
              <span style={{ width: "6px", height: "6px", background: C.gold, borderRadius: "50%", display: "inline-block" }} />
              Client Portal
            </div>
            <h1 style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 800, color: C.white, letterSpacing: "-2.5px", lineHeight: 1.05, marginBottom: "20px" }}>
              Everything you need,<br />in one secure place.
            </h1>
            <p style={{ fontSize: "clamp(15px,1.4vw,18px)", color: C.muted, lineHeight: 1.75, maxWidth: "560px", margin: "0 auto 40px" }}>
              Track your return, upload documents from any device, message your tax pro directly, and access a free financial planning dashboard. All in one place.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              <Link href="https://portal.sureedgetax.com/register" className="btn-gold" style={{ background: C.gold, color: C.dark, fontSize: "14px", fontWeight: 700, padding: "14px 32px", borderRadius: "8px" }}>
                Create your free account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="https://portal.sureedgetax.com/login" className="btn-ghost" style={{ background: "transparent", color: C.white, fontSize: "14px", fontWeight: 500, padding: "14px 32px", borderRadius: "8px", border: "1.5px solid rgba(255,255,255,0.22)" }}>
                Already a client? Log in
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Capabilities bar ── */}
      <div style={{ background: C.navy, borderBottom: `1px solid ${C.border}`, display: "flex" }}>
        {[
          { icon: "🔒", label: "Bank-level encryption" },
          { icon: "📱", label: "Upload from any device" },
          { icon: "💬", label: "Direct tax pro messaging" },
          { icon: "📊", label: "Financial planning dashboard" },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "18px 16px", borderRight: i < 3 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px" }}>{item.icon}</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Section 1: Dashboard & Return Tracking ── */}
      <section style={{ background: C.offWhite, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
              <DashboardMock />
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "14px" }}>Return tracking</div>
                <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "16px" }}>
                  Know exactly where<br />your return stands.
                </h2>
                <p style={{ fontSize: "15px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "24px" }}>
                  See every step from intake to IRS acceptance, without calling or waiting for a reply. Your estimated refund is visible the moment your tax pro starts.
                </p>
                {[
                  "Step-by-step timeline: intake → review → e-filed → accepted",
                  "Estimated refund visible from day one",
                  "Document checklist shows exactly what&apos;s still needed",
                  "Automatic notifications at every milestone",
                ].map((b, i) => <Bullet key={i} text={b.replace(/&apos;/g, "'")} dark={false} />)}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 2: Document Upload ── */}
      <section style={{ background: C.dark, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "14px" }}>Document upload</div>
                <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: C.white, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "16px" }}>
                  Upload from your laptop,<br />phone, or tablet.
                </h2>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "24px" }}>
                  Snap a photo of your W-2 or 1099 on your phone and it goes straight to your tax pro. No scanner, no fax, no printing anything. We accept PDFs, photos, and scans.
                </p>
                {[
                  "Drag & drop or browse files from your computer",
                  "Snap & upload from your phone. No scanner needed.",
                  "All file types accepted: PDF, JPG, PNG, HEIC",
                  "Auto-organized by tax year and document type",
                  "256-bit AES encrypted in transit and at rest",
                ].map((b, i) => <Bullet key={i} text={b} dark={true} />)}
              </div>
              <DocumentUploadMock />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 3: Identity & Security ── */}
      <section style={{ background: C.offWhite, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
              <IdentityMock />
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "14px" }}>Identity & security</div>
                <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "16px" }}>
                  Bank-level security<br />for your tax data.
                </h2>
                <p style={{ fontSize: "15px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "24px" }}>
                  Your tax return contains your most sensitive financial data. We verify your identity at signup and protect every session with multi-factor authentication.
                </p>
                {[
                  "Government ID verification at account setup",
                  "Two-factor authentication on every login",
                  "Every session logged with device and location",
                  "Data never sold or shared with any third party",
                  "SOC 2-aligned infrastructure and access controls",
                ].map((b, i) => <Bullet key={i} text={b} dark={false} />)}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 4: Tax Pro Messaging ── */}
      <section style={{ background: C.dark, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "14px" }}>Direct messaging</div>
                <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: C.white, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "16px" }}>
                  Talk to your tax pro,<br />not a phone tree.
                </h2>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "24px" }}>
                  Message your tax pro directly inside the portal. Ask questions, share context, get answers with full conversation history always at your fingertips.
                </p>
                {[
                  "Direct line to your tax pro. No call centers or assistants.",
                  "Attach documents or photos directly in a message",
                  "Full conversation history, always searchable",
                  "Tax pro responses within 2 business days",
                  "All messages encrypted and securely stored",
                ].map((b, i) => <Bullet key={i} text={b} dark={true} />)}
              </div>
              <MessagesMock />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 5: Financial Planning Dashboard ── */}
      <section style={{ background: C.offWhite, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>
              <PlannerMock />
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "14px" }}>Financial planning</div>
                <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "16px" }}>
                  Your complete financial<br />picture, in one place.
                </h2>
                <p style={{ fontSize: "15px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "24px" }}>
                  Every client account includes a full household financial planning dashboard. Track your net worth, set goals, model retirement scenarios, and understand your financial picture — all without a separate subscription or advisor fee.
                </p>
                {[
                  "Net worth and total asset tracking",
                  "Budget categories and monthly cash flow",
                  "Goal projections and retirement scenarios",
                  "Social Security claiming strategy estimator",
                  "College savings planner",
                ].map((b, i) => <Bullet key={i} text={b} dark={false} />)}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hero-gradient" style={{ padding: "96px 44px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <ScrollReveal>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>Get started free</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "16px" }}>Your portal is ready when you are.</h2>
            <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.7, marginBottom: "40px" }}>
              Create a free account and your tax pro will be in touch within 2 business days.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              <Link href="https://portal.sureedgetax.com/register" className="btn-gold" style={{ background: C.gold, color: C.dark, fontSize: "15px", fontWeight: 700, padding: "16px 40px", borderRadius: "9px" }}>
                Create your free account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="https://portal.sureedgetax.com/login" className="btn-ghost" style={{ background: "transparent", color: C.white, fontSize: "15px", fontWeight: 500, padding: "16px 40px", borderRadius: "9px", border: "1.5px solid rgba(255,255,255,0.22)" }}>
                Log in
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
