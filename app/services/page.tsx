import Link from "next/link";

function DocsBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="360" fill="#0d1f35"/>
      <rect x="30" y="20" width="80" height="100" rx="6" fill="#1a3255" opacity="0.8"/>
      <rect x="42" y="34" width="56" height="4" rx="2" fill="#b8962e" opacity="0.6"/>
      <rect x="42" y="44" width="40" height="3" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="42" y="52" width="48" height="3" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="150" y="50" width="70" height="80" rx="6" fill="#1e3860" opacity="0.7"/>
      <rect x="160" y="62" width="50" height="4" rx="2" fill="#b8962e" opacity="0.5"/>
      <rect x="160" y="72" width="35" height="3" rx="1" fill="#fff" opacity="0.12"/>
      <rect x="60" y="140" width="90" height="70" rx="6" fill="#162c4a" opacity="0.6"/>
      <rect x="72" y="152" width="30" height="10" rx="3" fill="#b8962e" opacity="0.4"/>
      <rect x="72" y="168" width="30" height="10" rx="3" fill="#1a3255"/>
      <rect x="72" y="184" width="66" height="10" rx="3" fill="#b8962e" opacity="0.6"/>
      <circle cx="220" cy="200" r="50" fill="none" stroke="#b8962e" strokeWidth="1" opacity="0.15"/>
    </svg>
  );
}

const services = [
  {title:"Individual Tax Preparation",desc:"Federal & state returns for W-2 employees, freelancers, investors, rental property owners, and retirees.",icon:"📄"},
  {title:"Small Business Tax",desc:"Schedule C, Form 1120-S, Form 1065 — LLCs, S-Corps, C-Corps, and partnerships.",icon:"🏢"},
  {title:"Bookkeeping",desc:"Monthly reconciliation and financial statements delivered via QuickBooks.",icon:"📊"},
  {title:"Payroll Services",desc:"End-to-end payroll processing, quarterly filings, W-2 and 1099 preparation.",icon:"💰"},
  {title:"Tax Planning & Strategy",desc:"Proactive year-round strategies to legally reduce your tax burden.",icon:"🎯"},
  {title:"IRS Representation",desc:"Licensed Enrolled Agent represents you directly before the IRS.",icon:"🛡️"},
];

export default function Services() {
  return (
    <>
      <div className="flex min-h-[340px]">
        <div className="flex-1 relative overflow-hidden min-w-0">
          <DocsBg />
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
            <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>What We Offer</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Full-Service Tax<br/>{"&"} Accounting</h1>
            <p className="text-sm leading-relaxed max-w-sm" style={{color:"#e8f0f8", textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>From individual returns to complex small business accounting — handled with precision by licensed CPA & EA professionals.</p>
          </div>
        </div>
        <div className="flex-[1.1] hidden md:flex flex-col justify-center p-10 lg:p-14" style={{background:"#f8f9fb"}}>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Our services include</div>
          <div className="flex flex-col gap-2">
            {services.map(s => (
              <div key={s.title} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:"#b8962e"}}/>
                <span className="text-sm font-medium" style={{color:"#1a2e4a"}}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="py-16 px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="text-sm font-bold mb-2" style={{color:"#1a2e4a"}}>{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.desc}</p>
              <Link href="/quote" className="text-xs font-semibold" style={{color:"#b8962e"}}>Get a quote →</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="py-14 px-6" style={{background:"#1a2e4a"}}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Not sure which service you need?</h2>
            <p className="text-sm" style={{color:"rgba(255,255,255,0.6)"}}>Book a free 30-minute consultation and we will guide you.</p>
          </div>
          <Link href="/booking" className="text-white text-sm font-bold px-8 py-3 rounded whitespace-nowrap" style={{background:"#b8962e"}}>Book a Free Call</Link>
        </div>
      </section>
    </>
  );
}
