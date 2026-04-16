import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | CPA, Tax & Accounting",
  description: "Full-service tax and accounting for individuals and small businesses. CPA and EA licensed professionals serving clients nationwide.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | CPA, Tax & Accounting",
    description: "Full-service tax and accounting for individuals and small businesses. CPA and EA licensed professionals serving clients nationwide.",
    url: "/services",
  },
};

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
  {title:"Individual Tax Preparation",desc:"Federal and state returns for W-2 employees, freelancers, investors, rental property owners, and retirees. We handle all forms and schedules so nothing gets missed."},
  {title:"Small Business Tax",desc:"Schedule C, Form 1120-S, and Form 1065 for LLCs, S-Corps, C-Corps, and partnerships. Accurate, on-time filing with full entity-level review."},
  {title:"Bookkeeping",desc:"Monthly reconciliation, categorization, and financial statements delivered via QuickBooks. Clean books you can actually use to run your business."},
  {title:"Payroll Services",desc:"End-to-end payroll processing, quarterly filings, and year-end W-2 and 1099 preparation. We keep you compliant so you can focus on your team."},
  {title:"Tax Planning & Strategy",desc:"Proactive year-round strategies to legally reduce what you owe. We identify opportunities before the year closes, not after."},
  {title:"IRS Representation",desc:"Received a notice or facing an audit? Our licensed Enrolled Agent represents you directly before the IRS with unlimited practice rights."},
];

const highlights = [
  "Licensed CPA and Enrolled Agent on every return",
  "Federal and state filings for all 50 states",
  "Individuals, freelancers, and small businesses",
  "Year-round support, not just tax season",
  "Secure document handling and e-filing",
  "Flat fees with no surprise billing",
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <div style={{display:"flex",minHeight:"340px"}}>
        <div style={{flex:1,position:"relative",overflow:"hidden",minWidth:0}}>
          <DocsBg/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div style={{position:"relative",zIndex:10,padding:"52px 48px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{display:"inline-block",color:"white",fontSize:"10px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"4px 12px",borderRadius:"20px",marginBottom:"20px",background:"#b8962e",width:"fit-content"}}>What We Offer</div>
            <h1 style={{fontSize:"34px",fontWeight:700,color:"white",lineHeight:1.2,marginBottom:"14px",textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Full-Service Tax<br/>&amp; Accounting</h1>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.92)",lineHeight:1.7,maxWidth:"380px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>From individual returns to complex small business accounting, handled with precision by licensed CPA &amp; EA professionals.</p>
          </div>
        </div>
        <div style={{flex:1,background:"#faf9f6",display:"flex",flexDirection:"column",justifyContent:"center",padding:"44px 48px"}}>
          <div style={{fontSize:"10px",color:"#b8962e",fontWeight:600,textTransform:"uppercase",letterSpacing:"2.5px",marginBottom:"20px"}}>Why clients choose us</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0"}}>
            {highlights.map(h => (
              <div key={h} style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid #f0ede6"}}>
                <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#b8962e",flexShrink:0}}/>
                <span style={{fontSize:"13px",fontWeight:500,color:"#1a2e4a"}}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service cards */}
      <section style={{padding:"56px 44px",background:"#fff"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"36px"}}>
          {services.map(s => (
            <div key={s.title} style={{background:"#faf9f6",borderRadius:"10px",padding:"24px",border:"1px solid #f0ede6"}}>
              <h3 style={{fontSize:"14px",fontWeight:600,color:"#1a2e4a",marginBottom:"8px"}}>{s.title}</h3>
              <p style={{fontSize:"12px",color:"#555",lineHeight:1.6,margin:0}}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <Link href="/tax-intake" style={{display:"inline-block",background:"#b8962e",color:"white",fontSize:"13px",fontWeight:700,padding:"13px 32px",borderRadius:"7px",textDecoration:"none"}}>Get a Free Quote</Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:"#1a2e4a",padding:"52px 44px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"24px"}}>
        <div>
          <h2 style={{fontSize:"22px",fontWeight:700,color:"white",marginBottom:"6px"}}>Not sure which service you need?</h2>
          <p style={{fontSize:"13px",color:"rgba(255,255,255,0.88)"}}>Book a free 30-minute consultation and we will guide you.</p>
        </div>
        <Link href="/booking" style={{color:"white",fontSize:"13px",fontWeight:700,padding:"13px 28px",borderRadius:"7px",background:"#b8962e",textDecoration:"none",whiteSpace:"nowrap"}}>Book a Free Call</Link>
      </section>
    </>
  );
}