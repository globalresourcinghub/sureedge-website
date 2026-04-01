import Link from "next/link";

function PeopleBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 340 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="340" height="360" fill="#0d1f35"/>
      <circle cx="80" cy="90" r="36" fill="#1a3255"/>
      <circle cx="80" cy="75" r="16" fill="#243f6e"/>
      <rect x="48" y="106" width="64" height="32" rx="8" fill="#1e3860"/>
      <circle cx="260" cy="100" r="36" fill="#1a3255"/>
      <circle cx="260" cy="85" r="16" fill="#243f6e"/>
      <rect x="228" y="116" width="64" height="32" rx="8" fill="#1e3860"/>
      <line x1="144" y1="115" x2="196" y2="115" stroke="#b8962e" strokeWidth="2" opacity="0.5"/>
      <circle cx="170" cy="115" r="12" fill="#b8962e" opacity="0.2"/>
      <circle cx="170" cy="115" r="6" fill="#b8962e" opacity="0.5"/>
      <rect x="40" y="180" width="260" height="2" fill="#b8962e" opacity="0.15"/>
      <circle cx="90" cy="220" r="8" fill="#b8962e" opacity="0.4"/>
      <circle cx="170" cy="220" r="8" fill="#b8962e" opacity="0.6"/>
      <circle cx="250" cy="220" r="8" fill="#b8962e" opacity="0.4"/>
    </svg>
  );
}

export default function About() {
  return (
    <>
      <div className="flex min-h-[360px]">
        <div className="flex-1 relative overflow-hidden min-w-0">
          <PeopleBg />
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
            <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>About Us</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>A CPA Firm Built<br/>for Real People</h1>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{color:"#e8f0f8", textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Based in Frisco, TX — serving individuals and small businesses nationwide with CPA, EA, and ChFC credentials.</p>
            <div className="p-3 rounded-r-md border-l-2" style={{background:"rgba(184,150,46,0.15)", borderColor:"#b8962e"}}>
              <p className="text-xs italic" style={{color:"rgba(255,255,255,0.85)"}}>Delivered personally, accessibly, and affordably.</p>
            </div>
          </div>
        </div>
        <div className="flex-[1.1] hidden md:flex flex-col justify-center p-10 lg:p-14" style={{background:"#f8f9fb"}}>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-5">Our credentials</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["CPA","Certified Public Accountant — licensed for full accounting services."],
              ["Enrolled Agent","IRS-licensed to represent clients in all tax matters."],
              ["ChFC","Chartered Financial Consultant for comprehensive financial planning."],
              ["100% Virtual","Serving clients nationwide from Frisco, TX."],
            ].map(([t,d]) => (
              <div key={t} className="bg-white rounded-lg p-4 border-l-[3px]" style={{borderLeftColor:"#b8962e",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                <div className="text-sm font-bold mb-1" style={{color:"#1a2e4a"}}>{t}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 px-6 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{color:"#1a2e4a"}}>Our Story</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">SureEdge Tax & Accounting was founded on a simple belief: every individual and small business deserves the same quality of tax and accounting services that larger firms provide their biggest clients.</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">As a husband-and-wife team based in Frisco, TX, we bring together complementary expertise — CPA, Enrolled Agent, and ChFC credentials — to serve our clients as a true partner, not just a once-a-year preparer.</p>
            <p className="text-sm text-gray-600 leading-relaxed">We operate 100% virtually, which means we can serve clients across the entire country while keeping our overhead low and passing those savings on to you.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold" style={{color:"#1a2e4a"}}>Our Values</h2>
            {[
              ["Transparency","No surprise fees. Clear pricing, clear communication."],
              ["Accessibility","You get our direct number and email — no phone trees."],
              ["Precision","Every return reviewed for accuracy before filing."],
              ["Partnership","We think about your taxes year-round, not just in April."],
            ].map(([t,d]) => (
              <div key={t} className="flex gap-3">
                <div className="w-1 rounded flex-shrink-0 mt-1" style={{background:"#b8962e", minHeight:"40px"}}/>
                <div>
                  <div className="text-sm font-bold mb-0.5" style={{color:"#1a2e4a"}}>{t}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-6" style={{background:"#1a2e4a"}}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Ready to work together?</h2>
            <p className="text-sm" style={{color:"rgba(255,255,255,0.6)"}}>Start with a free 30-minute consultation.</p>
          </div>
          <Link href="/booking" className="text-white text-sm font-bold px-8 py-3 rounded whitespace-nowrap" style={{background:"#b8962e"}}>Book a Free Call</Link>
        </div>
      </section>
    </>
  );
}
