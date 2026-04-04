"use client";
import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "Can I deduct my home office?",
  "When is the tax filing deadline?",
  "What is an S-Corp election?",
  "Do I need to pay quarterly taxes?",
];

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\(javascript:[^)]*\)/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/^[-*+]\s/gm, '')
    .replace(/^\d+\.\s/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi! I am an AI tax assistant trained to answer general US tax and accounting questions. Ask me anything and I will do my best to help. For advice specific to your situation, our CPA team is here too." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setShowLabel(false);
    }
  }, [messages, open]);

  // Hide label after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading || limitReached) return;
    if (msg.length > 500) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    const newCount = sessionCount + 1;
    setSessionCount(newCount);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, sessionCount: newCount }),
      });
      const data = await res.json();
      if (res.status === 429) {
        if (data.error === "SESSION_LIMIT") {
          setLimitReached(true);
          setMessages(prev => [...prev, { role: "assistant", text: "You have reached the limit for this session. For more help, please contact our CPA team at contact@sureedgetax.com." }]);
        } else {
          setMessages(prev => [...prev, { role: "assistant", text: data.error }]);
        }
      } else if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", text: stripMarkdown(data.reply) }]);
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "chatbot_message", {
            event_category: "Chatbot",
            event_label: msg.substring(0, 100),
            value: newCount,
          });
        }
      } else {
        setMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const navy = "#1a2e4a";
  const gold = "#b8962e";

  return (
    <>
      {/* Label shown next to bubble before first open */}
      {!open && showLabel && (
        <div style={{
          position: "fixed", bottom: "32px", right: "90px", zIndex: 9999,
          background: navy, color: "#fff", fontSize: "12px", fontWeight: 600,
          padding: "8px 14px", borderRadius: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap",
          animation: "fadeInLabel 0.4s ease",
        }}>
          <span style={{background: gold, color: "#fff", fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "8px", letterSpacing: "0.5px"}}>AI</span>
          Ask our tax assistant
          <div style={{
            position: "absolute", right: "-6px", top: "50%", transform: "translateY(-50%)",
            width: 0, height: 0, borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent", borderLeft: "6px solid " + navy,
          }}/>
        </div>
      )}

      {/* Chat bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI tax assistant chat"
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 9999,
          width: "56px", height: "56px", borderRadius: "50%",
          background: navy, border: "2px solid " + gold, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="#b8962e" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#b8962e"/>
            <path d="M7 9H17M7 13H13" stroke="#1a2e4a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", bottom: "92px", right: "24px", zIndex: 9998,
          width: "340px", maxHeight: "520px", background: "#fff",
          borderRadius: "14px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          display: "flex", flexDirection: "column", border: "1px solid #e5e7eb", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ background: navy, padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{flex:1}}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                SureEdge Tax Assistant
                <span style={{ background: gold, color: "#fff", fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "8px", letterSpacing: "0.5px" }}>AI</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", marginTop: "2px" }}>Powered by AI — general tax questions only</div>
            </div>
          </div>

          {/* AI notice bar */}
          <div style={{ background: "#fffbeb", padding: "7px 14px", fontSize: "11px", color: "#92400e", borderBottom: "1px solid #fde68a", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>&#x26A0;&#xFE0F;</span>
            This is an AI chatbot, not a human. For personal tax advice, contact our CPA team.
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px", maxHeight: "280px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%", padding: "8px 12px", borderRadius: "10px",
                  fontSize: "13px", lineHeight: 1.5,
                  background: m.role === "user" ? navy : "#f3f4f6",
                  color: m.role === "user" ? "#fff" : "#1a2e4a",
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "#f3f4f6", borderRadius: "10px", padding: "8px 12px" }}>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: gold, animation: "bounce 1s infinite " + (i * 0.2) + "s" }}/>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: "0 12px 8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} style={{ fontSize: "11px", padding: "4px 8px", borderRadius: "12px", border: "1px solid " + gold, background: "#fff", color: navy, cursor: "pointer" }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {!limitReached && (
            <div style={{ padding: "10px 12px", borderTop: "1px solid #f0f0f0", display: "flex", gap: "8px" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value.slice(0, 500))}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask a tax question..."
                style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 10px", fontSize: "13px", outline: "none" }}
              />
              <button onClick={() => send()} disabled={loading || !input.trim()} style={{ background: navy, color: "#fff", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", opacity: loading || !input.trim() ? 0.5 : 1, fontSize: "13px" }}>
                &#x2192;
              </button>
            </div>
          )}

          {/* Contact CTA */}
          <a href="/contact" style={{ display: "block", textAlign: "center", padding: "10px", background: gold, color: "#fff", textDecoration: "none", fontSize: "12px", fontWeight: 700 }}>
            Talk to a Real CPA &#x2192;
          </a>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes fadeInLabel {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}