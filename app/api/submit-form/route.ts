import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const key = process.env.WEB3FORMS_KEY;
  if (!key) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Strip HTML tags from free-text fields to prevent injection
  const strip = (v: unknown) => (typeof v === 'string' ? v.replace(/<[^>]*>/g, '') : v);
  if ('message' in payload) payload = { ...payload, message: strip(payload.message) };
  if ('comments' in payload) payload = { ...payload, comments: strip(payload.comments) };

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: key, ...payload }),
  });

  const data: unknown = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
