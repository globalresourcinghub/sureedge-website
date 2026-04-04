import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a friendly and knowledgeable tax assistant for SureEdge Tax & Accounting, a licensed CPA and Enrolled Agent firm based in Texas serving clients nationwide.

STRICT RULES:
- ONLY answer questions about US taxes, accounting, bookkeeping, payroll, and financial topics relevant to individuals and small businesses
- For ANY other topic, politely decline and redirect to tax/accounting questions
- Never provide specific personalized tax advice — always recommend consulting a CPA for their specific situation
- Keep ALL responses under 120 words — be concise and clear
- Always end with a brief call to action to book a free consultation
- Be warm, professional, and approachable
- Never mention competitor firms or software by name
- Do not discuss fees or pricing specifics

You represent a professional CPA firm. Maintain accuracy and professionalism at all times.`;

// Simple in-memory rate limiting (resets on server restart)
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const SESSION_LIMIT = 10; // messages per session
const IP_DAILY_LIMIT = 30; // messages per IP per day

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    // IP rate limiting
    const ipData = ipRequestCounts.get(ip);
    if (ipData) {
      if (now < ipData.resetTime) {
        if (ipData.count >= IP_DAILY_LIMIT) {
          return NextResponse.json({ error: 'Daily limit reached. Please try again tomorrow or book a consultation.' }, { status: 429 });
        }
        ipData.count++;
      } else {
        ipRequestCounts.set(ip, { count: 1, resetTime: now + dayMs });
      }
    } else {
      ipRequestCounts.set(ip, { count: 1, resetTime: now + dayMs });
    }

    const { message, sessionCount } = await req.json();

    // Session limit check
    if (sessionCount >= SESSION_LIMIT) {
      return NextResponse.json({ error: 'SESSION_LIMIT' }, { status: 429 });
    }

    // Input validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: 'Message too long. Please keep questions under 500 characters.' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 500 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Sorry, I could not process that. Please try again.';

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 500 });
  }
}