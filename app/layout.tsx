import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppWidget } from '@/components/whatsapp-widget'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
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
  description: 'A refined Pilates studio in Hillside, Bulawayo. Standard, semi-private, and private one-on-one sessions with expert instruction.',
  keywords: ['Pilates', 'Bulawayo', 'Hillside', 'STOTT Pilates', 'Pilates studio', 'Zimbabwe', 'wellness', 'fitness'],
  openGraph: {
    title: 'Nirvana Pilates Studio | Hillside, Bulawayo',
    description: 'A refined STOTT Pilates experience in Hillside, Bulawayo.',
    type: 'website',
  },
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
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased scroll-smooth">
        {children}
        <WhatsAppWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
