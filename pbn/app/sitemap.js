import { load, SITE } from '@/lib/db';
export const dynamic = 'force-dynamic';
export default async function sitemap() {
  const d = await load(), s = SITE();
  return [{ url: s, lastModified: new Date(), priority: 1 }, { url: s + '/client' }, ...d.clients.map(c => ({ url: `${s}/${c.status === 'Demo' ? 'demo' : 'live'}/${c.slug}`, lastModified: new Date(), priority: c.status === 'Demo' ? 0.5 : 0.8 }))];
}
