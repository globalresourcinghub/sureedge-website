"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/booking", label: "Booking" },
];

function HeaderLogo() {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
      {/* Compact 36×36 navy icon box */}
      <div style={{ width: 36, height: 36, background: "#1a2e4a", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="22" height="22" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 2L3 10v17c0 14 10 23 21 27 11-4 21-13 21-27V10L24 2z"
            fill="#1a2e4a" stroke="#b8962e" strokeWidth="2.5"/>
          <rect x="12" y="30" width="6" height="14" rx="1" fill="white" opacity="0.25"/>
          <rect x="20" y="22" width="6" height="22" rx="1" fill="white" opacity="0.5"/>
          <rect x="28" y="12" width="6" height="32" rx="1" fill="#b8962e"/>
        </svg>
      </div>
      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "-0.2px" }}>
          Sure<span style={{ color: "#b8962e" }}>Edge</span>
        </span>
        <span style={{ fontSize: "9px", color: "#aaa", letterSpacing: "1.8px", textTransform: "uppercase", marginTop: "3px" }}>
          Tax &amp; Accounting
        </span>
      </div>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #f0ede6", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 44px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <HeaderLogo />

        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map(l => {
            const isActive = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: "13px",
                  color: isActive ? "#b8962e" : "#555",
                  fontWeight: isActive ? 700 : 400,
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid #b8962e" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: pathname === "/contact" ? "#b8962e" : "#1a2e4a",
              padding: "7px 18px",
              borderRadius: "6px",
              border: `1.5px solid ${pathname === "/contact" ? "#b8962e" : "#1a2e4a"}`,
              textDecoration: "none",
            }}
          >
            Contact
          </Link>
          <Link
            href="/tax-intake"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              background: "#b8962e",
              padding: "8px 18px",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
