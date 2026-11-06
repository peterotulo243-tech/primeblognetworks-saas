import Home from '@/components/Home';
import { load, SITE } from '@/lib/db';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'PrimeBlogNetworks SaaS – Instant Search & Booking Pages for Local Businesses', description: 'Turn any business website into a search engine that books clients automatically. Instant fuzzy search, prices, staff, photos and BOOK NOW. $70/month or $997 one-time.', alternates: { canonical: '/' }, openGraph: { title: 'PrimeBlogNetworks SaaS', description: 'Instant search and booking pages for local businesses.', url: '/' }, twitter: { title: 'PrimeBlogNetworks SaaS', description: 'Instant search and booking pages for local businesses.' } };
export default async function Page() {
  const d = await load(); const live = d.clients.filter(c => c.status !== 'Demo').map(c => ({ slug: c.slug, name: c.name, city: c.city, niche: c.niche }));
  const ld = { '@context': 'https://schema.org', '@graph': [{ '@type': 'SoftwareApplication', name: 'PrimeBlogNetworks SaaS', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: [{ '@type': 'Offer', price: '70', priceCurrency: 'USD' }, { '@type': 'Offer', price: '997', priceCurrency: 'USD' }] }, { '@type': 'Product', name: 'Business Search Page', description: 'Branded instant-search booking page', offers: { '@type': 'Offer', price: '997', priceCurrency: 'USD' } }, { '@type': 'LocalBusiness', name: 'PrimeBlogNetworks SaaS', email: 'primeblognetworks@gmail.com', url: SITE() }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /><Home hero={d.hero} live={live} /></>;
}
