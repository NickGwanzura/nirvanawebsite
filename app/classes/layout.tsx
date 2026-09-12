import type { Metadata } from 'next'
export const metadata: Metadata = {
 title: 'Pilates Classes & Prices', description: 'Explore standard, semi-private and private Pilates sessions in Hillside, Bulawayo. Classes from $15, with monthly bundles available.',
 alternates: { canonical: '/classes' },
 openGraph: { title: 'Pilates Classes & Prices', description: 'Explore standard, semi-private and private Pilates sessions in Hillside, Bulawayo. Classes from $15, with monthly bundles available.', url: '/classes', images: ['/opengraph-image'] },
 twitter: { card: 'summary_large_image', title: 'Pilates Classes & Prices', description: 'Explore standard, semi-private and private Pilates sessions in Hillside, Bulawayo. Classes from $15, with monthly bundles available.', images: ['/opengraph-image'] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
