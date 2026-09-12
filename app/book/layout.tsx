import type { Metadata } from 'next'
export const metadata: Metadata = {
 title: 'Book a Pilates Session', description: 'Choose your Pilates session, date and time at Nirvana Pilates Studio in Hillside, Bulawayo. Standard, semi-private and private classes available.',
 alternates: { canonical: '/book' },
 openGraph: { title: 'Book a Pilates Session', description: 'Choose your Pilates session, date and time at Nirvana Pilates Studio in Hillside, Bulawayo. Standard, semi-private and private classes available.', url: '/book', images: ['/opengraph-image'] },
 twitter: { card: 'summary_large_image', title: 'Book a Pilates Session', description: 'Choose your Pilates session, date and time at Nirvana Pilates Studio in Hillside, Bulawayo. Standard, semi-private and private classes available.', images: ['/opengraph-image'] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
