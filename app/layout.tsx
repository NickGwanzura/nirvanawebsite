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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirvanapilatesbyo.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nirvana Pilates Studio | Hillside, Bulawayo',
    template: '%s | Nirvana Pilates Studio',
  },
  description: 'A refined STOTT Pilates studio in Hillside, Bulawayo. Standard, semi-private, and private one-on-one sessions with expert instruction. Book your class today.',
  keywords: ['Pilates', 'Bulawayo', 'Hillside', 'STOTT Pilates', 'Pilates studio', 'Zimbabwe', 'wellness', 'fitness', 'reformer', 'mat pilates'],
  authors: [{ name: 'Nirvana Pilates Studio' }],
  creator: 'Nirvana Pilates Studio',
  publisher: 'Nirvana Pilates Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Nirvana Pilates Studio | Hillside, Bulawayo',
    description: 'A refined STOTT Pilates experience in Hillside, Bulawayo. Standard, semi-private, and private one-on-one sessions.',
    type: 'website',
    locale: 'en_ZW',
    siteName: 'Nirvana Pilates Studio',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nirvana Pilates Studio | Hillside, Bulawayo',
    description: 'A refined STOTT Pilates experience in Hillside, Bulawayo. Book your session today.',
  },
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Nirvana Pilates Studio',
  description: 'A refined STOTT Pilates studio in Hillside, Bulawayo offering standard, semi-private, and private one-on-one sessions.',
  url: siteUrl,
  telephone: '+263719140346',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hillside',
    addressLocality: 'Bulawayo',
    addressCountry: 'ZW',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-20.1719',
    longitude: '28.5813',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '07:00',
      closes: '12:00',
    },
  ],
  priceRange: '$$',
  image: `${siteUrl}/images/studio-showcase.png`,
  sameAs: [
    'https://www.instagram.com/nirvanapilatesbyo',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased scroll-smooth">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
