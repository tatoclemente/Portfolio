import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: "Gustavo Clemente", url: site.url }],
  creator: "Gustavo Clemente",
  keywords: [
    "Tato Clemente",
    "Gustavo Clemente",
    "PADER",
    "desarrollo de software a medida",
    "sistemas de gestión",
    "agentes de IA",
    "automatización Mercado Libre",
    "automatización de procesos",
    "apps móviles",
    "Next.js",
    "Argentina",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: site.url,
    siteName: site.domain,
    title: site.title,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${bricolage.variable} ${geist.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
