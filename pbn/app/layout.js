import './globals.css';
import Script from 'next/script';
import Link from 'next/link';
import { SITE } from '@/lib/db';
export const metadata = {
  metadataBase: new URL(SITE()),
  title: { default: 'PrimeBlogNetworks SaaS – Instant Search & Booking Pages for Local Businesses', template: '%s' },
  description: 'Turn any business website into a search engine that books clients automatically. $70/month or $997 one-time.',
  alternates: { canonical: '/' }, robots: { index: true, follow: true },
  openGraph: { type: 'website', siteName: 'PrimeBlogNetworks SaaS' }, twitter: { card: 'summary_large_image' },
  verification: process.env.GSC_VERIFICATION ? { google: process.env.GSC_VERIFICATION } : undefined,
};
export const viewport = { width: 'device-width', initialScale: 1 };
export default function Root({ children }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (<html lang="en"><body>
    {ga && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" /><Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script></>}
    <nav><b>PrimeBlogNetworks SaaS</b><span><Link href="/">Home</Link><Link href="/client">Client Login</Link><Link href="/admin">Admin</Link></span></nav>
    {children}
  </body></html>);
}
