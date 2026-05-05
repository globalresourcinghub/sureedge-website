// Shared tax data for all /tools/ calculators.
// Sources: IRS Rev. Proc. 2025-38 (brackets), IRS Notice 2025-67 (retirement limits),
// SSA Press Release Oct 2025 (wage base).

export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";
export type TaxYear = 2025 | 2026;

export interface Bracket { rate: number; min: number; max: number }

export interface RothPhaseOut {
  start: number;
  end:   number;
}

export interface YearData {
  brackets:     Record<FilingStatus, Bracket[]>;
  stdDeduction: Record<FilingStatus, number>;
  limits: {
    k401Base:         number;
    k401Catchup:      number;  // age 50-59 & 64+ TOTAL incl. base
    k401SuperCatchup: number;  // age 60-63 TOTAL incl. base (SECURE 2.0)
    iraBase:          number;
    iraCatchup:       number;  // age 50+ TOTAL incl. base
    hsaSingle:        number;
    hsaFamily:        number;
    hsaCatchupAdd:    number;  // age 55+ add-on
    ssWageBase:       number;  // Social Security taxable wage base
    ssRate:           number;  // 6.2% employee + 6.2% employer = 12.4% SE
    medicareRate:     number;  // 1.45% × 2 = 2.9% SE
    addlMedicareRate: number;  // 0.9%
    seDeductFactor:   number;  // 0.9235 — net earnings = SE × 0.9235
  };
  rothPhaseOut: Record<FilingStatus, RothPhaseOut>;
  // Traditional IRA deductibility phase-outs when COVERED by workplace plan
  iraDeductPhaseOut: Record<FilingStatus, RothPhaseOut>;
}

export const TAX_YEARS: Record<TaxYear, YearData> = {
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
      hsaSingle: 4300, hsaFamily: 8550, hsaCatchupAdd: 1000,
      ssWageBase: 176100, ssRate: 0.124, medicareRate: 0.029, addlMedicareRate: 0.009,
      seDeductFactor: 0.9235,
    },
    rothPhaseOut: {
      single: { start: 150000, end: 165000 },
      hoh:    { start: 150000, end: 165000 },
      mfj:    { start: 236000, end: 246000 },
      mfs:    { start: 0,      end: 10000  },
    },
    iraDeductPhaseOut: {
      single: { start: 79000,  end: 89000  },
      hoh:    { start: 79000,  end: 89000  },
      mfj:    { start: 126000, end: 146000 },
      mfs:    { start: 0,      end: 10000  },
    },
  },
  2026: {
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
      hsaSingle: 4400, hsaFamily: 8750, hsaCatchupAdd: 1000,
      ssWageBase: 184500, ssRate: 0.124, medicareRate: 0.029, addlMedicareRate: 0.009,
      seDeductFactor: 0.9235,
    },
    rothPhaseOut: {
      single: { start: 153000, end: 168000 },
      hoh:    { start: 153000, end: 168000 },
      mfj:    { start: 242000, end: 252000 },
      mfs:    { start: 0,      end: 10000  },
    },
    iraDeductPhaseOut: {
      // 2026 figures per IRS Notice 2025-67
      single: { start: 81000,  end: 91000  },
      hoh:    { start: 81000,  end: 91000  },
      mfj:    { start: 129000, end: 149000 },
      mfs:    { start: 0,      end: 10000  },
    },
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────
export function fmt(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function fmtCents(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function pct(n: number): string {
  return (n * 100).toFixed(0) + "%";
}

export function fmtRange(min: number, max: number): string {
  return max === Infinity ? `${fmt(min)}+` : `${fmt(min)} – ${fmt(max)}`;
}

export interface BracketResult extends Bracket {
  taxableInRange: number;
  taxInBracket:   number;
  isActive:       boolean;
}

export function computeTax(taxableIncome: number, brackets: Bracket[]): { totalTax: number; marginalRate: number; results: BracketResult[] } {
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

export function getMarginalRate(taxableIncome: number, brackets: Bracket[]): number {
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (taxableIncome > brackets[i].min) return brackets[i].rate;
  }
  return brackets[0].rate;
}

export function get401kMax(age: number, limits: YearData["limits"]): number {
  if (age >= 60 && age <= 63) return limits.k401SuperCatchup;
  if (age >= 50)              return limits.k401Catchup;
  return limits.k401Base;
}

export function getIraMax(age: number, limits: YearData["limits"]): number {
  return age >= 50 ? limits.iraCatchup : limits.iraBase;
}

export function getHsaMax(age: number, coverage: "single" | "family", limits: YearData["limits"]): number {
  const base = coverage === "family" ? limits.hsaFamily : limits.hsaSingle;
  return base + (age >= 55 ? limits.hsaCatchupAdd : 0);
}

// Self-employment tax: returns total SE tax + half deductible
export function computeSeTax(seIncome: number, otherWages: number, filing: FilingStatus, limits: YearData["limits"]): {
  netSeEarnings: number;
  ssTax: number;
  medicareTax: number;
  addlMedicareTax: number;
  totalSeTax: number;
  halfDeductible: number;
} {
  const netSeEarnings = Math.max(0, seIncome * limits.seDeductFactor);
  // SS portion: subject to wage base, reduced by other W-2 wages already taxed for SS
  const ssBaseRemaining = Math.max(0, limits.ssWageBase - Math.min(otherWages, limits.ssWageBase));
  const ssTax = Math.min(netSeEarnings, ssBaseRemaining) * limits.ssRate;
  // Medicare portion: no cap
  const medicareTax = netSeEarnings * limits.medicareRate;
  // Additional 0.9% Medicare over threshold (combined wages + SE)
  const addlThreshold = filing === "mfj" ? 250000 : (filing === "mfs" ? 125000 : 200000);
  const combinedEarnings = otherWages + netSeEarnings;
  const addlMedicareTax = Math.max(0, combinedEarnings - addlThreshold) * limits.addlMedicareRate;
  const totalSeTax = ssTax + medicareTax + addlMedicareTax;
  const halfDeductible = (ssTax + medicareTax) / 2; // additional Medicare not deductible
  return { netSeEarnings, ssTax, medicareTax, addlMedicareTax, totalSeTax, halfDeductible };
}

// Future value with annual contributions made at the end of each year
export function fvWithContrib(initial: number, annualContrib: number, ratePct: number, years: number): number {
  const r = ratePct / 100;
  if (r === 0) return initial + annualContrib * years;
  const fvInitial = initial * Math.pow(1 + r, years);
  const fvContribs = annualContrib * (Math.pow(1 + r, years) - 1) / r;
  return fvInitial + fvContribs;
}

export function fv(pv: number, ratePct: number, years: number): number {
  return pv * Math.pow(1 + ratePct / 100, years);
}

// ── State tax (simplified flat rates) ──────────────────────────────────────
// Using top marginal rate or single flat rate. For high earners this approximates
// well; for low earners these can overstate state tax. Users can override.
// Sources: state DOR sites + Tax Foundation, 2025 figures.
export interface StateInfo {
  code: string;
  name: string;
  rate: number;  // percent, e.g., 5.0 = 5%
  type: "flat" | "top" | "none";
}

export const US_STATES: StateInfo[] = [
  { code: "AL", name: "Alabama",       rate: 5.0,  type: "top"  },
  { code: "AK", name: "Alaska",        rate: 0,    type: "none" },
  { code: "AZ", name: "Arizona",       rate: 2.5,  type: "flat" },
  { code: "AR", name: "Arkansas",      rate: 4.4,  type: "top"  },
  { code: "CA", name: "California",    rate: 9.3,  type: "top"  },
  { code: "CO", name: "Colorado",      rate: 4.4,  type: "flat" },
  { code: "CT", name: "Connecticut",   rate: 6.99, type: "top"  },
  { code: "DE", name: "Delaware",      rate: 6.6,  type: "top"  },
  { code: "DC", name: "D.C.",          rate: 9.75, type: "top"  },
  { code: "FL", name: "Florida",       rate: 0,    type: "none" },
  { code: "GA", name: "Georgia",       rate: 5.39, type: "flat" },
  { code: "HI", name: "Hawaii",        rate: 11.0, type: "top"  },
  { code: "ID", name: "Idaho",         rate: 5.8,  type: "flat" },
  { code: "IL", name: "Illinois",      rate: 4.95, type: "flat" },
  { code: "IN", name: "Indiana",       rate: 3.0,  type: "flat" },
  { code: "IA", name: "Iowa",          rate: 3.8,  type: "flat" },
  { code: "KS", name: "Kansas",        rate: 5.7,  type: "top"  },
  { code: "KY", name: "Kentucky",      rate: 4.0,  type: "flat" },
  { code: "LA", name: "Louisiana",     rate: 3.0,  type: "flat" },
  { code: "ME", name: "Maine",         rate: 7.15, type: "top"  },
  { code: "MD", name: "Maryland",      rate: 5.75, type: "top"  },
  { code: "MA", name: "Massachusetts", rate: 5.0,  type: "flat" },
  { code: "MI", name: "Michigan",      rate: 4.25, type: "flat" },
  { code: "MN", name: "Minnesota",     rate: 9.85, type: "top"  },
  { code: "MS", name: "Mississippi",   rate: 4.4,  type: "flat" },
  { code: "MO", name: "Missouri",      rate: 4.7,  type: "top"  },
  { code: "MT", name: "Montana",       rate: 5.9,  type: "top"  },
  { code: "NE", name: "Nebraska",      rate: 5.2,  type: "top"  },
  { code: "NV", name: "Nevada",        rate: 0,    type: "none" },
  { code: "NH", name: "New Hampshire", rate: 0,    type: "none" },
  { code: "NJ", name: "New Jersey",    rate: 8.97, type: "top"  },
  { code: "NM", name: "New Mexico",    rate: 5.9,  type: "top"  },
  { code: "NY", name: "New York",      rate: 6.85, type: "top"  },
  { code: "NC", name: "North Carolina", rate: 4.5, type: "flat" },
  { code: "ND", name: "North Dakota",  rate: 2.5,  type: "top"  },
  { code: "OH", name: "Ohio",          rate: 3.5,  type: "top"  },
  { code: "OK", name: "Oklahoma",      rate: 4.75, type: "top"  },
  { code: "OR", name: "Oregon",        rate: 9.9,  type: "top"  },
  { code: "PA", name: "Pennsylvania",  rate: 3.07, type: "flat" },
  { code: "RI", name: "Rhode Island",  rate: 5.99, type: "top"  },
  { code: "SC", name: "South Carolina", rate: 6.2, type: "top"  },
  { code: "SD", name: "South Dakota",  rate: 0,    type: "none" },
  { code: "TN", name: "Tennessee",     rate: 0,    type: "none" },
  { code: "TX", name: "Texas",         rate: 0,    type: "none" },
  { code: "UT", name: "Utah",          rate: 4.55, type: "flat" },
  { code: "VT", name: "Vermont",       rate: 8.75, type: "top"  },
  { code: "VA", name: "Virginia",      rate: 5.75, type: "top"  },
  { code: "WA", name: "Washington",    rate: 0,    type: "none" },
  { code: "WV", name: "West Virginia", rate: 4.82, type: "top"  },
  { code: "WI", name: "Wisconsin",     rate: 5.3,  type: "top"  },
  { code: "WY", name: "Wyoming",       rate: 0,    type: "none" },
];

export function getStateRate(code: string): number {
  return US_STATES.find(s => s.code === code)?.rate ?? 0;
}

// Build the "Save & track over time" portal URL with the calculation payload
// base64-encoded into the URL hash. The portal /tools page reads the hash and
// auto-saves the calculation after the user signs in / registers.
//
// Format: https://portal.sureedgetax.com/register?source=tool&tool=<slug>#<base64-json>
//   payload = { toolSlug, inputs, outputs, taxYear?, label? }
export function buildPortalSaveUrl(toolSlug: string, payload: { inputs: unknown; outputs: unknown; taxYear?: number; label?: string }): string {
  const body = { toolSlug, ...payload };
  let hash = "";
  try {
    const json = JSON.stringify(body);
    // btoa is safe here — JSON contains no chars outside Latin-1 unless someone names
    // their label with emoji. encodeURIComponent → unescape avoids that edge case.
    hash = btoa(unescape(encodeURIComponent(json)));
  } catch { hash = ""; }
  const base = `https://portal.sureedgetax.com/register?source=tool&tool=${encodeURIComponent(toolSlug)}`;
  return hash ? `${base}#${hash}` : base;
}

// FICA: Social Security 6.2% + Medicare 1.45% = 7.65% (employee side)
// SS is capped at the wage base; Medicare has no cap; +0.9% over thresholds.
export function computeFica(wages: number, filing: FilingStatus, limits: YearData["limits"]): {
  socialSecurity: number;
  medicare: number;
  addlMedicare: number;
  total: number;
} {
  const socialSecurity = Math.min(wages, limits.ssWageBase) * (limits.ssRate / 2); // 6.2% employee
  const medicare = wages * (limits.medicareRate / 2); // 1.45% employee
  const addlThreshold = filing === "mfj" ? 250000 : (filing === "mfs" ? 125000 : 200000);
  const addlMedicare = Math.max(0, wages - addlThreshold) * limits.addlMedicareRate;
  return { socialSecurity, medicare, addlMedicare, total: socialSecurity + medicare + addlMedicare };
}
