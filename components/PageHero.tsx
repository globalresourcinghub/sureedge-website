import Link from "next/link";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  background: React.ReactNode;
  children?: React.ReactNode;
  cta?: { label: string; href: string };
}

export default function PageHero({ badge, title, subtitle, background, children, cta }: PageHeroProps) {
  return (
    <div style={{ display: "flex", minHeight: "340px" }}>
      {/* Left dark panel */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", minWidth: 0 }}>
        {background}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)" }}/>
        <div style={{ position: "relative", zIndex: 10, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
          <div style={{ display: "inline-block", color: "white", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", marginBottom: "20px", background: "#b8962e", width: "fit-content" }}>{badge}</div>
          <h1 style={{ fontSize: "34px", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "14px", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }} dangerouslySetInnerHTML={{ __html: title }}/>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "28px", maxWidth: "380px", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{subtitle}</p>
          {children}
          {cta && (
            <Link href={cta.href} style={{ display: "inline-block", color: "white", fontSize: "13px", fontWeight: 700, padding: "12px 24px", borderRadius: "7px", background: "#b8962e", width: "fit-content", textDecoration: "none" }}>{cta.label}</Link>
          )}
        </div>
      </div>
      {/* Right light panel */}
      <div style={{ flex: 1, background: "#faf9f6", display: "flex", flexDirection: "column", justifyContent: "center", padding: "44px 48px" }}>
        <div style={{ fontSize: "10px", color: "#b8962e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2.5px", marginBottom: "20px" }}>Why clients choose us</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            ["CPA & Enrolled Agent", "Dual credentials for full tax preparation and IRS representation, all under one roof."],
            ["Direct Access to Your CPA", "You speak directly with us. No call centers or junior staffers."],
            ["100% Virtual, Nationwide", "Based in Texas, serving clients across the entire country."],
            ["Year-Round Support", "We are available all year, not just at tax time."],
          ].map(([t, d]) => (
            <div key={t} style={{ background: "white", borderRadius: "10px", padding: "14px 16px", borderLeft: "3px solid #b8962e", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px", color: "#1a2e4a" }}>{t}</div>
              <div style={{ fontSize: "12px", color: "#777", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
