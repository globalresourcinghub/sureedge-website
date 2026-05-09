import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import HeroParallax from "@/components/HeroParallax";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import StickyFeatures from "@/components/StickyFeatures";
import ServiceFeatures from "@/components/ServiceFeatures";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";

/* ── Design tokens ─────────────────────────────── */
const C = {
  dark:       "#0B1929",
  darkMid:    "#0f2035",
  navy:       "#1a2e4a",
  gold:       "#C9A84C",
  goldSoft:   "rgba(201,168,76,0.12)",
  goldBorder: "rgba(201,168,76,0.28)",
  offWhite:   "#F8F7F4",
  white:      "#FFFFFF",
  muted:      "#8A9BB0",
  textDark:   "#1a2e4a",
  borderDark: "rgba(255,255,255,0.08)",
  borderLight:"#EDEAE3",
};

/* ── Data ───────────────────────────────────────── */

const features = [
  {
    title: "CPA & Enrolled Agent",
    desc: "Dual credentials covering every aspect of tax preparation and IRS representation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: "Direct Access",
    desc: "You talk to the CPA directly. No call centers, no junior staff, no waiting.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    title: "100% Virtual",
    desc: "Based in Texas, serving clients nationwide. No office visit ever required.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: "Year-Round Support",
    desc: "We are here all year for proactive planning — not just at tax time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
];

const stats = [
  { val: "CPA & EA",    lbl: "Dual Credentials" },
  { val: "100%",        lbl: "Virtual Service"   },
  { val: "Nationwide",  lbl: "Client Coverage"   },
  { val: "2 Days",      lbl: "Quote Response"    },
];


/* ── Page ───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <HeroParallax>
      <section
        className="hero-gradient"
        style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}
      >
        {/* Dot grid overlay */}
        <div
          className="hero-dot-grid"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        {/* Gold radial glow */}
        <div style={{
          position: "absolute", top: "-10%", left: "60%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "0", left: "20%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(29,78,216,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "80px 44px" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
            color: C.gold, fontSize: "11px", fontWeight: 600,
            letterSpacing: "2px", textTransform: "uppercase",
            padding: "6px 14px", borderRadius: "20px", marginBottom: "32px",
            animation: "fadeIn 0.6s ease forwards",
          }}>
            <span style={{ width: "6px", height: "6px", background: C.gold, borderRadius: "50%", display: "inline-block" }} />
            CPA &amp; EA · Virtual · Nationwide
          </div>

          {/* Headline */}
          <h1
            className="hero-headline"
            style={{
              fontSize: "clamp(44px, 6.5vw, 84px)",
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.05,
              letterSpacing: "-2.5px",
              marginBottom: "24px",
              maxWidth: "740px",
              animation: "fadeIn 0.7s 0.1s ease both",
            }}
          >
            Tax &amp; Accounting<br />
            Done{" "}
            <span style={{ color: C.gold, position: "relative" }}>
              Right.
              {/* Underline accent */}
              <svg
                style={{ position: "absolute", bottom: "-4px", left: 0, width: "100%" }}
                viewBox="0 0 120 8" preserveAspectRatio="none"
                fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 5.5 C30 2, 90 2, 118 5.5" stroke={C.gold} strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: "clamp(15px, 1.4vw, 18px)",
            color: C.muted,
            lineHeight: 1.75,
            maxWidth: "500px",
            marginBottom: "44px",
            animation: "fadeIn 0.7s 0.2s ease both",
          }}>
            Virtual tax services by a licensed CPA and Enrolled Agent.
            Expert guidance, personal service, year-round support — for
            individuals and small businesses nationwide.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "12px",
            animation: "fadeIn 0.7s 0.3s ease both",
          }}>
            <Link
              href="/tax-intake"
              className="btn-gold"
              style={{
                background: C.gold, color: C.dark,
                fontSize: "14px", fontWeight: 700,
                padding: "14px 32px", borderRadius: "8px",
                letterSpacing: "0.1px",
              }}
            >
              Get Your Free Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link
              href="/services"
              className="btn-ghost"
              style={{
                background: "transparent", color: C.white,
                fontSize: "14px", fontWeight: 500,
                padding: "14px 32px", borderRadius: "8px",
                border: `1.5px solid rgba(255,255,255,0.25)`,
              }}
            >
              See Our Services
            </Link>
          </div>

          {/* Trust micro-markers */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "24px",
            marginTop: "48px",
            animation: "fadeIn 0.7s 0.45s ease both",
          }}>
            {[
              { icon: "✓", label: "Licensed CPA & Enrolled Agent" },
              { icon: "✓", label: "No office visit required" },
              { icon: "✓", label: "Response within 2 business days" },
            ].map((t) => (
              <span key={t.label} style={{
                display: "flex", alignItems: "center", gap: "7px",
                fontSize: "12px", color: "rgba(255,255,255,0.55)",
              }}>
                <span style={{ color: C.gold, fontWeight: 700, fontSize: "13px" }}>{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(11,25,41,0.6))",
          pointerEvents: "none",
        }} />
      </section>
      </HeroParallax>

      {/* ══ STATS BAR ════════════════════════════════════════════════ */}
      <div
        className="stats-bar"
        style={{ background: C.navy, display: "flex", borderBottom: `1px solid ${C.borderDark}` }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-item"
            style={{
              flex: 1, textAlign: "center",
              padding: "22px 16px",
              borderRight: i < stats.length - 1 ? `1px solid ${C.borderDark}` : "none",
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: 800, color: C.gold, letterSpacing: "-0.5px" }}>{s.val}</div>
            <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px", letterSpacing: "0.4px" }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ══ INTERACTIVE SHOWCASE ══════════════════════════════════════ */}
      <InteractiveShowcase />

      {/* ══ SERVICE FEATURES (pilot.com alternating) ═════════════════ */}
      <ServiceFeatures />

      {/* ══ STICKY FEATURES (collective.com peace of mind) ═══════════ */}
      <StickyFeatures />

      {/* ══ WHY US ═══════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding: "96px 44px", background: C.offWhite }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
              Why clients choose us
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", marginBottom: "48px", maxWidth: "480px", lineHeight: 1.15 }}>
              Expert service, without the big-firm runaround.
            </h2>
          </ScrollReveal>

          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 80}>
                <div
                  className="feature-card"
                  style={{
                    background: C.white, borderRadius: "14px",
                    padding: "28px 24px",
                    border: `1px solid ${C.borderLight}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    height: "100%",
                  }}
                >
                  <div style={{
                    width: "44px", height: "44px",
                    background: C.goldSoft, borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "16px",
                    border: `1px solid ${C.goldBorder}`,
                  }}>
                    {f.icon}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: C.textDark, marginBottom: "8px" }}>{f.title}</div>
                  <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>{f.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══ TESTIMONIALS MARQUEE ═════════════════════════════════════ */}
      <TestimonialsMarquee />

      {/* ══ CTA ══════════════════════════════════════════════════════ */}
      <section
        className="hero-gradient"
        style={{ padding: "96px 44px", position: "relative", overflow: "hidden" }}
      >
        <div style={{
          position: "absolute", top: "-20%", right: "10%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <ScrollReveal>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "16px" }}>
              Get started today
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: C.white, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "16px" }}>
              Ready to stop stressing about taxes?
            </h2>
            <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.7, marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>
              Get a free, personalized quote within 2 business days. No commitment required.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              <Link
                href="/tax-intake"
                className="btn-gold"
                style={{
                  background: C.gold, color: C.dark,
                  fontSize: "15px", fontWeight: 700,
                  padding: "16px 40px", borderRadius: "9px",
                  letterSpacing: "0.1px",
                }}
              >
                Get a Free Quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link
                href="/contact"
                className="btn-ghost"
                style={{
                  background: "transparent", color: C.white,
                  fontSize: "15px", fontWeight: 500,
                  padding: "16px 40px", borderRadius: "9px",
                  border: `1.5px solid rgba(255,255,255,0.22)`,
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
