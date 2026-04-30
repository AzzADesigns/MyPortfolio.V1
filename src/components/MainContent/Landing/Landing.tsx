'use client';

import localFont from 'next/font/local';
import { Sora } from 'next/font/google';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './shared/Navbar/Navbar';
import Hero from './header/hero/Hero';
import Projects from './header/proyects/Projects';
import Validation from './header/validation/Validation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    display: 'swap',
});

const momoSignature = localFont({
    src: '../../../../public/fonts/MomoSignature-Regular.ttf',
    variable: '--font-momo',
    display: 'swap',
});

export const Landing = () => {
    const container = useRef<HTMLDivElement>(null);
    // El estado y las animaciones de la Navbar se trasladaron a su propio componente

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // ─── Desktop & Tablet (Animación inmediata secuencial) ───
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline();
            tl.fromTo('.gsap-nav', { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
            tl.fromTo('.gsap-hero-text', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=0.4");
            tl.fromTo('.gsap-hero-image', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' }, "-=0.4");
            tl.fromTo('.gsap-hero-bg', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, "-=0.8");
            tl.fromTo('.gsap-hero-stat', { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=1");
        });

        // ─── Mobile (Animación por ScrollTrigger para optimizar carga visual) ───
        mm.add("(max-width: 767px)", () => {
            // La Navbar entra de inmediato siempre
            gsap.fromTo('.gsap-nav', { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
            
            // Textos del Hero
            gsap.fromTo('.gsap-hero-text', 
                { y: 50, autoAlpha: 0 }, 
                { scrollTrigger: { trigger: '.gsap-hero-text', start: "top 85%" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
            
            // Fondo animado e Imágenes
            gsap.fromTo('.gsap-hero-bg', 
                { scale: 0.5, autoAlpha: 0 }, 
                { scrollTrigger: { trigger: '.gsap-hero-bg', start: "top 85%" }, scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }
            );
            gsap.fromTo('.gsap-hero-image', 
                { scale: 0.8, autoAlpha: 0 }, 
                { scrollTrigger: { trigger: '.gsap-hero-bg', start: "top 85%" }, scale: 1, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)', delay: 0.2 }
            );
            
            // Estadísticas
            gsap.fromTo('.gsap-hero-stat', 
                { x: 50, autoAlpha: 0 }, 
                { scrollTrigger: { trigger: '.gsap-hero-stat', start: "top 95%" }, x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
        });

    }, { scope: container });

    return (
        <div
            ref={container}
            className={`min-h-screen w-full flex flex-col overflow-x-hidden ${momoSignature.variable} ${sora.variable}`}
            style={{
                backgroundColor: '#001720',
                backgroundImage: 'linear-gradient(to bottom right, rgba(3, 231, 245, 0.15) 0%, transparent 70%)',
                fontFamily: 'var(--font-sora), sans-serif'
            }}
        >
            <style>{`
                .gsap-nav, .gsap-hero-text, .gsap-hero-image, .gsap-hero-bg, .gsap-hero-stat {
                    visibility: hidden;
                    opacity: 0;
                }
                a, button {
                    -webkit-tap-highlight-color: transparent;
                }
            `}</style>
            <Navbar />

            {/* ─── HERO ───────────────────────────────────────────────────────── */}
            <section className="flex-1 flex flex-col lg:flex-row items-center relative mt-0 lg:mt-15 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 gap-16 lg:gap-8 min-h-screen lg:min-h-0 overflow-hidden lg:overflow-visible">

                <Hero />
                <Projects />
                <Validation />

            </section>
        </div>
    );
};
