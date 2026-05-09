import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const C = {
  dark: "#0B1929", navy: "#1a2e4a", darkMid: "#0f2035",
  gold: "#C9A84C", goldSoft: "rgba(201,168,76,0.12)", goldBorder: "rgba(201,168,76,0.28)",
  offWhite: "#F8F7F4", white: "#FFFFFF", textDark: "#1a2e4a",
  muted: "#8A9BB0", mutedDark: "#6b7a8d",
  borderLight: "#EDEAE3", border: "rgba(255,255,255,0.08)",
  green: "#6ee7b7", blue: "#93c5fd", violet: "#c4b5fd",
};

const NAV_ITEMS = ["Dashboard", "Returns", "Books", "Tools", "Documents", "Messages"];

const ACTIVITY = [
  { icon: "✓", color: C.green,  text: "W-2 from Employer uploaded",       time: "2h ago" },
  { icon: "✓", color: C.green,  text: "1099-NEC added to your return",     time: "Yesterday" },
  { icon: "●", color: C.gold,   text: "Schedule B requested by your CPA",  time: "Pending" },
  { icon: "💬", color: C.blue,  text: "Message from CPA: \"Almost done!\"",time: "1h ago" },
];

const TOOLS = ["Tax Bracket", "Roth IRA", "Quarterly Tax", "+ 3 more"];

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
      <div style={{ background: C.navy, padding: "13px 20px", display: "flex", alignItems: "center", gap: "20px", overflow: "hidden" }}>
        <span style={{ color: C.gold, fontWeight: 800, fontSize: "13px", letterSpacing: "-0.2px", flexShrink: 0 }}>SureEdge</span>
        <div style={{ display: "flex", gap: "16px", overflow: "hidden" }}>
          {NAV_ITEMS.map((item, i) => (
            <span key={item} style={{
              color: i === 0 ? C.gold : "rgba(255,255,255,0.45)",
              fontSize: "11px", fontWeight: i === 0 ? 600 : 400,
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

      <div style={{ padding: "24px" }}>
        {/* Welcome */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "16px", fontWeight: 800, color: C.textDark, letterSpacing: "-0.3px" }}>Welcome back, Sarah K.</div>
          <div style={{ fontSize: "12px", color: C.muted, marginTop: "3px" }}>Tax Year 2024 · Under Review by your CPA</div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "20px" }}>
          {[
            { label: "Est. Refund", val: "$3,240", color: C.gold },
            { label: "Progress",    val: "94%",    color: C.textDark },
            { label: "Documents",   val: "4 / 5",  color: C.green },
          ].map(s => (
            <div key={s.label} style={{ background: C.offWhite, borderRadius: "10px", padding: "12px 14px", border: `1px solid ${C.borderLight}` }}>
              <div style={{ fontSize: "10px", color: C.muted, marginBottom: "5px" }}>{s.label}</div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: s.color, letterSpacing: "-0.5px", lineHeight: 1 }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{ height: "6px", background: C.borderLight, borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "94%", height: "100%", background: `linear-gradient(90deg, ${C.gold}, #e8c56a)`, borderRadius: "3px" }} />
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "10px" }}>Recent Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "9px 0", borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: `${a.color}18`, border: `1px solid ${a.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  <span style={{ fontSize: "8px" }}>{a.icon}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "12px", color: C.textDark, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.text}</div>
                </div>
                <div style={{ fontSize: "10px", color: C.muted, flexShrink: 0 }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Free tools row */}
        <div>
          <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "8px" }}>Free Financial Tools</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {TOOLS.map(tool => (
              <div key={tool} style={{
                background: tool.startsWith("+") ? C.goldSoft : C.offWhite,
                border: `1px solid ${tool.startsWith("+") ? C.goldBorder : C.borderLight}`,
                color: tool.startsWith("+") ? C.gold : C.mutedDark,
                fontSize: "10px", fontWeight: 600,
                padding: "4px 10px", borderRadius: "10px",
              }}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: "Real-time return tracking",
    desc: "See every step — intake, CPA review, e-filed, accepted — without calling. Estimated refund visible from day one.",
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
                Your finances,<br />always within reach.
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
