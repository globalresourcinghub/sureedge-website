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
  { quote: "SureEdge made my first year as a freelancer completely stress-free. They explained everything clearly and saved me more than I expected.", name: "Marcus T.", title: "Freelance Designer, Austin TX", initials: "MT" },
  { quote: "Finally a CPA who actually answers the phone. We've worked with SureEdge on our S-Corp for two years and couldn't be happier.", name: "Priya & Raj S.", title: "Small Business Owners", initials: "PS" },
  { quote: "Got an IRS notice and was in a panic. SureEdge handled everything from start to finish — resolved in 3 weeks.", name: "Daniel K.", title: "Real Estate Investor", initials: "DK" },
  { quote: "Switched from a big-box tax place and the difference is night and day. Personal, responsive, and they actually save us money.", name: "Jennifer M.", title: "W-2 Employee & Landlord", initials: "JM" },
  { quote: "As a sole proprietor I had no idea what I was doing. SureEdge walked me through everything and my quarterly payments are finally on track.", name: "Terrence B.", title: "Independent Contractor", initials: "TB" },
  { quote: "The bookkeeping service is worth every penny. My books are clean and I actually understand my P&L now.", name: "Sophia L.", title: "Restaurant Owner", initials: "SL" },
  { quote: "Multiple states and a rental property — SureEdge handled it all in one place. No more juggling preparers.", name: "Robert H.", title: "Multi-State Consultant", initials: "RH" },
];

export default function TestimonialsMarquee() {
  const items = [...ALL, ...ALL];

  return (
    <section style={{ padding: "96px 0", background: "#0B1929", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto 48px", padding: "0 44px" }}>
        <div style={{ fontSize: "11px", fontWeight: 600, color: C.gold, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "12px" }}>
          Client stories
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-1px", lineHeight: 1.15, margin: 0 }}>
            Trusted by individuals &amp; businesses.
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={C.gold}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginLeft: "4px" }}>5.0 · 100+ reviews</span>
          </div>
        </div>
      </div>

      <div className="marquee-outer">
        <div className="marquee-track">
          {items.map((t, i) => (
            <div key={i} className="marquee-card">
              <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill={C.gold}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.72, fontStyle: "italic", flex: 1, margin: "0 0 18px" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "14px", borderTop: `1px solid ${C.borderLight}` }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: C.goldSoft, border: `1px solid ${C.goldBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "10px", fontWeight: 700, color: C.gold, flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: C.textDark }}>{t.name}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
