"use client";
import { useState } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";

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
    </svg>
  );
}

const inputStyle = {width:"100%",border:"1px solid #e5e7eb",borderRadius:"6px",padding:"10px 12px",fontSize:"13px",outline:"none",background:"#fff"} as const;
const selectStyle = {...inputStyle,color:"#555"} as const;

export default function Booking() {
  const [form, setForm] = useState({name:"",email:"",phone:"",service:"",days:"",message:""});
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [errorDetail, setErrorDetail] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorDetail(null);
    try {
      const { ok, message } = await submitToWeb3Forms({
        subject: "New Consultation Request - SureEdge",
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
      <div style={{display:"flex",minHeight:"360px"}}>
        {/* Left dark panel */}
        <div style={{flex:0.9,position:"relative",overflow:"hidden",minWidth:0}}>
          <CalendarBg/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(8,18,32,0.65) 0%,rgba(8,18,32,0.4) 100%)"}}/>
          <div style={{position:"relative",zIndex:10,padding:"52px 48px",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{display:"inline-block",color:"white",fontSize:"10px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"4px 12px",borderRadius:"20px",marginBottom:"20px",background:"#b8962e",width:"fit-content"}}>Free Consultation</div>
            <h1 style={{fontSize:"34px",fontWeight:700,color:"white",lineHeight:1.2,marginBottom:"14px",textShadow:"0 2px 8px rgba(0,0,0,0.9)"}}>Book a Free<br/>30-Minute Call</h1>
            <p style={{fontSize:"14px",color:"rgba(255,255,255,0.8)",lineHeight:1.7,marginBottom:"24px",maxWidth:"360px",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>Tell us your preferred times — we will confirm within 2 business days.</p>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {["Phone call — no video required","Confirmed within 2 business days","No obligation, no pressure"].map(i => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#b8962e",flexShrink:0}}/>
                  <span style={{fontSize:"13px",color:"rgba(255,255,255,0.8)"}}>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right form panel */}
        <div style={{flex:1.1,background:"#faf9f6",display:"flex",flexDirection:"column",justifyContent:"center",padding:"44px 48px"}}>
          {status === "sent" ? (
            <div style={{textAlign:"center",padding:"32px 0"}}>
              <div style={{fontSize:"40px",marginBottom:"12px"}}>✅</div>
              <h3 style={{fontSize:"18px",fontWeight:700,color:"#1a2e4a",marginBottom:"8px"}}>Request Received!</h3>
              <p style={{fontSize:"13px",color:"#888"}}>We will reach out within 2 business days to confirm your consultation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div style={{fontSize:"10px",color:"#b8962e",fontWeight:600,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"4px"}}>Request a consultation</div>
              {[{name:"name",placeholder:"Full Name *",type:"text"},{name:"email",placeholder:"Email Address *",type:"email"},{name:"phone",placeholder:"Phone Number *",type:"tel"}].map(f => (
                <input key={f.name} type={f.type} placeholder={f.placeholder} required value={(form as any)[f.name]} onChange={e => setForm(p=>({...p,[f.name]:e.target.value}))} style={inputStyle}/>
              ))}
              <select value={form.service} onChange={e => setForm(p=>({...p,service:e.target.value}))} style={selectStyle}>
                <option value="">What do you need help with?</option>
                <option>Individual Tax Return</option><option>Small Business Tax</option><option>Bookkeeping</option><option>Payroll</option><option>IRS Issue</option><option>Tax Planning</option><option>Other</option>
              </select>
              <select value={form.days} onChange={e => setForm(p=>({...p,days:e.target.value}))} style={selectStyle}>
                <option value="">Preferred Days &amp; Time</option>
                <option>Weekday Morning</option><option>Weekday Afternoon</option><option>Weekday Evening</option><option>Weekend Morning</option><option>Flexible</option>
              </select>
              <textarea placeholder="Brief description of your situation..." value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} rows={3} style={{...inputStyle,resize:"none"}}/>
              <button type="submit" disabled={status==="sending"} style={{background:"#b8962e",color:"white",fontSize:"13px",fontWeight:700,padding:"13px",borderRadius:"7px",border:"none",cursor:"pointer"}}>
                {status==="sending" ? "Sending..." : "Request Consultation"}
              </button>
              {status==="error" && <p style={{fontSize:"12px",color:"#dc2626",textAlign:"center"}}>{errorDetail ?? "Something went wrong."}</p>}
            </form>
          )}
        </div>
      </div>
    </>
  );
}
