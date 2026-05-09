import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Tax Tips & Accounting Insights",
  description: "Practical tax tips, small-business accounting advice, and IRS compliance guidance from licensed CPA and Enrolled Agent professionals.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Tax Tips & Accounting Insights",
    description: "Practical tax tips, small-business accounting advice, and IRS compliance guidance.",
    url: "/blog",
  },
};

const C = {
  navy: "#1a2e4a", gold: "#C9A84C",
  goldSoft: "rgba(201,168,76,0.12)", goldBorder: "rgba(201,168,76,0.28)",
  offWhite: "#F8F7F4", white: "#FFFFFF",
  muted: "#8A9BB0", mutedDark: "#6b7a8d",
  borderLight: "#EDEAE3",
};

/* Assign a thematic Unsplash image to each post by slug */
const POST_IMAGES: Record<string, string> = {
  "stress-free-tax-filing":          "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=520&h=280&fit=crop&auto=format&q=70",
  "maximizing-tax-refunds":          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=520&h=280&fit=crop&auto=format&q=70",
  "small-business-financial-support":"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=520&h=280&fit=crop&auto=format&q=70",
  "personalized-solutions-entrepreneurs":"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=520&h=280&fit=crop&auto=format&q=70",
  "navigating-tax-season":           "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=520&h=280&fit=crop&auto=format&q=70",
  "choosing-accounting-service":     "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=520&h=280&fit=crop&auto=format&q=70",
  "irs-notices-explained":           "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=520&h=280&fit=crop&auto=format&q=70",
  "s-corp-vs-llc-tax":               "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=520&h=280&fit=crop&auto=format&q=70",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Tax Tips":          "#C9A84C",
  "Small Business":    "#93c5fd",
  "IRS & Compliance":  "#fca5a5",
  "Financial Planning":"#6ee7b7",
};

export default function Blog() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: C.navy, padding: "72px 44px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: "64px", alignItems: "center", position: "relative", zIndex: 2 }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: C.goldSoft, border: `1px solid ${C.goldBorder}`, color: C.gold, fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", marginBottom: "20px" }}>
              <span style={{ width: 5, height: 5, background: C.gold, borderRadius: "50%", display: "inline-block" }} />
              Tax &amp; Accounting Insights
            </div>
            <h1 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "16px", letterSpacing: "-1.2px" }}>
              Tips from our<br />
              <span style={{ color: C.gold }}>CPA &amp; EA team.</span>
            </h1>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "420px", marginBottom: "32px" }}>
              Practical tax tips and financial guidance written by licensed professionals, not algorithms.
            </p>
            {/* Topics */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Tax Tips", "Small Business", "IRS & Compliance", "Financial Planning"].map(cat => (
                <span key={cat} style={{
                  fontSize: "11px", fontWeight: 600,
                  padding: "5px 12px", borderRadius: "20px",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.65)",
                }}>{cat}</span>
              ))}
            </div>
          </div>

          {/* Right — featured photo */}
          <div style={{ position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=560&h=380&fit=crop&auto=format&q=75"
              alt="Professional reviewing tax documents"
              width={420} height={320}
              style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "16px", display: "block", border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <div style={{ position: "absolute", bottom: "16px", left: "16px", background: "rgba(11,25,41,0.85)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>8 articles published</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Updated through March 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Post grid */}
      <section style={{ padding: "64px 44px", background: C.offWhite }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {posts.map(p => {
            const imgSrc = POST_IMAGES[p.slug];
            const catColor = CATEGORY_COLORS[p.category] ?? C.gold;
            return (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: C.white, borderRadius: "16px", border: `1px solid ${C.borderLight}`, overflow: "hidden", boxShadow: "0 2px 10px rgba(26,46,74,0.06)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>
                {imgSrc && (
                  <div style={{ height: "180px", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(11,25,41,0.35) 100%)" }} />
                    <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px", padding: "3px 9px", borderRadius: "12px", background: `${catColor}22`, border: `1px solid ${catColor}44`, color: catColor }}>
                      {p.category}
                    </span>
                  </div>
                )}
                <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontSize: "10px", color: C.muted, letterSpacing: "0.5px" }}>{p.date}</div>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: C.navy, lineHeight: 1.45, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontSize: "12px", color: C.mutedDark, lineHeight: 1.65, flex: 1, margin: 0 }}>{p.excerpt}</p>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: C.gold, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                    Read article
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
