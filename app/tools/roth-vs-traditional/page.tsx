"use client";

import { useState } from "react";
import Link from "next/link";
import EmailResultsModal from "@/components/EmailResultsModal";
import {
  TAX_YEARS, TaxYear, FilingStatus,
  fmt, pct, fv, getMarginalRate, getIraMax, buildPortalSaveUrl,
} from "@/lib/tax-data";

// ── Main calculator ────────────────────────────────────────────────────────
export default function RothVsTraditionalPage() {
  const [taxYear, setTaxYear] = useState<TaxYear>(2026);
  const [filing, setFiling] = useState<FilingStatus>("single");
  const [grossIncome, setGrossIncome] = useState(75000);
  const [age, setAge] = useState(35);
  const [contribution, setContribution] = useState(7000);
  const [retirementAge, setRetirementAge] = useState(65);
  const [retirementIncome, setRetirementIncome] = useState(60000);
  const [retirementRateOverride, setRetirementRateOverride] = useState<number | null>(null);
  const [returnRate, setReturnRate] = useState(7);
  const [stateTaxRate, setStateTaxRate] = useState(0);
  const [showEmail, setShowEmail] = useState(false);
  const [calcCount, setCalcCount] = useState(0);
  const [consented, setConsented] = useState(false);
  const calculated = calcCount > 0;

  const yd = TAX_YEARS[taxYear];
  const limits = yd.limits;
  const maxContrib = getIraMax(age, limits);
  const years = Math.max(retirementAge - age, 1);

  // ── Compute ──────────────────────────────────────────────────────────────
  const taxableNow = Math.max(0, grossIncome - yd.stdDeduction[filing]);
  const marginalNow = getMarginalRate(taxableNow, yd.brackets[filing]);
  const effectiveTotalNow = marginalNow + stateTaxRate / 100;

  const retirementTaxable = Math.max(0, retirementIncome - yd.stdDeduction[filing]);
  const marginalRetirementInferred = getMarginalRate(retirementTaxable, yd.brackets[filing]);
  const marginalRetirement = retirementRateOverride !== null ? retirementRateOverride / 100 : marginalRetirementInferred;

  // Apples-to-apples: contribute $X to EITHER account.
  // Traditional gets a tax deduction today — to compare fairly, assume the saver
  // invests those tax savings in a taxable brokerage account at the same return rate,
  // taxed at long-term capital gains (15%) at withdrawal.
  const LTCG_RATE = 0.15;

  const traditionalTaxSavingNow = contribution * effectiveTotalNow;
  const traditionalBalance = fv(contribution, returnRate, years);
  const traditionalTaxAtWithdrawal = traditionalBalance * marginalRetirement;
  const traditionalAccountNet = traditionalBalance - traditionalTaxAtWithdrawal;

  // Tax savings invested in side taxable account
  const sideAccountBalance = fv(traditionalTaxSavingNow, returnRate, years);
  const sideAccountGain = Math.max(0, sideAccountBalance - traditionalTaxSavingNow);
  const sideAccountTax = sideAccountGain * LTCG_RATE;
  const sideAccountNet = sideAccountBalance - sideAccountTax;

  const traditionalNet = traditionalAccountNet + sideAccountNet;

  const rothBalance = fv(contribution, returnRate, years);
  const rothNet = rothBalance;

  const rothWins = rothNet > traditionalNet;
  const netDifference = Math.abs(rothNet - traditionalNet);
  // Breakeven (simplified): retirement marginal rate where the two paths converge,
  // approximately equal to current marginal when ignoring cap gains drag.
  const breakevenRate = marginalNow;

  // Income limit warnings — pulled from shared data
  const rothPO = yd.rothPhaseOut[filing];
  const iraDeductPO = yd.iraDeductPhaseOut[filing];
  const showRothFullyOut = grossIncome >= rothPO.end;
  const showRothPhaseOut = grossIncome >= rothPO.start && grossIncome < rothPO.end;
  const showTraditionalDeductPhaseOut = grossIncome > iraDeductPO.start;

  const resultsSummary = `
Tax Year: ${taxYear}
Filing Status: ${filing === "mfj" ? "Married Filing Jointly" : filing === "hoh" ? "Head of Household" : filing === "mfs" ? "Married Filing Separately" : "Single"}
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

  const inputStyle: React.CSSProperties = { padding: "9px 12px", border: "1px solid #e0ddd6", borderRadius: "7px", fontSize: "13px", width: "100%", background: "#fff", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "5px", display: "block" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column" };

  return (
    <>
      {showEmail && <EmailResultsModal
        onClose={() => setShowEmail(false)}
        toolSlug="roth-vs-traditional"
        toolName="Roth vs Traditional IRA"
        resultsSummary={resultsSummary}
        inputs={{ taxYear, filing, grossIncome, age, contribution, retirementAge, retirementIncome, returnRate, stateTaxRate, retirementRateOverride }}
        outputs={{ verdict: rothWins ? 'Roth' : 'Traditional', netDifference, traditionalNet, rothNet, marginalNow, marginalRetirement }}
        taxYear={taxYear}
      />}

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
          Compare after-tax retirement value side-by-side. Supports 2025 and 2026 tax year data including contribution limits and Roth phase-outs.
        </p>
      </section>

      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

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
                    transition: "all 0.12s",
                  }}>{y}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Filing Status</label>
                <select value={filing} onChange={e => setFiling(e.target.value as FilingStatus)} style={inputStyle}>
                  <option value="single">Single</option>
                  <option value="mfj">Married Filing Jointly</option>
                  <option value="mfs">Married Filing Separately</option>
                  <option value="hoh">Head of Household</option>
                </select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Gross Annual Income</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                  <input type="number" min={0} max={2000000} value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} style={{ ...inputStyle, paddingLeft: "24px" }}/>
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
                <label style={labelStyle}>Annual IRA Contribution <span style={{ color: "#aaa", fontWeight: 400 }}>max {fmt(maxContrib)}{age >= 50 ? " (catch-up)" : ""}</span></label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                  <input type="number" min={1} max={maxContrib} value={contribution} onChange={e => setContribution(Math.min(Number(e.target.value), maxContrib))} style={{ ...inputStyle, paddingLeft: "24px" }}/>
                </div>
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

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", alignItems: "end" }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Expected Retirement Annual Income</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
                    <input type="number" min={0} max={1000000} value={retirementIncome}
                      onChange={e => { setRetirementIncome(Number(e.target.value)); setRetirementRateOverride(null); }}
                      style={{ ...inputStyle, paddingLeft: "24px" }}/>
                  </div>
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Auto-estimates retirement bracket → {pct(marginalRetirementInferred)}</span>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Or override %</label>
                  <input type="number" min={0} max={50} step={1}
                    placeholder={String(Math.round(marginalRetirementInferred * 100))}
                    value={retirementRateOverride ?? ""}
                    onChange={e => setRetirementRateOverride(e.target.value === "" ? null : Number(e.target.value))}
                    style={inputStyle} />
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Bracket if known</span>
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "4px" }}>
                <input type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)} style={{ marginTop: "2px", accentColor: "#b8962e", flexShrink: 0, width: "15px", height: "15px" }}/>
                <span style={{ fontSize: "11px", color: "#777", lineHeight: 1.6 }}>
                  I understand these results are for <strong>high-level estimation only</strong> and do not constitute tax or financial advice. SureEdge Tax &amp; Accounting and its team are not liable for any decisions made based on these calculations.{" "}
                  <a href="/privacy" style={{ color: "#b8962e", textDecoration: "underline" }}>Privacy Policy</a>
                </span>
              </label>

              <button onClick={() => setCalcCount(c => c + 1)} disabled={!consented}
                style={{ background: consented ? "#b8962e" : "#d5c9b0", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: consented ? "pointer" : "not-allowed", marginTop: "4px", letterSpacing: "0.1px", transition: "background 0.15s" }}>
                Calculate {taxYear} →
              </button>
            </div>
          </div>

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
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8962e" }}>{taxYear} Comparison Results</span>
                  <div style={{ flex: 1, height: "1px", background: "#f0ede6" }}/>
                </div>

                {(showRothFullyOut || showRothPhaseOut || showTraditionalDeductPhaseOut) && (
                  <div style={{ background: "#fffbf0", border: "1px solid #f0d98a", borderRadius: "10px", padding: "14px 16px", fontSize: "12px", color: "#7a6010", lineHeight: 1.6 }}>
                    <strong>⚠ Income limits apply ({taxYear}):</strong>
                    {showRothFullyOut && <div>• Your income exceeds the Roth IRA limit ({fmt(rothPO.end)}). Consider a Backdoor Roth conversion.</div>}
                    {showRothPhaseOut && <div>• You&apos;re in the Roth IRA phase-out range ({fmt(rothPO.start)}–{fmt(rothPO.end)}). Your Roth contribution limit may be reduced.</div>}
                    {showTraditionalDeductPhaseOut && <div>• Above {fmt(iraDeductPO.start)}, Traditional IRA deductibility phases out if you&apos;re covered by a workplace plan (full phase-out at {fmt(iraDeductPO.end)}).</div>}
                  </div>
                )}

                <div style={{ background: rothWins ? "rgba(184,150,46,0.1)" : "#1a2e4a", border: `1.5px solid ${rothWins ? "#b8962e" : "#1a2e4a"}`, borderRadius: "12px", padding: "20px 22px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: rothWins ? "#b8962e" : "rgba(255,255,255,0.6)", marginBottom: "6px" }}>Verdict for your situation</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: rothWins ? "#1a2e4a" : "#fff", marginBottom: "4px" }}>
                    {rothWins ? "Roth IRA wins" : "Traditional IRA wins"} by {fmt(netDifference)}
                  </div>
                  <div style={{ fontSize: "12px", color: rothWins ? "#666" : "rgba(255,255,255,0.7)" }}>
                    If your retirement tax rate stays above {pct(breakevenRate)}, Roth stays ahead.
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[
                    { label: "Traditional IRA + Tax Savings Invested", color: "#1a2e4a", rows: [
                      ["Tax savings today", fmt(traditionalTaxSavingNow)],
                      ["IRA balance at retirement", fmt(traditionalBalance)],
                      [`Tax at withdrawal (${pct(marginalRetirement)})`, `-${fmt(traditionalTaxAtWithdrawal)}`],
                      ["Side account net (15% LTCG)", fmt(sideAccountNet)],
                      ["Total net after-tax value", fmt(traditionalNet)],
                    ]},
                    { label: "Roth IRA", color: "#b8962e", rows: [
                      ["After-tax cost today", fmt(contribution)],
                      ["Balance at retirement", fmt(rothBalance)],
                      ["Tax at withdrawal", "$0"],
                      ["Side account", "—"],
                      ["Total net after-tax value", fmt(rothNet)],
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

                <div style={{ background: "#f5f3ee", borderRadius: "10px", padding: "14px 16px", fontSize: "11px", color: "#888", lineHeight: 1.7 }}>
                  <strong style={{ color: "#555" }}>How we compare:</strong> Both scenarios contribute {fmt(contribution)} to the IRA. The Traditional saver also gets a tax deduction today, which we assume is invested in a taxable brokerage account at {returnRate}% return and taxed at 15% long-term capital gains at withdrawal. Without this assumption, the comparison is unfair because Traditional has lower out-of-pocket cost. {years} years to retirement · current marginal {pct(marginalNow)} · retirement marginal {pct(marginalRetirement)}.
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setShowEmail(true)} style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                    Email my results
                  </button>
                  <a href={buildPortalSaveUrl('roth-vs-traditional', {
                    inputs: { taxYear, filing, grossIncome, age, contribution, retirementAge, retirementIncome, returnRate, stateTaxRate, retirementRateOverride },
                    outputs: { verdict: rothWins ? 'Roth' : 'Traditional', netDifference, traditionalNet, rothNet, marginalNow, marginalRetirement, traditionalBalance, rothBalance },
                    taxYear,
                  })} style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Save &amp; track over time
                  </a>
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
              <strong>For high-level estimation only.</strong> Results are based on simplified assumptions. They do not account for income phase-outs in detail, workplace plan coverage, AMT, or future tax law changes. This tool does not constitute tax or financial advice. SureEdge Tax &amp; Accounting and its team are <strong>not liable</strong> for any decisions made based on these results. Consult a licensed CPA or EA before making contribution decisions.
            </p>
          </div>
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
