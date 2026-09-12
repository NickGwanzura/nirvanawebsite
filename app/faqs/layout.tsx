import type { Metadata } from 'next'
export const metadata: Metadata = {
 title: 'Pilates FAQs', description: 'Find answers about your first Pilates class, booking, studio etiquette and monthly bundles at Nirvana Pilates Studio in Bulawayo.',
 alternates: { canonical: '/faqs' },
 openGraph: { title: 'Pilates FAQs', description: 'Find answers about your first Pilates class, booking, studio etiquette and monthly bundles at Nirvana Pilates Studio in Bulawayo.', url: '/faqs', images: ['/opengraph-image'] },
 twitter: { card: 'summary_large_image', title: 'Pilates FAQs', description: 'Find answers about your first Pilates class, booking, studio etiquette and monthly bundles at Nirvana Pilates Studio in Bulawayo.', images: ['/opengraph-image'] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
