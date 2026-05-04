"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TAX_YEARS, TaxYear, FilingStatus, US_STATES,
  fmt, fmtRange, computeTax, computeFica, get401kMax, getIraMax, getHsaMax, getStateRate,
} from "@/lib/tax-data";

export default function TaxBracketPage() {
  const [taxYear, setTaxYear]           = useState<TaxYear>(2026);
  const [filing, setFiling]             = useState<FilingStatus>("single");
  const [grossIncome, setGrossIncome]   = useState(85000);
  const [age, setAge]                   = useState(35);
  const [stateCode, setStateCode]       = useState("TX");
  const [stateRateOverride, setStateRateOverride] = useState<number | null>(null);
  const [withholding, setWithholding]   = useState(0);
  const [deductionType, setDeductionType] = useState<"standard" | "itemize">("standard");
  const [itemizedAmount, setItemizedAmount] = useState(18000);
  const [contrib401k, setContrib401k]   = useState(0);
  const [contribIra, setContribIra]     = useState(0);
  const [contribHsa, setContribHsa]     = useState(0);
  const [hsaCoverage, setHsaCoverage]   = useState<"single" | "family">("single");
  const [calcCount, setCalcCount]       = useState(0);
  const [consented, setConsented]       = useState(false);
  const calculated = calcCount > 0;

  const yd      = TAX_YEARS[taxYear];
  const limits  = yd.limits;

  const max401k = get401kMax(age, limits);
  const maxIra  = getIraMax(age, limits);
  const maxHsa  = getHsaMax(age, hsaCoverage, limits);

  // Federal income tax
  const pretaxContribs  = contrib401k + contribIra + contribHsa;
  const agi             = Math.max(0, grossIncome - pretaxContribs);
  const stdDeduction    = yd.stdDeduction[filing];
  const deduction       = deductionType === "standard" ? stdDeduction : Math.max(itemizedAmount, 0);
  const taxableIncome   = Math.max(0, agi - deduction);
  const brackets        = yd.brackets[filing];
  const { totalTax: fedTax, marginalRate, results } = computeTax(taxableIncome, brackets);

  // FICA — applies to gross wages (not reduced by 401k for SS/Medicare purposes,
  // but HSA reduces both. Simplified here: applied to grossIncome.)
  const fica = computeFica(grossIncome, filing, limits);

  // State tax — flat-rate approximation on AGI minus state std deduction (use federal AGI here for simplicity)
  const stateRate = stateRateOverride !== null ? stateRateOverride : getStateRate(stateCode);
  const stateTax = agi * (stateRate / 100);

  const totalTaxAll = fedTax + fica.total + stateTax;
  const effectiveRate = grossIncome > 0 ? totalTaxAll / grossIncome : 0;
  const afterTaxIncome = grossIncome - totalTaxAll;

  // Refund / owed
  const refundOrOwed = withholding - fedTax;  // positive = refund (federal only)
  const isRefund = refundOrOwed >= 0;

  // Pre-tax savings benefit
  const taxWithoutContribs = pretaxContribs > 0
    ? computeTax(Math.max(0, agi + pretaxContribs - deduction), brackets).totalTax
    : fedTax;
  const taxSavingsFromContribs = taxWithoutContribs - fedTax;

  const barMax = grossIncome || 1;

  const inputStyle: React.CSSProperties = {
    padding: "9px 12px", border: "1px solid #e0ddd6", borderRadius: "7px",
    fontSize: "13px", width: "100%", background: "#fff", outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "11px", fontWeight: 600, color: "#555",
    textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "5px", display: "block",
  };
  const moneyInput = (value: number, max: number, onChange: (v: number) => void) => (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
      <input type="number" min={0} max={max} value={value}
        onChange={e => onChange(Math.min(Number(e.target.value), max))}
        style={{ ...inputStyle, paddingLeft: "24px" }}/>
    </div>
  );

  const tooltip = (text: string) => (
    <span title={text} style={{ display: "inline-block", width: 13, height: 13, borderRadius: "50%", background: "#e0ddd6", color: "#888", fontSize: "9px", textAlign: "center", lineHeight: "13px", marginLeft: 5, cursor: "help", verticalAlign: "middle" }}>?</span>
  );

  return (
    <>
      <section style={{ background: "#1a2e4a", padding: "40px 44px 36px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "14px" }}>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Free Tools</Link>
          {" / "}
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Tax Bracket Estimator</span>
        </div>
        <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: "10px" }}>
          Federal &amp; State Tax Estimator
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          Estimate federal income tax, FICA, state tax, and refund/balance due. Supports 2025 and 2026 tax year data.
        </p>
      </section>

      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #f0ede6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

            <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f0ede6" }}>
              <label style={labelStyle}>Tax Year</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {([2025, 2026] as const).map(y => (
                  <button key={y} onClick={() => setTaxYear(y)} style={{
                    flex: 1, padding: "10px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer", border: "2px solid",
                    borderColor: taxYear === y ? "#b8962e" : "#e0ddd6",
                    background: taxYear === y ? "#b8962e" : "#fff",
                    color: taxYear === y ? "#fff" : "#999",
                  }}>{y}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Filing Status</label>
                  <select value={filing} onChange={e => setFiling(e.target.value as FilingStatus)} style={inputStyle}>
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
                <label style={labelStyle}>
                  Gross W-2 / Annual Wages
                  {tooltip("From your W-2 Box 1 (or expected annual salary)")}
                </label>
                {moneyInput(grossIncome, 5000000, setGrossIncome)}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>
                  Federal Withholding (YTD or Annual)
                  {tooltip("From W-2 Box 2 — federal income tax already withheld from your paychecks")}
                </label>
                {moneyInput(withholding, 1000000, setWithholding)}
                <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Used to estimate refund or balance due</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", alignItems: "end" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>State</label>
                  <select value={stateCode} onChange={e => { setStateCode(e.target.value); setStateRateOverride(null); }} style={inputStyle}>
                    {US_STATES.map(s => (
                      <option key={s.code} value={s.code}>{s.name}{s.type === "none" ? " (no income tax)" : ` (~${s.rate}%)`}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "85px" }}>
                  <label style={labelStyle}>Override %</label>
                  <input type="number" min={0} max={20} step={0.1} placeholder={String(getStateRate(stateCode))}
                    value={stateRateOverride ?? ""}
                    onChange={e => setStateRateOverride(e.target.value === "" ? null : Number(e.target.value))}
                    style={inputStyle} />
                </div>
              </div>

              {/* Pre-tax contributions */}
              <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                  Pre-Tax Contributions{" "}
                  <span style={{ fontSize: "10px", color: "#aaa", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(reduce taxable income)</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>
                      401(k) / 403(b){" "}
                      <span style={{ color: "#aaa", fontWeight: 400 }}>
                        max {fmt(max401k)}
                        {age >= 60 && age <= 63 && <span style={{ color: "#b8962e" }}> (super catch-up)</span>}
                        {age >= 50 && !(age >= 60 && age <= 63) && <span> (incl. catch-up)</span>}
                      </span>
                    </label>
                    {moneyInput(contrib401k, max401k, setContrib401k)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Traditional IRA <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(maxIra)}</span></label>
                    {moneyInput(contribIra, maxIra, setContribIra)}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>HSA <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(maxHsa)}</span></label>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                      {(["single", "family"] as const).map(t => (
                        <button key={t} onClick={() => setHsaCoverage(t)} style={{
                          flex: 1, padding: "6px", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                          borderColor: hsaCoverage === t ? "#b8962e" : "#e0ddd6",
                          background: hsaCoverage === t ? "rgba(184,150,46,0.08)" : "#fff",
                          color: hsaCoverage === t ? "#b8962e" : "#777",
                        }}>{t === "single" ? "Self-only" : "Family"}</button>
                      ))}
                    </div>
                    {moneyInput(contribHsa, maxHsa, setContribHsa)}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <label style={labelStyle}>Deduction Type</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {(["standard", "itemize"] as const).map(t => (
                    <button key={t} onClick={() => setDeductionType(t)} style={{
                      flex: 1, padding: "9px", borderRadius: "7px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                      borderColor: deductionType === t ? "#b8962e" : "#e0ddd6",
                      background: deductionType === t ? "rgba(184,150,46,0.08)" : "#fff",
                      color: deductionType === t ? "#b8962e" : "#777",
                    }}>
                      {t === "standard" ? `Standard (${fmt(stdDeduction)})` : "Itemize"}
                    </button>
                  ))}
                </div>
              </div>

              {deductionType === "itemize" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Total Itemized Deductions</label>
                  {moneyInput(itemizedAmount, 2000000, setItemizedAmount)}
                  {itemizedAmount < stdDeduction && (
                    <span style={{ fontSize: "11px", color: "#c0392b", marginTop: "4px" }}>
                      Standard deduction ({fmt(stdDeduction)}) is higher.
                    </span>
                  )}
                </div>
              )}

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "4px" }}>
                <input type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)} style={{ marginTop: "2px", accentColor: "#b8962e", flexShrink: 0, width: "15px", height: "15px" }}/>
                <span style={{ fontSize: "11px", color: "#777", lineHeight: 1.6 }}>
                  I understand these results are for <strong>high-level estimation only</strong> and SureEdge is not liable for decisions based on these calculations.{" "}
                  <a href="/privacy" style={{ color: "#b8962e", textDecoration: "underline" }}>Privacy</a>
                </span>
              </label>

              <button onClick={() => setCalcCount(c => c + 1)} disabled={!consented}
                style={{ background: consented ? "#b8962e" : "#d5c9b0", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: consented ? "pointer" : "not-allowed", marginTop: "4px" }}>
                Calculate {taxYear} →
              </button>
            </div>
          </div>

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
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8962e" }}>{taxYear} Results · {stateCode}</span>
                  <div style={{ flex: 1, height: "1px", background: "#f0ede6" }}/>
                </div>

                {/* Refund or owed banner */}
                {withholding > 0 && (
                  <div style={{ background: isRefund ? "#dff5e0" : "#fdecea", border: `1.5px solid ${isRefund ? "#27ae60" : "#c0392b"}`, borderRadius: "12px", padding: "20px 22px" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: isRefund ? "#27ae60" : "#c0392b", marginBottom: "4px" }}>
                      Federal {isRefund ? "Refund" : "Balance Due"} (estimated)
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "-0.5px" }}>
                      {isRefund ? "+" : "-"}{fmt(Math.abs(refundOrOwed))}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                      Withheld {fmt(withholding)} vs. estimated tax {fmt(fedTax)}
                    </div>
                  </div>
                )}

                {/* Total tax cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Federal Tax",   value: fmt(fedTax) },
                    { label: "FICA (7.65%+)", value: fmt(fica.total) },
                    { label: stateRate > 0 ? `State (${stateRate}%)` : "State Tax", value: fmt(stateTax) },
                    { label: "Total",         value: fmt(totalTaxAll), highlight: true },
                  ].map(card => (
                    <div key={card.label} style={{ background: card.highlight ? "#1a2e4a" : "#fff", borderRadius: "10px", padding: "12px", border: card.highlight ? "none" : "1px solid #f0ede6", textAlign: "center" }}>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: card.highlight ? "#b8962e" : "#1a2e4a" }}>{card.value}</div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: card.highlight ? "rgba(255,255,255,0.7)" : "#888", textTransform: "uppercase", letterSpacing: "0.6px", marginTop: "3px" }}>{card.label}</div>
                    </div>
                  ))}
                </div>

                {/* Effective rate + take-home */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Effective Rate", value: (effectiveRate * 100).toFixed(1) + "%", sub: "of gross" },
                    { label: "Marginal Bracket", value: (marginalRate * 100).toFixed(0) + "%", sub: "federal top rate" },
                    { label: "Take-Home", value: fmt(afterTaxIncome), sub: "annual after all taxes" },
                  ].map(card => (
                    <div key={card.label} style={{ background: "#fff", borderRadius: "10px", padding: "12px", border: "1px solid #f0ede6", textAlign: "center" }}>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#1a2e4a" }}>{card.value}</div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: "#b8962e", textTransform: "uppercase", letterSpacing: "0.6px", marginTop: "3px" }}>{card.label}</div>
                      <div style={{ fontSize: "9px", color: "#aaa", marginTop: "2px" }}>{card.sub}</div>
                    </div>
                  ))}
                </div>

                {/* FICA breakdown */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "16px 20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "10px" }}>FICA Detail</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", fontSize: "11px", color: "#666" }}>
                    <div>SS (6.2% up to {fmt(limits.ssWageBase)}): <strong style={{ color: "#1a2e4a", display: "block" }}>{fmt(fica.socialSecurity)}</strong></div>
                    <div>Medicare (1.45% no cap): <strong style={{ color: "#1a2e4a", display: "block" }}>{fmt(fica.medicare)}</strong></div>
                    {fica.addlMedicare > 0 && <div>Add&apos;l 0.9% (high earner): <strong style={{ color: "#1a2e4a", display: "block" }}>{fmt(fica.addlMedicare)}</strong></div>}
                  </div>
                </div>

                {/* Pre-tax savings */}
                {pretaxContribs > 0 && (
                  <div style={{ background: "rgba(184,150,46,0.08)", border: "1.5px solid #b8962e", borderRadius: "10px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#b8962e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                      Pre-Tax Contribution Savings
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#555" }}>
                        {fmt(pretaxContribs)} contributed reduced AGI from {fmt(grossIncome)} to {fmt(agi)}
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a2e4a" }}>{fmt(taxSavingsFromContribs)} federal saved</div>
                    </div>
                  </div>
                )}

                {/* Income breakdown bar */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Where Your Money Goes</div>
                  <div style={{ display: "flex", height: "28px", borderRadius: "6px", overflow: "hidden", marginBottom: "10px" }}>
                    <div style={{ width: `${(fedTax / barMax) * 100}%`, background: "#1a2e4a", minWidth: fedTax > 0 ? "4px" : "0" }} title={`Federal: ${fmt(fedTax)}`}/>
                    <div style={{ width: `${(fica.total / barMax) * 100}%`, background: "#7a8fa8", minWidth: fica.total > 0 ? "4px" : "0" }} title={`FICA: ${fmt(fica.total)}`}/>
                    {stateTax > 0 && <div style={{ width: `${(stateTax / barMax) * 100}%`, background: "#5a7a52", minWidth: "4px" }} title={`State: ${fmt(stateTax)}`}/>}
                    {pretaxContribs > 0 && <div style={{ width: `${(pretaxContribs / barMax) * 100}%`, background: "#2ecc71", opacity: 0.6, minWidth: "4px" }} title={`Pre-tax: ${fmt(pretaxContribs)}`}/>}
                    <div style={{ flex: 1, background: "#d4edda" }} title={`Take-home: ${fmt(afterTaxIncome - pretaxContribs)}`}/>
                  </div>
                  <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", fontSize: "11px", color: "#555" }}>
                    <Legend color="#1a2e4a" label={`Federal: ${fmt(fedTax)}`}/>
                    <Legend color="#7a8fa8" label={`FICA: ${fmt(fica.total)}`}/>
                    {stateTax > 0 && <Legend color="#5a7a52" label={`State: ${fmt(stateTax)}`}/>}
                    {pretaxContribs > 0 && <Legend color="rgba(46,204,113,0.6)" label={`Pre-tax: ${fmt(pretaxContribs)}`} border="1px solid #27ae60"/>}
                    <Legend color="#d4edda" label={`Take-home: ${fmt(afterTaxIncome - pretaxContribs)}`} border="1px solid #a8d5b5"/>
                  </div>
                </div>

                {/* Bracket breakdown table */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Federal Bracket Breakdown</div>
                  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "0", fontSize: "11px" }}>
                    <div style={{ color: "#aaa", fontWeight: 600, padding: "4px 8px 8px 0" }}>Rate</div>
                    <div style={{ color: "#aaa", fontWeight: 600, padding: "4px 8px 8px" }}>Taxable Range</div>
                    <div style={{ color: "#aaa", fontWeight: 600, padding: "4px 0 8px", textAlign: "right" }}>Tax</div>
                    {results.map((b, i) => (
                      <div key={i} style={{ display: "contents" }}>
                        <div style={{ padding: "7px 8px 7px 0", borderTop: "1px solid #f5f3ee", fontWeight: b.isActive ? 700 : 400, color: b.isActive ? "#b8962e" : "#ccc" }}>
                          {(b.rate * 100).toFixed(0)}%
                        </div>
                        <div style={{ padding: "7px 8px", borderTop: "1px solid #f5f3ee", color: b.isActive ? "#555" : "#ccc" }}>
                          {fmtRange(b.min, b.max)}
                          {b.isActive && b.taxableInRange > 0 && taxableIncome > 0 && (
                            <div style={{ marginTop: "2px" }}>
                              <div style={{ height: "3px", borderRadius: "2px", background: "#b8962e", width: `${Math.min((b.taxableInRange / taxableIncome) * 100, 100)}%`, opacity: 0.6 }}/>
                            </div>
                          )}
                        </div>
                        <div style={{ padding: "7px 0 7px", borderTop: "1px solid #f5f3ee", textAlign: "right", fontWeight: b.isActive ? 600 : 400, color: b.isActive ? "#1a2e4a" : "#ccc" }}>
                          {b.isActive ? fmt(b.taxInBracket) : "—"}
                        </div>
                      </div>
                    ))}
                    <div style={{ gridColumn: "1 / -1", borderTop: "2px solid #f0ede6", marginTop: "4px" }}/>
                    <div style={{ padding: "8px 8px 0 0", fontWeight: 700, color: "#1a2e4a", fontSize: "12px" }}>Total</div>
                    <div style={{ padding: "8px 8px 0", color: "#777", fontSize: "11px" }}>
                      Taxable income: {fmt(taxableIncome)} (after {fmt(deduction)} deduction)
                    </div>
                    <div style={{ padding: "8px 0 0", textAlign: "right", fontWeight: 700, color: "#1a2e4a", fontSize: "12px" }}>{fmt(fedTax)}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a href="https://portal.sureedgetax.com/register?source=tool&tool=tax-bracket" style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Save &amp; track over time
                  </a>
                  <Link href="/booking" style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Reduce my tax bill →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "36px 44px", borderTop: "1px solid #f0ede6" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ background: "#fff8e6", border: "1px solid #f0d98a", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
              <path d="M12 2L2 20h20L12 2z" stroke="#b8962e" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M12 9v5M12 16.5v.5" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <p style={{ fontSize: "11px", color: "#7a6010", lineHeight: 1.8, margin: 0 }}>
              <strong>For high-level estimation only.</strong> State tax uses a flat top-rate approximation (override available); actual state tax depends on your state&apos;s brackets, deductions, and credits. This tool excludes AMT, NIIT, QBI deduction, credits (CTC, EITC, education), and self-employment tax. SureEdge Tax &amp; Accounting is <strong>not liable</strong> for any decisions made based on these calculations.
            </p>
          </div>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>Want a real tax review?</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our CPA &amp; EA team finds deductions and credits that calculators miss.</div>
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

function Legend({ color, label, border }: { color: string; label: string; border?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div style={{ width: 10, height: 10, borderRadius: "2px", background: color, border: border || "none", flexShrink: 0 }}/>
      {label}
    </div>
  );
}
