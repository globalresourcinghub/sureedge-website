import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";
import { C } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the team behind SureEdge, a Texas-based virtual tax services business with a licensed CPA and Enrolled Agent, serving individuals and small businesses nationwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | SureEdge Tax & Accounting",
    description: "Meet the team behind SureEdge, a Texas-based virtual tax services business with a licensed CPA and Enrolled Agent, serving individuals and small businesses nationwide.",
    url: "/about",
  },
};

const CREDENTIALS = [
  {
    abbr: "CPA",
    title: "Certified Public Accountant",
    desc: "Licensed for full accounting and tax services. The highest standard in the profession.",
  },
  {
    abbr: "EA",
    title: "IRS Enrolled Agent",
    desc: "Federally licensed to represent clients in all tax matters, including audits and appeals.",
  },
  {
    abbr: "100%",
    title: "Virtual Service",
    desc: "Serving clients in all 50 states from Texas. No office visit ever required.",
  },
  {
    abbr: "∞",
    title: "Year-Round Access",
    desc: "Available all year, not just at tax time. We plan proactively so surprises don't happen.",
  },
];

const VALUES = [
  {
    title: "Transparency",
    desc: "Flat-fee pricing, no surprise bills. You know exactly what you'll pay before we start.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: "Accessibility",
    desc: "You get direct access: email and phone, no phone trees or voicemail loops. Real people, real answers.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.07 6.07l1.04-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    title: "Precision",
    desc: "Every return reviewed for accuracy before filing. Every deduction examined. No corners cut.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    title: "Partnership",
    desc: "We think about your taxes all year, not just in April. Strategy, planning, and peace of mind.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function About() {
  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <section
        className="hero-gradient"
        style={{ position: "relative", overflow: "hidden", padding: "96px 44px 80px" }}
      >
        {/* Dot grid */}
        <div className="hero-dot-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

        {/* Gold glow */}
        <div style={{
          position: "absolute", top: "-10%", right: "10%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "72px", alignItems: "center" }}>

            {/* Left */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
                color: C.gold, fontSize: "11px", fontWeight: 600,
                letterSpacing: "2px", textTransform: "uppercase",
                padding: "6px 14px", borderRadius: "20px", marginBottom: "28px",
              }}>
                <span style={{ width: "6px", height: "6px", background: C.gold, borderRadius: "50%", display: "inline-block" }} />
                Texas-Based · Licensed CPA &amp; EA
              </div>

              <h1 style={{
                fontSize: "clamp(38px,5vw,64px)",
                fontWeight: 800,
                color: C.white,
                lineHeight: 1.08,
                letterSpacing: "-2px",
                marginBottom: "24px",
              }}>
                Tax services built<br />
                <span style={{ color: C.gold }}>for real people.</span>
              </h1>

              <p style={{
                fontSize: "clamp(15px,1.3vw,17px)",
                color: C.muted,
                lineHeight: 1.75,
                maxWidth: "480px",
                marginBottom: "40px",
              }}>
                SureEdge was founded on a simple belief: every individual and small
                business deserves the quality of tax services that big firms reserve for
                their largest clients. We deliver that, virtually, nationwide, at a fair flat fee.
              </p>

              {/* Trust pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["Licensed CPA & Enrolled Agent", "All 50 States", "Flat-Fee Pricing", "Year-Round Support"].map(t => (
                  <span key={t} style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.75)", fontSize: "12px", fontWeight: 500,
                    padding: "6px 14px", borderRadius: "20px",
                  }}>
                    <span style={{ color: C.gold, fontWeight: 700 }}>✓</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — advisor photo */}
            <div style={{ position: "relative" }}>
              {/* Gold accent ring */}
              <div style={{
                position: "absolute", top: "-12px", right: "-12px",
                width: "100%", height: "100%",
                border: `2px solid ${C.goldBorder}`,
                borderRadius: "20px",
                pointerEvents: "none",
              }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=560&h=640&fit=crop&crop=top&auto=format&q=80"
                alt="Tax professional at work"
                width={420}
                height={480}
                style={{
                  width: "100%", height: "480px",
                  objectFit: "cover", borderRadius: "16px",
                  display: "block",
                  border: `1px solid rgba(255,255,255,0.08)`,
                }}
              />
              {/* Online / availability badge */}
              <div style={{
                position: "absolute", bottom: "24px", left: "-16px",
                background: C.white, borderRadius: "12px",
                padding: "10px 16px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                display: "flex", alignItems: "center", gap: "10px",
                border: `1px solid ${C.borderLight}`,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 8px #6ee7b7", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: C.textDark }}>Currently accepting clients</div>
                  <div style={{ fontSize: "10px", color: C.mutedDark, marginTop: "1px" }}>Free quote in 2 business days</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CREDENTIALS BAR ══════════════════════════════════════════ */}
      <div style={{ background: C.navy, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 44px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {CREDENTIALS.map((c, i) => (
            <div key={c.abbr} style={{
              padding: "28px 24px",
              borderRight: i < CREDENTIALS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{ fontSize: "26px", fontWeight: 800, color: C.gold, letterSpacing: "-0.5px", marginBottom: "4px" }}>{c.abbr}</div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: C.white, marginBottom: "6px" }}>{c.title}</div>
              <div style={{ fontSize: "11px", color: C.muted, lineHeight: 1.55 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ OUR STORY ════════════════════════════════════════════════ */}
      <section style={{ background: C.offWhite, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Photo */}
            <ScrollReveal>
              <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=480&fit=crop&crop=center&auto=format&q=80"
                  alt="Working together on tax planning"
                  width={600}
                  height={420}
                  style={{
                    width: "100%", height: "420px",
                    objectFit: "cover", borderRadius: "16px",
                    display: "block",
                    border: `1px solid ${C.borderLight}`,
                    boxShadow: "0 16px 60px rgba(26,46,74,0.10)",
                  }}
                />
                {/* Floating stat */}
                <div style={{
                  position: "absolute", bottom: "-20px", right: "24px",
                  background: C.white, borderRadius: "12px",
                  padding: "16px 20px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                  border: `1px solid ${C.borderLight}`,
                  display: "flex", alignItems: "center", gap: "14px",
                }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: C.textDark, letterSpacing: "-0.5px" }}>2-Day</div>
                    <div style={{ fontSize: "10px", color: C.mutedDark }}>Quote response</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Story text */}
            <div>
              <ScrollReveal>
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                  Our story
                </div>
                <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "24px" }}>
                  A family practice with big-firm expertise.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={60}>
                <p style={{ fontSize: "15px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "16px" }}>
                  SureEdge Tax &amp; Accounting was founded on a simple belief: every individual and
                  small business deserves the quality of tax and accounting services that larger
                  firms provide their biggest clients.
                </p>
                <p style={{ fontSize: "15px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "16px" }}>
                  We are a family-run practice based in Texas, with a licensed CPA and Enrolled
                  Agent on our team. We serve our clients as a true partner, not just a
                  once-a-year tax preparer.
                </p>
                <p style={{ fontSize: "15px", color: C.mutedDark, lineHeight: 1.75, marginBottom: "32px" }}>
                  Operating 100% virtually means we serve clients across the entire country
                  while keeping overhead low and passing those savings directly to you.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <div style={{
                  padding: "20px 24px",
                  background: C.white,
                  borderTop: `1px solid ${C.borderLight}`,
                  borderRight: `1px solid ${C.borderLight}`,
                  borderBottom: `1px solid ${C.borderLight}`,
                  borderLeft: `3px solid ${C.gold}`,
                  borderRadius: "0 12px 12px 0",
                }}>
                  <p style={{ fontSize: "14px", fontStyle: "italic", color: C.textDark, lineHeight: 1.6, margin: 0 }}>
                    "Delivered personally, accessibly, and affordably. Every client, every time."
                  </p>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ══ VALUES ═══════════════════════════════════════════════════ */}
      <section style={{ background: C.dark, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                What we stand for
              </div>
              <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: C.white, letterSpacing: "-1px", lineHeight: 1.15, margin: "0 auto", maxWidth: "540px" }}>
                The values that guide every engagement.
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "24px" }}>
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 60}>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex", gap: "20px", alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {v.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{v.title}</div>
                    <div style={{ fontSize: "13px", color: C.muted, lineHeight: 1.65 }}>{v.desc}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM PHOTO STRIP ══════════════════════════════════════════ */}
      <section style={{ background: C.offWhite, padding: "96px 44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

            {/* Text */}
            <div>
              <ScrollReveal>
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                  How we work
                </div>
                <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "24px" }}>
                  Personal service at every step.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={60}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    { step: "01", title: "Free quote in 2 business days", desc: "Tell us about your situation. We respond fast with a clear, flat-fee proposal." },
                    { step: "02", title: "Secure document upload", desc: "Upload your documents from any device via our encrypted client portal." },
                    { step: "03", title: "CPA review & preparation", desc: "Your licensed CPA reviews everything, identifies every deduction, and prepares your return." },
                    { step: "04", title: "Review, sign, and file", desc: "You review your return, e-sign in the portal, and we file electronically. Done." },
                  ].map((s, i) => (
                    <div key={s.step} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "10px",
                        background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: C.gold }}>{s.step}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: C.textDark, marginBottom: "4px" }}>{s.title}</div>
                        <div style={{ fontSize: "12px", color: C.mutedDark, lineHeight: 1.6 }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Photo */}
            <ScrollReveal delay={100}>
              <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=500&fit=crop&crop=center&auto=format&q=80"
                  alt="Professional tax consultation"
                  width={600}
                  height={460}
                  style={{
                    width: "100%", height: "460px",
                    objectFit: "cover", borderRadius: "16px",
                    display: "block",
                    border: `1px solid ${C.borderLight}`,
                    boxShadow: "0 16px 60px rgba(26,46,74,0.10)",
                  }}
                />
                {/* Active badge */}
                <div style={{
                  position: "absolute", top: "20px", left: "20px",
                  background: C.white, borderRadius: "10px",
                  padding: "10px 14px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                  border: `1px solid ${C.borderLight}`,
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 6px #6ee7b7" }} />
                  <span style={{ fontSize: "11px", fontWeight: 600, color: C.textDark }}>Available nationwide</span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════ */}
      <section
        className="hero-gradient"
        style={{ padding: "80px 44px", position: "relative", overflow: "hidden" }}
      >
        <div style={{
          position: "absolute", top: "-20%", right: "5%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <ScrollReveal>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>
              Get started today
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 800, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "16px" }}>
              Ready to work together?
            </h2>
            <p style={{ fontSize: "15px", color: C.muted, lineHeight: 1.7, marginBottom: "40px", maxWidth: "440px", margin: "0 auto 40px" }}>
              Get a free, personalized quote within 2 business days. No commitment required.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              <Link
                href="/tax-intake"
                className="btn-gold"
                style={{
                  background: C.gold, color: C.dark,
                  fontSize: "14px", fontWeight: 700,
                  padding: "14px 36px", borderRadius: "8px",
                  letterSpacing: "0.1px",
                }}
              >
                Get a Free Quote
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="btn-ghost"
                style={{
                  background: "transparent", color: C.white,
                  fontSize: "14px", fontWeight: 500,
                  padding: "14px 36px", borderRadius: "8px",
                  border: "1.5px solid rgba(255,255,255,0.22)",
                }}
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
