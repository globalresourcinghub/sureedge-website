import { NextRequest, NextResponse } from 'next/server'; // v2

const SYSTEM_PROMPT = `You are a friendly and knowledgeable tax assistant for SureEdge Tax & Accounting, a licensed CPA and Enrolled Agent firm based in Texas serving clients nationwide.

STRICT RULES:
- ONLY answer questions about US taxes, accounting, bookkeeping, payroll, and financial topics relevant to individuals and small businesses
- For ANY other topic, politely decline and redirect to tax/accounting questions
- Never provide specific personalized tax advice — always recommend consulting a CPA for their specific situation
- Keep ALL responses under 120 words — be concise and clear
- Always end responses with this exact text on its own line: "For your specific situation, get a free quote at sureedgetax.com/tax-intake or reach us at contact@sureedgetax.com"
- Be warm, professional, and approachable
- Never mention competitor firms or software by name
- Do not discuss fees or pricing specifics
- IMPORTANT: Use plain text only. No markdown, no asterisks, no bold, no links, no bullet symbols, no hashtags. Write in clear simple sentences and short paragraphs only.

You represent a professional CPA firm. Maintain accuracy and professionalism at all times.`;

const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const SESSION_LIMIT = 10;
const IP_DAILY_LIMIT = 30;

async function getLocationFromIP(ip: string): Promise<{ city: string; country: string; region: string }> {
  try {
    if (ip === 'unknown' || ip === '127.0.0.1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
      return { city: 'Local', country: 'Local', region: 'Local' };
    }
    const r = await fetch(`https://ipapi.co/${ip}/json/`, { signal: AbortSignal.timeout(2000) });
    const data = await r.json();
    return {
      city: data.city || 'Unknown',
      country: data.country_name || 'Unknown',
      region: data.region || 'Unknown',
    };
  } catch {
    return { city: 'Unknown', country: 'Unknown', region: 'Unknown' };
  }
}

async function logToSupabase(data: {
  ip: string; city: string; country: string; region: string;
  question: string; response_text: string; response_length: number; session_count: number;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return;
  try {
    await fetch(`${supabaseUrl}/rest/v1/chatbot_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Silent fail — don't break chatbot if logging fails
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    const ipData = ipRequestCounts.get(ip);
    if (ipData) {
      if (now < ipData.resetTime) {
        if (ipData.count >= IP_DAILY_LIMIT) {
          return NextResponse.json({ error: 'Daily limit reached. Please try again tomorrow or reach us at contact@sureedgetax.com.' }, { status: 429 });
        }
        ipData.count++;
      } else {
        ipRequestCounts.set(ip, { count: 1, resetTime: now + dayMs });
      }
    } else {
      ipRequestCounts.set(ip, { count: 1, resetTime: now + dayMs });
    }

    const { message, sessionCount } = await req.json();

    if (sessionCount >= SESSION_LIMIT) {
      return NextResponse.json({ error: 'SESSION_LIMIT' }, { status: 429 });
    }

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

    // Get location and call Claude in parallel
    const [location, claudeResponse] = await Promise.all([
      getLocationFromIP(ip),
      fetch('https://api.anthropic.com/v1/messages', {
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
      })
    ]);

    if (!claudeResponse.ok) {
      return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 500 });
    }

    const data = await claudeResponse.json();
    const reply = data.content?.[0]?.text || 'Sorry, I could not process that. Please try again.';

    // Log to Supabase (non-blocking)
    logToSupabase({
      ip,
      city: location.city,
      country: location.country,
      region: location.region,
      question: message.substring(0, 500),
      response_text: reply.substring(0, 1000),
      response_length: reply.length,
      session_count: sessionCount,
    });

    return NextResponse.json({ reply, location });
  } catch {
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 500 });
  }
}