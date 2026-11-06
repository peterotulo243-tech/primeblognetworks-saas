import { money } from '@/lib/search';
export default function Cards({ list, onBook }) {
  if (!list.length) return <p className="mu">No results – try another word.</p>;
  return list.map((s, i) => (
    <div className="card" key={i}>
      <div className="ph">{s.img ? <img src={s.img} alt={s.n} /> : s.n[0]}</div>
      <div><b>{s.n}</b><span className="pr">{money(s.p)}</span><br /><small>{s.s ? 'with ' + s.s : ''}{s.k ? ' · ' + s.k : ''}</small><div className="mu">{s.d}</div></div>
      <button className="btn gold" onClick={() => onBook(s)}>BOOK NOW</button>
    </div>));
}
