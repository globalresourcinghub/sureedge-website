"use client";

import { useState } from "react";
import Link from "next/link";

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
  mfs: [
    { rate: 0.10, min: 0,       max: 11925 },
    { rate: 0.12, min: 11925,   max: 48475 },
    { rate: 0.22, min: 48475,   max: 103350 },
    { rate: 0.24, min: 103350,  max: 197300 },
    { rate: 0.32, min: 197300,  max: 250525 },
    { rate: 0.35, min: 250525,  max: 375800 },
    { rate: 0.37, min: 375800,  max: Infinity },
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

const STD_DEDUCTION: Record<string, number> = {
  single: 15000, mfj: 30000, mfs: 15000, hoh: 22500,
};

function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function fmtRange(min: number, max: number): string {
  if (max === Infinity) return `${fmt(min)}+`;
  return `${fmt(min)} – ${fmt(max)}`;
}

interface BracketResult {
  rate: number;
  min: number;
  max: number;
  taxableInRange: number;
  taxInBracket: number;
  isActive: boolean;
}

function computeTax(taxableIncome: number, filing: string): { totalTax: number; marginalRate: number; brackets: BracketResult[] } {
  const rawBrackets = BRACKETS[filing];
  let totalTax = 0;
  let marginalRate = rawBrackets[0].rate;
  const brackets: BracketResult[] = rawBrackets.map(b => {
    if (taxableIncome <= 0) return { ...b, taxableInRange: 0, taxInBracket: 0, isActive: false };
    const taxableInRange = Math.min(taxableIncome - b.min, (b.max === Infinity ? taxableIncome : b.max) - b.min);
    if (taxableInRange <= 0) return { ...b, taxableInRange: 0, taxInBracket: 0, isActive: false };
    const taxInBracket = taxableInRange * b.rate;
    totalTax += taxInBracket;
    marginalRate = b.rate;
    return { ...b, taxableInRange, taxInBracket, isActive: true };
  });
  return { totalTax, marginalRate, brackets };
}

// 2025 contribution limits
const LIMITS_401K = 23500;        // employee elective deferral
const LIMITS_401K_CATCHUP = 31000; // age 50+ (extra $7,500)
const LIMITS_IRA = 7000;
const LIMITS_IRA_CATCHUP = 8000;   // age 50+
const LIMITS_HSA_SINGLE = 4300;
const LIMITS_HSA_FAMILY = 8550;
const LIMITS_HSA_CATCHUP = 1000;   // age 55+ add-on

export default function TaxBracketPage() {
  const [filing, setFiling] = useState("single");
  const [grossIncome, setGrossIncome] = useState(85000);
  const [age, setAge] = useState(35);
  const [deductionType, setDeductionType] = useState<"standard" | "itemize">("standard");
  const [itemizedAmount, setItemizedAmount] = useState(18000);
  const [contrib401k, setContrib401k] = useState(0);
  const [contribIra, setContribIra] = useState(0);
  const [contribHsa, setContribHsa] = useState(0);
  const [hsaCoverage, setHsaCoverage] = useState<"single" | "family">("single");
  const [calcCount, setCalcCount] = useState(0);
  const calculated = calcCount > 0;

  const catchup = age >= 50;
  const max401k = catchup ? LIMITS_401K_CATCHUP : LIMITS_401K;
  const maxIra = catchup ? LIMITS_IRA_CATCHUP : LIMITS_IRA;
  const maxHsa = (hsaCoverage === "family" ? LIMITS_HSA_FAMILY : LIMITS_HSA_SINGLE) + (age >= 55 ? LIMITS_HSA_CATCHUP : 0);

  const pretaxContribs = contrib401k + contribIra + contribHsa;
  const agi = Math.max(0, grossIncome - pretaxContribs);
  const stdDeduction = STD_DEDUCTION[filing];
  const deduction = deductionType === "standard" ? stdDeduction : Math.max(itemizedAmount, 0);
  const taxableIncome = Math.max(0, agi - deduction);
  const { totalTax, marginalRate, brackets } = computeTax(taxableIncome, filing);
  const effectiveRate = grossIncome > 0 ? totalTax / grossIncome : 0;
  const afterTaxIncome = grossIncome - totalTax;
  const taxSavingsFromContribs = pretaxContribs > 0 ? computeTax(Math.max(0, agi + pretaxContribs - deduction), filing).totalTax - totalTax : 0;

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

  // Bar chart max = total income
  const barMax = grossIncome || 1;

  return (
    <>
      {/* BREADCRUMB + HERO */}
      <section style={{ background: "#1a2e4a", padding: "40px 44px 36px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "14px" }}>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Free Tools</Link>
          {" / "}
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Tax Bracket Estimator</span>
        </div>
        <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: "10px" }}>
          2025 Tax Bracket Estimator
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          See your effective tax rate, marginal bracket, and a full breakdown of what you owe across each 2025 federal tax bracket.
        </p>
      </section>

      {/* CALCULATOR */}
      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

          {/* LEFT — Inputs */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #f0ede6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2e4a", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #f0ede6" }}>
              Your Information
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Filing Status</label>
                  <select value={filing} onChange={e => setFiling(e.target.value)} style={inputStyle}>
                    <option value="single">Single</option>
                    <option value="mfj">Married Filing Jointly</option>
                    <option value="mfs">Married Filing Separately</option>
                    <option value="hoh">Head of Household</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Age</label>
                  <input type="number" min={18} max={90} value={age} onChange={e => setAge(Number(e.target.value))} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Gross Annual Income</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                  <input
                    type="number" min={0} max={5000000} value={grossIncome}
                    onChange={e => setGrossIncome(Number(e.target.value))}
                    style={{ ...inputStyle, paddingLeft: "24px" }}
                  />
                </div>
              </div>

              {/* Pre-tax contributions */}
              <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                  Pre-Tax Contributions <span style={{ fontSize: "10px", color: "#aaa", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(reduce taxable income)</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>401(k) / 403(b) Contribution <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(max401k)}</span></label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                      <input
                        type="number" min={0} max={max401k} value={contrib401k}
                        onChange={e => setContrib401k(Math.min(Number(e.target.value), max401k))}
                        style={{ ...inputStyle, paddingLeft: "24px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Traditional IRA Contribution <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(maxIra)}</span></label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                      <input
                        type="number" min={0} max={maxIra} value={contribIra}
                        onChange={e => setContribIra(Math.min(Number(e.target.value), maxIra))}
                        style={{ ...inputStyle, paddingLeft: "24px" }}
                      />
                    </div>
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Deductibility may phase out — see income limits</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>HSA Contribution <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(maxHsa)}</span></label>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                      {(["single", "family"] as const).map(t => (
                        <button key={t} onClick={() => setHsaCoverage(t)} style={{
                          flex: 1, padding: "6px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                          borderColor: hsaCoverage === t ? "#b8962e" : "#e0ddd6",
                          background: hsaCoverage === t ? "rgba(184,150,46,0.08)" : "#fff",
                          color: hsaCoverage === t ? "#b8962e" : "#777",
                        }}>
                          {t === "single" ? "Self-only" : "Family"}
                        </button>
                      ))}
                    </div>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                      <input
                        type="number" min={0} max={maxHsa} value={contribHsa}
                        onChange={e => setContribHsa(Math.min(Number(e.target.value), maxHsa))}
                        style={{ ...inputStyle, paddingLeft: "24px" }}
                      />
                    </div>
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Requires a High Deductible Health Plan (HDHP)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <label style={labelStyle}>Deduction Type</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {(["standard", "itemize"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setDeductionType(t)}
                      style={{
                        flex: 1, padding: "9px", borderRadius: "7px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                        borderColor: deductionType === t ? "#b8962e" : "#e0ddd6",
                        background: deductionType === t ? "rgba(184,150,46,0.08)" : "#fff",
                        color: deductionType === t ? "#b8962e" : "#777",
                      }}
                    >
                      {t === "standard" ? `Standard (${fmt(stdDeduction)})` : "Itemize"}
                    </button>
                  ))}
                </div>
              </div>

              {deductionType === "itemize" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Total Itemized Deductions</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                    <input
                      type="number" min={0} value={itemizedAmount}
                      onChange={e => setItemizedAmount(Number(e.target.value))}
                      style={{ ...inputStyle, paddingLeft: "24px" }}
                    />
                  </div>
                  {itemizedAmount < stdDeduction && (
                    <span style={{ fontSize: "11px", color: "#c0392b", marginTop: "4px" }}>
                      Standard deduction ({fmt(stdDeduction)}) is higher — you&apos;d save more taking standard.
                    </span>
                  )}
                </div>
              )}

              <button
                onClick={() => setCalcCount(c => c + 1)}
                style={{ background: "#b8962e", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "4px" }}
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
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#1a2e4a" strokeWidth="1.5"/>
                  <path d="M7 12h10M7 8h6M7 16h8" stroke="#1a2e4a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p style={{ fontSize: "13px" }}>Fill in your details and click <strong>Calculate</strong> to see your tax breakdown.</p>
              </div>
            ) : (
              <>
                {/* Summary cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Federal Tax Owed", value: fmt(totalTax), sub: "estimated" },
                    { label: "Effective Rate", value: (effectiveRate * 100).toFixed(1) + "%", sub: "of gross income" },
                    { label: "Marginal Bracket", value: (marginalRate * 100).toFixed(0) + "%", sub: "top rate" },
                  ].map(card => (
                    <div key={card.label} style={{ background: "#fff", borderRadius: "10px", padding: "16px", border: "1px solid #f0ede6", textAlign: "center" }}>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a2e4a" }}>{card.value}</div>
                      <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: "3px" }}>{card.label}</div>
                      <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>{card.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Pre-tax contribution savings callout */}
                {pretaxContribs > 0 && (
                  <div style={{ background: "rgba(184,150,46,0.08)", border: "1.5px solid #b8962e", borderRadius: "10px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#b8962e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                      Pre-Tax Contribution Savings
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#555" }}>
                        {fmt(pretaxContribs)} in contributions reduced your AGI from {fmt(grossIncome)} to {fmt(agi)}
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a2e4a" }}>
                        {fmt(taxSavingsFromContribs)} saved
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", marginTop: "10px", flexWrap: "wrap" }}>
                      {contrib401k > 0 && <span style={{ fontSize: "11px", color: "#666" }}>401(k): {fmt(contrib401k)}</span>}
                      {contribIra > 0 && <span style={{ fontSize: "11px", color: "#666" }}>IRA: {fmt(contribIra)}</span>}
                      {contribHsa > 0 && <span style={{ fontSize: "11px", color: "#666" }}>HSA: {fmt(contribHsa)}</span>}
                    </div>
                  </div>
                )}

                {/* Income breakdown bar */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Income Breakdown</div>
                  <div style={{ display: "flex", height: "28px", borderRadius: "6px", overflow: "hidden", marginBottom: "10px" }}>
                    <div style={{ width: `${(totalTax / barMax) * 100}%`, background: "#1a2e4a", minWidth: totalTax > 0 ? "4px" : "0" }} title={`Tax: ${fmt(totalTax)}`}/>
                    {pretaxContribs > 0 && <div style={{ width: `${(pretaxContribs / barMax) * 100}%`, background: "#2ecc71", opacity: 0.6, minWidth: "4px" }} title={`Pre-tax contributions: ${fmt(pretaxContribs)}`}/>}
                    <div style={{ width: `${(deduction / barMax) * 100}%`, background: "#b8962e", opacity: 0.4, minWidth: deduction > 0 ? "4px" : "0" }} title={`Deduction: ${fmt(deduction)}`}/>
                    <div style={{ flex: 1, background: "#d4edda" }} title={`After-tax: ${fmt(afterTaxIncome)}`}/>
                  </div>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {[
                      { color: "#1a2e4a", label: `Tax: ${fmt(totalTax)}` },
                      ...(pretaxContribs > 0 ? [{ color: "rgba(46,204,113,0.6)", label: `Pre-tax contribs: ${fmt(pretaxContribs)}`, border: "1px solid #27ae60" }] : []),
                      { color: "rgba(184,150,46,0.6)", label: `Deduction: ${fmt(deduction)}` },
                      { color: "#d4edda", label: `After-tax: ${fmt(afterTaxIncome)}`, border: "1px solid #a8d5b5" },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#555" }}>
                        <div style={{ width: 10, height: 10, borderRadius: "2px", background: item.color, border: item.border || "none", flexShrink: 0 }}/>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bracket breakdown table */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Bracket-by-Bracket Breakdown</div>
                  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "0", fontSize: "11px" }}>
                    <div style={{ color: "#aaa", fontWeight: 600, padding: "4px 8px 8px 0" }}>Rate</div>
                    <div style={{ color: "#aaa", fontWeight: 600, padding: "4px 8px 8px" }}>Taxable Range</div>
                    <div style={{ color: "#aaa", fontWeight: 600, padding: "4px 0 8px", textAlign: "right" }}>Tax</div>
                    {brackets.map((b, i) => (
                      <>
                        <div key={`rate-${i}`} style={{ padding: "7px 8px 7px 0", borderTop: "1px solid #f5f3ee", fontWeight: b.isActive ? 700 : 400, color: b.isActive ? "#b8962e" : "#ccc" }}>
                          {(b.rate * 100).toFixed(0)}%
                        </div>
                        <div key={`range-${i}`} style={{ padding: "7px 8px", borderTop: "1px solid #f5f3ee", color: b.isActive ? "#555" : "#ccc" }}>
                          {fmtRange(b.min, b.max)}
                          {b.isActive && b.taxableInRange > 0 && (
                            <div style={{ marginTop: "2px" }}>
                              <div style={{ height: "3px", borderRadius: "2px", background: "#b8962e", width: `${Math.min((b.taxableInRange / taxableIncome) * 100, 100)}%`, opacity: 0.6 }}/>
                            </div>
                          )}
                        </div>
                        <div key={`tax-${i}`} style={{ padding: "7px 0 7px", borderTop: "1px solid #f5f3ee", textAlign: "right", fontWeight: b.isActive ? 600 : 400, color: b.isActive ? "#1a2e4a" : "#ccc" }}>
                          {b.isActive ? fmt(b.taxInBracket) : "—"}
                        </div>
                      </>
                    ))}
                    <div style={{ gridColumn: "1 / -1", borderTop: "2px solid #f0ede6", marginTop: "4px" }}/>
                    <div style={{ padding: "8px 8px 0 0", fontWeight: 700, color: "#1a2e4a", fontSize: "12px" }}>Total</div>
                    <div style={{ padding: "8px 8px 0", color: "#777", fontSize: "11px" }}>
                      Taxable income: {fmt(taxableIncome)} (after {fmt(deduction)} deduction)
                    </div>
                    <div style={{ padding: "8px 0 0", textAlign: "right", fontWeight: 700, color: "#1a2e4a", fontSize: "12px" }}>{fmt(totalTax)}</div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href="https://portal.sureedgetax.com/register?source=tool&tool=tax-bracket"
                    style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    Save &amp; track over time
                  </a>
                  <Link href="/booking" style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Reduce my tax bill →
                  </Link>
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
            This estimator covers 2025 federal income tax only. It does not include FICA (Social Security/Medicare), state income tax, AMT, self-employment tax, net investment income tax, or credits. Results are estimates for educational purposes only, not tax advice.
          </p>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>Paying more than this estimate?</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our CPA &amp; EA team finds deductions and strategies that calculators can&apos;t — let&apos;s review your return.</div>
            </div>
            <Link href="/tax-intake" style={{ background: "#b8962e", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "11px 22px", borderRadius: "7px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Get a Free Quote →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
