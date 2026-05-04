"use client";

import { useState } from "react";
import Link from "next/link";

// ── 2025 Federal Tax Brackets ──────────────────────────────────────────────
const BRACKETS: Record<string, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 0.10, min: 0,       max: 11925 },
    { rate: 0.12, min: 11925,   max: 48475 },
    { rate: 0.22, min: 48475,   max: 103350 },
    { rate: 0.24, min: 103350,  max: 197300 },
    { rate: 0.32, min: 197300,  max: 250525 },
    { rate: 0.35, min: 250525,  max: 626350 },
    { rate: 0.37, min: 626350,  max: Infinity },
  ],
  mfj: [
    { rate: 0.10, min: 0,       max: 23850 },
    { rate: 0.12, min: 23850,   max: 96950 },
    { rate: 0.22, min: 96950,   max: 206700 },
    { rate: 0.24, min: 206700,  max: 394600 },
    { rate: 0.32, min: 394600,  max: 501050 },
    { rate: 0.35, min: 501050,  max: 751600 },
    { rate: 0.37, min: 751600,  max: Infinity },
  ],
  hoh: [
    { rate: 0.10, min: 0,       max: 17000 },
    { rate: 0.12, min: 17000,   max: 64850 },
    { rate: 0.22, min: 64850,   max: 103350 },
    { rate: 0.24, min: 103350,  max: 197300 },
    { rate: 0.32, min: 197300,  max: 250500 },
    { rate: 0.35, min: 250500,  max: 626350 },
    { rate: 0.37, min: 626350,  max: Infinity },
  ],
};

const STD_DEDUCTION: Record<string, number> = { single: 15000, mfj: 30000, hoh: 22500 };

function getMarginalRate(taxableIncome: number, filing: string): number {
  const brackets = BRACKETS[filing];
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) return brackets[i].rate;
  }
  return 0.10;
}

function fv(pv: number, rate: number, years: number): number {
  return pv * Math.pow(1 + rate, years);
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function pct(n: number): string {
  return (n * 100).toFixed(0) + "%";
}

// ── Email results modal ────────────────────────────────────────────────────
function EmailModal({ onClose, resultsSummary }: { onClose: () => void; resultsSummary: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Roth vs Traditional IRA Results — ${name}`,
          name,
          email,
          message: `Calculator results requested by ${name} (${email}):\n\n${resultsSummary}\n\nSent from: sureedgetax.com/tools/roth-vs-traditional`,
        }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
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
              <input
                required value={name} onChange={e => setName(e.target.value)}
                placeholder="Your name"
                style={{ padding: "10px 12px", border: "1px solid #e0ddd6", borderRadius: "7px", fontSize: "13px", outline: "none" }}
              />
              <input
                required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                style={{ padding: "10px 12px", border: "1px solid #e0ddd6", borderRadius: "7px", fontSize: "13px", outline: "none" }}
              />
              {status === "error" && <p style={{ fontSize: "12px", color: "#c0392b" }}>Something went wrong. Please try again.</p>}
              <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                <button type="button" onClick={onClose} style={{ flex: 1, background: "#f5f3ee", color: "#555", border: "none", borderRadius: "7px", padding: "11px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={status === "sending"} style={{ flex: 2, background: "#b8962e", color: "#fff", border: "none", borderRadius: "7px", padding: "11px", fontSize: "13px", fontWeight: 600, cursor: "pointer", opacity: status === "sending" ? 0.7 : 1 }}>
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

// ── Main calculator ────────────────────────────────────────────────────────
export default function RothVsTraditionalPage() {
  const [filing, setFiling] = useState("single");
  const [grossIncome, setGrossIncome] = useState(75000);
  const [age, setAge] = useState(35);
  const [contribution, setContribution] = useState(7000);
  const [retirementAge, setRetirementAge] = useState(65);
  const [retirementIncome, setRetirementIncome] = useState(60000);
  const [returnRate, setReturnRate] = useState(7);
  const [stateTaxRate, setStateTaxRate] = useState(0);
  const [showEmail, setShowEmail] = useState(false);
  const [calcCount, setCalcCount] = useState(0);
  const calculated = calcCount > 0;

  const maxContrib = age >= 50 ? 8000 : 7000;
  const years = Math.max(retirementAge - age, 1);

  // ── Compute results ──────────────────────────────────────────────────────
  const taxableNow = Math.max(0, grossIncome - STD_DEDUCTION[filing]);
  const marginalNow = getMarginalRate(taxableNow, filing);
  const effectiveTotalNow = marginalNow + stateTaxRate / 100;

  const retirementTaxable = Math.max(0, retirementIncome - STD_DEDUCTION[filing]);
  const marginalRetirement = getMarginalRate(retirementTaxable, filing);

  // Traditional: tax deduction now, taxed at withdrawal
  const traditionalTaxSavingNow = contribution * effectiveTotalNow;
  const traditionalBalance = fv(contribution, returnRate / 100, years);
  const traditionalTaxAtWithdrawal = traditionalBalance * marginalRetirement;
  const traditionalNet = traditionalBalance - traditionalTaxAtWithdrawal;

  // Roth: no deduction now, tax-free at withdrawal
  const rothAfterTaxCost = contribution * (1 - effectiveTotalNow);
  const rothBalance = fv(contribution, returnRate / 100, years);
  const rothNet = rothBalance;

  const rothWins = rothNet > traditionalNet;
  const netDifference = Math.abs(rothNet - traditionalNet);

  // Breakeven retirement rate = current marginal rate
  const breakevenRate = marginalNow;

  // Income limit warnings
  const rothIncomeLimit = filing === "mfj" ? 246000 : 165000;
  const rothPhaseoutStart = filing === "mfj" ? 236000 : 150000;
  const traditionalPhaseoutStart = filing === "mfj" ? 126000 : 79000;
  const traditionalPhaseoutEnd = filing === "mfj" ? 146000 : 89000;

  const showRothWarning = grossIncome > rothPhaseoutStart;
  const showTraditionalWarning = grossIncome > traditionalPhaseoutStart;

  const resultsSummary = `
Filing Status: ${filing === "mfj" ? "Married Filing Jointly" : filing === "hoh" ? "Head of Household" : "Single"}
Gross Income: ${fmt(grossIncome)} | Age: ${age} | Contribution: ${fmt(contribution)}
Return Rate: ${returnRate}% | Years to Retirement: ${years}

TRADITIONAL IRA:
  Tax savings today: ${fmt(traditionalTaxSavingNow)}
  Balance at retirement: ${fmt(traditionalBalance)}
  Tax at withdrawal (${pct(marginalRetirement)}): ${fmt(traditionalTaxAtWithdrawal)}
  Net after-tax value: ${fmt(traditionalNet)}

ROTH IRA:
  Tax savings today: $0
  Balance at retirement: ${fmt(rothBalance)}
  Tax at withdrawal: $0
  Net after-tax value: ${fmt(rothNet)}

VERDICT: ${rothWins ? "Roth" : "Traditional"} wins by ${fmt(netDifference)}
Breakeven: If your retirement tax rate is above ${pct(breakevenRate)}, Roth wins.
`.trim();

  const inputStyle: React.CSSProperties = {
    padding: "9px 12px",
    border: "1px solid #e0ddd6",
    borderRadius: "7px",
    fontSize: "13px",
    width: "100%",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "5px",
    display: "block",
  };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column" };

  return (
    <>
      {showEmail && <EmailModal onClose={() => setShowEmail(false)} resultsSummary={resultsSummary} />}

      {/* BREADCRUMB + HERO */}
      <section style={{ background: "#1a2e4a", padding: "40px 44px 36px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "14px" }}>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Free Tools</Link>
          {" / "}
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Roth vs Traditional IRA</span>
        </div>
        <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: "10px" }}>
          Roth vs Traditional IRA Calculator
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          Enter your details to see which IRA puts more money in your pocket after taxes — based on 2025 federal brackets.
        </p>
      </section>

      {/* CALCULATOR */}
      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

          {/* LEFT — Inputs */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #f0ede6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2e4a", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #f0ede6" }}>
              Your Information
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Filing Status</label>
                <select value={filing} onChange={e => setFiling(e.target.value)} style={inputStyle}>
                  <option value="single">Single</option>
                  <option value="mfj">Married Filing Jointly</option>
                  <option value="hoh">Head of Household</option>
                </select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Gross Annual Income</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                  <input
                    type="number" min={0} max={2000000} value={grossIncome}
                    onChange={e => setGrossIncome(Number(e.target.value))}
                    style={{ ...inputStyle, paddingLeft: "24px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Current Age</label>
                  <input type="number" min={18} max={90} value={age} onChange={e => setAge(Number(e.target.value))} style={inputStyle} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Retirement Age</label>
                  <input type="number" min={age + 1} max={90} value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} style={inputStyle} />
                </div>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Annual IRA Contribution (max {fmt(maxContrib)})</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                  <input
                    type="number" min={1} max={maxContrib} value={contribution}
                    onChange={e => setContribution(Math.min(Number(e.target.value), maxContrib))}
                    style={{ ...inputStyle, paddingLeft: "24px" }}
                  />
                </div>
                {age >= 50 && <span style={{ fontSize: "11px", color: "#b8962e", marginTop: "4px" }}>Age 50+ catch-up limit: $8,000</span>}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Expected Return (%)</label>
                  <input type="number" min={1} max={20} step={0.5} value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} style={inputStyle} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>State Tax Rate (%)</label>
                  <input type="number" min={0} max={15} step={0.1} value={stateTaxRate} onChange={e => setStateTaxRate(Number(e.target.value))} style={inputStyle} />
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>TX, FL, etc. = 0%</span>
                </div>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Expected Retirement Annual Income</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                  <input
                    type="number" min={0} max={1000000} value={retirementIncome}
                    onChange={e => setRetirementIncome(Number(e.target.value))}
                    style={{ ...inputStyle, paddingLeft: "24px" }}
                  />
                </div>
                <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Used to estimate your retirement tax bracket</span>
              </div>

              <button
                onClick={() => setCalcCount(c => c + 1)}
                style={{ background: "#b8962e", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "4px", letterSpacing: "0.1px" }}
              >
                Calculate →
              </button>
            </div>
          </div>

          {/* RIGHT — Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {!calculated ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "40px 28px", border: "1px solid #f0ede6", textAlign: "center", color: "#aaa" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "12px", opacity: 0.4 }}>
                  <circle cx="12" cy="12" r="9" stroke="#1a2e4a" strokeWidth="1.5"/>
                  <path d="M12 7v5l3 3" stroke="#1a2e4a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p style={{ fontSize: "13px" }}>Fill in your details and click <strong>Calculate</strong> to see results.</p>
              </div>
            ) : (
              <>
                {/* Income warnings */}
                {(showRothWarning || showTraditionalWarning) && (
                  <div style={{ background: "#fffbf0", border: "1px solid #f0d98a", borderRadius: "10px", padding: "14px 16px", fontSize: "12px", color: "#7a6010", lineHeight: 1.6 }}>
                    <strong>⚠ Income limits apply:</strong>
                    {showRothWarning && grossIncome >= rothIncomeLimit && (
                      <div>• Your income exceeds the Roth IRA limit ({fmt(rothIncomeLimit)} for {filing === "mfj" ? "MFJ" : "Single"}). Consider a Backdoor Roth.</div>
                    )}
                    {showRothWarning && grossIncome < rothIncomeLimit && (
                      <div>• Your income is in the Roth IRA phase-out range ({fmt(rothPhaseoutStart)}–{fmt(rothIncomeLimit)}). Your contribution limit may be reduced.</div>
                    )}
                    {showTraditionalWarning && (
                      <div>• Above ${(traditionalPhaseoutStart / 1000).toFixed(0)}K, Traditional IRA deductibility phases out if you have a workplace plan.</div>
                    )}
                  </div>
                )}

                {/* Verdict banner */}
                <div style={{ background: rothWins ? "rgba(184,150,46,0.1)" : "#1a2e4a", border: `1.5px solid ${rothWins ? "#b8962e" : "#1a2e4a"}`, borderRadius: "12px", padding: "20px 22px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: rothWins ? "#b8962e" : "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
                    Verdict for your situation
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: rothWins ? "#1a2e4a" : "#fff", marginBottom: "4px" }}>
                    {rothWins ? "Roth IRA wins" : "Traditional IRA wins"} by {fmt(netDifference)}
                  </div>
                  <div style={{ fontSize: "12px", color: rothWins ? "#666" : "rgba(255,255,255,0.7)" }}>
                    If your retirement tax rate stays above {pct(breakevenRate)}, Roth stays ahead.
                  </div>
                </div>

                {/* Side-by-side comparison */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[
                    { label: "Traditional IRA", color: "#1a2e4a", rows: [
                      ["Tax savings today", fmt(traditionalTaxSavingNow)],
                      ["Balance at retirement", fmt(traditionalBalance)],
                      [`Tax at withdrawal (${pct(marginalRetirement)})`, `-${fmt(traditionalTaxAtWithdrawal)}`],
                      ["Net after-tax value", fmt(traditionalNet)],
                    ]},
                    { label: "Roth IRA", color: "#b8962e", rows: [
                      ["After-tax cost today", fmt(contribution - rothAfterTaxCost)],
                      ["Balance at retirement", fmt(rothBalance)],
                      ["Tax at withdrawal", "$0"],
                      ["Net after-tax value", fmt(rothNet)],
                    ]},
                  ].map(col => (
                    <div key={col.label} style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: `1.5px solid ${col.color === "#b8962e" ? "#f0d98a" : "#e8eef5"}` }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: col.color, marginBottom: "14px", paddingBottom: "10px", borderBottom: "1px solid #f0ede6" }}>{col.label}</div>
                      {col.rows.map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                          <span style={{ fontSize: "11px", color: "#777" }}>{k}</span>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Assumptions */}
                <div style={{ background: "#f5f3ee", borderRadius: "10px", padding: "14px 16px", fontSize: "11px", color: "#888", lineHeight: 1.7 }}>
                  <strong style={{ color: "#555" }}>Assumptions:</strong> {years} years to retirement · {returnRate}% annual return · 2025 standard deduction · Current marginal rate {pct(marginalNow)} · Retirement marginal rate {pct(marginalRetirement)} · Results are estimates only, not tax advice.
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setShowEmail(true)}
                    style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                  >
                    Email my results
                  </button>
                  <a
                    href="https://portal.sureedgetax.com/register?source=tool&tool=roth-vs-traditional"
                    style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    Save &amp; track over time
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* DISCLAIMER + CTA */}
      <section style={{ background: "#fff", padding: "36px 44px", borderTop: "1px solid #f0ede6" }}>
        <div style={{ maxWidth: "720px" }}>
          <p style={{ fontSize: "11px", color: "#aaa", lineHeight: 1.8, marginBottom: "28px" }}>
            This calculator provides estimates for educational purposes only and does not constitute tax or financial advice. Results depend on many factors not captured here including state taxes, income phase-outs, workplace plan coverage, and future tax law changes. Consult a licensed CPA or EA before making contribution decisions.
          </p>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>Want a real Roth conversion strategy?</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our CPA &amp; EA team builds personalized retirement tax plans — not just calculator results.</div>
            </div>
            <Link href="/booking" style={{ background: "#b8962e", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "11px 22px", borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Book a Free Consultation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
