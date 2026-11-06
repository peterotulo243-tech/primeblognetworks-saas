'use client';
import { useState, useEffect, useRef } from 'react';
import Cards from './Cards';
import { search } from '@/lib/search';
const post = (b) => fetch('/api/public', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).catch(() => {});
export default function Finder({ c, url }) {
  const [q, setQ] = useState(''), [pay, setPay] = useState(false), [done, setDone] = useState(false), t = useRef();
  const demo = c.status === 'Demo';
  useEffect(() => { post({ slug: c.slug, type: 'view' }); }, [c.slug]);
  useEffect(() => { clearTimeout(t.current); if (q.trim().length > 2) t.current = setTimeout(() => post({ slug: c.slug, type: 'search' }), 900); }, [q, c.slug]);
  const book = s => { post({ slug: c.slug, type: 'click' }); s.l ? window.open(s.l, '_blank', 'noopener') : alert('No booking link set for this service.'); };
  const tx = encodeURIComponent(`Check out ${c.name} in ${c.city}`), u = encodeURIComponent(url);
  const sh = [['Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + u], ['X', `https://twitter.com/intent/tweet?text=${tx}&url=${u}`], ['WhatsApp', `https://wa.me/?text=${tx}%20${u}`], ['Email', `mailto:?subject=${tx}&body=${u}`]];
  const claim = async p => { await post({ slug: c.slug, type: 'pay', plan: p }); setDone(true); };
  return (<>
    <input className="big" style={{ borderColor: c.c1 }} value={q} onChange={e => setQ(e.target.value)} placeholder="Search service..." aria-label="Search service" />
    <Cards list={search(c.services, q)} onBook={book} />
    {demo && <><p className="mu">Demo by PrimeBlogNetworks SaaS</p><button className="btn gold" onClick={() => setPay(true)}>PAY NOW – Unlock Your Live Page – $70/month or $997 One-Time</button></>}
    <h2>Share</h2><div className="row">{sh.map(x => <a key={x[0]} className="btn s o" target="_blank" rel="noopener noreferrer" href={x[1]}>{x[0]}</a>)}<button className="btn s o" onClick={() => navigator.clipboard.writeText(url)}>Copy Link</button><button className="btn s o" onClick={() => { navigator.clipboard.writeText(`${c.name} – ${url}`); alert('Caption copied – paste it on Instagram'); }}>Instagram</button></div>
    {!demo && <p className="mu" style={{ marginTop: 24 }}><a href="/">Powered by PrimeBlogNetworks SaaS - Get Yours</a></p>}
    {pay && <div className="mo"><div><h2 style={{ marginTop: 0 }}>Unlock {c.name}</h2>
      {[['70', '$70/month SaaS Plan'], ['997', '$997 One-Time Plan']].map(([a, l]) => <p key={a}><b>{l}</b><br /><a className="btn gold" target="_blank" rel="noopener noreferrer" onClick={() => claim(a)} href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=primeblognetworks@gmail.com&item_name=${encodeURIComponent('PrimeBlogNetworks ' + c.name)}&amount=${a}&currency_code=USD`}>Pay ${a} with PayPal</a></p>)}
      <p>Or Remitly to M-Pesa <b>0710 330 056</b>, then <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/254710330056?text=${encodeURIComponent('Payment sent for ' + c.name)}`}>confirm on WhatsApp</a>.</p>
      <button className="btn" onClick={() => claim('70')}>I have paid – notify admin</button>{done && <p>Admin notified. Your page goes live once payment is confirmed.</p>}
      <p><button className="btn o" onClick={() => setPay(false)}>Close</button></p></div></div>}
  </>);
}
