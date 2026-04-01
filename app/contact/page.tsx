"use client";
import { useState } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";

function EnvelopeBg() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 280 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="360" fill="#0d1f35"/>
      <rect x="30" y="80" width="160" height="110" rx="6" fill="#1a3255" opacity="0.5"/>
      <path d="M30 86 L110 135 L190 86" stroke="#b8962e" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <rect x="40" y="140" width="60" height="3" rx="1" fill="#fff" opacity="0.15"/>
      <rect x="40" y="150" width="80" height="3" rx="1" fill="#fff" opacity="0.12"/>
      <rect x="40" y="168" width="130" height="12" rx="3" fill="#b8962e" opacity="0.3"/>
      <circle cx="220" cy="100" r="25" fill="#162c4a" opacity="0.5"/>
      <path d="M213 100 L218 105 L228 95" stroke="#b8962e" strokeWidth="2" fill="none" opacity="0.7"/>
      <circle cx="220" cy="185" r="20" fill="#162c4a" opacity="0.4"/>
      <rect x="212" y="181" width="16" height="12" rx="2" fill="#1a3255" opacity="0.8"/>
      <path d="M212 184 L220 189 L228 184" stroke="#b8962e" strokeWidth="1.5" fill="none" opacity="0.5"/>
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({firstname:"",lastname:"",email:"",message:""});
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorDetail(null);
    if (!web3FormsKey) {
      setStatus("error");
      setErrorDetail(
        "Missing NEXT_PUBLIC_WEB3FORMS_KEY. Add it in Vercel (or .env.local), then redeploy."
      );
      return;
    }
    try {
      const { ok, message } = await submitToWeb3Forms({
        access_key: web3FormsKey,
        subject: "New Contact Form Message - SureEdge",
        ...form,
      });
      if (ok) setStatus("sent");
      else {
        setStatus("error");
        setErrorDetail(
          message ??
            "If this persists, add your domain in Web3Forms and confirm the key in Vercel, then redeploy."
        );
      }
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Try again or email contact@sureedgetax.com.");
    }
  };

  return (
    <>
      <div className="flex min-h-[340px]">
        <div className="flex-[0.8] relative overflow-hidden min-w-0">
          <EnvelopeBg />
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
            <div className="inline-block text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5" style={{background:"#b8962e"}}>Get In Touch</div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-4" style={{textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>{"We'd"} Love to<br/>Hear From You</h1>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{color:"#e8f0f8", textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Reach out with any questions — we respond within 1 business day.</p>
            <div className="flex flex-col gap-2">
              {["contact@sureedgetax.com","Mon–Fri, 9am–6pm CT","Response within 1 business day"].map(i => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:"#b8962e"}}/>
                  <span className="text-xs" style={{color:"rgba(255,255,255,0.8)"}}>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-[1.2] hidden md:flex flex-col justify-center p-10 lg:p-14" style={{background:"#f8f9fb"}}>
          {status === "sent" ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-lg font-bold mb-2" style={{color:"#1a2e4a"}}>Message Sent!</h3>
              <p className="text-sm text-gray-500">We will get back to you within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Send us a message</div>
              <div className="flex gap-3">
                <input type="text" placeholder="First Name" value={form.firstname} onChange={e => setForm(p=>({...p,firstname:e.target.value}))} className="flex-1 border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>
                <input type="text" placeholder="Last Name" value={form.lastname} onChange={e => setForm(p=>({...p,lastname:e.target.value}))} className="flex-1 border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>
              </div>
              <input type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]"/>
              <textarea placeholder="Your message..." required value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} rows={5} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e] resize-none"/>
              <button type="submit" disabled={status==="sending"} className="text-white text-sm font-bold py-3 rounded transition-opacity hover:opacity-90" style={{background:"#b8962e"}}>
                {status==="sending" ? "Sending..." : "Send Message"}
              </button>
              {status==="error" && (
                <p className="text-xs text-red-500 text-center">
                  {errorDetail ?? "Something went wrong. Please email contact@sureedgetax.com."}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
      {/* Mobile form */}
      <div className="md:hidden px-6 py-10" style={{background:"#f8f9fb"}}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
          <h2 className="text-lg font-bold mb-2" style={{color:"#1a2e4a"}}>Send a Message</h2>
          <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm"/>
          <textarea placeholder="Your message..." required value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} rows={4} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm resize-none"/>
          <button type="submit" className="text-white text-sm font-bold py-3 rounded" style={{background:"#b8962e"}}>Send Message</button>
          {status==="error" && (
            <p className="text-xs text-red-500 text-center">
              {errorDetail ?? "Something went wrong. Please email contact@sureedgetax.com."}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
