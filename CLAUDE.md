# SureEdge Tax & Accounting — Marketing Website
# Claude Code Context File | Last updated: May 4, 2026
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
| **Tools Hub** | **/tools/** | **Free financial planning tools index — 2 live, 4 coming soon** |
| **Roth vs Traditional IRA** | **/tools/roth-vs-traditional/** | **Client-side IRA calculator — see section below** |
| **Tax Bracket Estimator** | **/tools/tax-bracket/** | **Client-side tax estimator — see section below** |

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

### Roth vs Traditional IRA Calculator (`app/tools/roth-vs-traditional/page.tsx`)
- **"use client"** — fully client-side, no API
- **2025 federal brackets only** (year selector not yet added — add when updating)
- Inputs: filing status, gross income, age, contribution, retirement age, retirement income, return rate, state tax %
- Outputs: tax savings today, balance at retirement, tax at withdrawal, net after-tax value, breakeven retirement rate
- Warns on Roth income phase-outs ($150K–$165K single / $236K–$246K MFJ) and Traditional deductibility phase-outs
- "Email my results" modal → Web3Forms submission
- "Save & track over time" → portal register with source params
- **Consent checkbox** gates the Calculate button — must be checked before calculating
- Disclaimer: amber warning box above bottom CTA

### Tax Bracket Estimator (`app/tools/tax-bracket/page.tsx`)
- **"use client"** — fully client-side, no API
- **Tax year selector: 2025 or 2026** (prominent toggle at top of form, defaults to 2026)
- All brackets, standard deductions, and contribution limits switch with selected year
- **2026 data source:** IRS Rev. Proc. 2025-38 (brackets) + IRS Notice 2025-67 (retirement limits)
- Inputs: tax year, filing status, age, gross income, 401k/IRA/HSA contributions, deduction type
- 401k limits handle SECURE 2.0 super catch-up for ages 60–63 separately from standard 50+ catch-up
- Outputs: tax owed, effective rate, marginal bracket, pre-tax contribution savings callout, income bar chart, bracket table
- **Consent checkbox** gates the Calculate button
- Disclaimer: amber warning box above bottom CTA

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
- ✅ **Free Tools section** — `/tools/` hub + 2 live calculators (Roth vs Traditional, Tax Bracket Estimator)
- ✅ **Lead capture** — "Email my results" via Web3Forms + "Save & track" portal signup links on every tool
- ✅ **2025/2026 tax year selector** on Tax Bracket Estimator (brackets + contribution limits)
- ✅ **Consent checkbox + disclaimer banners** on all tool pages (liability protection)
- ✅ **"Free Tools" nav link** added to Header (desktop + mobile)

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
- [ ] Website: add Quarterly Tax Estimator (`/tools/quarterly-tax/`)
- [ ] Website: add Retirement Savings Projector (`/tools/retirement-projector/`)
- [ ] Website: add Roth year selector (currently 2025 brackets only — mirror what Tax Bracket does)

---

## Business Context
- **Entity:** Strivix LLC (DBA: SureEdge Tax & Accounting) — Wyoming LLC, Texas conversion in progress
- **Credentials:** CPA + EA (wife — the licensed professional), ChFC-in-progress (husband — operations/business owner; ChFC candidacy cannot be advertised per American College / CFP Board rules)
- **Services:** Tax prep, bookkeeping, payroll, tax planning, IRS representation, business returns
- **Email:** contact@sureedgetax.com (M365)
- **Business Gmail:** sureedgetax@gmail.com
- **Calendly:** sureedgetax@gmail.com (Google Meet integration)
- **Analytics:** GA Measurement ID G-YBD5VMDTRG
