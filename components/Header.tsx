"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/booking", label: "Booking" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded flex items-center justify-center" style={{background:"#1a2e4a"}}>
            <span className="text-xs font-bold" style={{color:"#b8962e"}}>SE</span>
          </div>
          <div>
            <div className="text-sm font-bold leading-none" style={{color:"#1a2e4a"}}>SureEdge</div>
            <div className="text-[9px] tracking-widest uppercase" style={{color:"#999"}}>Tax & Accounting</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-[#1a2e4a] transition-colors">{l.label}</Link>
          ))}
          <Link href="/quote" className="text-sm font-semibold text-white px-4 py-2 rounded transition-opacity hover:opacity-90" style={{background:"#1a2e4a"}}>Get a Quote</Link>
          <Link href="/contact" className="text-sm font-semibold px-4 py-2 rounded border transition-colors hover:bg-gray-50" style={{color:"#1a2e4a", borderColor:"#1a2e4a"}}>Contact</Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-700 py-1" onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/quote" className="text-sm font-semibold text-white px-4 py-2 rounded text-center" style={{background:"#1a2e4a"}} onClick={() => setOpen(false)}>Get a Quote</Link>
          <Link href="/contact" className="text-sm font-semibold px-4 py-2 rounded border text-center" style={{color:"#1a2e4a", borderColor:"#1a2e4a"}} onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
