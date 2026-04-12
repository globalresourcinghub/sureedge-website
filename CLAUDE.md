# SureEdge Tax & Accounting — Marketing Website
# Claude Code Context File | Last updated: April 12, 2026
# Place this file at: /Users/BG/github/sureedge/sureedge-website/CLAUDE.md

---

## Project Overview
- **Site:** https://sureedgetax.com
- **Type:** Marketing website for SureEdge Tax & Accounting (virtual CPA firm)
- **Framework:** Next.js 16.2.2 + TypeScript (Turbopack)
- **Styling:** Inline styles only — no Tailwind
- **Deployment:** Vercel — auto-deploys on push to main (bizgales-projects/sureedge-website)
- **GitHub:** github.com/globalresourcinghub/sureedge-website
- **Local path:** /Users/BG/github/sureedge/sureedge-website

---

## Git Workflow
```bash
npx next build          # always run before pushing to catch errors
git add .
git commit -m "message"
git push                # Vercel auto-deploys on push
```
- GitHub token stored in Mac Keychain: `security find-generic-password -a sureedge -s "GitHub PAT" -w`
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

## Completed Work (as of April 12, 2026)
- ✅ Migrated from WordPress to Next.js 16 + TypeScript
- ✅ All 9 pages live
- ✅ AI chatbot live on all pages with Supabase logging + GA tracking
- ✅ Web3Forms on all intake/contact forms
- ✅ Google Analytics + Search Console connected
- ✅ Sitemap submitted to Google Search Console
- ✅ Rank Math SEO configured (all pages + 8 blog posts)
- ✅ PageSpeed: Mobile 90/100/100/99 | Desktop 89/100/100/100
- ✅ M365 trial converted to paid
- ✅ admin@sureedgetax.com added as M365 alias
- ✅ WhatsApp banner at /banner.html with OG meta tags

---

## Pending Tasks
### Critical
- [ ] Rotate Anthropic API key — update ANTHROPIC_API_KEY in Vercel after every session
- [ ] Upload sureedge-banner-preview.jpg to /public/ for WhatsApp OG image
- [ ] Run banner URL through Facebook Sharing Debugger after image upload

### High Priority
- [ ] DMARC upgrade to p=quarantine (mid-April 2026 target)
- [ ] Add "Client Portal" link to navbar (pointing to portal.sureedgetax.com)
- [ ] Update Privacy Policy to disclose portal data collection and AI chatbot logging
- [ ] Google Business Profile — when physical address available

### Medium Priority
- [ ] Set Anthropic spending limit to $20/month (currently $10)
- [ ] Calendly paid upgrade — remove "Powered by Calendly" ($10/mo)

---

## Business Context
- **Entity:** Strivix LLC (DBA: SureEdge Tax & Accounting) — Wyoming LLC, Texas conversion in progress
- **Credentials:** CPA + EA (husband), CFP candidate (wife)
- **Services:** Tax prep, bookkeeping, payroll, tax planning, IRS representation, business returns
- **Email:** contact@sureedgetax.com (M365)
- **Business Gmail:** sureedgetax@gmail.com
- **Calendly:** sureedgetax@gmail.com (Google Meet integration)
- **Analytics:** GA Measurement ID G-YBD5VMDTRG
