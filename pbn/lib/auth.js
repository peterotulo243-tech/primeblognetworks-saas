import crypto from 'crypto';
import { cookies } from 'next/headers';
const sign = v => v + '.' + crypto.createHmac('sha256', process.env.SESSION_SECRET || 'dev-secret').update(v).digest('hex');
const check = s => { if (!s) return null; const v = s.slice(0, s.lastIndexOf('.')); const a = Buffer.from(sign(v)), b = Buffer.from(s); return a.length === b.length && crypto.timingSafeEqual(a, b) ? v : null; };
export async function setSess(n, v) { (await cookies()).set(n, sign(v), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 604800 }); }
export async function getSess(n) { return check((await cookies()).get(n)?.value); }
export async function clearSess(n) { (await cookies()).delete(n); }
export const adminOk = (e, p) => { const A = Buffer.from(String(p)), B = Buffer.from(process.env.ADMIN_PASSWORD || ''); return B.length > 0 && String(e).trim().toLowerCase() === (process.env.ADMIN_EMAIL || 'primeblognetworks@gmail.com').toLowerCase() && A.length === B.length && crypto.timingSafeEqual(A, B); };
