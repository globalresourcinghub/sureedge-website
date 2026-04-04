import { NextRequest, NextResponse } from 'next/server';

async function getLocation(ip: string) {
  try {
    if (!ip || ip === 'unknown' || ip === '127.0.0.1' || ip.startsWith('192.168') || ip.startsWith('10.') || ip.startsWith('::1')) {
      return { city: 'Local', country: 'Local', region: 'Local' };
    }
    const r = await fetch(`https://ipapi.co/${ip}/json/`, { signal: AbortSignal.timeout(2000) });
    const d = await r.json();
    return { city: d.city || 'Unknown', country: d.country_name || 'Unknown', region: d.region || 'Unknown' };
  } catch {
    return { city: 'Unknown', country: 'Unknown', region: 'Unknown' };
  }
}

async function logVisit(data: object) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return;
  try {
    await fetch(`${supabaseUrl}/rest/v1/page_visits`, {
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
    // silent fail
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const { page, referrer, userAgent } = await req.json();

    const location = await getLocation(ip);

    await logVisit({
      ip,
      city: location.city,
      country: location.country,
      region: location.region,
      page: page || '/',
      referrer: referrer || '',
      user_agent: (userAgent || '').substring(0, 300),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}