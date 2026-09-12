import type { Metadata } from 'next'
export const metadata: Metadata = {
 title: 'About Our Studio', description: 'Meet the team behind Nirvana Pilates Studio in Hillside, Bulawayo. Discover our approach to thoughtful movement and personal instruction.',
 alternates: { canonical: '/about' },
 openGraph: { title: 'About Our Studio', description: 'Meet the team behind Nirvana Pilates Studio in Hillside, Bulawayo. Discover our approach to thoughtful movement and personal instruction.', url: '/about', images: ['/opengraph-image'] },
 twitter: { card: 'summary_large_image', title: 'About Our Studio', description: 'Meet the team behind Nirvana Pilates Studio in Hillside, Bulawayo. Discover our approach to thoughtful movement and personal instruction.', images: ['/opengraph-image'] },
}
export default function Layout({ children }: { children: React.ReactNode }) { return children }
