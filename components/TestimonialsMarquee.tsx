"use client";

const C = {
  gold: "#C9A84C",
  goldSoft: "rgba(201,168,76,0.12)",
  goldBorder: "rgba(201,168,76,0.28)",
  offWhite: "#F8F7F4",
  white: "#FFFFFF",
  textDark: "#1a2e4a",
  borderLight: "#EDEAE3",
};

const ALL = [
  {
    quote: "First year freelancing? SureEdge walks you through every deduction, every quarterly payment — and finds savings you didn't know existed.",
    tag: "Freelancer",
  },
  {
    quote: "Running an S-Corp shouldn't mean voicemail loops. SureEdge picks up the phone and keeps your books clean all year.",
    tag: "S-Corp Owner",
  },
  {
    quote: "IRS notice? SureEdge handles the response, the paperwork, and the follow-up — most cases resolved in weeks, not months.",
    tag: "IRS Notice",
  },
  {
    quote: "Big-box prep means a different preparer every year. SureEdge knows your situation and builds on it — year after year.",
    tag: "Individual Filer",
  },
  {
    quote: "Sole proprietor with no idea where to start? Quarterly taxes, SE tax, write-offs — explained in plain language, set up right.",
    tag: "Sole Proprietor",
  },
  {
    quote: "Clean books aren't just for tax time. SureEdge bookkeeping means you understand your P&L every month — not just in April.",
    tag: "Small Business",
  },
  {
    quote: "Multiple states and a rental property — SureEdge handles it all in one place. No more juggling preparers.",
    tag: "Multi-State Filing",
  },
];

export default function TestimonialsMarquee() {
  const items = [...ALL, ...ALL];

  return (
    <section style={{ padding: "96px 0", background: "#0B1929", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto 48px", padding: "0 44px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
          Common situations we handle
        </div>
        <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-1px", lineHeight: 1.15, margin: 0 }}>
          Whatever your tax situation, we&apos;ve got it covered.
        </h2>
      </div>

      <div className="marquee-outer">
        <div className="marquee-track">
          {items.map((t, i) => (
            <div key={i} className="marquee-card">
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.72, flex: 1, margin: "0 0 18px" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ paddingTop: "14px", borderTop: `1px solid ${C.borderLight}` }}>
                <span style={{
                  display: "inline-block",
                  background: C.goldSoft,
                  border: `1px solid ${C.goldBorder}`,
                  color: C.gold,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: "20px",
                }}>
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
