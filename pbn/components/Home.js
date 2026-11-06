'use client';
import { useState } from 'react';
import Cards from './Cards';
import { search } from '@/lib/search';
const SAMP = { Barber: [['Classic Fade', 25, 'Marcus', 'Skin, low or high fade'], ['Beard Trim', 15, 'Marcus', 'Shape-up and line-up'], ['Hot Towel Shave', 30, 'Dre', 'Straight razor shave'], ['Kids Cut', 18, 'Dre', 'Haircut for boys under 12']],
  Hotel: [['King Suite', 240, 'Front Desk', 'Ocean-view suite with king bed'], ['Deluxe Double', 160, 'Front Desk', 'Two double beds, city view'], ['Airport Pickup', 40, 'Concierge', 'Private airport transfer'], ['Breakfast Package', 20, 'Kitchen', 'Buffet breakfast per guest']],
  Salon: [['Balayage', 180, 'Aisha', 'Hand-painted highlights'], ['Haircut & Style', 60, 'Lena', 'Wash, cut and blow-dry'], ['Keratin Treatment', 220, 'Aisha', 'Smoothing treatment'], ['Manicure', 35, 'Joy', 'Classic manicure']],
  Dentist: [['Teeth Whitening', 299, 'Dr. Patel', 'In-office whitening'], ['Dental Cleaning', 99, 'Hygienist', 'Scale and polish'], ['Dental Exam', 75, 'Dr. Patel', 'Check-up with X-rays'], ['Invisalign Consult', 50, 'Dr. Lee', 'Clear aligner assessment']] };
const ALL = Object.entries(SAMP).flatMap(([k, a]) => a.map(x => ({ n: x[0], p: x[1], s: x[2], d: x[3], img: '', k })));
export default function Home({ hero, live }) {
  const [tab, setTab] = useState('All'), [q, setQ] = useState(''), [pm, setPm] = useState('m'), [f, setF] = useState({ name: '', contact: '', text: '' }), [msg, setMsg] = useState('');
  const list = tab === 'All' ? ALL : ALL.filter(x => x.k === tab);
  const lead = async w => { await fetch('/api/public', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'lead', ...f }) }); const m = `Demo request – Business: ${f.name}; Contact: ${f.contact}; Services: ${f.text}`; setMsg('Request sent!'); if (w) window.open('https://wa.me/254710330056?text=' + encodeURIComponent(m), '_blank'); };
  return (<main className="w">
    <header><h1>{hero}</h1><h2 style={{ marginTop: 0 }} className="mu">Instant search, prices, staff, photos and BOOK NOW</h2>
      <p className="mu">Try it live – type <i>fade, balayage, king suite, whitening</i>:</p>
      <div className="tabs">{['All', ...Object.keys(SAMP)].map(k => <button key={k} className={k === tab ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>)}</div>
      <input className="big" value={q} onChange={e => setQ(e.target.value)} placeholder="Search service..." aria-label="Search services" />
      <Cards list={search(list, q).slice(0, 8)} onBook={() => alert('Sample demo – real pages open the client booking link.')} />
      <a className="btn gold" href="#getdemo">Get Your Demo</a></header>
    <h2>Live demos <small>(sample data)</small></h2>
    <div className="grid">{Object.keys(SAMP).map(k => <div className="box" key={k}><b>{k}</b><p className="mu">{SAMP[k].length} services, instant search</p><button className="btn s" onClick={() => { setTab(k); window.scrollTo(0, 0); }}>Try {k} demo</button></div>)}</div>
    {live.length > 0 && <><h2>Real live examples</h2><div className="grid">{live.map(c => <a className="box" key={c.slug} href={`/live/${c.slug}`}><b>{c.name}</b><br /><small>{c.city} · {c.niche}</small></a>)}</div></>}
    <h2>Benefits</h2><div className="grid">{['Branded logo and colors', 'Instant fuzzy search', 'Price + staff + photo + BOOK NOW', 'Mobile and desktop', 'Google SEO ready', '48h delivery', '30-day support'].map(x => <div className="box" key={x}>✔ {x}</div>)}</div>
    <h2>How it works in 3 steps</h2><div className="grid"><div className="box"><b>1. Get your demo</b><p className="mu">We build a branded search page from your services.</p></div><div className="box"><b>2. Approve and pay</b><p className="mu">PayPal or Remitly to M-Pesa unlocks your live page.</p></div><div className="box"><b>3. Go live</b><p className="mu">Link, embed code and QR code delivered to you.</p></div></div>
    <h2>Pricing</h2><div className="tabs"><button className={pm === 'm' ? 'on' : ''} onClick={() => setPm('m')}>Monthly $70/month</button><button className={pm === 'o' ? 'on' : ''} onClick={() => setPm('o')}>One-Time $997</button></div>
    <div className="grid"><div className={'box price ' + (pm === 'm' ? 'sel' : '')}><span className="tag">MOST POPULAR</span><b>SaaS Plan</b><div className="amt">$70<small>/month</small></div><p>Recurring monthly · Cancel anytime · Page stays live while subscribed · Includes updates + support</p></div>
      <div className={'box price ' + (pm === 'o' ? 'sel' : '')}><span className="tag">BEST VALUE</span><b>One-Time Plan</b><div className="amt">$997</div><p>One-Time Only · No monthly fee · Own it forever</p></div></div>
    <h2 id="getdemo">Get Your Demo</h2><div className="box"><input placeholder="Business name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /><input placeholder="Your email or WhatsApp" value={f.contact} onChange={e => setF({ ...f, contact: e.target.value })} /><textarea placeholder="Services you offer" value={f.text} onChange={e => setF({ ...f, text: e.target.value })} />
      <div className="row"><button className="btn gold" onClick={() => lead(true)}>Request on WhatsApp</button><button className="btn" onClick={() => lead(false)}>Send Request</button></div>{msg && <p>{msg}</p>}</div>
    <footer className="mu" style={{ marginTop: 30 }}>© PrimeBlogNetworks SaaS · <a href="mailto:primeblognetworks@gmail.com">primeblognetworks@gmail.com</a> · WhatsApp 0710330056</footer>
  </main>);
}
