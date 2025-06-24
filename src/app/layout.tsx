import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';

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
    title: "AzzaDesigns",
    description: "Portafolio",
    icons: {
        icon: "/logo.jpg",
        shortcut: "/logo.jpg",       
        apple: "/apple-touch-icon.png", 
    },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--textColor)]`}
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
