"use client";
import { useState } from "react";

function Form1040Bg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="360" fill="#0d1f35"/>
      <rect x="30" y="15" width="130" height="180" rx="6" fill="#1a3255" opacity="0.5"/>
      <text x="40" y="32" fontSize="7" fill="#b8962e" opacity="0.9">Form 1040</text>
      <rect x="40" y="40" width="50" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="100" y="40" width="30" height="3" rx="1" fill="#b8962e" opacity="0.3"/>
      <rect x="40" y="50" width="110" height="1" fill="#fff" opacity="0.1"/>
      <rect x="40" y="58" width="50" height="3" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="100" y="58" width="30" height="3" rx="1" fill="#b8962e" opacity="0.25"/>
      <rect x="40" y="68" width="110" height="1" fill="#fff" opacity="0.1"/>
      <rect x="40" y="76" width="50" height="3" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="100" y="76" width="30" height="3" rx="1" fill="#b8962e" opacity="0.25"/>
      <rect x="40" y="100" width="110" height="4" rx="1" fill="#b8962e" opacity="0.4"/>
      <rect x="40" y="112" width="80" height="3" rx="1" fill="#fff" opacity="0.1"/>
      <rect x="40" y="145" width="110" height="8" rx="2" fill="#b8962e" opacity="0.5"/>
      <rect x="180" y="40" width="90" height="60" rx="4" fill="#162c4a" opacity="0.5"/>
      <rect x="188" y="50" width="74" height="4" rx="1" fill="#b8962e" opacity="0.4"/>
      <circle cx="225" cy="150" r="30" fill="none" stroke="#b8962e" strokeWidth="1.5" opacity="0.2"/>
    </svg>
  );
}

function CorpBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="360" fill="#0d1f35"/>
      <rect x="20" y="30" width="180" height="110" rx="6" fill="#1a3255" opacity="0.4"/>
      <rect x="30" y="42" width="60" height="5" rx="2" fill="#b8962e" opacity="0.6"/>
      <rect x="30" y="55" width="160" height="1" fill="#fff" opacity="0.1"/>
      <rect x="30" y="64" width="40" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="100" y="64" width="40" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="30" y="74" width="160" height="1" fill="#fff" opacity="0.1"/>
      <rect x="30" y="83" width="40" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="100" y="83" width="40" height="3" rx="1" fill="#b8962e" opacity="0.4"/>
      <rect x="50" y="124" width="120" height="8" rx="2" fill="#b8962e" opacity="0.4"/>
      <rect x="210" y="20" width="70" height="50" rx="4" fill="#162c4a" opacity="0.6"/>
      <rect x="218" y="30" width="54" height="4" rx="1" fill="#b8962e" opacity="0.5"/>
    </svg>
  );
}

type QuoteType = "individual" | "business";

export default function Quote() {
  const [type, setType] = useState<QuoteType>("individual");
  const [form, setForm] = useState({name:"",business:"",email:"",phone:"",entity:"",filing:"",year:"",notes:""});
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({access_key:"YOUR_WEB3FORMS_KEY", subject:`New ${type} Tax Quote Request - SureEdge`, type, ...form})
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      <div className="flex min-h-[360px]">
        <div className="flex-[0.85] relative overflow-hidden min-w-0">
          {type === "individual" ? <Form1040Bg /> : <CorpBg />}
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
            <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>{type === "individual" ? "Individual Tax Return" : "Business Tax Return"}</div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Get Your Free<br/>Tax Quote</h1>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{color:"#e8f0f8", textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Fill out the form — we will provide a personalized fee quote within 2 business days.</p>
            <div className="flex flex-col gap-2">
              {["Secure & Confidential","Response in 2 Business Days","No Commitment Required"].map(i => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:"#b8962e"}}/>
                  <span className="text-xs" style={{color:"rgba(255,255,255,0.8)"}}>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-[1.15] hidden md:flex flex-col justify-center p-10 lg:p-14" style={{background:"#f8f9fb"}}>
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-lg font-bold mb-2" style={{color:"#1a2e4a"}}>Quote Request Received!</h3>
              <p className="text-sm text-gray-500">We will review your information and send a personalized quote within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-2">
                {(["individual","business"] as QuoteType[]).map(t => (
                  <button key={t} type="button" onClick={() => setType(t)} className="flex-1 py-2 text-xs font-semibold transition-colors" style={{background: type===t ? "#1a2e4a" : "#fff", color: type===t ? "#fff" : "#666"}}>
                    {t === "individual" ? "Individual" : "Business"}
                  </button>
                ))}
              </div>
              <input type="text" placeholder="Full Name *" required value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>
              {type === "business" && <input type="text" placeholder="Business Name" value={form.business} onChange={e => setForm(p=>({...p,business:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>}
              <input type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>
              <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>
              {type === "individual" ? (
                <select value={form.filing} onChange={e => setForm(p=>({...p,filing:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] text-gray-500">
                  <option value="">Filing Status</option>
                  <option>Single</option><option>Married Filing Jointly</option><option>Married Filing Separately</option><option>Head of Household</option>
                </select>
              ) : (
                <select value={form.entity} onChange={e => setForm(p=>({...p,entity:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] text-gray-500">
                  <option value="">Business Entity Type</option>
                  <option>Sole Proprietor / Schedule C</option><option>LLC (Single Member)</option><option>LLC (Multi-Member)</option><option>S-Corporation</option><option>C-Corporation</option><option>Partnership</option>
                </select>
              )}
              <select value={form.year} onChange={e => setForm(p=>({...p,year:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] text-gray-500">
                <option value="">Tax Year</option>
                <option>2025</option><option>2024</option><option>2023 (Prior Year)</option><option>Multiple Years</option>
              </select>
              <textarea placeholder="Additional details (income sources, special situations, etc.)" value={form.notes} onChange={e => setForm(p=>({...p,notes:e.target.value}))} rows={3} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] resize-none"/>
              <button type="submit" disabled={status==="sending"} className="text-white text-sm font-bold py-3 rounded transition-opacity hover:opacity-90" style={{background:"#b8962e"}}>
                {status==="sending" ? "Submitting..." : "Submit for Quote"}
              </button>
              {status==="error" && <p className="text-xs text-red-500 text-center">Something went wrong. Please email contact@sureedgetax.com</p>}
            </form>
          )}
        </div>
      </div>
      {/* Mobile form */}
      <div className="md:hidden px-6 py-10" style={{background:"#f8f9fb"}}>
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-4" style={{color:"#1a2e4a"}}>Get a Quote</h2>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-4">
            {(["individual","business"] as QuoteType[]).map(t => (
              <button key={t} type="button" onClick={() => setType(t)} className="flex-1 py-2 text-xs font-semibold" style={{background: type===t ? "#1a2e4a" : "#fff", color: type===t ? "#fff" : "#666"}}>
                {t === "individual" ? "Individual" : "Business"}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input type="text" placeholder="Full Name *" required value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm"/>
            <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm"/>
            <button type="submit" className="text-white text-sm font-bold py-3 rounded" style={{background:"#b8962e"}}>Submit for Quote</button>
          </form>
        </div>
      </div>
    </>
  );
}
