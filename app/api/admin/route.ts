import { NextRequest, NextResponse } from 'next/server';
import { getAdminCookie, isAdminAuthenticated, verifyCredentials } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ authenticated: await isAdminAuthenticated() }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (!verifyCredentials(body?.id, body?.password)) {
    return NextResponse.json({ ok: false, error: 'Invalid Admin ID or Password' }, { status: 401 });
  }
  try {
    const cookie = getAdminCookie();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict',
      path: '/', maxAge: cookie.maxAge,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Auth configuration error' }, { status: 503 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('devkansh_admin_session', '', {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 0,
  });
  return response;
}
