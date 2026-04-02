import Link from "next/link";

const posts = [
  {slug:"stress-free-tax-filing",title:"Stress-Free Tax Filing: What You Need to Know",date:"March 14, 2026",category:"Tax Tips",excerpt:"Tax season doesn't have to be stressful. Here's how to gather your documents, understand your deductions, and file with confidence."},
  {slug:"maximizing-tax-refunds",title:"Maximizing Tax Refunds: Tips from SureEdge",date:"March 14, 2026",category:"Tax Tips",excerpt:"Most taxpayers leave money on the table every year. Learn the most commonly missed deductions and credits for individuals."},
  {slug:"small-business-financial-support",title:"Why Small Businesses Need Expert Financial Support",date:"March 14, 2026",category:"Small Business",excerpt:"DIY bookkeeping and tax prep might seem like a cost-saving measure, but it often costs more in the long run. Here's why."},
  {slug:"personalized-solutions-entrepreneurs",title:"Personalized Financial Solutions for Modern Entrepreneurs",date:"March 14, 2026",category:"Financial Planning",excerpt:"The gig economy and remote work have changed how people earn. Your tax strategy needs to evolve with you."},
  {slug:"navigating-tax-season",title:"Navigating Tax Season with SureEdge Professionals",date:"March 14, 2026",category:"Tax Tips",excerpt:"A behind-the-scenes look at how our team approaches tax season to deliver accurate, timely returns for every client."},
  {slug:"choosing-accounting-service",title:"Choosing the Right Accounting Service for Your Business",date:"March 14, 2026",category:"Small Business",excerpt:"Not all accounting services are created equal. Here's what to look for when choosing a CPA or accounting firm for your business."},
  {slug:"irs-notices-explained",title:"IRS Notices Explained: What to Do When You Receive One",date:"March 14, 2026",category:"IRS & Compliance",excerpt:"Receiving a letter from the IRS is stressful, but most notices are routine. Learn what each type means and what to do next."},
  {slug:"s-corp-vs-llc-tax",title:"S-Corp vs LLC: Which is Better for Your Taxes?",date:"March 14, 2026",category:"Small Business",excerpt:"Choosing the right entity structure can save thousands in taxes. Here's a plain-English breakdown of the tax implications."},
];

function NewspaperBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 280 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="300" fill="#0d1f35"/>
      <rect x="20" y="20" width="110" height="8" rx="2" fill="#b8962e" opacity="0.7"/>
      <rect x="20" y="36" width="90" height="4" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="20" y="46" width="100" height="4" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="20" y="56" width="75" height="4" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="20" y="74" width="110" height="8" rx="2" fill="#b8962e" opacity="0.5"/>
      <rect x="20" y="90" width="80" height="4" rx="1" fill="#fff" opacity="0.12"/>
      <rect x="20" y="100" width="95" height="4" rx="1" fill="#fff" opacity="0.12"/>
      <rect x="20" y="118" width="110" height="8" rx="2" fill="#b8962e" opacity="0.4"/>
      <rect x="148" y="20" width="1" height="160" fill="#b8962e" opacity="0.2"/>
      <rect x="160" y="20" width="100" height="60" rx="4" fill="#1a3255" opacity="0.6"/>
      <rect x="168" y="28" width="84" height="4" rx="1" fill="#b8962e" opacity="0.5"/>
      <rect x="168" y="38" width="70" height="3" rx="1" fill="#fff" opacity="0.12"/>
      <rect x="160" y="92" width="100" height="50" rx="4" fill="#162c4a" opacity="0.6"/>
      <rect x="168" y="100" width="84" height="4" rx="1" fill="#b8962e" opacity="0.4"/>
    </svg>
  );
}

export default function Blog() {
  return (
    <>
      {/* Hero */}
      <div style={{display:"flex",minHeight:"300px"}}>
        <div style={{flex:1,position:"relative",overflow:"hidden",minWidth:0}}>
          <NewspaperBg/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div style={{position:"relative",zIndex:10,padding:"52px 48px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{display:"inline-block",color:"white",fontSize:"10px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"4px 12px",borderRadius:"20px",marginBottom:"20px",background:"#b8962e",width:"fit-content"}}>Tax &amp; Accounting Insights</div>
            <h1 style={{fontSize:"34px",fontWeight:700,color:"white",lineHeight:1.2,marginBottom:"14px",textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Tips from Our<br/>CPA &amp; EA Team</h1>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.8)",lineHeight:1.7,maxWidth:"380px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Practical tax tips and financial guidance written by licensed professionals — not algorithms.</p>
          </div>
        </div>
        <div style={{flex:1,background:"#faf9f6",display:"flex",flexDirection:"column",justifyContent:"center",padding:"44px 48px"}}>
          <div style={{fontSize:"10px",color:"#b8962e",fontWeight:600,textTransform:"uppercase",letterSpacing:"2.5px",marginBottom:"20px"}}>Latest articles</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0"}}>
            {posts.map(p => (
              <div key={p.slug} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"10px 12px 10px 0",borderBottom:"1px solid #f0ede6"}}>
                <div style={{fontSize:"10px",color:"#b8962e",width:"80px",flexShrink:0,fontWeight:500,paddingTop:"1px"}}>{p.category}</div>
                <Link href={`/blog/${p.slug}`} style={{fontSize:"12px",fontWeight:500,color:"#1a2e4a",textDecoration:"none",lineHeight:1.4}}>{p.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post grid */}
      <section style={{padding:"56px 44px",background:"#fff"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
          {posts.map(p => (
            <div key={p.slug} style={{background:"#faf9f6",borderRadius:"10px",padding:"24px",border:"1px solid #f0ede6"}}>
              <div style={{fontSize:"10px",fontWeight:600,textTransform:"uppercase",letterSpacing:"1.5px",color:"#b8962e",marginBottom:"10px"}}>{p.category} · {p.date}</div>
              <h3 style={{fontSize:"14px",fontWeight:600,color:"#1a2e4a",marginBottom:"8px",lineHeight:1.4}}>{p.title}</h3>
              <p style={{fontSize:"12px",color:"#888",lineHeight:1.6,marginBottom:"14px"}}>{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} style={{fontSize:"12px",fontWeight:600,color:"#b8962e",textDecoration:"none"}}>Read more →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
