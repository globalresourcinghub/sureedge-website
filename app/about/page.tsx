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
    </svg>
  );
}

export default function About() {
  return (
    <>
      {/* Hero */}
      <div style={{display:"flex",minHeight:"340px"}}>
        <div style={{flex:1,position:"relative",overflow:"hidden",minWidth:0}}>
          <PeopleBg/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div style={{position:"relative",zIndex:10,padding:"52px 48px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{display:"inline-block",color:"white",fontSize:"10px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"4px 12px",borderRadius:"20px",marginBottom:"20px",background:"#b8962e",width:"fit-content"}}>About Us</div>
            <h1 style={{fontSize:"34px",fontWeight:700,color:"white",lineHeight:1.2,marginBottom:"14px",textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>A CPA Firm Built<br/>for Real People</h1>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.8)",lineHeight:1.7,marginBottom:"20px",maxWidth:"380px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Based in Texas — serving individuals and small businesses nationwide with licensed CPA &amp; EA credentials.</p>
            <div style={{padding:"12px 16px",borderLeft:"2px solid #b8962e",background:"rgba(184,150,46,0.12)",borderRadius:"0 6px 6px 0"}}>
              <p style={{fontSize:"12px",fontStyle:"italic",color:"rgba(255,255,255,0.85)"}}>Delivered personally, accessibly, and affordably.</p>
            </div>
          </div>
        </div>
        <div style={{flex:1.1,background:"#faf9f6",display:"flex",flexDirection:"column",justifyContent:"center",padding:"44px 48px"}}>
          <div style={{fontSize:"10px",color:"#b8962e",fontWeight:600,textTransform:"uppercase",letterSpacing:"2.5px",marginBottom:"20px"}}>Our credentials</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
            {[
              ["CPA","Certified Public Accountant — licensed for full accounting and tax services."],
              ["Enrolled Agent","IRS-licensed to represent clients in all tax matters, including audits."],
              ["100% Virtual","Serving clients nationwide from Texas — no office visit required."],
              ["Year-Round","Available all year, not just at tax time. We plan proactively."],
            ].map(([t,d]) => (
              <div key={t} style={{background:"white",borderRadius:"10px",padding:"16px",borderLeft:"3px solid #b8962e",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
                <div style={{fontSize:"13px",fontWeight:600,color:"#1a2e4a",marginBottom:"4px"}}>{t}</div>
                <div style={{fontSize:"11px",color:"#888",lineHeight:1.55}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story + Values */}
      <section style={{padding:"64px 44px",background:"#fff"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"48px"}}>
          <div>
            <h2 style={{fontSize:"24px",fontWeight:700,color:"#1a2e4a",marginBottom:"16px"}}>Our Story</h2>
            <p style={{fontSize:"14px",color:"#555",lineHeight:1.75,marginBottom:"14px"}}>SureEdge Tax &amp; Accounting was founded on a simple belief: every individual and small business deserves the same quality of tax and accounting services that larger firms provide their biggest clients.</p>
            <p style={{fontSize:"14px",color:"#555",lineHeight:1.75,marginBottom:"14px"}}>We are a family-run practice based in Texas, bringing together complementary expertise — CPA and Enrolled Agent credentials — to serve our clients as a true partner, not just a once-a-year preparer.</p>
            <p style={{fontSize:"14px",color:"#555",lineHeight:1.75}}>We operate 100% virtually, which means we can serve clients across the entire country while keeping our overhead low and passing those savings on to you.</p>
          </div>
          <div>
            <h2 style={{fontSize:"24px",fontWeight:700,color:"#1a2e4a",marginBottom:"20px"}}>Our Values</h2>
            <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
              {[
                ["Transparency","No surprise fees. Clear pricing, clear communication."],
                ["Accessibility","You get our direct number and email — no phone trees."],
                ["Precision","Every return reviewed for accuracy before filing."],
                ["Partnership","We think about your taxes year-round, not just in April."],
              ].map(([t,d]) => (
                <div key={t} style={{display:"flex",gap:"12px"}}>
                  <div style={{width:"3px",borderRadius:"2px",background:"#b8962e",flexShrink:0,minHeight:"40px"}}/>
                  <div>
                    <div style={{fontSize:"13px",fontWeight:600,color:"#1a2e4a",marginBottom:"3px"}}>{t}</div>
                    <div style={{fontSize:"12px",color:"#888",lineHeight:1.55}}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:"#1a2e4a",padding:"52px 44px"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"24px"}}>
        <div>
          <h2 style={{fontSize:"22px",fontWeight:700,color:"white",marginBottom:"6px"}}>Ready to work together?</h2>
          <p style={{fontSize:"13px",color:"rgba(255,255,255,0.6)"}}>Start with a free 30-minute consultation.</p>
        </div>
        <Link href="/booking" style={{color:"white",fontSize:"13px",fontWeight:700,padding:"13px 28px",borderRadius:"7px",background:"#b8962e",textDecoration:"none",whiteSpace:"nowrap"}}>Book a Free Call</Link>
      </div>
      </section>
    </>
  );
}
