import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Tax Tips & Accounting Insights",
  description: "Practical tax tips, small-business accounting advice, and IRS compliance guidance from licensed CPA and Enrolled Agent professionals.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Tax Tips & Accounting Insights",
    description: "Practical tax tips, small-business accounting advice, and IRS compliance guidance.",
    url: "/blog",
  },
};

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

const topics = [
  { category: "Tax Tips", desc: "Filing deadlines, deductions, and what to do when things go wrong" },
  { category: "Small Business", desc: "Entity structure, bookkeeping, and year-round tax strategy" },
  { category: "IRS & Compliance", desc: "How to read IRS notices and what your response options are" },
  { category: "Financial Planning", desc: "Retirement accounts, self-employment income, and long-term planning" },
];

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
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.92)",lineHeight:1.7,maxWidth:"380px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Practical tax tips and financial guidance written by licensed professionals, not algorithms.</p>
          </div>
        </div>
        <div style={{flex:1,background:"#faf9f6",display:"flex",flexDirection:"column",justifyContent:"center",padding:"44px 48px"}}>
          <div style={{fontSize:"10px",color:"#b8962e",fontWeight:600,textTransform:"uppercase",letterSpacing:"2.5px",marginBottom:"20px"}}>What we write about</div>
          <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
            {topics.map(t => (
              <div key={t.category} style={{padding:"14px 0",borderBottom:"1px solid #f0ede6"}}>
                <div style={{fontSize:"12px",fontWeight:700,color:"#1a2e4a",marginBottom:"4px"}}>{t.category}</div>
                <div style={{fontSize:"12px",color:"#666",lineHeight:1.5}}>{t.desc}</div>
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
              <p style={{fontSize:"12px",color:"#555",lineHeight:1.6,marginBottom:"14px"}}>{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} style={{fontSize:"12px",fontWeight:600,color:"#b8962e",textDecoration:"none"}}>Read more →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}