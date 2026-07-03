import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import HeroParallax from "@/components/HeroParallax";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import StickyFeatures from "@/components/StickyFeatures";
import PortalFeatures from "@/components/PortalFeatures";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { C } from "@/lib/tokens";

/* ── Design tokens ─────────────────────────────── */

/* ── Data ───────────────────────────────────────── */


const stats = [
  { val: "Flat Fee",  lbl: "No surprise billing"  },
  { val: "100%",      lbl: "Virtual service"       },
  { val: "6",         lbl: "Free planning tools"   },
  { val: "$10K+",     lbl: "Avg. small-biz savings identified" },
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "64px", alignItems: "center" }}>
          <div>

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
            Expert guidance, personal service, year-round support for
            individuals and small businesses nationwide.
          </p>

          {/* Advisor card */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px", padding: "10px 16px",
            marginBottom: "28px",
            animation: "fadeIn 0.7s 0.25s ease both",
          }}>
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces&auto=format&q=80"
              alt="Tax professional"
              width={40} height={40}
              style={{ borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(201,168,76,0.45)`, flexShrink: 0 }}
            />
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: C.white, marginBottom: "2px" }}>Licensed CPA &amp; EA on our team</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Virtual · Nationwide · Flat-fee pricing</div>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 6px #6ee7b7", flexShrink: 0 }} />
          </div>

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
            display: "flex", flexWrap: "wrap", gap: "16px",
            marginTop: "48px",
            animation: "fadeIn 0.7s 0.45s ease both",
          }}>
            {[
              "Licensed CPA & Enrolled Agent",
              "No office visit required",
              "Response within 2 business days",
            ].map((label) => (
              <span key={label} style={{
                display: "flex", alignItems: "center", gap: "7px",
                fontSize: "12px", color: "rgba(255,255,255,0.55)",
              }}>
                <span style={{ color: C.gold, fontWeight: 700, fontSize: "13px" }}>✓</span>
                {label}
              </span>
            ))}
            {/* Highlighted 4th marker — value-add */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              fontSize: "12px", fontWeight: 600, color: C.gold,
              background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
              borderRadius: "20px", padding: "3px 10px 3px 8px",
            }}>
              <span style={{ fontWeight: 800, fontSize: "13px" }}>✓</span>
              Financial Planning Dashboard, included free
            </span>
          </div>
        </div>{/* end left col */}

          {/* Right: animated floating dashboard */}
          <div className="hero-right-panel" style={{ animation: "fadeIn 0.9s 0.5s ease both, floatUp 5s 1.5s ease-in-out infinite" }}>
            {/* Main card */}
            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "20px", padding: "24px",
              backdropFilter: "blur(8px)",
              animation: "fadeIn 0.7s 0.5s ease both",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "1px", textTransform: "uppercase" }}>Tax Year 2024</span>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", padding: "3px 9px", borderRadius: "20px" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", animation: "pulseGlow 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: "10px", fontWeight: 600, color: "#6ee7b7" }}>Filed &amp; Accepted</span>
                </div>
              </div>
              <div style={{ marginBottom: "18px", animation: "fadeIn 0.6s 0.8s ease both" }}>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "5px" }}>Federal Refund</div>
                <div style={{ fontSize: "42px", fontWeight: 800, color: C.gold, letterSpacing: "-2px", lineHeight: 1 }}>$3,240</div>
                <div style={{ fontSize: "11px", color: "#6ee7b7", marginTop: "4px" }}>↑ $412 more than last year</div>
              </div>
              <div style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Return progress</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: C.gold }}>94%</span>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
                  <div className="hero-bar-fill" style={{ height: "100%", background: `linear-gradient(90deg, ${C.gold}, #e8c56a)`, borderRadius: "2px" }} />
                </div>
              </div>
              {[
                { text: "W-2 &amp; 1099s uploaded", delay: "1.0s" },
                { text: "All deductions reviewed", delay: "1.2s" },
                { text: "Licensed CPA review", delay: "1.4s" },
                { text: "E-filed &amp; accepted", delay: "1.6s" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "9px", padding: "8px 0",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  animation: `fadeIn 0.5s ${item.delay} ease both`,
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "8px", color: "#6ee7b7" }}>✓</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)" }} dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
              ))}
            </div>
            {/* Mini savings card */}
            <div style={{
              marginTop: "12px", background: C.goldSoft,
              border: `1px solid ${C.goldBorder}`, borderRadius: "14px",
              padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px",
              animation: "fadeIn 0.7s 1.9s ease both",
            }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: C.gold, letterSpacing: "-1px", flexShrink: 0 }}>$10K+</div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Average savings identified</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>For small business clients</div>
              </div>
            </div>
          </div>

          </div>{/* end grid */}
        </div>{/* end content wrapper */}

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

      {/* ══ WHAT'S INCLUDED FREE ═════════════════════════════════════ */}
      <section style={{ background: C.dark, padding: "60px 44px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "10px" }}>
              Included with every plan
            </div>
            <h2 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 800, color: C.white, letterSpacing: "-0.8px", lineHeight: 1.15, margin: 0 }}>
              More than just tax and accounting.
            </h2>
          </div>

          {/* Two feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>

            {/* Card 1: Financial Planning Dashboard */}
            <div style={{
              background: "rgba(255,255,255,0.04)", border: `1px solid ${C.goldBorder}`,
              borderRadius: "16px", padding: "28px 28px 24px",
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "12px", marginBottom: "16px" }}>
                All clients · Free
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <div style={{ fontSize: "17px", fontWeight: 800, color: C.white, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                  Personal Financial<br />Planning Dashboard
                </div>
              </div>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.7, marginBottom: "18px" }}>
                Track your household net worth, budget, income, expenses, goals, and retirement scenarios — all in one place, at no extra charge.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {["Net worth and asset tracking", "Budget and expense categories", "Goal projections and retirement scenarios", "Social Security and college savings estimators"].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: C.muted }}>
                    <span style={{ color: C.gold, fontWeight: 700, flexShrink: 0 }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Monthly CFO Report */}
            <div style={{
              background: "rgba(110,231,183,0.04)", border: "1px solid rgba(110,231,183,0.25)",
              borderRadius: "16px", padding: "28px 28px 24px",
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", color: "#6ee7b7", fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "12px", marginBottom: "16px" }}>
                Bookkeeping clients · Free
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div style={{ fontSize: "17px", fontWeight: 800, color: C.white, letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                  Monthly CFO Report<br />with AI Commentary
                </div>
              </div>
              <p style={{ fontSize: "13px", color: C.muted, lineHeight: 1.7, marginBottom: "18px" }}>
                Every month your books close and a plain-language report lands in your portal: P&amp;L, cash flow, and an AI narrative that explains what your numbers mean.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                {["Monthly P&L, balance sheet, and cash flow", "AI-generated narrative in plain language", "Revenue trends and expense breakdowns", "Delivered automatically, no extra charge"].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: C.muted }}>
                    <span style={{ color: "#6ee7b7", fontWeight: 700, flexShrink: 0 }}>✓</span>{b}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CTA row */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href="/portal"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: C.gold, borderBottom: `1px solid ${C.goldBorder}`, textDecoration: "none", paddingBottom: "1px" }}
            >
              See everything included in your account →
            </a>
          </div>

        </div>
      </section>

      {/* ══ INTERACTIVE SHOWCASE ══════════════════════════════════════ */}
      <InteractiveShowcase />

      {/* ══ STICKY FEATURES (collective.com peace of mind) ═══════════ */}
      <StickyFeatures />

      {/* ══ PORTAL FEATURES ══════════════════════════════════════════ */}
      <PortalFeatures />


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
