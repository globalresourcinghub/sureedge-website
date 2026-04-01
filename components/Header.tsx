"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className="flex items-center">
          <Image
            src="https://sureedgetax.com/wp-content/uploads/2026/03/sureedge_logo_v3-1.png"
            alt="SureEdge Tax & Accounting"
            width={160}
            height={50}
            style={{height:"44px", width:"auto"}}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-[#1a2e4a] transition-colors">{l.label}</Link>
          ))}
          <Link href="/tax-intake" className="text-sm font-semibold text-white px-4 py-2 rounded transition-opacity hover:opacity-90" style={{background:"#1a2e4a"}}>Get a Quote</Link>
          <Link href="/contact" className="text-sm font-semibold px-4 py-2 rounded border transition-colors hover:bg-gray-50" style={{color:"#1a2e4a", borderColor:"#1a2e4a"}}>Contact</Link>
        </nav>

        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-700 py-1" onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link href="/tax-intake" className="text-sm font-semibold text-white px-4 py-2 rounded text-center" style={{background:"#1a2e4a"}} onClick={() => setOpen(false)}>Get a Quote</Link>
          <Link href="/contact" className="text-sm font-semibold px-4 py-2 rounded border text-center" style={{color:"#1a2e4a", borderColor:"#1a2e4a"}} onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
