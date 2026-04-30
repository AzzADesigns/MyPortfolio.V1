'use client';

import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Sora } from 'next/font/google';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMenu, HiX, HiOutlineLightningBolt, HiOutlineCog, HiOutlinePencil, HiOutlineStar } from 'react-icons/hi';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
            gsap.to(menuContentRef.current, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.2)' });
            gsap.fromTo('.mobile-link', 
                { y: 30, opacity: 0, scale: 0.9 }, 
                { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)', delay: 0.1 }
            );
        } else {
            gsap.to('.mobile-link', { y: -20, opacity: 0, duration: 0.2, stagger: -0.05, ease: 'power2.in' });
            gsap.to(menuContentRef.current, { y: 50, autoAlpha: 0, duration: 0.4, ease: 'power3.in', delay: 0.1 });
            gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, ease: 'power2.in', delay: 0.2 });
        }
    }, { dependencies: [isMenuOpen], scope: container });

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
            {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
            <nav className="flex items-center justify-between fixed z-50 bottom-4 inset-x-4 lg:inset-x-auto lg:bottom-auto lg:top-0 lg:w-full mt-0 lg:mt-5 px-4 md:px-8 lg:px-16 py-2 md:py-3 lg:py-5 bg-[#001720]/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none rounded-2xl lg:rounded-none border border-white/10 lg:border-transparent shadow-lg shadow-black/20 lg:shadow-none">
                {/* Logo */}
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4 gsap-nav">
                    <Image
                        src="/branding/AzzADesigns.svg"
                        alt="AzzADesigns Logo"
                        width={60}
                        height={60}
                        className="object-contain w-[40px] h-[40px] md:w-[48px] md:h-[48px] lg:w-[60px] lg:h-[60px]"
                    />
                    <p
                        className="text-white text-[1.6rem] md:text-[1.8rem] lg:text-[2.2rem]"
                        style={{
                            fontFamily: 'var(--font-momo)',
                            letterSpacing: '0',
                            fontVariantLigatures: 'no-common-ligatures'
                        }}
                    >
                        <span style={{ color: '#89EA2B' }}>A</span>zzA
                        <span style={{ color: '#89EA2B' }}>D</span>esigns
                    </p>
                </div>

                {/* Nav links */}
                <div className="hidden lg:flex items-center gap-8 text-sm text-gray-400 font-medium gsap-nav">
                    <Link href="#servicios" className="hover:text-white active:scale-90 active:text-[#89EA2B] transition-all duration-200 inline-block">Servicios</Link>
                    <Link href="#metodologia" className="hover:text-white active:scale-90 active:text-[#89EA2B] transition-all duration-200 inline-block">Metodología</Link>
                    <Link href="#firma" className="hover:text-white active:scale-90 active:text-[#22d3ee] transition-all duration-200 inline-block">La firma</Link>
                    <Link href="#destacados" className="hover:text-white active:scale-90 active:text-[#22d3ee] transition-all duration-200 inline-block">Destacados</Link>
                    <Link
                        href="/portfolio"
                        className="text-white border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/10 active:scale-90 active:bg-white active:text-[#001720] transition-all duration-200 inline-block"
                    >
                        Portfolio
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden flex items-center gsap-nav">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white hover:text-[#89EA2B] active:scale-75 active:rotate-180 transition-all duration-300 cursor-pointer z-[60] relative"
                    >
                        {isMenuOpen ? <HiX size={32} /> : <HiMenu size={32} />}
                    </button>
                </div>
            </nav>

            {/* ─── OVERLAY MENU MOBILE ────────────────────────────────────────── */}
            <div className="lg:hidden">
                {/* Fondo oscuro desenfocado */}
                <div 
                    ref={overlayRef}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm opacity-0 invisible"
                    onClick={() => setIsMenuOpen(false)}
                />
                
                {/* Contenedor de Opciones (Grid Cards) */}
                <div 
                    ref={menuContentRef}
                    className="fixed inset-x-4 bottom-[85px] md:bottom-[95px] z-50 opacity-0 invisible translate-y-[50px]"
                >
                    <div className="bg-[#001720]/95 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem] shadow-2xl flex flex-col gap-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Link onClick={() => setIsMenuOpen(false)} href="#servicios" className="mobile-link flex flex-col items-center justify-center bg-white/5 hover:bg-[#89EA2B]/20 border border-white/5 hover:border-[#89EA2B]/50 active:scale-90 active:bg-[#89EA2B]/30 rounded-2xl py-6 text-white transition-all duration-200 group">
                                <HiOutlineLightningBolt className="text-[#89EA2B] text-3xl mb-2 group-hover:scale-110 group-active:-rotate-12 transition-transform" />
                                <span className="text-sm font-bold">Servicios</span>
                            </Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="#metodologia" className="mobile-link flex flex-col items-center justify-center bg-white/5 hover:bg-[#89EA2B]/20 border border-white/5 hover:border-[#89EA2B]/50 active:scale-90 active:bg-[#89EA2B]/30 rounded-2xl py-6 text-white transition-all duration-200 group">
                                <HiOutlineCog className="text-[#89EA2B] text-3xl mb-2 group-hover:scale-110 group-active:rotate-90 transition-transform" />
                                <span className="text-sm font-bold">Metodología</span>
                            </Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="#firma" className="mobile-link flex flex-col items-center justify-center bg-white/5 hover:bg-[#22d3ee]/20 border border-white/5 hover:border-[#22d3ee]/50 active:scale-90 active:bg-[#22d3ee]/30 rounded-2xl py-6 text-white transition-all duration-200 group">
                                <HiOutlinePencil className="text-[#22d3ee] text-3xl mb-2 group-hover:scale-110 group-active:-rotate-12 transition-transform" />
                                <span className="text-sm font-bold">La firma</span>
                            </Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="#destacados" className="mobile-link flex flex-col items-center justify-center bg-white/5 hover:bg-[#22d3ee]/20 border border-white/5 hover:border-[#22d3ee]/50 active:scale-90 active:bg-[#22d3ee]/30 rounded-2xl py-6 text-white transition-all duration-200 group">
                                <HiOutlineStar className="text-[#22d3ee] text-3xl mb-2 group-hover:scale-110 group-active:scale-150 transition-transform" />
                                <span className="text-sm font-bold">Destacados</span>
                            </Link>
                        </div>
                        <Link onClick={() => setIsMenuOpen(false)} href="/portfolio" className="mobile-link mt-2 w-full flex items-center justify-center bg-gradient-to-r from-[#4ade80] to-[#22d3ee] rounded-2xl py-4 text-[#001720] text-lg font-extrabold shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] active:scale-95 active:shadow-none active:opacity-80 transition-all duration-200">
                            Explorar Portfolio
                        </Link>
                    </div>
                </div>
            </div>

            {/* ─── HERO ───────────────────────────────────────────────────────── */}
            <section className="flex-1 flex flex-col lg:flex-row items-center relative mt-0 lg:mt-15 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 gap-16 lg:gap-8 min-h-screen lg:min-h-0 overflow-hidden lg:overflow-visible">

                {/* ── Columna Izquierda: Texto ──────────────────────────────────── */}
                <div className="flex flex-col gap-8 lg:gap-10 2xl:gap-17 w-full max-w-[600px] lg:max-w-[400px] xl:max-w-[480px] 2xl:max-w-[580px] flex-shrink-0 items-center text-center lg:items-start lg:text-left z-20">
                    <h1 className="text-4xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-[70px] leading-tight lg:leading-snug 2xl:leading-25 text-white gsap-hero-text">
                        El puente entre<br className="hidden lg:block" />
                        la{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee)' }}
                        >
                            idea
                        </span>{' '}
                        y {' '}<br className="hidden lg:block" />
                        el{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee)' }}
                        >
                            producto
                        </span>
                    </h1>

                    <p className="text-[#D7D7D7] text-base md:text-lg lg:text-sm xl:text-base 2xl:text-[18px] tracking-normal lg:-tracking-tighter leading-relaxed lg:leading-7 2xl:leading-10 max-w-[400px] md:max-w-none lg:max-w-[380px] 2xl:max-w-[540px] gsap-hero-text">
                        Construyo productos digitales de alto rendimiento.
                        Desde la optimización inicial y el diseño UX/UI, hasta
                        la escalabilidad y el mantenimiento constante
                        para que tu idea nunca deje de avanzar
                    </p>

                    <div className="gsap-hero-text w-fit mt-2 lg:mt-0">
                        <button
                            className="relative group overflow-hidden w-fit px-6 py-4 lg:px-5 lg:py-3 2xl:px-7 2xl:py-5 text-base lg:text-sm 2xl:text-[18px] font-extrabold tracking-normal lg:-tracking-tighter text-[#001720] rounded-[16px] bg-[#89EA2B] hover:scale-105 hover:shadow-[0_0_40px_rgba(74,222,128,0.6)] active:scale-90 active:-rotate-2 active:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300">
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-move"
                                style={{ backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee, #4ade80)' }}
                            />
                            <span className="relative z-10">Empezar mi proyecto hoy</span>
                        </button>
                    </div>
                </div>

                {/* ── Columna Central: Imágenes flotantes ───────────────────────── */}
                <div className="relative w-full lg:flex-1 h-[300px] md:h-[500px] lg:h-[400px] 2xl:h-auto flex items-center justify-center my-10 lg:my-0 z-10">
                    {/* Imagen izquierda — olab */}
                    <div className="absolute animate-float-sutil-1 gsap-hero-image" style={{ zIndex: 2 }}>
                        <div className="w-[220px] md:w-[450px] lg:w-[320px] xl:w-[450px] 2xl:w-[735px] -translate-x-[60px] md:-translate-x-[110px] lg:-translate-x-[90px] xl:-translate-x-[120px] 2xl:-translate-x-[190px] -translate-y-[25px] md:-translate-y-[50px] lg:-translate-y-[40px] xl:-translate-y-[50px] 2xl:-translate-y-[80px]">
                            <Image
                                src="/header/olab.webp"
                                alt="OpenLabs project"
                                width={735}
                                height={400}
                                className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Imagen derecha — eve */}
                    <div className="absolute animate-float-sutil-2 gsap-hero-image" style={{ zIndex: 1 }}>
                        <div className="w-[220px] md:w-[450px] lg:w-[320px] xl:w-[450px] 2xl:w-[735px] translate-x-[25px] md:translate-x-[85px] lg:translate-x-[35px] xl:translate-x-[45px] 2xl:translate-x-[70px] -translate-y-[40px] md:-translate-y-[80px] lg:-translate-y-[60px] xl:-translate-y-[70px] 2xl:-translate-y-[120px]">
                            <Image
                                src="/header/eve.webp"
                                alt="Evelazquez project"
                                width={735}
                                height={400}
                                className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Imagen frontal central — cem */}
                    <div className="absolute animate-float-sutil-3 gsap-hero-image" style={{ zIndex: 3 }}>
                        <div className="w-[250px] md:w-[500px] lg:w-[350px] xl:w-[480px] 2xl:w-[735px] translate-x-[15px] md:translate-x-[55px] lg:translate-x-[20px] xl:translate-x-[30px] 2xl:translate-x-[45px] translate-y-[20px] md:translate-y-[40px] lg:translate-y-[30px] xl:translate-y-[40px] 2xl:translate-y-[60px]">
                            <Image
                                src="/header/cem.webp"
                                alt="CEM Elearning project"
                                width={735}
                                height={400}
                                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] 2xl:drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)] transition-transform duration-500 object-contain"
                            />
                        </div>
                    </div>

                    {/* Gran arco decorativo de fondo y flecha */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
                        {/* Círculo completo y flecha anidada */}
                        <div
                            className="absolute border-[3px] border-[#89EA2B]/90 rounded-full gsap-hero-bg w-[280px] h-[280px] md:w-[450px] md:h-[450px] lg:w-[320px] lg:h-[320px] xl:w-[450px] xl:h-[450px] 2xl:w-[550px] 2xl:h-[550px] lg:top-1/2 lg:left-[56%] lg:-translate-x-[72%] lg:-translate-y-[40%]"
                        >
                            {/* Flecha grande animada */}
                            <svg 
                                className="absolute -bottom-[5px] md:-bottom-[5px] left-1/2 -translate-x-1/2 animate-bounce" 
                                width="48" 
                                height="72"
                                viewBox="0 0 24 36"
                                fill="none" 
                                stroke="#D1D5DB" 
                                strokeWidth="3" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <line x1="12" y1="0" x2="12" y2="32"></line>
                                <polyline points="5 25 12 32 19 25"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ── Columna Derecha: Stats + Sociales ────────────────────────── */}
                <div className="flex flex-col gap-10 lg:gap-16 2xl:gap-50 mt-4 lg:mt-0 items-center lg:items-end flex-shrink-0 z-20 w-full lg:w-auto pb-16 lg:pb-0">
                    <div className="flex flex-row lg:flex-col gap-4 md:gap-20 lg:gap-12 2xl:gap-50 w-full justify-center lg:justify-end px-2">
                        {/* Stat 1 */}
                        <div className="text-center lg:text-right gsap-hero-stat flex-1 lg:flex-auto">
                            <p className="font-bold flex items-baseline justify-center lg:justify-end gap-1 md:gap-2">
                               <span className='text-[#22d3ee] text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-[55px]'>+3</span>
                               <span className="text-xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-[55px]">Años</span>
                            </p>
                            <p className="text-gray-400 text-[11px] md:text-base lg:text-xs xl:text-sm 2xl:text-[25px] mt-1 leading-tight">De especialización</p>
                        </div>

                        {/* Stat 2 */}
                        <div className="text-center lg:text-right gsap-hero-stat flex-1 lg:flex-auto">
                            <p className="font-extrabold flex items-baseline justify-center lg:justify-end gap-1 md:gap-2">
                                <span className='text-[#22d3ee] text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-[55px]'>+7</span>
                                <span className="text-lg md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-[55px]">productos</span>
                            </p>
                            <p className="text-gray-400 text-[11px] md:text-base lg:text-xs xl:text-sm 2xl:text-[25px] mt-1 leading-tight">lanzados</p>
                        </div>
                    </div>

                    {/* Separador */}
                    <div className="hidden lg:block w-[15%] bg-[#89EA2B] absolute bottom-0 right-0 h-2" />

                    {/* Redes sociales */}
                    <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-4 xl:gap-6 2xl:gap-10 gsap-hero-stat mt-4 lg:mt-0">
                        <Link
                            href="https://www.linkedin.com/in/azariel-moreno/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group hover:scale-110 active:scale-75 active:-rotate-12 transition-all duration-300 block w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[40px] lg:h-[40px] xl:w-[50px] xl:h-[50px] 2xl:w-[80px] 2xl:h-[80px]"
                        >
                            <Image src="/branding/in.svg" alt="LinkedIn" fill className="object-contain group-hover:opacity-0 transition-opacity duration-300" />
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-move"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee, #4ade80)',
                                    WebkitMaskImage: `url('/branding/in.svg')`,
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskImage: `url('/branding/in.svg')`,
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center'
                                }}
                            />
                        </Link>
                        
                        <Link
                            href="https://www.tiktok.com/@azzadesigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group hover:scale-110 active:scale-75 active:rotate-12 transition-all duration-300 block w-[45px] h-[50px] md:w-[50px] md:h-[60px] lg:w-[35px] lg:h-[40px] xl:w-[45px] xl:h-[50px] 2xl:w-[70px] 2xl:h-[80px]"
                        >
                            <Image src="/branding/ticktok.svg" alt="TikTok" fill className="object-contain group-hover:opacity-0 transition-opacity duration-300" />
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-move"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee, #4ade80)',
                                    WebkitMaskImage: `url('/branding/ticktok.svg')`,
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskImage: `url('/branding/ticktok.svg')`,
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center'
                                }}
                            />
                        </Link>

                        <Link
                            href="https://www.instagram.com/azzadesigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group hover:scale-110 active:scale-75 active:-rotate-12 transition-all duration-300 block w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[40px] lg:h-[40px] xl:w-[50px] xl:h-[50px] 2xl:w-[80px] 2xl:h-[80px]"
                        >
                            <Image src="/branding/instagram.svg" alt="Instagram" fill className="object-contain group-hover:opacity-0 transition-opacity duration-300" />
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-move"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee, #4ade80)',
                                    WebkitMaskImage: `url('/branding/instagram.svg')`,
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskImage: `url('/branding/instagram.svg')`,
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center'
                                }}
                            />
                        </Link>
                    </div>
                </div>

            </section>
        </div>
    );
};
