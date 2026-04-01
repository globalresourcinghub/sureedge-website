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
      <div className="flex min-h-[300px]">
        <div className="flex-[0.8] relative overflow-hidden min-w-0">
          <NewspaperBg />
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
            <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>Tax & Accounting Insights</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Tips from Our<br/>CPA & EA Team</h1>
            <p className="text-sm leading-relaxed max-w-sm" style={{color:"#e8f0f8", textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Practical tax tips and financial guidance written by licensed professionals — not algorithms.</p>
          </div>
        </div>
        <div className="flex-[1.2] hidden md:flex flex-col justify-center p-10 lg:p-14" style={{background:"#f8f9fb"}}>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Latest articles</div>
          <div className="flex flex-col gap-3">
            {posts.slice(0,4).map(p => (
              <div key={p.slug} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <div className="text-[10px] text-gray-400 w-24 flex-shrink-0">{p.category}</div>
                <Link href={`/blog/${p.slug}`} className="text-sm font-medium hover:underline" style={{color:"#1a2e4a"}}>{p.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <div key={p.slug} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:"#b8962e"}}>{p.category} · {p.date}</div>
              <h3 className="text-sm font-bold mb-2 leading-snug" style={{color:"#1a2e4a"}}>{p.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="text-xs font-semibold" style={{color:"#b8962e"}}>Read more →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
