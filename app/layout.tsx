import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nirvana Pilates Studio | Hillside, Bulawayo',
  description: 'A refined Pilates experience in Hillside, Bulawayo. Group sessions, semi-private training, and personalised one-on-one attention.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased scroll-smooth">
        {children}
        <WhatsAppWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
