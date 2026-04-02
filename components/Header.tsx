"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/booking", label: "Booking" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #f0ede6", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Logo size="md" />
        </Link>

        {/* Desktop nav — always visible above 768px */}
        <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: "13px", color: "#555", fontWeight: 400, textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" style={{ fontSize: "13px", fontWeight: 500, color: "#1a2e4a", padding: "8px 20px", borderRadius: "6px", border: "1.5px solid #1a2e4a", textDecoration: "none" }}>
            Contact
          </Link>
          <Link href="/tax-intake" style={{ fontSize: "13px", fontWeight: 600, color: "#fff", background: "#b8962e", padding: "9px 20px", borderRadius: "6px", textDecoration: "none" }}>
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
