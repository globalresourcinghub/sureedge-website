"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
    <header className="bg-white sticky top-0 z-50" style={{ borderBottom: "1px solid #f0ede6" }}>
      <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between" style={{ height: "64px" }}>
        <Link href="/" className="flex items-center">
          <Logo size="md" />
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm transition-colors" style={{ color: "#555", fontWeight: 400 }}>{l.label}</Link>
          ))}
          <Link href="/contact" className="text-sm font-medium px-5 py-2 rounded-md" style={{ color: "#1a2e4a", border: "1.5px solid #1a2e4a" }}>Contact</Link>
          <Link href="/tax-intake" className="text-sm font-semibold text-white px-5 py-2 rounded-md hover:opacity-90" style={{ background: "#b8962e" }}>Get a Quote</Link>
        </nav>
        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-3" style={{ borderColor: "#f0ede6" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm py-1" style={{ color: "#444" }} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/contact" className="text-sm font-medium px-4 py-2 rounded-md text-center" style={{ color: "#1a2e4a", border: "1.5px solid #1a2e4a" }} onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/tax-intake" className="text-sm font-semibold text-white px-4 py-2 rounded-md text-center" style={{ background: "#b8962e" }} onClick={() => setOpen(false)}>Get a Quote</Link>
        </div>
      )}
    </header>
  );
}
