"use client";

import { useState } from "react";
import Link from "next/link";
import { fmt, buildPortalSaveUrl } from "@/lib/tax-data";

interface LineItem { key: string; label: string; value: number }

// Age-based net worth benchmarks (rough — based on Federal Reserve SCF medians)
function netWorthBenchmark(age: number): { median: number; top25: number } {
  if (age < 35)  return { median: 39000,  top25: 142000 };
  if (age < 45)  return { median: 135000, top25: 436000 };
  if (age < 55)  return { median: 247000, top25: 833000 };
  if (age < 65)  return { median: 364000, top25: 1175000 };
  if (age < 75)  return { median: 410000, top25: 1300000 };
  return { median: 335000, top25: 1100000 };
}

const ASSET_COLORS: Record<string, string> = {
  cash: "#27ae60", retirement: "#1a2e4a", taxable: "#5a7a52",
  realEstate: "#b8962e", vehicles: "#7a8fa8", otherAsset: "#888",
};
const LIABILITY_COLORS: Record<string, string> = {
  mortgage: "#1a2e4a", auto: "#7a8fa8", student: "#5a7a52",
  creditCard: "#c0392b", otherLiability: "#888",
};

export default function NetWorthPage() {
  const [age, setAge] = useState(40);
  const [cash, setCash] = useState(15000);
  const [retirement, setRetirement] = useState(120000);
  const [taxable, setTaxable] = useState(25000);
  const [realEstate, setRealEstate] = useState(350000);
  const [vehicles, setVehicles] = useState(20000);
  const [otherAsset, setOtherAsset] = useState(0);
  const [mortgage, setMortgage] = useState(220000);
  const [auto, setAuto] = useState(8000);
  const [student, setStudent] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [otherLiability, setOtherLiability] = useState(0);
  const [calcCount, setCalcCount] = useState(0);
  const [consented, setConsented] = useState(false);
  const calculated = calcCount > 0;

  const assets: LineItem[] = [
    { key: "cash",       label: "Cash & Savings",       value: cash },
    { key: "retirement", label: "Retirement Accounts",  value: retirement },
    { key: "taxable",    label: "Taxable Investments",  value: taxable },
    { key: "realEstate", label: "Real Estate",          value: realEstate },
    { key: "vehicles",   label: "Vehicles",             value: vehicles },
    { key: "otherAsset", label: "Other Assets",         value: otherAsset },
  ];
  const liabilities: LineItem[] = [
    { key: "mortgage",       label: "Mortgage",         value: mortgage },
    { key: "auto",           label: "Auto Loans",       value: auto },
    { key: "student",        label: "Student Loans",    value: student },
    { key: "creditCard",     label: "Credit Card Debt", value: creditCard },
    { key: "otherLiability", label: "Other Debt",       value: otherLiability },
  ];

  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  const homeEquity = realEstate - mortgage;
  const liquidNetWorth = netWorth - Math.max(0, homeEquity); // excludes home equity

  const benchmark = netWorthBenchmark(age);
  const vsMedian = netWorth - benchmark.median;
  const vsTop25 = netWorth - benchmark.top25;

  const inputStyle: React.CSSProperties = { padding: "8px 12px", border: "1px solid #e0ddd6", borderRadius: "6px", fontSize: "13px", width: "100%", background: "#fff", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { fontSize: "11px", fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "5px", display: "block" };
  const moneyInput = (value: number, max: number, onChange: (v: number) => void) => (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#888" }}>$</span>
      <input type="number" min={0} max={max} value={value} onChange={e => onChange(Math.min(Number(e.target.value), max))} style={{ ...inputStyle, paddingLeft: "24px" }}/>
    </div>
  );

  // Donut chart helper
  function Donut({ items, colors, total }: { items: LineItem[]; colors: Record<string, string>; total: number }) {
    if (total === 0) return null;
    let cumulativeAngle = -90; // start at top
    const radius = 35;
    const innerRadius = 20;
    const cx = 50, cy = 50;
    return (
      <svg viewBox="0 0 100 100" style={{ width: "100%", maxWidth: "150px" }}>
        {items.filter(i => i.value > 0).map(item => {
          const angle = (item.value / total) * 360;
          const startAngle = cumulativeAngle * (Math.PI / 180);
          const endAngle = (cumulativeAngle + angle) * (Math.PI / 180);
          const x1 = cx + radius * Math.cos(startAngle);
          const y1 = cy + radius * Math.sin(startAngle);
          const x2 = cx + radius * Math.cos(endAngle);
          const y2 = cy + radius * Math.sin(endAngle);
          const x3 = cx + innerRadius * Math.cos(endAngle);
          const y3 = cy + innerRadius * Math.sin(endAngle);
          const x4 = cx + innerRadius * Math.cos(startAngle);
          const y4 = cy + innerRadius * Math.sin(startAngle);
          const largeArc = angle > 180 ? 1 : 0;
          const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
          cumulativeAngle += angle;
          return <path key={item.key} d={path} fill={colors[item.key]}/>;
        })}
      </svg>
    );
  }

  return (
    <>
      <section style={{ background: "#1a2e4a", padding: "40px 44px 36px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "14px" }}>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Free Tools</Link>
          {" / "}
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Net Worth Tracker</span>
        </div>
        <h1 style={{ fontSize: "clamp(22px,2.8vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.4px", marginBottom: "10px" }}>
          Net Worth Tracker
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", lineHeight: 1.7 }}>
          Add up your assets and debts to see your net worth, asset allocation, and how you compare to others your age.
        </p>
      </section>

      <section style={{ padding: "40px 44px", background: "#faf9f6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "28px", maxWidth: "1000px", alignItems: "start" }}>

          <div style={{ background: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #f0ede6", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

            <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f0ede6" }}>
              <label style={labelStyle}>Your Age</label>
              <input type="number" min={18} max={100} value={age} onChange={e => setAge(Number(e.target.value))} style={inputStyle} />
              <span style={{ fontSize: "10px", color: "#aaa", marginTop: "3px", display: "block" }}>Used to compare against age-group benchmarks</span>
            </div>

            <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>
              Assets <span style={{ fontSize: "10px", color: "#27ae60", fontWeight: 700 }}>+ {fmt(totalAssets)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {[
                { value: cash,       set: setCash,       label: "Cash & Savings",       hint: "Checking, savings, money market" },
                { value: retirement, set: setRetirement, label: "Retirement Accounts",  hint: "401(k), IRA, Roth, pensions" },
                { value: taxable,    set: setTaxable,    label: "Taxable Investments",  hint: "Brokerage, individual stocks" },
                { value: realEstate, set: setRealEstate, label: "Real Estate (current value)", hint: "Home, rentals, land" },
                { value: vehicles,   set: setVehicles,   label: "Vehicles (current value)",     hint: "Cars, RVs, boats" },
                { value: otherAsset, set: setOtherAsset, label: "Other Assets",         hint: "Crypto, collectibles, business equity" },
              ].map(f => (
                <div key={f.label} style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ ...labelStyle, fontSize: "10px" }}>{f.label}</label>
                  {moneyInput(f.value, 100000000, f.set)}
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #f0ede6", paddingTop: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a2e4a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>
                Liabilities <span style={{ fontSize: "10px", color: "#c0392b", fontWeight: 700 }}>− {fmt(totalLiabilities)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { value: mortgage,       set: setMortgage,       label: "Mortgage Balance" },
                  { value: auto,           set: setAuto,           label: "Auto Loans" },
                  { value: student,        set: setStudent,        label: "Student Loans" },
                  { value: creditCard,     set: setCreditCard,     label: "Credit Card Debt" },
                  { value: otherLiability, set: setOtherLiability, label: "Other Debt" },
                ].map(f => (
                  <div key={f.label} style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ ...labelStyle, fontSize: "10px" }}>{f.label}</label>
                    {moneyInput(f.value, 50000000, f.set)}
                  </div>
                ))}
              </div>
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", marginTop: "20px" }}>
              <input type="checkbox" checked={consented} onChange={e => setConsented(e.target.checked)} style={{ marginTop: "2px", accentColor: "#b8962e", flexShrink: 0, width: "15px", height: "15px" }}/>
              <span style={{ fontSize: "11px", color: "#777", lineHeight: 1.6 }}>
                I understand this is a snapshot estimate only. SureEdge is not liable for decisions based on these calculations.{" "}
                <a href="/privacy" style={{ color: "#b8962e", textDecoration: "underline" }}>Privacy</a>
              </span>
            </label>

            <button onClick={() => setCalcCount(c => c + 1)} disabled={!consented}
              style={{ width: "100%", background: consented ? "#b8962e" : "#d5c9b0", color: "#fff", border: "none", borderRadius: "8px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: consented ? "pointer" : "not-allowed", marginTop: "12px" }}>
              Calculate Net Worth →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {!calculated ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "40px 28px", border: "1px solid #f0ede6", textAlign: "center", color: "#aaa" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "12px", opacity: 0.4 }}>
                  <rect x="2" y="7" width="5" height="14" rx="1" stroke="#1a2e4a" strokeWidth="1.5"/>
                  <rect x="9.5" y="3" width="5" height="18" rx="1" stroke="#1a2e4a" strokeWidth="1.5"/>
                  <rect x="17" y="10" width="5" height="11" rx="1" stroke="#1a2e4a" strokeWidth="1.5"/>
                </svg>
                <p style={{ fontSize: "13px" }}>Fill in your assets and debts, then click <strong>Calculate</strong>.</p>
              </div>
            ) : (
              <>
                {/* Hero net worth */}
                <div style={{ background: netWorth >= 0 ? "#1a2e4a" : "#7a2e22", borderRadius: "12px", padding: "24px", color: "#fff" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>Your Net Worth</div>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#b8962e", letterSpacing: "-0.5px", marginBottom: "4px" }}>{fmt(netWorth)}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
                    {fmt(totalAssets)} assets minus {fmt(totalLiabilities)} liabilities
                  </div>
                </div>

                {/* Benchmark comparison */}
                <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", border: "1px solid #f0ede6" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#1a2e4a", marginBottom: "14px" }}>
                    How You Compare (US households age {age < 35 ? "<35" : age < 45 ? "35-44" : age < 55 ? "45-54" : age < 65 ? "55-64" : age < 75 ? "65-74" : "75+"})
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div style={{ background: "#faf9f6", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#888", textTransform: "uppercase", letterSpacing: "0.6px" }}>Median</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginTop: "3px" }}>{fmt(benchmark.median)}</div>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: vsMedian >= 0 ? "#27ae60" : "#c0392b", marginTop: "4px" }}>
                        {vsMedian >= 0 ? "+" : ""}{fmt(vsMedian)}
                      </div>
                    </div>
                    <div style={{ background: "#faf9f6", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#888", textTransform: "uppercase", letterSpacing: "0.6px" }}>Top 25%</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginTop: "3px" }}>{fmt(benchmark.top25)}</div>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: vsTop25 >= 0 ? "#27ae60" : "#888", marginTop: "4px" }}>
                        {vsTop25 >= 0 ? "+" : ""}{fmt(vsTop25)}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: "10px", color: "#aaa", marginTop: "10px", textAlign: "center" }}>
                    Source: Federal Reserve Survey of Consumer Finances (approximate)
                  </div>
                </div>

                {/* Quick stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { label: "Liquid Net Worth", value: fmt(liquidNetWorth), sub: "ex-home equity" },
                    { label: "Home Equity",      value: fmt(homeEquity),     sub: realEstate > 0 ? `${(homeEquity / realEstate * 100).toFixed(0)}% of home` : "—" },
                    { label: "Debt-to-Asset",    value: totalAssets > 0 ? `${(totalLiabilities / totalAssets * 100).toFixed(0)}%` : "—", sub: "lower is better" },
                  ].map(c => (
                    <div key={c.label} style={{ background: "#fff", borderRadius: "10px", padding: "12px", border: "1px solid #f0ede6", textAlign: "center" }}>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a" }}>{c.value}</div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: "#b8962e", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "3px" }}>{c.label}</div>
                      <div style={{ fontSize: "9px", color: "#aaa", marginTop: "2px" }}>{c.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Asset & Liability donuts */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid #f0ede6" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#27ae60", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Assets</div>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                      <Donut items={assets} colors={ASSET_COLORS} total={totalAssets}/>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {assets.filter(a => a.value > 0).map(a => (
                        <div key={a.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "10px", color: "#555" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div style={{ width: 8, height: 8, borderRadius: "2px", background: ASSET_COLORS[a.key] }}/>{a.label}
                          </div>
                          <span style={{ color: "#888" }}>{((a.value / totalAssets) * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid #f0ede6" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#c0392b", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>Liabilities</div>
                    {totalLiabilities > 0 ? (
                      <>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                          <Donut items={liabilities} colors={LIABILITY_COLORS} total={totalLiabilities}/>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          {liabilities.filter(l => l.value > 0).map(l => (
                            <div key={l.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "10px", color: "#555" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div style={{ width: 8, height: 8, borderRadius: "2px", background: LIABILITY_COLORS[l.key] }}/>{l.label}
                              </div>
                              <span style={{ color: "#888" }}>{((l.value / totalLiabilities) * 100).toFixed(0)}%</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ textAlign: "center", padding: "20px 0", fontSize: "12px", color: "#27ae60" }}>
                        🎉 Debt-free!
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a href={buildPortalSaveUrl('net-worth', {
                    inputs: { age, cash, retirement, taxable, realEstate, vehicles, otherAsset, mortgage, auto, student, creditCard, otherLiability },
                    outputs: { netWorth, totalAssets, totalLiabilities, liquidNetWorth, homeEquity, vsMedian, vsTop25 },
                  })} style={{ flex: 1, background: "#b8962e", color: "#fff", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Save &amp; track over time
                  </a>
                  <Link href="/booking" style={{ flex: 1, background: "#fff", color: "#1a2e4a", border: "1.5px solid #1a2e4a", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Get a financial review →
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
              <strong>Snapshot estimate only.</strong> Net worth fluctuates with markets; real estate values are estimates; some assets (defined-benefit pensions, business interests) are hard to value. Benchmark figures are approximate medians from the Federal Reserve&apos;s Survey of Consumer Finances. SureEdge Tax &amp; Accounting is <strong>not liable</strong> for any decisions based on these calculations.
            </p>
          </div>
          <div style={{ background: "#faf9f6", borderRadius: "12px", padding: "24px 28px", border: "1px solid #f0ede6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a2e4a", marginBottom: "4px" }}>Want to grow your net worth tax-efficiently?</div>
              <div style={{ fontSize: "12px", color: "#666" }}>Our team finds tax savings that flow back into your portfolio year after year.</div>
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
