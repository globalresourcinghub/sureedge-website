import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import HeroParallax from "@/components/HeroParallax";
import InteractiveShowcase from "@/components/InteractiveShowcase";

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
const services = [
  {
    title: "Individual Tax Preparation",
    desc: "Federal & state returns for W-2 employees, freelancers, investors, retirees, and multi-state filers.",
    href: "/tax-intake",
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="1" width="11" height="16" rx="2" stroke={C.gold} strokeWidth="1.5"/>
        <line x1="6" y1="6" x2="11" y2="6" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="6" y1="9" x2="11" y2="9" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="6" y1="12" x2="9" y2="12" stroke={C.gold} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Small Business Tax",
    desc: "Schedule C, S-Corp, and Partnership returns for LLCs, sole proprietors, and corporations.",
    href: "/business-tax-intake",
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="8" width="16" height="10" rx="2" stroke={C.gold} strokeWidth="1.5"/>
        <path d="M6 8V6a4 4 0 018 0v2" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Bookkeeping",
    desc: "Monthly reconciliation, categorization, and financial statements via QuickBooks.",
    href: "/business-tax-intake",
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="12" width="4" height="7" rx="1" fill={C.gold} opacity="0.4"/>
        <rect x="8" y="7" width="4" height="12" rx="1" fill={C.gold} opacity="0.7"/>
        <rect x="15" y="2" width="4" height="17" rx="1" fill={C.gold}/>
      </svg>
    ),
  },
  {
    title: "Payroll Services",
    desc: "End-to-end payroll, quarterly filings, W-2 and 1099 preparation.",
    href: "/business-tax-intake",
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke={C.gold} strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Tax Planning & Strategy",
    desc: "Year-round proactive planning to legally minimize your tax liability.",
    href: "/tax-intake",
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 7v10h14V7L10 2z" stroke={C.gold} strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="7" y="11" width="6" height="6" rx="1" stroke={C.gold} strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: "IRS Representation",
    desc: "Audit support and IRS notice response by a licensed Enrolled Agent.",
    href: "/contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.5 5h5l-4 3.5 1.5 5L10 13l-5 2.5 1.5-5L2.5 7h5z" stroke={C.gold} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

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

const testimonials = [
  {
    quote: "SureEdge made my first year as a freelancer completely stress-free. They explained everything clearly and saved me more than I expected.",
    name: "Marcus T.",
    title: "Freelance Designer, Austin TX",
    initials: "MT",
  },
  {
    quote: "Finally a CPA who actually answers the phone. We've worked with SureEdge for our S-Corp for two years and couldn't be happier.",
    name: "Priya & Raj S.",
    title: "Small Business Owners",
    initials: "PS",
  },
  {
    quote: "Got an IRS notice and was in a panic. SureEdge handled everything from start to finish — resolved in 3 weeks.",
    name: "Daniel K.",
    title: "Real Estate Investor",
    initials: "DK",
  },
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

      {/* ══ SERVICES ═════════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding: "96px 44px", background: C.dark }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
              What we offer
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: C.white, letterSpacing: "-1px", lineHeight: 1.15, margin: 0, maxWidth: "460px" }}>
                Full-service tax &amp; accounting.
              </h2>
              <Link
                href="/services"
                className="btn-ghost"
                style={{
                  color: C.muted, fontSize: "13px", fontWeight: 500,
                  padding: "10px 20px", borderRadius: "8px",
                  border: `1px solid ${C.borderDark}`,
                  display: "inline-flex", alignItems: "center", gap: "6px",
                }}
              >
                View all services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 60}>
                <div
                  className="service-card"
                  style={{
                    background: C.darkMid, borderRadius: "14px",
                    padding: "28px 24px",
                    border: `1px solid ${C.borderDark}`,
                    height: "100%", display: "flex", flexDirection: "column",
                  }}
                >
                  <div style={{
                    width: "44px", height: "44px",
                    background: C.goldSoft, borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "18px",
                    border: `1px solid ${C.goldBorder}`,
                  }}>
                    {svc.icon}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: C.white, marginBottom: "8px" }}>{svc.title}</div>
                  <div style={{ fontSize: "13px", color: C.muted, lineHeight: 1.65, flex: 1 }}>{svc.desc}</div>
                  <Link
                    href={svc.href}
                    style={{
                      marginTop: "20px", fontSize: "12px", fontWeight: 600,
                      color: C.gold, display: "inline-flex", alignItems: "center", gap: "5px",
                      transition: "gap 0.15s ease",
                    }}
                  >
                    Get a quote
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════ */}
      <section className="section-pad" style={{ padding: "96px 44px", background: C.offWhite }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                Client stories
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: C.textDark, letterSpacing: "-1px", lineHeight: 1.15, margin: 0 }}>
                Trusted by individuals &amp; businesses.
              </h2>
            </div>
          </ScrollReveal>

          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div
                  className="testimonial-card"
                  style={{
                    background: C.white, borderRadius: "16px",
                    padding: "32px 28px",
                    border: `1px solid ${C.borderLight}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    height: "100%", display: "flex", flexDirection: "column",
                  }}
                >
                  {/* Stars */}
                  <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill={C.gold}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.72, flex: 1, margin: 0, fontStyle: "italic" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${C.borderLight}` }}>
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "50%",
                      background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: 700, color: C.gold,
                      flexShrink: 0,
                    }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: C.textDark }}>{t.name}</div>
                      <div style={{ fontSize: "11px", color: "#888", marginTop: "1px" }}>{t.title}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
