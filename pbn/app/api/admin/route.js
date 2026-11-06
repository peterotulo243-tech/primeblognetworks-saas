import { NextResponse } from 'next/server';
import { load, mutate, note, slugify } from '@/lib/db';
import { adminOk, setSess, getSess, clearSess } from '@/lib/auth';
const J = (o, s = 200) => NextResponse.json(o, { status: s });
export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  if (b.action === 'login') { if (!adminOk(b.email, b.password)) return J({ error: 'Wrong email or password' }, 401); await setSess('pbn_adm', 'admin'); return J({ ok: true }); }
  if (b.action === 'logout') { await clearSess('pbn_adm'); return J({ ok: true }); }
  if ((await getSess('pbn_adm')) !== 'admin') return J({ error: 'auth' }, 401);
  if (b.action === 'state') return J(await load());
  return J(await mutate(d => {
    const find = id => d.clients.find(x => x.id === id);
    switch (b.action) {
      case 'saveClient': { const c = b.client; if (!c?.name?.trim()) return { error: 'Name required' }; c.services = (c.services || []).filter(s => s.n?.trim());
        if (!c.id) { let s = slugify(c.name), n = s, i = 2; while (d.clients.some(x => x.slug === n)) n = s + '-' + i++; Object.assign(c, { id: 'c' + Date.now(), slug: n, status: 'Demo', searches: 0, clicks: 0, code: String(Math.floor(100000 + Math.random() * 900000)) }); d.clients.push(c); d.made++; note(d, 'Demo created: ' + c.name); }
        else { const i = d.clients.findIndex(x => x.id === c.id); if (i < 0) return { error: 'gone' }; d.clients[i] = { ...d.clients[i], ...c }; } return { ok: true, slug: c.slug }; }
      case 'deleteClient': d.clients = d.clients.filter(x => x.id !== b.id); d.pays = d.pays.filter(p => p.cid !== b.id); return { ok: true };
      case 'addPay': { const c = find(b.cid); if (!c) return { error: 'gone' }; d.pays.unshift({ id: 'p' + Date.now(), cid: c.id, amt: b.plan === '997' ? 997 : 70, plan: b.plan === '997' ? '997' : '70', st: 'Pending', d: new Date().toISOString() }); return { ok: true }; }
      case 'confirmPay': { const p = d.pays.find(x => x.id === b.id); if (!p) return { error: 'gone' }; const c = find(p.cid);
        if (!b.ok) { p.st = 'Failed'; return { ok: true }; } p.st = 'Paid';
        if (c) { c.plan = p.plan; c.status = 'Live'; if (c.plan === '70') { const t = new Date(); t.setMonth(t.getMonth() + 1); c.nextPay = t.toISOString().slice(0, 10); } note(d, `Payment Received $${p.amt}${c.plan === '70' ? '/month' : ''} from ${c.name}`); } return { ok: true }; }
      case 'delivered': { const c = find(b.id); if (c) { c.delivered = true; note(d, 'Delivered: ' + c.name); } return { ok: true }; }
      case 'sent': { const c = find(b.id); if (c) c.sent = true; return { ok: true }; }
      case 'doneReq': d.reqs[b.i] && (d.reqs[b.i].done = true); return { ok: true };
      case 'clearNotes': d.notes = []; return { ok: true };
      case 'addSite': d.sites.push({ n: b.n, u: b.u || '', st: 'Pending' }); return { ok: true };
      case 'setSite': d.sites[b.i] && (d.sites[b.i].st = b.st); return { ok: true };
      case 'postAd': d.ads.unshift({ p: b.p, t: b.t, d: new Date().toISOString() }); d.sites.push({ n: b.p, u: b.l || '', st: 'Live' }); return { ok: true };
      case 'ai': { const q = String(b.q).trim(); let m;
        if ((m = q.match(/^add (?:a )?(?:new )?client (.+)/i))) { const n = m[1]; d.clients.push({ id: 'c' + Date.now(), slug: slugify(n) + '-' + (d.clients.length + 1), name: n, niche: 'Any Business', city: '', site: '', email: '', logo: '', c1: '#d4af37', c2: '#22c55e', plan: '70', status: 'Demo', searches: 0, clicks: 0, code: String(Math.floor(100000 + Math.random() * 900000)), services: [{ n: 'Sample Service', p: '50', s: '', d: 'Edit me', img: '', l: '' }] }); d.made++; return { reply: `Added client "${n}". Edit its services in Clients.` }; }
        if ((m = q.match(/^change price (?:of )?(.+?) (?:to|=) \$?(\d+(?:\.\d+)?)$/i))) { let k = 0; d.clients.forEach(c => c.services.forEach(s => { if (s.n.toLowerCase() === m[1].toLowerCase()) { s.p = m[2]; k++; } })); return { reply: k ? `Changed ${k} service(s) to $${m[2]}.` : 'No service with that exact name.' }; }
        if ((m = q.match(/^delete (?:demo|client) (.+)/i))) { const n = d.clients.length; d.clients = d.clients.filter(c => c.name.toLowerCase() !== m[1].toLowerCase()); return { reply: n > d.clients.length ? 'Deleted.' : 'No client with that name.' }; }
        if ((m = q.match(/^add (?:a )?(?:new )?(?:advertising site|ad site) (.+)/i))) { d.sites.push({ n: m[1], u: '', st: 'Pending' }); return { reply: `Added advertising site "${m[1]}" as Pending.` }; }
        if ((m = q.match(/^add (?:a )?(?:new )?(?:platform (.+)|(.+?) panel)$/i))) { const n = (m[1] || m[2]).trim(); if (!d.plats.includes(n)) d.plats.push(n); return { reply: `Added "${n}" to posting platforms.` }; }
        if ((m = q.match(/^edit homepage (?:headline|hero) (?:to )?(.+)/i))) { d.hero = m[1]; return { reply: 'Homepage headline updated.' }; }
        return { reply: 'Supported: add client X · change price of S to N · delete demo X · add advertising site X · add platform X · edit homepage headline to X.' }; }
    }
    return { error: 'unknown action' };
  }));
}
