import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const MAX_BYTES = 3 * 1024 * 1024; // Keep below Vercel's serverless request-body limit after base64 encoding.

export async function POST(req: NextRequest) {
  if (!await isAdminAuthenticated()) return NextResponse.json({ ok: false, error: 'Admin login required' }, { status: 401 });
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!url || !secret) return NextResponse.json({ ok: false, error: 'Google Apps Script URL/Secret configured नहीं है' }, { status: 503 });
  try {
    const form = await req.formData();
    const file = form.get('file');
    const kind = String(form.get('kind') || 'image');
    if (!(file instanceof File)) return NextResponse.json({ ok: false, error: 'Upload file नहीं मिली' }, { status: 400 });
    if (file.size <= 0 || file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: 'File अधिकतम 3 MB की होनी चाहिए' }, { status: 413 });
    const allowed = kind === 'video' ? ['video/mp4', 'video/webm', 'video/quicktime'] : ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) return NextResponse.json({ ok: false, error: kind === 'video' ? 'केवल MP4, WEBM या MOV वीडियो स्वीकार हैं' : 'केवल JPG, PNG या WEBP फोटो स्वीकार हैं' }, { status: 415 });
    const bytes = Buffer.from(await file.arrayBuffer());
    const response = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'upload', secret, file: { name: file.name, mimeType: file.type, base64: bytes.toString('base64'), kind } }),
      cache: 'no-store', redirect: 'follow',
    });
    const raw = await response.text();
    let data: any;
    try { data = JSON.parse(raw); } catch { throw new Error('Apps Script से मान्य JSON जवाब नहीं मिला'); }
    if (!response.ok || data?.ok !== true || !data?.url) throw new Error(data?.error || `Upload failed (HTTP ${response.status})`);
    return NextResponse.json({ ok: true, url: data.url, fileId: data.fileId || '' });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Media upload failed' }, { status: 502 });
  }
}
