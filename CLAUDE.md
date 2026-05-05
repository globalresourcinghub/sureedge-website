# SureEdge Tax & Accounting — Marketing Website
# Claude Code Context File | Last updated: May 4, 2026 (later session)
# Place this file at: /Users/BG/github/sureedge/sureedge-website/CLAUDE.md

---

## Project Overview
- **Site:** https://sureedgetax.com
- **Type:** Marketing website for SureEdge Tax & Accounting (virtual tax services business; not a CPA firm — Strivix LLC is owned by a non-CPA, so all marketing uses person-centric "licensed CPA and EA on our team" language rather than firm-level claims)
- **Framework:** Next.js 16.2.2 + TypeScript (Turbopack)
- **Styling:** Inline styles only — no Tailwind
- **Deployment:** Vercel — auto-deploys on push to main (bizgales-projects/sureedge-website)
- **GitHub:** github.com/globalresourcinghub/sureedge-website
- **Local path:** /Users/BG/github/sureedge/sureedge-website

---

## Git Workflow
```bash
npx next build          # always run before pushing to catch errors
git add <files>
git commit -m "message"
```

### Pushing to GitHub
GitHub HTTPS does NOT accept tokens in the URL. Must use Base64 Authorization header:
```bash
git -c http.extraHeader="Authorization: Basic $(echo -n 'globalresourcinghub:TOKEN' | base64)" push origin main
```
Replace TOKEN with the current PAT from https://github.com/settings/tokens (classic, repo scope).

- **Rotate token after every session**

---

## Key Environment Variables (set in Vercel — do not hardcode)
| Variable | Purpose |
|---|---|
| NEXT_PUBLIC_WEB3FORMS_KEY | All contact and intake forms |
| ANTHROPIC_API_KEY | AI chatbot (Claude Haiku) — rotate after every session |
| SUPABASE_URL | Chatbot conversation logging |
| SUPABASE_ANON_KEY | Chatbot conversation logging |

---

## Site Pages
| Page | URL | Notes |
|---|---|---|
| Home | / | Hero, trust bar, 6 services, CTA, AI chatbot |
| Services | /services/ | 6 service cards |
| About | /about/ | Story, values, CTA |
| Blog | /blog/ | 8 posts (Oct 2025–Mar 2026) |
| Booking | /booking/ | Calendly embed |
| Contact | /contact/ | Web3Forms — 2 business day response |
| Tax Intake | /tax-intake/ | Individual tax quote form |
| Business Intake | /business-tax-intake/ | Business tax quote form |
| Privacy | /privacy/ | Updated Apr 1, 2026 |
| Banner | /banner.html | WhatsApp promotional banner (in /public/) |
| **Tools Hub** | **/tools/** | **Free financial planning tools index — 6 live** |
| **Roth vs Traditional IRA** | **/tools/roth-vs-traditional/** | **Client-side IRA calculator — see section below** |
| **Tax Bracket Estimator** | **/tools/tax-bracket/** | **Federal+state+FICA estimator with refund/owed — see below** |
| **Quarterly Tax Estimator** | **/tools/quarterly-tax/** | **Self-employed estimated quarterly payments incl. SE tax — see below** |
| **Retirement Projector** | **/tools/retirement-projector/** | **Balance, monthly income, shortfall analysis — see below** |
| **Social Security Breakeven** | **/tools/social-security/** | **62 vs FRA vs 70 lifetime comparison with chart — see below** |
| **Net Worth Tracker** | **/tools/net-worth/** | **Assets minus liabilities with age-based benchmarks + donut charts — see below** |

---

## Free Financial Planning Tools (`/tools/`)

Strategy: public SEO-indexed calculators → lead capture → portal signup. No API costs — all math is client-side.

### Lead capture flow
1. User uses free tool on website (no login required)
2. "Email my results" → Web3Forms (captures name + email + their inputs to your inbox)
3. "Save & track over time" → `portal.sureedgetax.com/register?source=tool&tool=<name>`
4. Portal signups tagged by source for admin visibility (Phase 2 — not yet built on portal side)

### Tools Hub (`app/tools/page.tsx`)
- Lists all tools with live/coming-soon badges
- Site-wide amber disclaimer banner below hero
- Coming-soon cards: Quarterly Tax Estimator, Retirement Savings Projector, Social Security Breakeven, Net Worth Tracker

### Shared library (`lib/tax-data.ts`)
All tools import tax brackets, standard deductions, contribution limits, state tax rates, and helper functions from this single source of truth. **Update yearly each October** when the IRS announces new figures. Includes:
- `TAX_YEARS[2025|2026]` — full bracket + std deduction + contribution limits + Roth/IRA phase-outs + SS wage base
- `US_STATES` — flat-rate state tax approximations (top marginal or flat rate per state, override available)
- Helpers: `computeTax`, `computeFica`, `computeSeTax`, `getMarginalRate`, `get401kMax`, `getIraMax`, `getHsaMax`, `getStateRate`, `fv`, `fvWithContrib`

### Roth vs Traditional IRA Calculator (`app/tools/roth-vs-traditional/page.tsx`)
- "use client" — uses shared `lib/tax-data` (year selector 2025/2026)
- Inputs: tax year, filing, gross income, age, contribution, retirement age, retirement income, **retirement bracket override**, return rate, state tax %
- **Apples-to-apples math (May 2026 fix):** Both scenarios contribute $X to the IRA. Traditional's tax savings ($X × marginal_now) are invested in a side taxable brokerage at same return, taxed at 15% LTCG at withdrawal. Without this side account, Roth always artificially won.
- Warns on Roth income phase-outs (year-aware: 2025 vs 2026) and Traditional deductibility phase-outs
- "Email my results" → Web3Forms; "Save & track" → portal `?source=tool&tool=roth-vs-traditional`
- Consent checkbox + amber disclaimer

### Tax Bracket Estimator (`app/tools/tax-bracket/page.tsx`)
- "use client" — refactored to use shared `lib/tax-data`
- Tax year selector: 2025 or 2026 (defaults to 2026)
- Inputs: year, filing, age, **W-2 wages, federal withholding, state dropdown (50 states + DC) with override %**, 401k/IRA/HSA contributions, deduction type
- Outputs: **federal tax + FICA + state tax + total** quad cards, **refund-or-owed banner** (when withholding entered), effective rate, marginal bracket, take-home, FICA breakdown, pre-tax savings callout, income bar chart with state segment, bracket-by-bracket table
- FICA: SS 6.2% capped at wage base + Medicare 1.45% + 0.9% additional over thresholds
- Consent checkbox + amber disclaimer

### Quarterly Tax Estimator (`app/tools/quarterly-tax/page.tsx`)
- "use client" — for self-employed / freelancers
- Tax year selector: 2025 or 2026
- Inputs: year, filing, **net SE income, other W-2 wages, W-2 withholding, above-the-line deductions, state dropdown with override, prior year tax+AGI (safe harbor), Q1/Q2/Q3 already-paid amounts**
- SE tax math: 12.4% SS up to wage base + 2.9% Medicare + 0.9% additional, half deductible, net earnings × 0.9235
- **Already-paid logic**: if Q1/Q2/Q3 entered, recomputes only remaining quarters and shows underpayment warning if behind by >10%
- Safe harbor: 110% of prior year tax if AGI > $150K ($75K MFS), else 100%
- Outputs: hero quarterly amount, payment schedule with paid quarters marked ✓, full annual tax breakdown, SE tax detail card, safe harbor note
- Quarterly due dates hardcoded for 2025/2026 (Jun 16, 2025 falls on weekend)
- Consent checkbox + amber disclaimer

### Retirement Savings Projector (`app/tools/retirement-projector/page.tsx`)
- "use client" — long-term planning tool
- Inputs: current age, retirement age, current balance, annual contribution, employer match, return %, inflation %, **monthly spending need (today's $)**, **monthly Social Security benefit + claim age**
- **Today's dollars / Future dollars toggle** on the hero number (default Today's $)
- Computes: future balance, real (inflation-adjusted) value, total contributed vs growth, monthly portfolio income at 4% safe withdrawal rate, total monthly income (portfolio + SS)
- **Shortfall analysis**: compares total monthly income vs spending need; if short, calculates additional annual savings needed to close gap
- Growth chart: SVG showing balance line + contribution line over time
- "What if +$100/mo" callout shows the magic of small extra savings
- Consent checkbox + amber disclaimer

### Social Security Breakeven (`app/tools/social-security/page.tsx`)
- "use client" — pre-retiree claiming-strategy tool
- Inputs: birth year (auto-derives FRA), estimated FRA monthly benefit, life expectancy, COLA %
- SSA reduction math: 5/9 of 1%/month for first 36 months early + 5/12 of 1%/month beyond. Delayed Retirement Credit: 8%/year past FRA.
- Shows three strategies: 62 (early, ~70-75% of FRA), FRA (100%), 70 (124% of FRA)
- Outputs: winner-strategy banner based on life expectancy, three strategy cards, breakeven ages between each pair, **cumulative lifetime benefit chart** (SVG, 62-100) with life-expectancy marker
- Consent checkbox + amber disclaimer
- Disclaimer notes the tool excludes spousal/survivor benefits, earnings test, taxation of benefits, IRMAA

### Net Worth Tracker (`app/tools/net-worth/page.tsx`)
- "use client" — snapshot tool, no year-specific data
- Inputs: age + 6 asset categories (cash/savings, retirement, taxable investments, real estate, vehicles, other) + 5 liability categories (mortgage, auto, student, credit card, other)
- Outputs: hero net worth (negative shown red), age-based benchmark comparison (median + top 25% per Fed SCF medians), liquid net worth, home equity, debt-to-asset ratio, **SVG donut charts** for asset and liability breakdowns
- Benchmark data: hardcoded SCF medians per age group (under 35, 35-44, 45-54, 55-64, 65-74, 75+)
- Consent checkbox + amber disclaimer

### Tax year data (keep updated each October when IRS announces)
| | 2025 | 2026 |
|---|---|---|
| Std deduction (single) | $15,000 | $16,100 |
| Std deduction (MFJ) | $30,000 | $32,200 |
| Std deduction (HoH) | $22,500 | $24,150 |
| 401k base | $23,500 | $24,500 |
| 401k catch-up 50+ | $31,000 total | $32,500 total |
| 401k super catch-up 60–63 | $34,750 total | $35,750 total |
| IRA base | $7,000 | $7,500 |
| IRA catch-up 50+ | $8,000 total | $8,600 total |
| HSA self-only | $4,300 | $4,400 |
| HSA family | $8,550 | $8,750 |
| HSA catch-up 55+ | +$1,000 | +$1,000 |
| SS wage base | $176,100 | $184,500 |
| Roth phase-out (single) | $150K–$165K | $153K–$168K |
| Roth phase-out (MFJ) | $236K–$246K | $242K–$252K |
| Trad. IRA deduct phase-out (single, covered) | $79K–$89K | $81K–$91K |
| Trad. IRA deduct phase-out (MFJ, covered) | $126K–$146K | $129K–$149K |

### Important rules for tools
- All tools must have the amber disclaimer banner and consent checkbox — never remove these
- Tool copy must stay in CPA/EA territory — do NOT frame tools as "financial planning" advice or reference ChFC
- "Email my results" uses `NEXT_PUBLIC_WEB3FORMS_KEY` (already set in Vercel) — no new env vars needed
- Portal signup links use query params: `?source=tool&tool=<slug>` — slug matches the URL segment

---

## AI Chatbot
- **File:** `app/api/chat/route.ts` + `components/ChatWidget.tsx`
- **Model:** claude-haiku-4-5-20251001
- **Rate limits:** 10 messages/session, 30/IP/day
- **Response style:** Plain text, no markdown, under 120 words
- **Logging:** Supabase table `chatbot_logs` — IP, city, country, question, response
- **Geolocation:** ipapi.co (30K/month free)
- **GA tracking:** `chatbot_message` event on every message
- **Spending cap:** $10/month on Anthropic console
- **Supabase project:** fwsnjsojszajukdrnxhw.supabase.co

---

## Important Rules
- Owner names must NOT appear anywhere on the site (conflict of interest)
- CFP candidate/ChFC candidate must NOT appear on marketing materials (CFP Board rule)
- Brand name is always "SureEdge Tax & Accounting" (with ampersand, not "and")
- Always run `npx next build` before pushing — Vercel will reject broken builds
- Rotate ANTHROPIC_API_KEY in Vercel after every Claude session

---

## Completed Work (as of May 4, 2026)
- ✅ Migrated from WordPress to Next.js 16 + TypeScript
- ✅ All 9 original pages live
- ✅ AI chatbot live on all pages with Supabase logging + GA tracking
- ✅ Web3Forms on all intake/contact forms
- ✅ Google Analytics + Search Console connected
- ✅ Sitemap submitted to Google Search Console (now includes /tools pages)
- ✅ Rank Math SEO configured (all pages + 8 blog posts)
- ✅ PageSpeed: Mobile 90/100/100/99 | Desktop 89/100/100/100
- ✅ M365 trial converted to paid
- ✅ admin@sureedgetax.com added as M365 alias
- ✅ WhatsApp banner at /banner.html with OG meta tags
- ✅ **Free Tools section** — `/tools/` hub + **6 live calculators** (Roth vs Traditional, Tax Bracket, Quarterly Tax, Retirement Projector, Social Security Breakeven, Net Worth Tracker)
- ✅ **Lead capture** — "Email my results" via Web3Forms + "Save & track" portal signup links on every tool
- ✅ **2025/2026 tax year selector** on all year-aware tools
- ✅ **Consent checkbox + disclaimer banners** on all tool pages (liability protection)
- ✅ **"Free Tools" nav link** added to Header (desktop + mobile)
- ✅ **Shared tax data library** (`lib/tax-data.ts`) — single source of truth for brackets, limits, state rates, FICA helpers
- ✅ **Tax Bracket: state tax + FICA + refund/owed** — full federal+state+FICA estimator
- ✅ **Quarterly Tax: already-paid logic + state lookup** — recomputes remaining quarters, underpayment warning
- ✅ **Retirement Projector: spending need + Social Security + shortfall** — answers "will I have enough?"
- ✅ **Roth fix**: side-account methodology so Traditional+invested-tax-savings is fairly compared to Roth (was always favoring Roth)

---

## Pending Tasks
### Critical
- [ ] Rotate Anthropic API key — update ANTHROPIC_API_KEY in Vercel after every session (recurring)
- [ ] Run banner URL through Facebook Sharing Debugger to refresh OG cache (banner image is uploaded; just needs the cache bust)

### High Priority
- [ ] Verify/set up Outlook M365 DKIM (selector1/selector2 CNAMEs) — SPF currently covers M365 mail, but DKIM gives belt-and-suspenders auth under DMARC p=quarantine
- [ ] Google Business Profile — when physical address available

### Medium Priority
- [ ] Set Anthropic spending limit to $20/month (currently $10)
- [ ] Calendly paid upgrade — remove "Powered by Calendly" ($10/mo)

### Tools — Phase 2 (Portal Integration)
- [ ] Portal: add `registration_source` column to users table — tag signups that come from `/tools/` pages
- [ ] Portal: create `tool_calculations` DB table — store tool type, inputs JSON, outputs JSON, user_id
- [ ] Portal: `/tools/` page — logged-in users see their saved calculations with "Book consultation" CTA
- [ ] Portal: admin panel shows which tool drove each signup
- [x] ~~Website: add Quarterly Tax Estimator~~ — shipped
- [x] ~~Website: add Retirement Savings Projector~~ — shipped
- [x] ~~Website: add Roth year selector~~ — shipped
- [x] ~~Website: add Social Security Breakeven~~ — shipped
- [x] ~~Website: add Net Worth Tracker~~ — shipped

---

## Business Context
- **Entity:** Strivix LLC (DBA: SureEdge Tax & Accounting) — Wyoming LLC, Texas conversion in progress
- **Credentials:** CPA + EA (wife — the licensed professional), ChFC-in-progress (husband — operations/business owner; ChFC candidacy cannot be advertised per American College / CFP Board rules)
- **Services:** Tax prep, bookkeeping, payroll, tax planning, IRS representation, business returns
- **Email:** contact@sureedgetax.com (M365)
- **Business Gmail:** sureedgetax@gmail.com
- **Calendly:** sureedgetax@gmail.com (Google Meet integration)
- **Analytics:** GA Measurement ID G-YBD5VMDTRG
