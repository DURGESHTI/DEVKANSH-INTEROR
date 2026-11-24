import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'devkansh_admin_session';
const SESSION_SECONDS = 8 * 60 * 60;

function sessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters');
  return value;
}

function signature(expiresAt: number) {
  return createHmac('sha256', sessionSecret()).update(`devkansh-admin-auth-v2:${expiresAt}`).digest('hex');
}

export function verifyCredentials(id: unknown, password: unknown) {
  const expectedId = process.env.ADMIN_PANEL_ID || '';
  const expectedPassword = process.env.ADMIN_PANEL_PASSWORD || '';
  if (typeof id !== 'string' || typeof password !== 'string' || !expectedId || !expectedPassword) return false;
  const safeEqual = (a: string, b: string) => {
    const aa = Buffer.from(a); const bb = Buffer.from(b);
    return aa.length === bb.length && timingSafeEqual(aa, bb);
  };
  return safeEqual(id, expectedId) && safeEqual(password, expectedPassword);
}

export function getAdminCookie() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return { name: COOKIE_NAME, value: `${expiresAt}.${signature(expiresAt)}`, maxAge: SESSION_SECONDS };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value || '';
  const [expiryText, suppliedSignature, extra] = value.split('.');
  if (!expiryText || !suppliedSignature || extra) return false;
  const expiresAt = Number(expiryText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
  try {
    const expected = Buffer.from(signature(expiresAt));
    const supplied = Buffer.from(suppliedSignature);
    return supplied.length === expected.length && timingSafeEqual(supplied, expected);
  } catch { return false; }
}
