import { getClient, meta, View } from '@/lib/clientPage';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) { const c = await getClient((await params).slug, 'live'); return meta(c, 'live'); }
export default async function Page({ params }) { const c = await getClient((await params).slug, 'live'); return <View c={c} mode="live" />; }
