import { notFound, redirect } from 'next/navigation';
import Finder from '@/components/Finder';
import { load, pub, SITE } from '@/lib/db';
export async function getClient(slug, mode) {
  const d = await load(); const c = d.clients.find(x => x.slug === slug); if (!c) notFound();
  if (mode === 'demo' && c.status !== 'Demo') redirect('/live/' + slug);
  if (mode === 'live' && c.status === 'Demo') redirect('/demo/' + slug);
  return pub(c);
}
export function meta(c, mode) {
  const top = c.services.slice(0, 3).map(s => s.n).join(', '), t = `${c.name} ${c.city} – ${top} | Book Online`, desc = `Search and book ${top} at ${c.name} in ${c.city}. See prices, staff and availability instantly.`;
  return { title: t, description: desc, alternates: { canonical: `/${mode}/${c.slug}` }, openGraph: { title: t, description: desc, url: `/${mode}/${c.slug}`, type: 'website' }, twitter: { title: t, description: desc } };
}
export function View({ c, mode }) {
  const url = `${SITE()}/${mode}/${c.slug}`;
  const ld = { '@context': 'https://schema.org', '@graph': [{ '@type': 'LocalBusiness', name: c.name, address: c.city, url: c.site || url, makesOffer: c.services.map(s => ({ '@type': 'Offer', name: s.n, price: String(s.p), priceCurrency: 'USD' })) }, { '@type': 'Product', name: c.name + ' search page', offers: { '@type': 'Offer', price: '70', priceCurrency: 'USD' } }] };
  return (<main className="w" style={{ '--a': c.c1, '--b': c.c2 }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <h1 style={{ color: c.c1 }}>{c.logo && <img src={c.logo} alt={c.name + ' logo'} height="40" style={{ verticalAlign: 'middle', marginRight: 8 }} />}{c.name}</h1>
    <h2 style={{ marginTop: 0 }}>{c.niche} in {c.city}</h2><Finder c={c} url={url} /></main>);
}
