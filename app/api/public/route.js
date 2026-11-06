import { NextResponse } from 'next/server';
import { mutate, note } from '@/lib/db';
export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  return NextResponse.json(await mutate(d => {
    const c = d.clients.find(x => x.slug === b.slug); if (!c) return { error: 'not found' };
    if (b.type === 'search') c.searches = (c.searches || 0) + 1;
    else if (b.type === 'click') c.clicks = (c.clicks || 0) + 1;
    else if (b.type === 'view') { if (!c.lastView || Date.now() - c.lastView > 36e5) { c.lastView = Date.now(); if (c.status === 'Demo') note(d, 'New Demo Viewed: ' + c.name); } }
    else if (b.type === 'pay') { const plan = b.plan === '997' ? '997' : '70'; d.pays.unshift({ id: 'p' + Date.now(), cid: c.id, amt: +plan, plan, st: 'Pending', d: new Date().toISOString() }); note(d, `Payment claimed $${plan} from ${c.name} – confirm in Payments`); }
    else if (b.type === 'lead') { note(d, `Demo request – ${String(b.name).slice(0, 80)} / ${String(b.contact).slice(0, 80)} / ${String(b.text).slice(0, 300)}`); }
    return { ok: true };
  }));
}
