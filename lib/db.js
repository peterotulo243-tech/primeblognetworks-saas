import { getStore } from '@netlify/blobs';
import fs from 'fs';
const FILE = '/tmp/pbn-db.json';
const EMPTY = () => ({ clients: [], pays: [], notes: [], reqs: [], ads: [], sites: [], plats: ['Facebook','Instagram','TikTok','Google','Website Contact Form','Email'], hero: 'Turn Any Business Website Into A Search Engine That Books Clients Automatically', made: 0 });
const onNetlify = () => !!(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);
const store = () => getStore({ name: 'pbn', consistency: 'strong' });
export async function load() {
  try {
    if (onNetlify()) return { ...EMPTY(), ...((await store().get('db', { type: 'json' })) || {}) };
    return { ...EMPTY(), ...JSON.parse(fs.readFileSync(FILE, 'utf8')) };
  } catch { return EMPTY(); }
}
async function save(d) { if (onNetlify()) await store().setJSON('db', d); else fs.writeFileSync(FILE, JSON.stringify(d)); }
export async function mutate(fn) { const d = await load(); const r = await fn(d); await save(d); return r; }
export const note = (d, t) => { d.notes.unshift({ t, d: new Date().toISOString() }); d.notes = d.notes.slice(0, 200); };
export const pub = c => { const { email, code, ...p } = c; return p; };
export const slugify = n => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'client';
export const SITE = () => (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
