import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!url || !secret) return NextResponse.json({ ok: false, records: [], error: 'CMS is not configured' }, { status: 503 });
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'list', secret }),
      cache: 'no-store',
      redirect: 'follow',
    });
    const text = await response.text();
    let data: any;
    try { data = JSON.parse(text); } catch { return NextResponse.json({ ok: false, records: [], error: 'Invalid CMS response' }, { status: 502 }); }
    if (!response.ok || data?.ok !== true || !Array.isArray(data.items)) {
      return NextResponse.json({ ok: false, records: [], error: data?.error || 'CMS list request failed' }, { status: 502 });
    }
    const records = data.items.filter((item: any) => item?.status === 'published');
    return NextResponse.json({ ok: true, records });
  } catch {
    return NextResponse.json({ ok: false, records: [], error: 'CMS temporarily unavailable' }, { status: 502 });
  }
}
