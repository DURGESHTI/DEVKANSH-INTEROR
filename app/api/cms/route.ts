import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const URL = process.env.GOOGLE_APPS_SCRIPT_URL || '';
const SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET || '';

function configurationError() {
  if (!URL) return 'GOOGLE_APPS_SCRIPT_URL is not configured';
  if (!SECRET) return 'GOOGLE_APPS_SCRIPT_SECRET is not configured';
  return '';
}

async function bridgeRequest(payload: Record<string, unknown>) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...payload, secret: SECRET }),
    cache: 'no-store',
    redirect: 'follow',
  });
  const text = await response.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = { error: 'Invalid Google Apps Script response', raw: text.slice(0, 500) }; }
  if (!response.ok || data?.ok !== true) {
    throw new Error(data?.error || `Google Apps Script returned HTTP ${response.status}`);
  }
  return data;
}

export async function GET() {
  const configError = configurationError();
  if (configError) return NextResponse.json({ ok: false, error: configError }, { status: 503 });
  try {
    const data = await bridgeRequest({ action: 'health' });
    return NextResponse.json({ ok: true, bridge: data });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Bridge connection failed' }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ ok: false, error: 'Admin login required' }, { status: 401 });
  const configError = configurationError();
  if (configError) return NextResponse.json({ ok: false, error: configError }, { status: 503 });
  try {
    const body = await req.json();
    if (body?.action === 'list') {
      const data = await bridgeRequest({ action: 'list' });
      return NextResponse.json({ ok: true, result: { records: data.items || [] } });
    }
    if (body?.action === 'save') {
      const record = { key: body.key, payload: body.payload, status: body.status || 'draft' };
      const data = await bridgeRequest({ action: 'save', record });
      return NextResponse.json({ ok: true, result: { ok: true, record: data.item } });
    }
    return NextResponse.json({ ok: false, error: 'Unsupported CMS action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'CMS request failed' }, { status: 502 });
  }
}
