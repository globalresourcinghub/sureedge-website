// BOOKING PAGE TEMPORARILY DISABLED
// To re-enable: delete this file content and restore the commented code below.
// Re-enable date target: a few weeks from April 2026.

import { redirect } from "next/navigation";

export default function Booking() {
  redirect("/contact");
}

/* ===== ORIGINAL BOOKING PAGE — RESTORE WHEN READY =====
import Link from "next/link";
export default function BookingOriginal() {
  return (
    <>
      <div style={{display:"flex",minHeight:"340px"}}>
        <div style={{flex:1,background:"#1a2e4a",display:"flex",flexDirection:"column",justifyContent:"center",padding:"52px 48px"}}>
          <div style={{display:"inline-block",color:"white",fontSize:"10px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"4px 12px",borderRadius:"20px",marginBottom:"20px",background:"#b8962e",width:"fit-content"}}>Free Consultation</div>
          <h1 style={{fontSize:"34px",fontWeight:700,color:"white",lineHeight:1.2,marginBottom:"14px"}}>Book a Free 30-Minute Call</h1>
          <p style={{fontSize:"14px",color:"rgba(255,255,255,0.88)",lineHeight:1.7,maxWidth:"380px"}}>Meet with a licensed CPA or EA to discuss your tax situation, get answers, and learn how we can help.</p>
        </div>
        <div style={{flex:1,background:"#faf9f6",display:"flex",alignItems:"center",justifyContent:"center",padding:"44px 48px"}}>
          <div style={{width:"100%",maxWidth:"480px"}}>
            <div className="calendly-inline-widget" data-url="https://calendly.com/sureedgetax/30min" style={{minWidth:"280px",height:"580px"}}/>
            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async/>
          </div>
        </div>
      </div>
    </>
  );
}
===== END ORIGINAL BOOKING PAGE ===== */