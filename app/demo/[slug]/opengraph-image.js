import { ImageResponse } from 'next/og';
import { load } from '@/lib/db';
export const size = { width: 1200, height: 630 }; export const contentType = 'image/png'; export const alt = 'Search and book online';
export default async function Img({ params }) { const d = await load(); const c = d.clients.find(x => x.slug === (await params).slug) || { name: 'PrimeBlogNetworks', city: '', c1: '#d4af37', c2: '#22c55e', niche: '' };
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(135deg,#0a0f0c,' + c.c2 + ')', color: c.c1, fontSize: 84, fontWeight: 800 }}><div>{c.name}</div><div style={{ fontSize: 40, color: '#fff' }}>{c.niche} · {c.city} · Search &amp; Book Online</div></div>, size); }
