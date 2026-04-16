"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function HeaderLogo() {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
      <div style={{ width: 36, height: 36, background: "#1a2e4a", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="22" height="22" viewBox="0 0 76 76" fill="none">
          <path d="M38 8 L15 18 L15 38 C15 52 25 62 38 66 C51 62 61 52 61 38 L61 18 Z" fill="rgba(184,150,46,0.10)" stroke="#b8962e" strokeWidth="2.2" strokeLinejoin="round"/>
          <rect x="22" y="42" width="7" height="12" rx="1.5" fill="#7a8fa8"/>
          <rect x="34" y="30" width="8" height="24" rx="1.5" fill="#b8962e"/>
          <rect x="47" y="36" width="7" height="18" rx="1.5" fill="#7a8fa8"/>
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "-0.2px" }}>
          Sure<span style={{ color: "#b8962e" }}>Edge</span>
        </span>
        <span style={{ fontSize: "9px", color: "#666", letterSpacing: "1.8px", textTransform: "uppercase", marginTop: "3px" }}>
          Tax &amp; Accounting
        </span>
      </div>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #f0ede6", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ padding: "0 44px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <HeaderLogo />

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map(l => {
            const isActive = pathname === l.href || pathname.startsWith(l.href + "/");
            if (l.href === "/contact") {
              return (
                <Link key={l.href} href={l.href} style={{
                  fontSize: "13px", fontWeight: 500,
                  color: isActive ? "#b8962e" : "#1a2e4a",
                  padding: "7px 18px", borderRadius: "6px",
                  border: `1.5px solid ${isActive ? "#b8962e" : "#1a2e4a"}`,
                  textDecoration: "none",
                }}>Contact</Link>
              );
            }
            return (
              <Link key={l.href} href={l.href} style={{
                fontSize: "13px",
                color: isActive ? "#b8962e" : "#555",
                fontWeight: isActive ? 700 : 400,
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #b8962e" : "2px solid transparent",
                paddingBottom: "2px",
              }}>{l.label}</Link>
            );
          })}
          <a href="https://portal.sureedgetax.com" style={{
            fontSize: "13px", fontWeight: 500, color: "#1a2e4a",
            textDecoration: "none", display: "flex", alignItems: "center", gap: "5px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a2e4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Client Portal
          </a>
          <Link href="/tax-intake" style={{
            fontSize: "13px", fontWeight: 600, color: "#fff",
            background: "#b8962e", padding: "8px 18px", borderRadius: "6px", textDecoration: "none",
          }}>Get a Quote</Link>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", flexDirection: "column", gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? "#b8962e" : "#1a2e4a", borderRadius: "2px", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? "#b8962e" : "#1a2e4a", borderRadius: "2px", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: menuOpen ? "#b8962e" : "#1a2e4a", borderRadius: "2px", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          display: "none",
          position: "absolute", top: "64px", left: 0, right: 0,
          background: "#fff", borderBottom: "1px solid #f0ede6",
          padding: "16px 24px 24px", flexDirection: "column", gap: "0",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 49,
        }}>
          {links.map(l => {
            const isActive = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "15px", fontWeight: isActive ? 700 : 400,
                  color: isActive ? "#b8962e" : "#1a2e4a",
                  textDecoration: "none", padding: "14px 0",
                  borderBottom: "1px solid #f5f3ee", display: "block",
                }}
              >{l.label}</Link>
            );
          })}
          <a
            href="https://portal.sureedgetax.com"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "15px", fontWeight: 400,
              color: "#1a2e4a", textDecoration: "none",
              padding: "14px 0", borderBottom: "1px solid #f5f3ee",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a2e4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Client Portal
          </a>
          <Link
            href="/tax-intake"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block", textAlign: "center", marginTop: "16px",
              background: "#b8962e", color: "#fff", fontSize: "14px",
              fontWeight: 700, padding: "13px", borderRadius: "7px", textDecoration: "none",
            }}
          >Get a Quote</Link>
        </div>
      )}
    </header>
  );
}
