import Link from "next/link";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  background: React.ReactNode;
  children?: React.ReactNode;
  cta?: { label: string; href: string };
}

export default function PageHero({ badge, title, subtitle, background, children, cta }: PageHeroProps) {
  return (
    <div className="flex min-h-[360px]">
      {/* Left — dark hero panel */}
      <div className="flex-1 relative overflow-hidden min-w-0">
        {background}
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.62) 0%,rgba(8,18,32,0.38) 100%)"}}/>
        <div className="relative z-10 p-10 md:p-14 flex flex-col justify-center h-full">
          <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>{badge}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}} dangerouslySetInnerHTML={{__html: title}}/>
          <p className="text-sm md:text-base text-blue-100 leading-relaxed mb-8 max-w-sm" style={{textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>{subtitle}</p>
          {children}
          {cta && (
            <Link href={cta.href} className="inline-block text-white text-sm font-bold px-6 py-3 rounded w-fit" style={{background:"#b8962e"}}>{cta.label}</Link>
          )}
        </div>
      </div>
      {/* Right — light panel */}
      <div className="flex-[1.1] hidden md:flex flex-col justify-center p-10 lg:p-14" style={{background:"#f8f9fb"}}>
        <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-5">Why clients choose us</div>
        <div className="flex flex-col gap-4">
          {[
            ["CPA & Enrolled Agent","Dual credentials — taxes and IRS representation under one roof."],
            ["Direct Access to Your CPA","You speak directly with us — not a call center or junior staffer."],
            ["100% Virtual, Nationwide","Based in Frisco, TX. Serving clients across the country."],
            ["Year-Round Support","We're available all year — not just at tax time."],
          ].map(([t,d]) => (
            <div key={t} className="bg-white rounded-lg p-4 border-l-[3px]" style={{borderLeftColor:"#b8962e", boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
              <div className="text-sm font-bold mb-1" style={{color:"#1a2e4a"}}>{t}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
