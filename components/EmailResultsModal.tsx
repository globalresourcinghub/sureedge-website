"use client";

import { useState } from "react";

const PORTAL_LEADS_ENDPOINT = "https://portal.sureedgetax.com/api/public/tool-email-leads";

interface Props {
  onClose: () => void;
  toolSlug: string;
  toolName: string;
  resultsSummary: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  taxYear?: number;
}

// Shared email-results modal for all /tools/* calculators. Posts to BOTH:
//   1. Web3Forms — sends an email to admin + the user's own inbox via configured template
//   2. Portal /api/public/tool-email-leads — durable DB record visible in /admin/tools
// Either failure is non-fatal: if one side errors we still proceed (Web3Forms is the
// user-visible delivery path; portal log is the admin-visibility path).
export default function EmailResultsModal({ onClose, toolSlug, toolName, resultsSummary, inputs, outputs, taxYear }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const sourceUrl = `sureedgetax.com/tools/${toolSlug}`;

    // Run in parallel; both are best-effort. Treat success as "either succeeded".
    const [w3, portal] = await Promise.all([
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `${toolName} Results — ${name}`,
          name, email,
          message: `Calculator results requested by ${name} (${email}):\n\n${resultsSummary}\n\nSent from: ${sourceUrl}`,
        }),
      }).then(r => r.ok).catch(() => false),
      fetch(PORTAL_LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, toolSlug, inputs, outputs, taxYear }),
      }).then(r => r.ok).catch(() => false),
    ]);

    if (w3 || portal) setStatus("sent");
    else setStatus("error");
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "#fff", borderRadius: "14px", padding: "32px", maxWidth: "420px", width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        {status === "sent" ? (
          <>
            <div style={{ fontSize: "32px", marginBottom: "12px", textAlign: "center" }}>✓</div>
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1a2e4a", textAlign: "center", marginBottom: "8px" }}>Results sent!</h3>
            <p style={{ fontSize: "13px", color: "#666", textAlign: "center", marginBottom: "24px" }}>Check your inbox. Our team may follow up with additional tax-saving ideas.</p>
            <button onClick={onClose} style={{ width: "100%", background: "#b8962e", color: "#fff", border: "none", borderRadius: "7px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Close</button>
          </>
        ) : (
          <>
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1a2e4a", marginBottom: "6px" }}>Email my results</h3>
            <p style={{ fontSize: "12px", color: "#777", marginBottom: "20px" }}>We&apos;ll send a summary to your inbox — no spam, no obligation.</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                style={{ padding: "10px 12px", border: "1px solid #e0ddd6", borderRadius: "7px", fontSize: "13px", outline: "none" }}/>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                style={{ padding: "10px 12px", border: "1px solid #e0ddd6", borderRadius: "7px", fontSize: "13px", outline: "none" }}/>
              {status === "error" && <p style={{ fontSize: "12px", color: "#c0392b" }}>Something went wrong. Please try again.</p>}
              <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                <button type="button" onClick={onClose}
                  style={{ flex: 1, background: "#f5f3ee", color: "#555", border: "none", borderRadius: "7px", padding: "11px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={status === "sending"}
                  style={{ flex: 2, background: "#b8962e", color: "#fff", border: "none", borderRadius: "7px", padding: "11px", fontSize: "13px", fontWeight: 600, cursor: "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending" ? "Sending…" : "Send results"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
