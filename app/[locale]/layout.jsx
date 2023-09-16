import './globals.css'
import { Inter } from 'next/font/google'
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Providers from './Providers';
import NavBar from './components/NavBar/NavBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gustavo Clemente',
  description: 'Created with 💙 by Tato Clemente',
}

export default function RootLayout({ children, params }) {

  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
        <body className={inter.className}>
          <Providers locale={locale}>
            <NavBar locale={locale} />
            {children}
          </Providers>
        </body>
    </html>
  )
}
