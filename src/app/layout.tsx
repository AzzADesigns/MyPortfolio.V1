import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import { getImageProps } from 'next/image';

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AzzaDesigns - Portafolio profesional",
    description: "Portafolio profesional de AzzaDesigns, desarrollador web. Proyectos, habilidades y contacto.",
    icons: {
        icon: "/logoAzza.jpg",
    },
    openGraph:{
        title: "AzzaDesigns - Portafolio profesional",
        description: "Portafolio profesional de AzzaDesigns, desarrollador web. Proyectos, habilidades y contacto.",
        url: "https://azzadesigns.vercel.app/",
        siteName: "AzzaDesigns",
        images: [
            {
                url: "https://azzadesigns.vercel.app/logoAzza.jpg",
                width: 800,
                height: 600,
                alt: "AzzaDesigns",
            }
        ],
        locale: "es_ES",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
    }
};

const IMG_SIZES = '(max-width: 768px) 320px, (max-width: 1024px) 450px, 735px';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const locale = await getLocale();

    const {
        props: { srcSet: eveSrcSet, sizes: eveSizes, src: eveSrc },
    } = getImageProps({ src: '/header/eve.webp', alt: '', width: 735, height: 400, quality: 60, sizes: IMG_SIZES });

    const {
        props: { srcSet: cemSrcSet, sizes: cemSizes, src: cemSrc },
    } = getImageProps({ src: '/header/cem.webp', alt: '', width: 735, height: 400, quality: 60, sizes: IMG_SIZES });

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel="preload" as="image" href={eveSrc} imageSrcSet={eveSrcSet} imageSizes={eveSizes} media="(max-width: 768px)" fetchPriority="high" />
                <link rel="preload" as="image" href={cemSrc} imageSrcSet={cemSrcSet} imageSizes={cemSizes} media="(min-width: 769px)" fetchPriority="high" />
            </head>
            <body
                className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--textColor)]`}
                suppressHydrationWarning
            >
                <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
                    <NextIntlClientProvider>
                        {children}
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
