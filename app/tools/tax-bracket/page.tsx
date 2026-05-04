"use client";

import { useState } from "react";
import Link from "next/link";

// ── Year-keyed tax data ────────────────────────────────────────────────────
type FilingStatus = "single" | "mfj" | "mfs" | "hoh";
interface Bracket  { rate: number; min: number; max: number }
interface YearData {
  brackets:     Record<FilingStatus, Bracket[]>;
  stdDeduction: Record<FilingStatus, number>;
  limits: {
    k401Base:         number; // under-50 max
    k401Catchup:      number; // age 50-59 & 64+ total (base + catch-up)
    k401SuperCatchup: number; // age 60-63 total (SECURE 2.0)
    iraBase:          number;
    iraCatchup:       number; // age 50+ total
    hsaSingle:        number;
    hsaFamily:        number;
    hsaCatchupAdd:    number; // age 55+ add-on
  };
}

const TAX_YEARS: Record<number, YearData> = {
  2025: {
    brackets: {
      single: [
        { rate: 0.10, min: 0,       max: 11925  },
        { rate: 0.12, min: 11925,   max: 48475  },
        { rate: 0.22, min: 48475,   max: 103350 },
        { rate: 0.24, min: 103350,  max: 197300 },
        { rate: 0.32, min: 197300,  max: 250525 },
        { rate: 0.35, min: 250525,  max: 626350 },
        { rate: 0.37, min: 626350,  max: Infinity },
      ],
      mfj: [
        { rate: 0.10, min: 0,       max: 23850  },
        { rate: 0.12, min: 23850,   max: 96950  },
        { rate: 0.22, min: 96950,   max: 206700 },
        { rate: 0.24, min: 206700,  max: 394600 },
        { rate: 0.32, min: 394600,  max: 501050 },
        { rate: 0.35, min: 501050,  max: 751600 },
        { rate: 0.37, min: 751600,  max: Infinity },
      ],
      mfs: [
        { rate: 0.10, min: 0,       max: 11925  },
        { rate: 0.12, min: 11925,   max: 48475  },
        { rate: 0.22, min: 48475,   max: 103350 },
        { rate: 0.24, min: 103350,  max: 197300 },
        { rate: 0.32, min: 197300,  max: 250525 },
        { rate: 0.35, min: 250525,  max: 375800 },
        { rate: 0.37, min: 375800,  max: Infinity },
      ],
      hoh: [
        { rate: 0.10, min: 0,       max: 17000  },
        { rate: 0.12, min: 17000,   max: 64850  },
        { rate: 0.22, min: 64850,   max: 103350 },
        { rate: 0.24, min: 103350,  max: 197300 },
        { rate: 0.32, min: 197300,  max: 250500 },
        { rate: 0.35, min: 250500,  max: 626350 },
        { rate: 0.37, min: 626350,  max: Infinity },
      ],
    },
    stdDeduction: { single: 15000, mfj: 30000, mfs: 15000, hoh: 22500 },
    limits: {
      k401Base: 23500, k401Catchup: 31000, k401SuperCatchup: 34750,
      iraBase: 7000,   iraCatchup: 8000,
      hsaSingle: 4300, hsaFamily: 8550,    hsaCatchupAdd: 1000,
    },
  },
  2026: {
    // Source: IRS Rev. Proc. 2025-38 / IRS newsroom Oct 2025
    brackets: {
      single: [
        { rate: 0.10, min: 0,       max: 12400  },
        { rate: 0.12, min: 12400,   max: 50400  },
        { rate: 0.22, min: 50400,   max: 105700 },
        { rate: 0.24, min: 105700,  max: 201775 },
        { rate: 0.32, min: 201775,  max: 256225 },
        { rate: 0.35, min: 256225,  max: 640600 },
        { rate: 0.37, min: 640600,  max: Infinity },
      ],
      mfj: [
        { rate: 0.10, min: 0,       max: 24800  },
        { rate: 0.12, min: 24800,   max: 100800 },
        { rate: 0.22, min: 100800,  max: 211400 },
        { rate: 0.24, min: 211400,  max: 403550 },
        { rate: 0.32, min: 403550,  max: 512450 },
        { rate: 0.35, min: 512450,  max: 768700 },
        { rate: 0.37, min: 768700,  max: Infinity },
      ],
      mfs: [
        { rate: 0.10, min: 0,       max: 12400  },
        { rate: 0.12, min: 12400,   max: 50400  },
        { rate: 0.22, min: 50400,   max: 105700 },
        { rate: 0.24, min: 105700,  max: 201775 },
        { rate: 0.32, min: 201775,  max: 256225 },
        { rate: 0.35, min: 256225,  max: 384350 },
        { rate: 0.37, min: 384350,  max: Infinity },
      ],
      hoh: [
        { rate: 0.10, min: 0,       max: 17700  },
        { rate: 0.12, min: 17700,   max: 67450  },
        { rate: 0.22, min: 67450,   max: 105700 },
        { rate: 0.24, min: 105700,  max: 201775 },
        { rate: 0.32, min: 201775,  max: 256200 },
        { rate: 0.35, min: 256200,  max: 640600 },
        { rate: 0.37, min: 640600,  max: Infinity },
      ],
    },
    stdDeduction: { single: 16100, mfj: 32200, mfs: 16100, hoh: 24150 },
    limits: {
      k401Base: 24500, k401Catchup: 32500, k401SuperCatchup: 35750,
      iraBase: 7500,   iraCatchup: 8600,
      hsaSingle: 4400, hsaFamily: 8750,    hsaCatchupAdd: 1000,
    },
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function fmtRange(min: number, max: number): string {
  return max === Infinity ? `${fmt(min)}+` : `${fmt(min)} – ${fmt(max)}`;
}

interface BracketResult extends Bracket {
  taxableInRange: number;
  taxInBracket:   number;
  isActive:       boolean;
}

function computeTax(taxableIncome: number, brackets: Bracket[]): { totalTax: number; marginalRate: number; results: BracketResult[] } {
  let totalTax = 0;
  let marginalRate = brackets[0].rate;
  const results: BracketResult[] = brackets.map(b => {
    if (taxableIncome <= b.min) return { ...b, taxableInRange: 0, taxInBracket: 0, isActive: false };
    const taxableInRange = Math.min(taxableIncome - b.min, b.max === Infinity ? taxableIncome - b.min : b.max - b.min);
    if (taxableInRange <= 0) return { ...b, taxableInRange: 0, taxInBracket: 0, isActive: false };
    const taxInBracket = taxableInRange * b.rate;
    totalTax += taxInBracket;
    marginalRate = b.rate;
    return { ...b, taxableInRange, taxInBracket, isActive: true };
  });
  return { totalTax, marginalRate, results };
}

function get401kMax(age: number, limits: YearData["limits"]): number {
  if (age >= 60 && age <= 63) return limits.k401SuperCatchup;
  if (age >= 50)              return limits.k401Catchup;
  return limits.k401Base;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function TaxBracketPage() {
  const [taxYear, setTaxYear]           = useState<2025 | 2026>(2026);
  const [filing, setFiling]             = useState<FilingStatus>("single");
  const [grossIncome, setGrossIncome]   = useState(85000);
  const [age, setAge]                   = useState(35);
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
  const maxIra  = age >= 50 ? limits.iraCatchup : limits.iraBase;
  const maxHsa  = (hsaCoverage === "family" ? limits.hsaFamily : limits.hsaSingle) + (age >= 55 ? limits.hsaCatchupAdd : 0);

  const pretaxContribs  = contrib401k + contribIra + contribHsa;
  const agi             = Math.max(0, grossIncome - pretaxContribs);
  const stdDeduction    = yd.stdDeduction[filing];
  const deduction       = deductionType === "standard" ? stdDeduction : Math.max(itemizedAmount, 0);
  const taxableIncome   = Math.max(0, agi - deduction);
  const brackets        = yd.brackets[filing];
  const { totalTax, marginalRate, results } = computeTax(taxableIncome, brackets);
  const effectiveRate   = grossIncome > 0 ? totalTax / grossIncome : 0;
  const afterTaxIncome  = grossIncome - totalTax;
  const taxWithoutContribs = pretaxContribs > 0
    ? computeTax(Math.max(0, agi + pretaxContribs - deduction), brackets).totalTax
    : totalTax;
  const taxSavingsFromContribs = taxWithoutContribs - totalTax;
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
      <input
        type="number" min={0} max={max} value={value}
        onChange={e => onChange(Math.min(Number(e.target.value), max))}
        style={{ ...inputStyle, paddingLeft: "24px" }}
      />
    </div>
  );

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
          Federal Tax Bracket Estimator
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          See your effective tax rate, marginal bracket, and a full breakdown across each federal bracket. Supports 2025 and 2026 tax year data.
        </p>
      </section>

      {/* CALCULATOR */}
      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

          {/* LEFT — Inputs */}
          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #f0ede6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

            {/* Tax year selector — prominent at top */}
            <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f0ede6" }}>
              <label style={labelStyle}>Tax Year</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {([2025, 2026] as const).map(y => (
                  <button key={y} onClick={() => setTaxYear(y)} style={{
                    flex: 1, padding: "10px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer", border: "2px solid",
                    borderColor: taxYear === y ? "#b8962e" : "#e0ddd6",
                    background: taxYear === y ? "#b8962e" : "#fff",
                    color: taxYear === y ? "#fff" : "#999",
                    transition: "all 0.12s",
                  }}>{y}</button>
                ))}
              </div>
              {taxYear === 2026 && (
                <div style={{ fontSize: "10px", color: "#b8962e", marginTop: "6px" }}>
                  2026 brackets & limits per IRS Rev. Proc. 2025-38
                </div>
              )}
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
                <label style={labelStyle}>Gross Annual Income</label>
                {moneyInput(grossIncome, 5000000, setGrossIncome)}
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
                    <label style={labelStyle}>
                      Traditional IRA{" "}
                      <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(maxIra)}{age >= 50 ? " (incl. catch-up)" : ""}</span>
                    </label>
                    {moneyInput(contribIra, maxIra, setContribIra)}
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Deductibility phases out at higher incomes — see income limits</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>
                      HSA{" "}
                      <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(maxHsa)}{age >= 55 ? " (incl. catch-up)" : ""}</span>
                    </label>
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
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Requires a High Deductible Health Plan (HDHP)</span>
                  </div>
                </div>
              </div>

              {/* Deduction */}
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
                      Standard deduction ({fmt(stdDeduction)}) is higher — you&apos;d save more taking standard.
                    </span>
                  )}
                </div>
              )}

              {/* Consent checkbox */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "4px" }}>
                <input
                  type="checkbox"
                  checked={consented}
                  onChange={e => setConsented(e.target.checked)}
                  style={{ marginTop: "2px", accentColor: "#b8962e", flexShrink: 0, width: "15px", height: "15px" }}
                />
                <span style={{ fontSize: "11px", color: "#777", lineHeight: 1.6 }}>
                  I understand these results are for <strong>high-level estimation only</strong> and do not constitute tax or financial advice. SureEdge Tax &amp; Accounting and its team are not liable for any decisions made based on these calculations.{" "}
                  <a href="/privacy" style={{ color: "#b8962e", textDecoration: "underline" }}>Privacy Policy</a>
                </span>
              </label>

              <button
                onClick={() => setCalcCount(c => c + 1)}
                disabled={!consented}
                style={{ background: consented ? "#b8962e" : "#d5c9b0", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: consented ? "pointer" : "not-allowed", marginTop: "4px", transition: "background 0.15s" }}
              >
                Calculate {taxYear} →
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
                {/* Year tag */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8962e" }}>
                    {taxYear} Federal Results
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "#f0ede6" }}/>
                </div>

                {/* Summary cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Federal Tax Owed", value: fmt(totalTax), sub: "estimated" },
                    { label: "Effective Rate",   value: (effectiveRate * 100).toFixed(1) + "%", sub: "of gross income" },
                    { label: "Marginal Bracket", value: (marginalRate * 100).toFixed(0) + "%", sub: "top rate" },
                  ].map(card => (
                    <div key={card.label} style={{ background: "#fff", borderRadius: "10px", padding: "16px", border: "1px solid #f0ede6", textAlign: "center" }}>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a2e4a" }}>{card.value}</div>
                      <div style={{ fontSize: "10px", fontWeight: 600, color: "#b8962e", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: "3px" }}>{card.label}</div>
                      <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>{card.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Pre-tax contribution savings */}
                {pretaxContribs > 0 && (
                  <div style={{ background: "rgba(184,150,46,0.08)", border: "1.5px solid #b8962e", borderRadius: "10px", padding: "14px 16px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#b8962e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                      Pre-Tax Contribution Savings
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ fontSize: "12px", color: "#555" }}>
                        {fmt(pretaxContribs)} in contributions reduced your AGI from {fmt(grossIncome)} to {fmt(agi)}
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#1a2e4a" }}>{fmt(taxSavingsFromContribs)} saved</div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", marginTop: "10px", flexWrap: "wrap" }}>
                      {contrib401k > 0 && <span style={{ fontSize: "11px", color: "#666" }}>401(k): {fmt(contrib401k)}</span>}
                      {contribIra > 0  && <span style={{ fontSize: "11px", color: "#666" }}>IRA: {fmt(contribIra)}</span>}
                      {contribHsa > 0  && <span style={{ fontSize: "11px", color: "#666" }}>HSA: {fmt(contribHsa)}</span>}
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
                      { color: "#1a2e4a",                  label: `Tax: ${fmt(totalTax)}` },
                      ...(pretaxContribs > 0 ? [{ color: "rgba(46,204,113,0.6)", label: `Pre-tax contribs: ${fmt(pretaxContribs)}`, border: "1px solid #27ae60" }] : []),
                      { color: "rgba(184,150,46,0.6)",      label: `Deduction: ${fmt(deduction)}` },
                      { color: "#d4edda",                   label: `After-tax: ${fmt(afterTaxIncome)}`, border: "1px solid #a8d5b5" },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#555" }}>
                        <div style={{ width: 10, height: 10, borderRadius: "2px", background: item.color, border: ("border" in item ? item.border : undefined) || "none", flexShrink: 0 }}/>
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
                    {results.map((b, i) => (
                      <>
                        <div key={`rate-${i}`} style={{ padding: "7px 8px 7px 0", borderTop: "1px solid #f5f3ee", fontWeight: b.isActive ? 700 : 400, color: b.isActive ? "#b8962e" : "#ccc" }}>
                          {(b.rate * 100).toFixed(0)}%
                        </div>
                        <div key={`range-${i}`} style={{ padding: "7px 8px", borderTop: "1px solid #f5f3ee", color: b.isActive ? "#555" : "#ccc" }}>
                          {fmtRange(b.min, b.max)}
                          {b.isActive && b.taxableInRange > 0 && taxableIncome > 0 && (
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

      {/* DISCLAIMER */}
      <section style={{ background: "#fff", padding: "36px 44px", borderTop: "1px solid #f0ede6" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ background: "#fff8e6", border: "1px solid #f0d98a", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
              <path d="M12 2L2 20h20L12 2z" stroke="#b8962e" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M12 9v5M12 16.5v.5" stroke="#b8962e" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <p style={{ fontSize: "11px", color: "#7a6010", lineHeight: 1.8, margin: 0 }}>
              <strong>For high-level estimation only.</strong> This tool covers federal income tax and does not include FICA, state income tax, AMT, self-employment tax, net investment income tax, credits, or phase-outs. Contribution limits are per IRS guidance and subject to change. Results do not constitute tax advice. SureEdge Tax &amp; Accounting and its team are <strong>not liable</strong> for any decisions made based on these calculations. Consult a licensed CPA or EA for your specific situation.
            </p>
          </div>
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
