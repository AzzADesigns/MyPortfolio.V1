import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import { getImageProps } from 'next/image';
import { WhatsAppButton } from '../components/MainContent/Landing/shared/WhatsAppButton';

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
    title: {
        default: "AzzaDesigns — Estudio de Productos Digitales",
        template: "%s | AzzaDesigns"
    },
    description: "Estudio unipersonal especializado en productos digitales de alto rendimiento. Desarrollo web, diseño UX/UI y arquitecturas modulares con estándares profesionales de agencia.",
    keywords: [
        "desarrollo web", "diseño UX/UI", "productos digitales",
        "estudio unipersonal", "desarrollo frontend", "Next.js", "GSAP",
        "optimización web", "performance", "animaciones web", "arquitectura modular",
        "diseño de interacción", "landing pages", "freelancer profesional"
    ],
    icons: {
        icon: "/logoAzza.jpg",
    },
    openGraph:{
        title: "AzzaDesigns — Estudio de Productos Digitales",
        description: "Estudio unipersonal especializado en productos digitales de alto rendimiento. Desarrollo web, diseño UX/UI y arquitecturas modulares con estándares profesionales de agencia.",
        url: "https://www.azzadesigns.dev/",
        siteName: "AzzaDesigns",
        images: [
            {
                url: "https://www.azzadesigns.dev/branding/AzzADesigns_logo.png",
                width: 1200,
                height: 630,
                alt: "AzzaDesigns — Estudio de Productos Digitales",
            }
        ],
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "AzzaDesigns — Estudio de Productos Digitales",
        description: "Estudio unipersonal especializado en productos digitales de alto rendimiento. Desarrollo web, diseño UX/UI y arquitecturas modulares con estándares profesionales de agencia.",
        images: ["https://www.azzadesigns.dev/branding/AzzADesigns_logo.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
        },
    },
    verification: {
        google: "YOUR_GOOGLE_VERIFICATION_CODE",
    },
    alternates: {
        canonical: "https://www.azzadesigns.dev",
    },
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "AzzaDesigns",
                            url: "https://www.azzadesigns.dev",
                            logo: "https://www.azzadesigns.dev/branding/AzzADesigns_logo.png",
                            description: "Estudio unipersonal de productos digitales. Desarrollo web, diseño UX/UI y arquitecturas modulares de alto rendimiento.",
                            foundingDate: "2024",
                            contactPoint: {
                                "@type": "ContactPoint",
                                contactType: "sales",
                                email: "contacto@azzadesigns.dev",
                                availableLanguage: ["Spanish", "English"],
                            },
                            sameAs: [],
                        }),
                    }}
                />
            </head>
            <body
                className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--textColor)]`}
                suppressHydrationWarning
            >
                <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
                    <NextIntlClientProvider>
                        {children}
                        <WhatsAppButton />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
