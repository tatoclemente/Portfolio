import './globals.css'
import { Inter } from 'next/font/google'
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Providers from './providers';
import NavBar from './components/NavBar/NavBar';
const inter = Inter({ subsets: ['latin'] })
import { Analytics } from '@vercel/analytics/react';
import { myPhoto } from '../assets/iamgeUrls';
import { keywords } from './utils/keywords';

export const metadata = {
  title: 'Gustavo Clemente - Full Stack Developer',
  description: 'Full Stack Developer especializado en React, Next.js, Angular y Node.js. Creando experiencias web modernas e innovadoras.',
  keywords: keywords,
  authors: [{ name: 'Gustavo Clemente', url: 'https://tatoclemente.dev' }],
  creator: 'Gustavo Clemente',
  publisher: 'Gustavo Clemente',
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
  verification: {
    google: 'GoGOoNMAZpvTtHfASnlM2bBKiVNup_DbhuSvY0q66eg',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  other: {
    'contact:email': 'soytatoclemente@gmail.com',
  },
  openGraph: {
    title: 'Gustavo Clemente - Full Stack Developer',
    description: 'Full Stack Developer especializado en React, Next.js y Node.js. Creando experiencias web modernas e innovadoras con código limpio y diseño centrado en el usuario.',
    url: 'https://tatoclemente.dev',
    siteName: "Gustavo Clemente Portfolio",
    images: [
      {
        url: myPhoto,
        width: 500,
        height: 500,
        alt: 'Gustavo Clemente - Full Stack Developer',
        type: 'image/webp',
      },
    ],
    locale: 'es_AR',
    type: 'website',
    emails: ['soytatoclemente@gmail.com'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gustavo Clemente - Full Stack Developer',
    description: 'Full Stack Developer especializado en React, Next.js, Angular, y Node.js. Creando experiencias web modernas e innovadoras.',
    images: [myPhoto],
    creator: '@tatoclemen',
  },
  alternates: {
    canonical: 'https://tatoclemente.dev',
    languages: {
      'en-US': '/en',
      'es-AR': '/es',
    },
  },
}

export default function RootLayout({ children, params }) {

  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* JSON-LD para datos estructurados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Gustavo Clemente",
              "jobTitle": "Full Stack Developer",
              "description": "Full Stack Developer especializado en React, Next.js, Angular y Node.js",
              "url": "https://tatoclemente.dev",
              "image": myPhoto,
              "sameAs": [
                "https://linkedin.com/in/tatoclemente",
                "https://github.com/tatoclemente",
                "https://x.com/tatoclemen"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "Angular",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "Python",
                "Full Stack Development",
                "Web Development"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelancer"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Córdoba",
                "addressCountry": "Argentina"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers locale={locale}>
          <NavBar locale={locale} />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
