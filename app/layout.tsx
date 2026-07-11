import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { SiteShell } from '@/components/site-chrome'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

const SITE_TITLE = 'MP WebLabs — Diseño y desarrollo web en Madrid'
const SITE_DESCRIPTION =
  'Agencia de diseño y desarrollo web en Madrid. Webs a medida que convierten visitas en clientes. Prototipo gratis en 48h. Pagas solo si te gusta.'

export const metadata: Metadata = {
  metadataBase: new URL('https://mpweblabs.com'),
  title: {
    default: SITE_TITLE,
    template: '%s — MP WebLabs',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'MP WebLabs',
  authors: [{ name: 'MP WebLabs', url: 'https://mpweblabs.com' }],
  creator: 'MP WebLabs',
  publisher: 'MP WebLabs',
  keywords: [
    'diseño web Madrid',
    'desarrollo web Madrid',
    'agencia web Madrid',
    'diseño web a medida',
    'páginas web para empresas',
    'landing pages',
    'diseño web sin plantillas',
    'prototipo web gratis',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
  openGraph: {
    type: 'website',
    url: '/',
    locale: 'es_ES',
    siteName: 'MP WebLabs',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/mpweblabs-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/mpweblabs-logo.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f1efe9',
}

const BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://mpweblabs.com/#business',
  name: 'MP WebLabs',
  description: SITE_DESCRIPTION,
  url: 'https://mpweblabs.com',
  logo: 'https://mpweblabs.com/mpweblabs-logo.png',
  image: 'https://mpweblabs.com/mpweblabs-logo.png',
  email: 'hola@mpweblabs.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    addressCountry: 'ES',
  },
  areaServed: {
    '@type': 'Country',
    name: 'España',
  },
  priceRange: '600€ - 5.000€',
  knowsAbout: [
    'Diseño web',
    'Desarrollo web',
    'Landing pages',
    'Branding',
    'SEO técnico',
  ],
}

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://mpweblabs.com/#website',
  name: 'MP WebLabs',
  url: 'https://mpweblabs.com',
  inLanguage: 'es-ES',
  publisher: { '@id': 'https://mpweblabs.com/#business' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([BUSINESS_JSON_LD, WEBSITE_JSON_LD]),
          }}
        />
        <SiteShell>{children}</SiteShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
