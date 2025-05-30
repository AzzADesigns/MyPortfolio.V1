import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {ThemeProvider} from "next-themes"

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
    title: "Mi Portfolio",
    description: "Landing page profesional desarrollada en Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--textColor)]`}
            >
                <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
                {children}
                </ThemeProvider>
            </body>
        </html>
    );
}