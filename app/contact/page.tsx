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
    </svg>
  );
}

const inputStyle = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"6px",padding:"10px 12px",fontSize:"13px",outline:"none",background:"#fff"} as const;

export default function Contact() {
  const [form, setForm] = useState({firstname:"",lastname:"",email:"",message:""});
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [errorDetail, setErrorDetail] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorDetail(null);
    try {
      const { ok, message } = await submitToWeb3Forms({
        subject: "New Contact Form Message - SureEdge",
        ...form,
      });
      if (ok) setStatus("sent");
      else { setStatus("error"); setErrorDetail(message ?? "Something went wrong."); }
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Try again or email contact@sureedgetax.com.");
    }
  };

  return (
    <>
      <div style={{display:"flex",minHeight:"340px"}}>
        {/* Left dark panel */}
        <div style={{flex:0.9,position:"relative",overflow:"hidden",minWidth:0}}>
          <EnvelopeBg/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div style={{position:"relative",zIndex:10,padding:"52px 48px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{display:"inline-block",color:"white",fontSize:"10px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"4px 12px",borderRadius:"20px",marginBottom:"20px",background:"#b8962e",width:"fit-content"}}>Get In Touch</div>
            <h1 style={{fontSize:"34px",fontWeight:700,color:"white",lineHeight:1.2,marginBottom:"14px",textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>{"We'd"} Love to<br/>Hear From You</h1>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.8)",lineHeight:1.7,marginBottom:"24px",maxWidth:"360px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Reach out with any questions and we will respond within 2 business days.</p>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {["contact@sureedgetax.com","Mon–Fri, 9am–6pm CT","Response within 2 business days"].map(i => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#b8962e",flexShrink:0}}/>
                  <span style={{fontSize:"13px",color:"rgba(255,255,255,0.8)"}}>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right form panel */}
        <div style={{flex:1,background:"#faf9f6",display:"flex",flexDirection:"column",justifyContent:"center",padding:"44px 48px"}}>
          {status === "sent" ? (
            <div style={{textAlign:"center",padding:"32px 0"}}>
              <div style={{fontSize:"40px",marginBottom:"12px"}}>✅</div>
              <h3 style={{fontSize:"18px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>Message Sent!</h3>
              <p style={{fontSize:"13px",color:"#888"}}>We will get back to you within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div style={{fontSize:"10px",color:"#b8962e",fontWeight:600,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"4px"}}>Send us a message</div>
              <div style={{display:"flex",gap:"12px"}}>
                <input type="text" placeholder="First Name" value={form.firstname} onChange={e => setForm(p=>({...p,firstname:e.target.value}))} style={inputStyle}/>
                <input type="text" placeholder="Last Name" value={form.lastname} onChange={e => setForm(p=>({...p,lastname:e.target.value}))} style={inputStyle}/>
              </div>
              <input type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} style={inputStyle}/>
              <textarea placeholder="Your message..." required value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} rows={5} style={{...inputStyle,resize:"none"}}/>
              <button type="submit" disabled={status==="sending"} style={{background:"#b8962e",color:"white",fontSize:"13px",fontWeight:700,padding:"13px",borderRadius:"7px",border:"none",cursor:"pointer"}}>
                {status==="sending" ? "Sending..." : "Send Message"}
              </button>
              {status==="error" && <p style={{fontSize:"12px",color:"#dc2626",textAlign:"center"}}>{errorDetail ?? "Something went wrong."}</p>}
            </form>
          )}
        </div>
      </div>
    </>
  );
}
