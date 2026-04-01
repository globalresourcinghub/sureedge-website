"use client";
import { useState } from "react";

function CalendarBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="360" fill="#0d1f35"/>
      <rect x="30" y="20" width="150" height="165" rx="8" fill="#1a3255" opacity="0.45"/>
      <rect x="30" y="20" width="150" height="28" rx="8" fill="#b8962e" opacity="0.5"/>
      <rect x="38" y="56" width="18" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="62" y="56" width="18" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="86" y="56" width="18" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="110" y="56" width="18" height="3" rx="1" fill="#fff" opacity="0.2"/>
      <rect x="38" y="68" width="18" height="14" rx="2" fill="#162c4a"/>
      <rect x="62" y="68" width="18" height="14" rx="2" fill="#162c4a"/>
      <rect x="86" y="68" width="18" height="14" rx="2" fill="#b8962e" opacity="0.5"/>
      <rect x="110" y="68" width="18" height="14" rx="2" fill="#162c4a"/>
      <rect x="38" y="88" width="18" height="14" rx="2" fill="#162c4a"/>
      <rect x="62" y="88" width="18" height="14" rx="2" fill="#b8962e" opacity="0.3"/>
      <rect x="86" y="88" width="18" height="14" rx="2" fill="#162c4a"/>
      <rect x="110" y="88" width="18" height="14" rx="2" fill="#b8962e" opacity="0.5"/>
      <rect x="38" y="140" width="134" height="30" rx="4" fill="#b8962e" opacity="0.25"/>
      <rect x="200" y="30" width="80" height="170" rx="6" fill="#162c4a" opacity="0.4"/>
      <rect x="208" y="42" width="64" height="4" rx="1" fill="#b8962e" opacity="0.5"/>
      <rect x="208" y="62" width="50" height="3" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="208" y="80" width="44" height="3" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="208" y="98" width="55" height="3" rx="1" fill="#b8962e" opacity="0.4"/>
    </svg>
  );
}

export default function Booking() {
  const [form, setForm] = useState({name:"",email:"",phone:"",service:"",days:"",message:""});
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({access_key:"YOUR_WEB3FORMS_KEY", subject:"New Consultation Request - SureEdge", ...form})
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <>
      <div className="flex min-h-[360px]">
        <div className="flex-[0.85] relative overflow-hidden min-w-0">
          <CalendarBg />
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
            <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>Free Consultation</div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Book a Free<br/>30-Minute Call</h1>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{color:"#e8f0f8", textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Tell us your preferred times — we will confirm within 2 business days.</p>
            <div className="flex flex-col gap-2">
              {["Phone call — no video required","Confirmed within 2 business days","No obligation, no pressure"].map(i => (
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
              <h3 className="text-lg font-bold mb-2" style={{color:"#1a2e4a"}}>Request Received!</h3>
              <p className="text-sm text-gray-500">We will reach out within 2 business days to confirm your consultation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Request a consultation</div>
              {[{name:"name",placeholder:"Full Name *",type:"text"},{name:"email",placeholder:"Email Address *",type:"email"},{name:"phone",placeholder:"Phone Number *",type:"tel"}].map(f => (
                <input key={f.name} type={f.type} placeholder={f.placeholder} required value={(form as any)[f.name]} onChange={e => setForm(p => ({...p,[f.name]:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>
              ))}
              <select value={form.service} onChange={e => setForm(p => ({...p,service:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] text-gray-500">
                <option value="">What do you need help with?</option>
                <option>Individual Tax Return</option><option>Small Business Tax</option><option>Bookkeeping</option><option>Payroll</option><option>IRS Issue</option><option>Tax Planning</option><option>Other</option>
              </select>
              <select value={form.days} onChange={e => setForm(p => ({...p,days:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] text-gray-500">
                <option value="">Preferred Days & Time</option>
                <option>Weekday Morning</option><option>Weekday Afternoon</option><option>Weekday Evening</option><option>Weekend Morning</option><option>Flexible</option>
              </select>
              <textarea placeholder="Brief description of your situation..." value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))} rows={3} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] resize-none"/>
              <button type="submit" disabled={status==="sending"} className="text-white text-sm font-bold py-3 rounded transition-opacity hover:opacity-90" style={{background:"#b8962e"}}>
                {status==="sending" ? "Sending..." : "Request Consultation"}
              </button>
              {status==="error" && <p className="text-xs text-red-500 text-center">Something went wrong. Please email us directly at contact@sureedgetax.com</p>}
            </form>
          )}
        </div>
      </div>
      {/* Mobile form */}
      <div className="md:hidden px-6 py-10" style={{background:"#f8f9fb"}}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-2" style={{color:"#1a2e4a"}}>Request a Consultation</h2>
          {[{name:"name",placeholder:"Full Name *",type:"text"},{name:"email",placeholder:"Email *",type:"email"},{name:"phone",placeholder:"Phone *",type:"tel"}].map(f => (
            <input key={f.name} type={f.type} placeholder={f.placeholder} required value={(form as any)[f.name]} onChange={e => setForm(p => ({...p,[f.name]:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none"/>
          ))}
          <button type="submit" className="text-white text-sm font-bold py-3 rounded" style={{background:"#b8962e"}}>Request Consultation</button>
        </form>
      </div>
    </>
  );
}
