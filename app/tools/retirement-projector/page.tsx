"use client";

import { useState } from "react";
import Link from "next/link";
import { fmt, fvWithContrib, buildPortalSaveUrl } from "@/lib/tax-data";

const SAFE_WITHDRAWAL_RATE = 0.04; // 4% rule

export default function RetirementProjectorPage() {
  const [age, setAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [annualContribution, setAnnualContribution] = useState(7000);
  const [employerMatch, setEmployerMatch] = useState(0);
  const [returnRate, setReturnRate] = useState(7);
  const [inflationRate, setInflationRate] = useState(2.5);
  const [monthlySpendingNeed, setMonthlySpendingNeed] = useState(5000);
  const [ssMonthlyBenefit, setSsMonthlyBenefit] = useState(0);
  const [ssClaimAge, setSsClaimAge] = useState(67);
  const [showInTodaysDollars, setShowInTodaysDollars] = useState(true);
  const [calcCount, setCalcCount] = useState(0);
  const [consented, setConsented] = useState(false);
  const calculated = calcCount > 0;

  const years = Math.max(retirementAge - age, 1);
  const totalContribution = annualContribution + employerMatch;

  // Project balance at retirement
  const futureBalance = fvWithContrib(currentBalance, totalContribution, returnRate, years);
  const totalContributed = currentBalance + totalContribution * years;
  const totalGrowth = futureBalance - totalContributed;

  // Real (inflation-adjusted) value
  const realValue = futureBalance / Math.pow(1 + inflationRate / 100, years);

  // Display value depends on toggle
  const displayBalance = showInTodaysDollars ? realValue : futureBalance;

  // Monthly retirement income at 4% safe withdrawal (today's dollars)
  const annualSafeWithdrawalReal = realValue * SAFE_WITHDRAWAL_RATE;
  const monthlySafeWithdrawalReal = annualSafeWithdrawalReal / 12;
  // Plus social security (already in today's dollars typically; SSA estimates given in current $)
  const totalMonthlyIncome = monthlySafeWithdrawalReal + ssMonthlyBenefit;

  // Spending need check
  const monthlyShortfall = monthlySpendingNeed - totalMonthlyIncome;
  const hasShortfall = monthlyShortfall > 0;
  const annualShortfall = monthlyShortfall * 12;
  // To eliminate shortfall: need bigger nest egg.
  // Required portfolio (today's $) = annual shortfall / 4%
  const requiredAdditionalPortfolio = hasShortfall ? annualShortfall / SAFE_WITHDRAWAL_RATE : 0;
  // Convert to nominal (future $) and back-solve required additional contribution
  const requiredAdditionalNominal = requiredAdditionalPortfolio * Math.pow(1 + inflationRate / 100, years);
  // Required additional annual contribution to close gap (assumes same return rate)
  const r = returnRate / 100;
  const annuityFactor = r === 0 ? years : (Math.pow(1 + r, years) - 1) / r;
  const additionalAnnualToContribute = annuityFactor > 0 ? requiredAdditionalNominal / annuityFactor : 0;

  // What if you contributed $100/mo more?
  const boostedContribution = totalContribution + 1200;
  const boostedBalance = fvWithContrib(currentBalance, boostedContribution, returnRate, years);
  const boostBenefit = boostedBalance - futureBalance;

  // Year-by-year projection for chart
  const projection: { year: number; age: number; balance: number; contributed: number }[] = [];
  for (let i = 0; i <= years; i++) {
    const balance = fvWithContrib(currentBalance, totalContribution, returnRate, i);
    const contributed = currentBalance + totalContribution * i;
    projection.push({ year: i, age: age + i, balance, contributed });
  }
  const maxBalance = projection[projection.length - 1].balance;

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
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Retirement Savings Projector</span>
        </div>
        <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: "10px" }}>
          Retirement Savings Projector
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          Project your 401(k), IRA, or brokerage balance at retirement based on current savings, contributions, and assumed growth.
        </p>
      </section>

      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #f0ede6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2e4a", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #f0ede6" }}>
              Your Information
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Current Age</label>
                  <input type="number" min={18} max={89} value={age} onChange={e => setAge(Number(e.target.value))} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Retirement Age</label>
                  <input type="number" min={age + 1} max={90} value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Current Balance</label>
                {moneyInput(currentBalance, 100000000, setCurrentBalance)}
                <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Combined 401(k) + IRA + brokerage</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Your Annual Contribution</label>
                {moneyInput(annualContribution, 100000, setAnnualContribution)}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Employer Match (annual $)</label>
                {moneyInput(employerMatch, 50000, setEmployerMatch)}
                <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>e.g., 4% of salary if employer matches 4%</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Expected Return (%)</label>
                  <input type="number" min={1} max={20} step={0.5} value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} style={inputStyle} />
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Stock market avg ~7-10%</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Inflation (%)</label>
                  <input type="number" min={0} max={10} step={0.1} value={inflationRate} onChange={e => setInflationRate(Number(e.target.value))} style={inputStyle} />
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Long-term avg ~2.5%</span>
                </div>
              </div>

              {/* Retirement spending + Social Security */}
              <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                  Retirement Goals <span style={{ fontSize: "10px", color: "#aaa", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(today&apos;s dollars)</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Monthly Spending Need</label>
                    {moneyInput(monthlySpendingNeed, 50000, setMonthlySpendingNeed)}
                    <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>How much you want to spend per month in retirement, in today&apos;s dollars</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label style={labelStyle}>Social Security ($/mo)</label>
                      {moneyInput(ssMonthlyBenefit, 10000, setSsMonthlyBenefit)}
                      <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Estimate from <a href="https://ssa.gov/myaccount" target="_blank" rel="noopener" style={{ color: "#b8962e" }}>ssa.gov/myaccount</a></span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label style={labelStyle}>Claim Age</label>
                      <select value={ssClaimAge} onChange={e => setSsClaimAge(Number(e.target.value))} style={inputStyle}>
                        <option value={62}>62</option>
                        <option value={67}>67 (FRA)</option>
                        <option value={70}>70 (max)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "4px" }}>
                <input type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)} style={{ marginTop: "2px", accentColor: "#b8962e", flexShrink: 0, width: "15px", height: "15px" }}/>
                <span style={{ fontSize: "11px", color: "#777", lineHeight: 1.6 }}>
                  I understand these results are for <strong>high-level estimation only</strong> and do not constitute financial advice. SureEdge is not liable for any decisions based on these results.{" "}
                  <a href="/privacy" style={{ color: "#b8962e", textDecoration: "underline" }}>Privacy</a>
                </span>
              </label>

              <button onClick={() => setCalcCount(c => c + 1)} disabled={!consented}
                style={{ background: consented ? "#b8962e" : "#d5c9b0", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: consented ? "pointer" : "not-allowed", marginTop: "4px" }}>
                Project My Retirement →
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {!calculated ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "40px 28px", border: "1px solid #f0ede6", textAlign: "center", color: "#aaa" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "12px", opacity: 0.4 }}>
                  <polyline points="3 17 8 12 13 15 21 7" stroke="#1a2e4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 7 21 7 21 11" stroke="#1a2e4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontSize: "13px" }}>Fill in your details and click <strong>Project</strong> to see your retirement number.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#b8962e" }}>Your Projection at age {retirementAge}</span>
                  <div style={{ flex: 1, height: "1px", background: "#f0ede6" }}/>
                </div>

                {/* Today's dollars toggle */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "-4px" }}>
                  <button onClick={() => setShowInTodaysDollars(true)} style={{
                    padding: "5px 11px", fontSize: "11px", fontWeight: 600, borderRadius: "6px", cursor: "pointer", border: "1.5px solid",
                    borderColor: showInTodaysDollars ? "#b8962e" : "#e0ddd6",
                    background: showInTodaysDollars ? "rgba(184,150,46,0.08)" : "#fff",
                    color: showInTodaysDollars ? "#b8962e" : "#777",
                  }}>Today&apos;s $</button>
                  <button onClick={() => setShowInTodaysDollars(false)} style={{
                    padding: "5px 11px", fontSize: "11px", fontWeight: 600, borderRadius: "6px", cursor: "pointer", border: "1.5px solid",
                    borderColor: !showInTodaysDollars ? "#b8962e" : "#e0ddd6",
                    background: !showInTodaysDollars ? "rgba(184,150,46,0.08)" : "#fff",
                    color: !showInTodaysDollars ? "#b8962e" : "#777",
                  }}>Future $</button>
                </div>

                {/* Hero number */}
                <div style={{ background: "#1a2e4a", borderRadius: "12px", padding: "24px", color: "#fff" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>
                    Projected Balance ({showInTodaysDollars ? "Today's $" : "Future $"})
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#b8962e", letterSpacing: "-0.5px", marginBottom: "4px" }}>{fmt(displayBalance)}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                    {showInTodaysDollars
                      ? <>In future dollars: {fmt(futureBalance)} (with {inflationRate}% inflation)</>
                      : <>In today&apos;s dollars: ~{fmt(realValue)} (after {inflationRate}% inflation)</>
                    }
                  </div>
                </div>

                {/* Shortfall analysis */}
                {monthlySpendingNeed > 0 && (
                  <div style={{ background: hasShortfall ? "#fdecea" : "#dff5e0", border: `1.5px solid ${hasShortfall ? "#c0392b" : "#27ae60"}`, borderRadius: "12px", padding: "18px 22px" }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: hasShortfall ? "#c0392b" : "#27ae60", marginBottom: "6px" }}>
                      {hasShortfall ? "Income Shortfall" : "Will You Have Enough? — YES"}
                    </div>
                    {hasShortfall ? (
                      <>
                        <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>
                          Short {fmt(monthlyShortfall)}/month ({fmt(annualShortfall)}/year)
                        </div>
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px", lineHeight: 1.6 }}>
                          You&apos;ll have {fmt(totalMonthlyIncome)}/mo from your portfolio (4% rule) + Social Security, but want to spend {fmt(monthlySpendingNeed)}/mo.
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: "8px", padding: "10px 12px", fontSize: "12px", color: "#1a2e4a" }}>
                          <strong>To close the gap:</strong> Save an additional <strong>{fmt(additionalAnnualToContribute)}/year</strong> ({fmt(additionalAnnualToContribute / 12)}/mo) starting now, or work {Math.ceil(annualShortfall / (totalMonthlyIncome * 12) * years)} more years.
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: "12px", color: "#1a4a25", lineHeight: 1.6 }}>
                        At {fmt(totalMonthlyIncome)}/mo income (4% rule + Social Security), you cover your {fmt(monthlySpendingNeed)}/mo target with {fmt(-monthlyShortfall)}/mo cushion.
                      </div>
                    )}
                  </div>
                )}

                {/* Summary cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
                  {[
                    { label: "Contributed", value: fmt(totalContributed), sub: `${years} yrs` },
                    { label: "Growth", value: fmt(totalGrowth), sub: `${returnRate}%` },
                    { label: "Portfolio Income", value: fmt(monthlySafeWithdrawalReal), sub: "4% rule" },
                    { label: "Total Income", value: fmt(totalMonthlyIncome), sub: "+SS" },
                  ].map(c => (
                    <div key={c.label} style={{ background: "#fff", borderRadius: "10px", padding: "12px", border: "1px solid #f0ede6", textAlign: "center" }}>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a" }}>{c.value}</div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: "#b8962e", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "3px" }}>{c.label}</div>
                      <div style={{ fontSize: "9px", color: "#aaa", marginTop: "2px" }}>{c.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Growth chart */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "16px" }}>Growth Over Time</div>
                  <div style={{ position: "relative", height: "180px", padding: "0 4px" }}>
                    <svg width="100%" height="100%" viewBox={`0 0 ${years * 10} 180`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
                      {/* Contributed area (lower) */}
                      <polyline
                        points={projection.map((p, i) => `${i * 10},${180 - (p.contributed / maxBalance) * 170}`).join(" ")}
                        fill="none" stroke="#7a8fa8" strokeWidth="1.5" strokeDasharray="3,3"
                      />
                      {/* Balance area (upper, with fill) */}
                      <polygon
                        points={[
                          ...projection.map((p, i) => `${i * 10},${180 - (p.balance / maxBalance) * 170}`),
                          `${years * 10},180`, `0,180`,
                        ].join(" ")}
                        fill="rgba(184,150,46,0.15)"
                      />
                      <polyline
                        points={projection.map((p, i) => `${i * 10},${180 - (p.balance / maxBalance) * 170}`).join(" ")}
                        fill="none" stroke="#b8962e" strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10px", color: "#888" }}>
                    <span>Age {age}</span>
                    <span>Age {age + Math.round(years / 2)}</span>
                    <span>Age {retirementAge}</span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#555" }}>
                      <div style={{ width: 12, height: 2, background: "#b8962e" }}/>Total Balance
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#555" }}>
                      <div style={{ width: 12, height: 0, borderTop: "1.5px dashed #7a8fa8" }}/>Contributions Only
                    </div>
                  </div>
                </div>

                {/* What if more */}
                <div style={{ background: "rgba(184,150,46,0.08)", border: "1.5px solid #b8962e", borderRadius: "10px", padding: "14px 16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#b8962e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                    What if you contribute $100/mo more?
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      An extra $100/mo ($1,200/yr) for {years} years grows to:
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#1a2e4a" }}>+{fmt(boostBenefit)}</div>
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "6px" }}>
                    New total at retirement: {fmt(boostedBalance)}
                  </div>
                </div>

                <div style={{ background: "#f5f3ee", borderRadius: "10px", padding: "12px 14px", fontSize: "11px", color: "#666", lineHeight: 1.6 }}>
                  <strong style={{ color: "#1a2e4a" }}>4% rule:</strong> The classic safe withdrawal rate suggests you can withdraw 4% of your retirement portfolio in year one (then adjust for inflation) with low risk of running out of money over a 30-year retirement.
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a href={buildPortalSaveUrl('retirement-projector', {
                    inputs: { age, retirementAge, currentBalance, annualContribution, employerMatch, returnRate, inflationRate, monthlySpendingNeed, ssMonthlyBenefit, ssClaimAge },
                    outputs: { futureBalance, realValue, totalContributed, totalGrowth, monthlyIncome: totalMonthlyIncome, monthlyShortfall, hasShortfall },
                  })} style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Save &amp; track over time
                  </a>
                  <Link href="/booking" style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Discuss my plan →
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
              <strong>For high-level estimation only.</strong> Projections assume constant return and contribution rates and do not account for market volatility, sequence-of-returns risk, fees, or taxes on withdrawals. Past performance does not guarantee future results. SureEdge Tax &amp; Accounting is <strong>not liable</strong> for any decisions based on these projections.
            </p>
          </div>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>Want a tax-efficient retirement plan?</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our CPA &amp; EA team helps you optimize Roth conversions, tax loss harvesting, and withdrawal sequencing.</div>
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
