import Link from "next/link";
import CitySkyline from "@/components/CitySkyline";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      {/* Hero Split */}
      <div className="flex min-h-[420px]">
        {/* Left — city skyline */}
        <div className="flex-1 relative overflow-hidden min-w-0">
          <CitySkyline />
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.62) 0%,rgba(8,18,32,0.38) 100%)"}}/>
          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
            <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>Texas CPA Firm</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Expert Tax &<br/>Accounting Services</h1>
            <p className="text-sm md:text-base leading-relaxed mb-8 max-w-sm" style={{color:"#e8f0f8", textShadow:"0 1px 4px rgba(0,0,0,0.9)"}}>CPA & Enrolled Agent. Individual & business returns, bookkeeping, payroll, and IRS representation — all virtual, nationwide.</p>
            <div className="flex flex-col gap-3 items-start">
              <Link href="/tax-intake" className="text-white text-sm font-bold px-7 py-3 rounded transition-opacity hover:opacity-90" style={{background:"#b8962e"}}>Get Your Free Quote</Link>
              <Link href="/booking" className="text-white text-sm font-bold px-7 py-3 rounded border-2 transition-colors hover:bg-white/20" style={{background:"rgba(255,255,255,0.15)", borderColor:"rgba(255,255,255,0.75)"}}>Book a Free Consultation</Link>
            </div>
          </div>
        </div>

        {/* Right — feature cards */}
        <div className="flex-[1.1] hidden md:flex flex-col justify-center p-10 lg:p-14" style={{background:"#f8f9fb"}}>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-5">Why clients choose us</div>
          <div className="flex flex-col gap-4">
            {[
              ["CPA & Enrolled Agent","Dual credentials — taxes and IRS representation under one roof."],
              ["Direct Access to Your CPA","You speak directly with us — not a call center or junior staffer."],
              ["100% Virtual, Nationwide","Based in Texas, serving clients across the country. No office visit required."],
              ["Year-Round Support","We're available all year — not just at tax time."],
            ].map(([t,d]) => (
              <div key={t} className="bg-white rounded-lg p-4 border-l-[3px]" style={{borderLeftColor:"#b8962e",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                <div className="text-sm font-bold mb-1" style={{color:"#1a2e4a"}}>{t}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <StatsBar />

      {/* Services Section */}
      <section className="py-16 px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{color:"#b8962e"}}>What We Offer</div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{color:"#1a2e4a"}}>Full-Service Tax & Accounting</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">From individual returns to complex small business accounting — all handled with precision and care.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["Individual Tax Preparation","Federal & state returns for employees, freelancers, investors and retirees.","/tax-intake"],
            ["Small Business Tax","Schedule C, Form 1120-S, Form 1065 — LLCs, S-Corps, partnerships.","/tax-intake"],
            ["Bookkeeping","Monthly reconciliation and financial statements via QuickBooks.","/tax-intake"],
            ["Payroll Services","End-to-end payroll, tax filings, W-2 and 1099 preparation.","/tax-intake"],
            ["Tax Planning & Strategy","Year-round proactive planning to legally reduce your tax liability.","/tax-intake"],
            ["IRS Representation","Audit support and notice response by a licensed Enrolled Agent.","/tax-intake"],
          ].map(([title, desc, href]) => (
            <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-8 h-1 rounded mb-4" style={{background:"#b8962e"}}/>
              <h3 className="text-sm font-bold mb-2" style={{color:"#1a2e4a"}}>{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>
              <Link href={href} className="text-xs font-semibold" style={{color:"#b8962e"}}>Get a quote →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 px-6" style={{background:"#1a2e4a"}}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Ready to get started?</h2>
            <p className="text-sm" style={{color:"rgba(255,255,255,0.6)"}}>Book a free 30-minute consultation — no commitment required.</p>
          </div>
          <Link href="/booking" className="text-white text-sm font-bold px-8 py-3 rounded whitespace-nowrap transition-opacity hover:opacity-90" style={{background:"#b8962e"}}>Book a Free Call</Link>
        </div>
      </section>
    </>
  );
}
