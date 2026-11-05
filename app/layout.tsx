import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { SiteShell } from '@/components/site-chrome'
import { Analytics as ConsentAnalytics } from '@/components/analytics'
import { analyticsConfig } from '@/lib/analytics-config'
import {
  CONTACT_EMAIL,
  PHONE,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
} from '@/lib/site-data'
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


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s — MP WebLabs',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'MP WebLabs',
  authors: [{ name: 'MP WebLabs', url: SITE_URL }],
  creator: 'MP WebLabs',
  publisher: 'MP WebLabs',
  keywords: [
    'diseño web Madrid',
    'desarrollo web Madrid',
    'agencia web Madrid',
    'diseño web España',
    'agencia de diseño web en España',
    'diseño web a medida',
    'páginas web para empresas',
    'landing pages',
    'diseño web sin plantillas',
    'SEO local Madrid',
    'auditoría web gratis',
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
  // La imagen OG/Twitter se genera en app/opengraph-image.tsx
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'MP WebLabs',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f1efe9',
}

const BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'MP WebLabs',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/mpweblabs-logo.png`,
  image: `${SITE_URL}/mpweblabs-logo.png`,
  email: CONTACT_EMAIL,
  ...(PHONE ? { telephone: PHONE } : {}),
  ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS.map((s) => s.href) } : {}),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    addressCountry: 'ES',
  },
  areaServed: [
    { '@type': 'City', name: 'Madrid' },
    { '@type': 'Country', name: 'España' },
  ],
  knowsAbout: [
    'Diseño web',
    'Desarrollo web',
    'Diseño web Madrid',
    'Landing pages',
    'Branding',
    'SEO técnico',
    'SEO local',
  ],
}

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'MP WebLabs',
  url: SITE_URL,
  inLanguage: 'es-ES',
  publisher: { '@id': `${SITE_URL}/#business` },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { gaId, clarityId, hasConsentTools } = analyticsConfig()
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([BUSINESS_JSON_LD, WEBSITE_JSON_LD]),
          }}
        />
        <SiteShell hasConsentTools={hasConsentTools}>{children}</SiteShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ConsentAnalytics gaId={gaId} clarityId={clarityId} />
      </body>
    </html>
  )
}
