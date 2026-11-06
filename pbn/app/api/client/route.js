import { NextResponse } from 'next/server';
import { load, mutate, note, pub } from '@/lib/db';
import { setSess, getSess, clearSess } from '@/lib/auth';
export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  if (b.action === 'login') {
    const d = await load(); const c = d.clients.find(x => x.email && x.email.toLowerCase() === String(b.email).trim().toLowerCase() && x.code === String(b.code).trim());
    if (!c) return NextResponse.json({ error: 'Wrong email or access code' }, { status: 401 });
    await setSess('pbn_cl', c.id); return NextResponse.json({ ok: true });
  }
  if (b.action === 'logout') { await clearSess('pbn_cl'); return NextResponse.json({ ok: true }); }
  const id = await getSess('pbn_cl'); if (!id) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (b.action === 'edit') return NextResponse.json(await mutate(d => { const c = d.clients.find(x => x.id === id); if (!c || !String(b.text).trim()) return { error: 'bad' }; d.reqs.unshift({ cid: id, t: String(b.text).slice(0, 1000), d: new Date().toISOString(), done: false }); note(d, 'New Edit Request from ' + c.name); return { ok: true }; }));
  const d = await load(); const c = d.clients.find(x => x.id === id); return NextResponse.json({ client: c ? pub(c) : null });
}
