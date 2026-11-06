import { getClient, meta, View } from '@/lib/clientPage';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) { const c = await getClient((await params).slug, 'demo'); return meta(c, 'demo'); }
export default async function Page({ params }) { const c = await getClient((await params).slug, 'demo'); return <View c={c} mode="demo" />; }
