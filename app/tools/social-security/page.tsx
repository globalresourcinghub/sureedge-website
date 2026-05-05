"use client";

import { useState } from "react";
import Link from "next/link";
import { fmt, buildPortalSaveUrl } from "@/lib/tax-data";

// SSA reduction/credit factors. FRA depends on birth year.
// For people born 1960 or later, FRA = 67.
function getFRA(birthYear: number): number {
  if (birthYear <= 1937) return 65;
  if (birthYear <= 1942) return 65 + (birthYear - 1937) * 2 / 12; // approximate
  if (birthYear <= 1954) return 66;
  if (birthYear <= 1959) return 66 + (birthYear - 1954) * 2 / 12;
  return 67;
}

// SSA reduction formula: first 36 months = 5/9 of 1% per month, beyond = 5/12 of 1% per month.
function reductionFactor(monthsEarly: number): number {
  const months1 = Math.min(monthsEarly, 36);
  const months2 = Math.max(monthsEarly - 36, 0);
  const reduction = (5 / 9 / 100) * months1 + (5 / 12 / 100) * months2;
  return 1 - reduction;
}

// Delayed Retirement Credit: 8% per year (2/3% per month) for those born 1943+.
function delayedCreditFactor(monthsLate: number): number {
  return 1 + (8 / 12 / 100) * monthsLate;
}

function benefitAtAge(claimAge: number, fra: number, fraBenefit: number): number {
  if (claimAge < 62) return 0;
  const ageDiff = claimAge - fra;
  if (ageDiff < 0) {
    return fraBenefit * reductionFactor(Math.round(-ageDiff * 12));
  } else if (ageDiff > 0) {
    return fraBenefit * delayedCreditFactor(Math.round(ageDiff * 12));
  }
  return fraBenefit;
}

export default function SocialSecurityPage() {
  const [birthYear, setBirthYear] = useState(1965);
  const [fraBenefit, setFraBenefit] = useState(2500);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [colaRate, setColaRate] = useState(2.5);
  const [calcCount, setCalcCount] = useState(0);
  const [consented, setConsented] = useState(false);
  const calculated = calcCount > 0;

  const fra = getFRA(birthYear);
  const currentAge = 2026 - birthYear;

  // Three strategies: 62, FRA, 70
  const strategies = [
    { age: 62,         label: "Claim at 62 (early)" },
    { age: Math.round(fra), label: `Claim at ${Math.round(fra)} (FRA)` },
    { age: 70,         label: "Claim at 70 (max)" },
  ];

  // Build cumulative benefits by age, with COLA growth
  const ages: number[] = [];
  for (let a = 62; a <= 100; a++) ages.push(a);

  const cumulativeByAge = strategies.map(strat => {
    const startAge = strat.age;
    const monthlyAtClaim = benefitAtAge(strat.age, fra, fraBenefit);
    let cumulative = 0;
    return ages.map(age => {
      if (age < startAge) {
        return { age, cumulative: 0, monthly: 0 };
      }
      const yearsClaimed = age - startAge;
      // COLA grows the benefit. Approximate: monthly at claim × (1+cola)^(years claimed)
      const inflationAdjustedMonthly = monthlyAtClaim * Math.pow(1 + colaRate / 100, yearsClaimed);
      cumulative += inflationAdjustedMonthly * 12;
      return { age, cumulative, monthly: inflationAdjustedMonthly };
    });
  });

  // Find breakeven ages (where strategy B passes strategy A in cumulative total)
  function findBreakeven(idxA: number, idxB: number): number | null {
    // idxB claims later, so starts behind. Find age where cumulativeB > cumulativeA.
    for (let i = 0; i < ages.length; i++) {
      if (cumulativeByAge[idxB][i].cumulative > cumulativeByAge[idxA][i].cumulative) {
        return ages[i];
      }
    }
    return null;
  }
  const breakeven62vsFra = findBreakeven(0, 1);
  const breakevenFraVs70 = findBreakeven(1, 2);
  const breakeven62vs70 = findBreakeven(0, 2);

  // Total at life expectancy
  const totalAtLE = strategies.map((_, idx) => {
    const point = cumulativeByAge[idx].find(p => p.age === lifeExpectancy);
    return point?.cumulative ?? 0;
  });
  const winnerIdx = totalAtLE.indexOf(Math.max(...totalAtLE));

  // Chart max value
  const chartMax = Math.max(...cumulativeByAge.flatMap(arr => arr.map(p => p.cumulative)));

  const inputStyle: React.CSSProperties = { padding: "9px 12px", border: "1px solid #e0ddd6", borderRadius: "7px", fontSize: "13px", width: "100%", background: "#fff", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "5px", display: "block" };
  const moneyInput = (value: number, max: number, onChange: (v: number) => void) => (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
      <input type="number" min={0} max={max} value={value} onChange={e => onChange(Math.min(Number(e.target.value), max))} style={{ ...inputStyle, paddingLeft: "24px" }}/>
    </div>
  );

  const STRATEGY_COLORS = ["#c0392b", "#1a2e4a", "#27ae60"];

  return (
    <>
      <section style={{ background: "#1a2e4a", padding: "40px 44px 36px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "14px" }}>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Free Tools</Link>
          {" / "}
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Social Security Breakeven</span>
        </div>
        <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: "10px" }}>
          Social Security Breakeven Calculator
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          When does waiting until 70 beat claiming at 62? Find your breakeven ages and see which strategy wins given your life expectancy.
        </p>
      </section>

      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #f0ede6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1a2e4a", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #f0ede6" }}>
              Your Information
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Birth Year</label>
                <input type="number" min={1937} max={2008} value={birthYear} onChange={e => setBirthYear(Number(e.target.value))} style={inputStyle} />
                <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>
                  Your Full Retirement Age (FRA): {fra.toFixed(fra % 1 === 0 ? 0 : 1)} · Currently {currentAge} years old
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>Estimated Monthly Benefit at FRA</label>
                {moneyInput(fraBenefit, 5000, setFraBenefit)}
                <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>
                  Find this on your <a href="https://ssa.gov/myaccount" target="_blank" rel="noopener" style={{ color: "#b8962e" }}>ssa.gov/myaccount</a> statement
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Life Expectancy</label>
                  <input type="number" min={70} max={100} value={lifeExpectancy} onChange={e => setLifeExpectancy(Number(e.target.value))} style={inputStyle} />
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>SSA avg ~85</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>COLA (%)</label>
                  <input type="number" min={0} max={10} step={0.1} value={colaRate} onChange={e => setColaRate(Number(e.target.value))} style={inputStyle} />
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px" }}>Long-term avg ~2.5%</span>
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "4px" }}>
                <input type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)} style={{ marginTop: "2px", accentColor: "#b8962e", flexShrink: 0, width: "15px", height: "15px" }}/>
                <span style={{ fontSize: "11px", color: "#777", lineHeight: 1.6 }}>
                  I understand these results are for <strong>high-level estimation only</strong> and SureEdge is not liable for decisions based on these calculations.{" "}
                  <a href="/privacy" style={{ color: "#b8962e", textDecoration: "underline" }}>Privacy</a>
                </span>
              </label>

              <button onClick={() => setCalcCount(c => c + 1)} disabled={!consented}
                style={{ background: consented ? "#b8962e" : "#d5c9b0", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: consented ? "pointer" : "not-allowed", marginTop: "4px" }}>
                Find My Breakeven →
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {!calculated ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "40px 28px", border: "1px solid #f0ede6", textAlign: "center", color: "#aaa" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "12px", opacity: 0.4 }}>
                  <circle cx="12" cy="12" r="9" stroke="#1a2e4a" strokeWidth="1.5"/>
                  <path d="M12 6v6l4 2" stroke="#1a2e4a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p style={{ fontSize: "13px" }}>Enter your details and click <strong>Find My Breakeven</strong>.</p>
              </div>
            ) : (
              <>
                {/* Winner banner */}
                <div style={{ background: "#1a2e4a", borderRadius: "12px", padding: "20px 22px", color: "#fff" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
                    Best Strategy if you live to {lifeExpectancy}
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#b8962e", marginBottom: "4px" }}>
                    {strategies[winnerIdx].label}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
                    Lifetime total: {fmt(totalAtLE[winnerIdx])} (vs {fmt(totalAtLE[winnerIdx === 0 ? 1 : 0])} alternative)
                  </div>
                </div>

                {/* Strategy comparison cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {strategies.map((strat, i) => {
                    const monthly = benefitAtAge(strat.age, fra, fraBenefit);
                    return (
                      <div key={i} style={{ background: "#fff", borderRadius: "10px", padding: "14px", border: `1.5px solid ${i === winnerIdx ? "#b8962e" : "#f0ede6"}`, textAlign: "center" }}>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: STRATEGY_COLORS[i], textTransform: "uppercase", letterSpacing: "0.6px" }}>Age {strat.age}</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#1a2e4a", marginTop: "4px" }}>{fmt(monthly)}/mo</div>
                        <div style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>
                          {((monthly / fraBenefit) * 100).toFixed(0)}% of FRA
                        </div>
                        <div style={{ fontSize: "11px", fontWeight: 600, color: "#b8962e", marginTop: "8px" }}>{fmt(totalAtLE[i])}</div>
                        <div style={{ fontSize: "9px", color: "#aaa" }}>by age {lifeExpectancy}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Breakeven analysis */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Breakeven Ages</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
                    <BreakevenRow
                      label={`Wait until ${Math.round(fra)} (FRA) instead of 62`}
                      age={breakeven62vsFra}
                    />
                    <BreakevenRow
                      label={`Wait until 70 instead of ${Math.round(fra)} (FRA)`}
                      age={breakevenFraVs70}
                    />
                    <BreakevenRow
                      label="Wait until 70 instead of 62"
                      age={breakeven62vs70}
                    />
                  </div>
                </div>

                {/* Cumulative chart */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>Cumulative Lifetime Benefits</div>
                  <div style={{ position: "relative", height: "200px", padding: "0 4px" }}>
                    <svg width="100%" height="100%" viewBox={`0 0 ${ages.length * 10} 200`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
                      {/* Life expectancy marker */}
                      <line
                        x1={(lifeExpectancy - 62) * 10} y1="0"
                        x2={(lifeExpectancy - 62) * 10} y2="200"
                        stroke="#aaa" strokeWidth="1" strokeDasharray="3,3"
                      />
                      {/* Strategy lines */}
                      {cumulativeByAge.map((arr, i) => (
                        <polyline key={i}
                          points={arr.map((p, j) => `${j * 10},${200 - (p.cumulative / chartMax) * 190}`).join(" ")}
                          fill="none" stroke={STRATEGY_COLORS[i]} strokeWidth="2"
                        />
                      ))}
                    </svg>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10px", color: "#888" }}>
                    <span>62</span><span>70</span><span>80</span><span>90</span><span>100</span>
                  </div>
                  <div style={{ display: "flex", gap: "14px", marginTop: "12px", flexWrap: "wrap" }}>
                    {strategies.map((s, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#555" }}>
                        <div style={{ width: 12, height: 2, background: STRATEGY_COLORS[i] }}/>{s.label}
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#888" }}>
                      <div style={{ width: 12, height: 0, borderTop: "1px dashed #aaa" }}/>Life expectancy ({lifeExpectancy})
                    </div>
                  </div>
                </div>

                <div style={{ background: "#f5f3ee", borderRadius: "10px", padding: "12px 14px", fontSize: "11px", color: "#666", lineHeight: 1.6 }}>
                  <strong style={{ color: "#1a2e4a" }}>Note:</strong> Other factors matter too — current health, spouse&apos;s benefit, work income (earnings test before FRA), and tax situation. This is the pure breakeven math; a real claiming strategy considers more.
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a href={buildPortalSaveUrl('social-security', {
                    inputs: { birthYear, fraBenefit, lifeExpectancy, colaRate },
                    outputs: { bestStrategy: strategies[winnerIdx].age, fra, totalAtLE: totalAtLE[winnerIdx], breakeven62vsFra, breakevenFraVs70, breakeven62vs70 },
                  })} style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Save &amp; track over time
                  </a>
                  <Link href="/booking" style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Plan my claim →
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
              <strong>For high-level estimation only.</strong> This calculator does not factor in spousal/survivor benefits, the earnings test (claiming before FRA while still working), taxation of benefits, or Medicare premium impacts. Real Social Security strategy benefits from professional review. SureEdge Tax &amp; Accounting is <strong>not liable</strong> for decisions made based on these results.
            </p>
          </div>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>Want a real claiming strategy?</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our team weighs taxation of benefits, IRMAA, and Roth conversion timing alongside the breakeven math.</div>
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

function BreakevenRow({ label, age }: { label: string; age: number | null }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f3ee", alignItems: "center" }}>
      <span style={{ color: "#555" }}>{label}</span>
      <span style={{ fontWeight: 700, color: age === null ? "#888" : "#b8962e" }}>
        {age === null ? "Never breaks even" : `Age ${age}`}
      </span>
    </div>
  );
}
