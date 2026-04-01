import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-10 mb-6">
          <div className="flex-[1.5]">
            <div className="mb-3">
              <Image
                src="https://sureedgetax.com/wp-content/uploads/2026/03/sureedge_logo_v3-1.png"
                alt="SureEdge Tax & Accounting"
                width={130}
                height={40}
                style={{height:"36px", width:"auto"}}
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">Licensed CPA & EA firm in Frisco, TX. Serving clients nationwide — 100% virtual.</p>
            <div className="text-xs text-gray-400 mt-2">contact@sureedgetax.com · Mon–Fri 9am–6pm CT</div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{color:"#b8962e"}}>Services</div>
            <div className="flex flex-col gap-1.5">
              {["Individual Tax Preparation","Small Business Tax","Bookkeeping & Payroll","IRS Representation","Tax Planning"].map(s => (
                <Link key={s} href="/services" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">{s}</Link>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{color:"#b8962e"}}>Quick Links</div>
            <div className="flex flex-col gap-1.5">
              {[["About Us","/about"],["Blog","/blog"],["Get a Quote","/tax-intake"],["Book a Consultation","/booking"],["Contact","/contact"]].map(([l,h]) => (
                <Link key={h} href={h} className="text-xs text-gray-500 hover:text-gray-700 transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-[10px] text-gray-300">© 2026 SureEdge Tax & Accounting. All rights reserved.</span>
          <Link href="/privacy" className="text-[10px] text-gray-300 hover:text-gray-500">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
