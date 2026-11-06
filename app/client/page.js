'use client';
import { useState, useEffect } from 'react';
const api = b => fetch('/api/client', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then(r => r.json());
export default function Client() {
  const [c, setC] = useState(null), [ready, setReady] = useState(false), [f, setF] = useState({ email: '', code: '' }), [err, setErr] = useState(''), [txt, setTxt] = useState(''), [ok, setOk] = useState('');
  const load = () => api({ action: 'state' }).then(r => { setC(r.client || null); setReady(true); });
  useEffect(() => { load(); }, []);
  if (!ready) return <main className="w"><p className="mu">Loading…</p></main>;
  if (!c) return <main className="w"><h1>Client Login</h1><div className="box"><p className="mu">Use the email and access code your admin sent you.</p>
    <input type="email" placeholder="Your email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /><input placeholder="Access code" value={f.code} onChange={e => setF({ ...f, code: e.target.value })} />
    <button className="btn" onClick={async () => { const r = await api({ action: 'login', ...f }); r.error ? setErr(r.error) : load(); }}>Log in</button>{err && <p>{err}</p>}</div></main>;
  const path = `/${c.status === 'Demo' ? 'demo' : 'live'}/${c.slug}`;
  return <main className="w"><h1>{c.name}</h1>
    <div className="grid"><div className="box"><div className="st">{c.searches || 0}</div>Searches</div><div className="box"><div className="st">{c.clicks || 0}</div>BOOK NOW clicks</div>
      <div className="box"><b>Plan</b><br />{c.plan === '997' ? '$997 One-Time' : '$70/month'}<br /><span className="bd">{c.status}</span></div>{c.plan !== '997' && c.nextPay && <div className="box"><b>Next payment</b><br />{c.nextPay}</div>}</div>
    <p><a className="btn gold" href={path}>Open Your Page</a></p><h2>Your services</h2>{c.services.map((s, i) => <div className="box" key={i} style={{ margin: '6px 0' }}>{s.n} – ${s.p} {s.s && '· ' + s.s}</div>)}
    <h2>Request Edit</h2><textarea value={txt} onChange={e => setTxt(e.target.value)} placeholder="What should change?" /><button className="btn" onClick={async () => { await api({ action: 'edit', text: txt }); setTxt(''); setOk('Request sent to admin.'); }}>Request Edit</button> {ok}
    <p><button className="btn o" onClick={async () => { await api({ action: 'logout' }); setC(null); }}>Log out</button></p></main>;
}
