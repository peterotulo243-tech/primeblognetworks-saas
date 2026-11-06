import { SITE } from '@/lib/db';
export default function robots() { return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] }], sitemap: SITE() + '/sitemap.xml' }; }
