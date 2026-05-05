"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TAX_YEARS, TaxYear, FilingStatus, US_STATES,
  fmt, computeTax, computeSeTax, getStateRate, buildPortalSaveUrl,
} from "@/lib/tax-data";

const QUARTER_DUE_DATES: Record<TaxYear, string[]> = {
  2025: ["April 15, 2025", "June 16, 2025", "September 15, 2025", "January 15, 2026"],
  2026: ["April 15, 2026", "June 15, 2026", "September 15, 2026", "January 15, 2027"],
};

export default function QuarterlyTaxPage() {
  const [taxYear, setTaxYear] = useState<TaxYear>(2026);
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [seIncome, setSeIncome] = useState(80000);
  const [otherWages, setOtherWages] = useState(0);
  const [w2Withholding, setW2Withholding] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [stateCode, setStateCode] = useState("TX");
  const [stateRateOverride, setStateRateOverride] = useState<number | null>(null);
  const [priorYearTax, setPriorYearTax] = useState(0);
  const [priorYearAgi, setPriorYearAgi] = useState(0);
  const [paidQ1, setPaidQ1] = useState(0);
  const [paidQ2, setPaidQ2] = useState(0);
  const [paidQ3, setPaidQ3] = useState(0);
  const [calcCount, setCalcCount] = useState(0);
  const [consented, setConsented] = useState(false);
  const calculated = calcCount > 0;
  const stateTaxRate = stateRateOverride !== null ? stateRateOverride : getStateRate(stateCode);

  const yd = TAX_YEARS[taxYear];
  const stdDeduction = yd.stdDeduction[filing];

  // SE tax computation
  const seTax = computeSeTax(seIncome, otherWages, filing, yd.limits);
  // AGI = total income - half SE tax deduction - other above-the-line deductions
  const totalIncome = seIncome + otherWages;
  const agi = Math.max(0, totalIncome - seTax.halfDeductible - otherDeductions);
  const taxableIncome = Math.max(0, agi - stdDeduction);
  const fedTax = computeTax(taxableIncome, yd.brackets[filing]);
  const stateTax = agi * (stateTaxRate / 100);

  const totalAnnualTax = fedTax.totalTax + seTax.totalSeTax + stateTax;
  const taxAfterWithholding = Math.max(0, totalAnnualTax - w2Withholding);
  const quarterlyPayment = taxAfterWithholding / 4;

  // Safe harbor: 100% of prior year tax (110% if AGI > $150K / $75K MFS)
  const safeHarborThreshold = filing === "mfs" ? 75000 : 150000;
  const safeHarborMultiplier = priorYearAgi > safeHarborThreshold ? 1.10 : 1.00;
  const safeHarborTotal = priorYearTax * safeHarborMultiplier;
  const safeHarborQuarterly = Math.max(0, safeHarborTotal - w2Withholding) / 4;

  // Use the lower of: actual estimate or safe harbor (if prior year data provided)
  const recommendedQuarterly = priorYearTax > 0 ? Math.min(quarterlyPayment, safeHarborQuarterly) : quarterlyPayment;

  // Already paid this year — recompute remaining quarters
  const alreadyPaid = paidQ1 + paidQ2 + paidQ3;
  const targetTotal = recommendedQuarterly * 4;
  const remainingDue = Math.max(0, targetTotal - alreadyPaid);
  // How many quarters remain unpaid
  const quartersPaid = (paidQ1 > 0 ? 1 : 0) + (paidQ2 > 0 ? 1 : 0) + (paidQ3 > 0 ? 1 : 0);
  const quartersRemaining = Math.max(1, 4 - quartersPaid);
  const adjustedQuarterly = remainingDue / quartersRemaining;
  const isUnderpaying = alreadyPaid < (recommendedQuarterly * quartersPaid * 0.9);

  const inputStyle: React.CSSProperties = { padding: "9px 12px", border: "1px solid #e0ddd6", borderRadius: "7px", fontSize: "13px", width: "100%", background: "#fff", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "5px", display: "block" };
  const moneyInput = (value: number, max: number, onChange: (v: number) => void) => (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
      <input type="number" min={0} max={max} value={value} onChange={e => onChange(Math.min(Number(e.target.value), max))} style={{ ...inputStyle, paddingLeft: "24px" }}/>
    </div>
  );

  return (
    <>
      <section style={{ background: "#1a2e4a", padding: "40px 44px 36px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "14px" }}>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Free Tools</Link>
          {" / "}
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Quarterly Tax Estimator</span>
        </div>
        <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: "10px" }}>
          Quarterly Estimated Tax Calculator
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          Self-employed or freelancer? Calculate your federal estimated quarterly payment, including self-employment (SE) tax. Avoid IRS underpayment penalties.
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Filing Status</label>
                <select value={filing} onChange={e => setFiling(e.target.value as FilingStatus)} style={inputStyle}>
                  <option value="single">Single</option>
                  <option value="mfj">Married Filing Jointly</option>
                  <option value="mfs">Married Filing Separately</option>
                  <option value="hoh">Head of Household</option>
                </select>
              </div>

              <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>This Year&apos;s Income</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Self-Employment Income (Net)</label>
                    {moneyInput(seIncome, 5000000, setSeIncome)}
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Net profit from Schedule C, K-1, or 1099 work</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Other W-2 Wages (if any)</label>
                    {moneyInput(otherWages, 5000000, setOtherWages)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>W-2 Federal Withholding</label>
                    {moneyInput(w2Withholding, 1000000, setW2Withholding)}
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Already paid via W-2 paycheck withholding</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>Adjustments</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Other Above-the-Line Deductions</label>
                    {moneyInput(otherDeductions, 200000, setOtherDeductions)}
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>HSA, SEP-IRA, Solo 401(k), self-employed health insurance, etc.</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", alignItems: "end" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label style={labelStyle}>State</label>
                      <select value={stateCode} onChange={e => { setStateCode(e.target.value); setStateRateOverride(null); }} style={inputStyle}>
                        {US_STATES.map(s => (
                          <option key={s.code} value={s.code}>{s.name}{s.type === "none" ? " (no tax)" : ` (~${s.rate}%)`}</option>
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
                </div>
              </div>

              <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Already Paid This Year (Optional)</div>
                <p style={{ fontSize: "11px", color: "#888", marginBottom: "12px", lineHeight: 1.5 }}>If you already paid earlier quarters, we&apos;ll recompute remaining quarters.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Q1 Paid</label>
                    {moneyInput(paidQ1, 1000000, setPaidQ1)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Q2 Paid</label>
                    {moneyInput(paidQ2, 1000000, setPaidQ2)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Q3 Paid</label>
                    {moneyInput(paidQ3, 1000000, setPaidQ3)}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "4px" }}>Safe Harbor (Optional)</div>
                <p style={{ fontSize: "11px", color: "#888", marginBottom: "12px", lineHeight: 1.5 }}>Pay 100% of last year&apos;s tax (110% if AGI &gt; $150K) to avoid penalties even if you under-estimate.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Prior Year Total Tax (Form 1040 Line 24)</label>
                    {moneyInput(priorYearTax, 1000000, setPriorYearTax)}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Prior Year AGI</label>
                    {moneyInput(priorYearAgi, 5000000, setPriorYearAgi)}
                  </div>
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "4px" }}>
                <input type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)} style={{ marginTop: "2px", accentColor: "#b8962e", flexShrink: 0, width: "15px", height: "15px" }}/>
                <span style={{ fontSize: "11px", color: "#777", lineHeight: 1.6 }}>
                  I understand these results are for <strong>high-level estimation only</strong> and do not constitute tax advice. SureEdge is not liable for any decisions based on these results.{" "}
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
                  <rect x="3" y="4" width="18" height="17" rx="2" stroke="#1a2e4a" strokeWidth="1.5"/>
                  <path d="M3 9h18M8 2v4M16 2v4" stroke="#1a2e4a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p style={{ fontSize: "13px" }}>Fill in your details and click <strong>Calculate</strong> to see your quarterly payment plan.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8962e" }}>{taxYear} Quarterly Plan</span>
                  <div style={{ flex: 1, height: "1px", background: "#f0ede6" }}/>
                </div>

                {/* Hero quarterly amount */}
                <div style={{ background: "#1a2e4a", borderRadius: "12px", padding: "24px", color: "#fff" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>
                    {alreadyPaid > 0 ? `Pay each remaining quarter (${quartersRemaining} left)` : "Pay each quarter"}
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#b8962e", letterSpacing: "-0.5px", marginBottom: "4px" }}>
                    {fmt(alreadyPaid > 0 ? adjustedQuarterly : recommendedQuarterly)}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                    Total annual: {fmt(targetTotal)}
                    {alreadyPaid > 0 && <> · already paid {fmt(alreadyPaid)} · {fmt(remainingDue)} remaining</>}
                    {priorYearTax > 0 && recommendedQuarterly === safeHarborQuarterly && <span style={{ color: "#b8962e" }}> · using safe harbor</span>}
                  </div>
                </div>

                {isUnderpaying && alreadyPaid > 0 && (
                  <div style={{ background: "#fdecea", border: "1.5px solid #c0392b", borderRadius: "10px", padding: "12px 16px", fontSize: "12px", color: "#7a2e22" }}>
                    <strong>⚠ Possible underpayment penalty risk.</strong> You&apos;ve paid less than 90% of what was due through the quarters paid so far. The remaining {quartersRemaining} payments shown above are increased to catch up by year-end.
                  </div>
                )}

                {/* Quarterly schedule */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Payment Schedule</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {QUARTER_DUE_DATES[taxYear].map((date, i) => {
                      const paid = i === 0 ? paidQ1 : i === 1 ? paidQ2 : i === 2 ? paidQ3 : 0;
                      const isPast = paid > 0;
                      const amount = isPast ? paid : (alreadyPaid > 0 ? adjustedQuarterly : recommendedQuarterly);
                      return (
                        <div key={i} style={{ background: isPast ? "rgba(46,204,113,0.06)" : "#faf9f6", borderRadius: "8px", padding: "12px 14px", border: `1px solid ${isPast ? "rgba(46,204,113,0.3)" : "#f0ede6"}` }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, color: isPast ? "#27ae60" : "#b8962e", letterSpacing: "1px", textTransform: "uppercase" }}>
                            Q{i + 1} {isPast && "✓ Paid"}
                          </div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "#1a2e4a", margin: "4px 0" }}>{fmt(amount)}</div>
                          <div style={{ fontSize: "11px", color: "#888" }}>Due {date}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tax breakdown */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Annual Tax Breakdown</div>
                  {[
                    ["Federal income tax", fedTax.totalTax],
                    ["Self-employment tax (15.3%)", seTax.totalSeTax],
                    ...(stateTax > 0 ? [["State income tax", stateTax] as [string, number]] : []),
                    ["W-2 withholding (already paid)", -w2Withholding],
                  ].map(([label, val]) => (
                    <div key={label as string} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "12px" }}>
                      <span style={{ color: "#666" }}>{label}</span>
                      <span style={{ fontWeight: 600, color: (val as number) < 0 ? "#27ae60" : "#1a2e4a" }}>
                        {(val as number) < 0 ? `-${fmt(Math.abs(val as number))}` : fmt(val as number)}
                      </span>
                    </div>
                  ))}
                  <div style={{ borderTop: "2px solid #f0ede6", margin: "8px 0 6px" }}/>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: "13px" }}>
                    <span style={{ fontWeight: 700, color: "#1a2e4a" }}>Owed via quarterly estimates</span>
                    <span style={{ fontWeight: 700, color: "#1a2e4a" }}>{fmt(taxAfterWithholding)}</span>
                  </div>
                </div>

                {/* SE Tax detail */}
                <div style={{ background: "rgba(184,150,46,0.08)", border: "1.5px solid #b8962e", borderRadius: "10px", padding: "14px 16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#b8962e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>Self-Employment Tax Detail</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "11px", color: "#666" }}>
                    <div>Net SE earnings (× 0.9235): <strong style={{ color: "#1a2e4a" }}>{fmt(seTax.netSeEarnings)}</strong></div>
                    <div>SS portion (12.4% up to {fmt(yd.limits.ssWageBase)}): <strong style={{ color: "#1a2e4a" }}>{fmt(seTax.ssTax)}</strong></div>
                    <div>Medicare (2.9% no cap): <strong style={{ color: "#1a2e4a" }}>{fmt(seTax.medicareTax)}</strong></div>
                    <div>Half-SE deduction: <strong style={{ color: "#27ae60" }}>{fmt(seTax.halfDeductible)}</strong></div>
                    {seTax.addlMedicareTax > 0 && <div style={{ gridColumn: "1 / -1" }}>Additional 0.9% Medicare: <strong style={{ color: "#1a2e4a" }}>{fmt(seTax.addlMedicareTax)}</strong></div>}
                  </div>
                </div>

                {/* Safe harbor note */}
                {priorYearTax > 0 && (
                  <div style={{ background: "#f5f3ee", borderRadius: "10px", padding: "12px 14px", fontSize: "11px", color: "#666", lineHeight: 1.6 }}>
                    <strong style={{ color: "#1a2e4a" }}>Safe harbor:</strong> Paying {fmt(safeHarborQuarterly)}/quarter ({fmt(safeHarborTotal)} annual, {(safeHarborMultiplier * 100).toFixed(0)}% of last year) eliminates underpayment penalty risk regardless of this year&apos;s actual income.
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px" }}>
                  <a href={buildPortalSaveUrl('quarterly-tax', {
                    inputs: { taxYear, filing, seIncome, otherWages, w2Withholding, otherDeductions, stateCode, stateTaxRate, priorYearTax, priorYearAgi, paidQ1, paidQ2, paidQ3 },
                    outputs: { quarterlyAmount: alreadyPaid > 0 ? adjustedQuarterly : recommendedQuarterly, totalAnnualTax, fedTax: fedTax.totalTax, seTax: seTax.totalSeTax, stateTax, isUnderpaying },
                    taxYear,
                  })} style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Save &amp; track over time
                  </a>
                  <Link href="/booking" style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Get tax planning →
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
              <strong>For high-level estimation only.</strong> This estimator does not include AMT, NIIT, QBI deduction, credits, retirement contribution deductions in detail, or state-specific quarterly rules. Quarterly due dates may shift if they fall on a weekend or holiday. SureEdge Tax &amp; Accounting is <strong>not liable</strong> for any decisions made based on these calculations.
            </p>
          </div>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>Need a real quarterly tax plan?</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our CPA &amp; EA team optimizes SE tax, finds deductions, and handles the IRS for you.</div>
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
