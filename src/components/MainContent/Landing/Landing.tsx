'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Landing.css';
import { Hero, Projects, Validation, AuroraBackground } from './header';
import { Navbar, CTAButton, CustomCursor, useLandingEntrance, useServicesEntrance, useServicesScrollDetection, sora, momoSignature } from './shared';
import { Services, ServicesHandle } from './services';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Subcomponente interactivo para las palabras resaltadas con efecto disruptivo ligado al cursor
const HoverWord = ({ 
    id,
    baseText,
    completionText,
    colorClass = "text-white",
    hoveredWord,
    setHoveredWord,
    onScan
}: { 
    id: string, 
    baseText: string, 
    completionText: string, 
    colorClass?: string,
    hoveredWord: string | null,
    setHoveredWord: (id: string | null) => void,
    onScan: (id: string) => void
}) => {
    const isHovered = hoveredWord === id;
    const isOtherHovered = hoveredWord !== null && hoveredWord !== id;
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const scanRef = useRef<HTMLSpanElement>(null);
    const wordContentRef = useRef<HTMLSpanElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isScanned, setIsScanned] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    // Efecto de Typewriter para el texto del HUD
    useEffect(() => {
        if (isScanned) {
            let i = 0;
            setDisplayedText("");
            const interval = setInterval(() => {
                setDisplayedText(completionText.slice(0, i + 1));
                i++;
                if (i >= completionText.length) clearInterval(interval);
            }, 25);
            return () => clearInterval(interval);
        } else {
            setDisplayedText("");
        }
    }, [isScanned, completionText]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseEnter = (e: React.MouseEvent) => {
        setHoveredWord(id);
        setIsScanned(false);
        
        // 1. Efecto de Láser Escáner sobre la palabra
        if (scanRef.current && wordContentRef.current) {
            gsap.killTweensOf([scanRef.current, wordContentRef.current]);
            
            // Barrido de la línea láser (ajustado para ser más ágil pero perceptible)
            gsap.fromTo(scanRef.current,
                { left: '0%', opacity: 0 },
                { 
                    left: '100%', 
                    opacity: 1, 
                    duration: 0.45, 
                    ease: "power2.inOut",
                    onComplete: () => {
                        setIsScanned(true);
                        onScan(id); // Notificar al padre que esta palabra fue escaneada
                    }
                }
            );
            gsap.to(scanRef.current, {
                opacity: 0,
                duration: 0.2,
                delay: 0.45
            });

            // Resplandor temporal de la palabra mientras es "leída"
            gsap.fromTo(wordContentRef.current,
                { color: '#07F8F2', filter: 'brightness(1.5) blur(1px)' },
                { color: '', filter: 'brightness(1) blur(0px)', duration: 0.4, delay: 0.15, clearProps: "color,filter" }
            );
        }

        // 2. Pre-posicionamiento del HUD (Adaptativo por Breakpoint)
        if (tooltipRef.current) {
            gsap.killTweensOf(tooltipRef.current);
            
            const rect = tooltipRef.current.getBoundingClientRect();
            const realWidth = rect.width || (window.innerWidth < 768 ? 260 : 380);
            const realHeight = rect.height || 160;
            const ww = window.innerWidth;

            let targetX, targetY, lx1, ly1, lx2, ly2;

            if (ww >= 1536) {
                // 2XL: Offset fijo 40,40 (Derecha-Abajo)
                targetX = e.clientX + 40;
                targetY = e.clientY + 40;
                lx1 = -40; ly1 = -40; lx2 = 0; ly2 = 0;
            } else if (ww >= 1024) {
                // LG a XL: Centrado horizontal + Línea Recta Arriba
                targetX = ww / 2 - realWidth / 2;
                targetY = e.clientY - realHeight - 80;
                // Coordenadas relativas al HUD (su 0,0 es targetX, targetY)
                lx1 = e.clientX - targetX; 
                ly1 = e.clientY - targetY;
                lx2 = lx1; // Línea recta vertical
                ly2 = realHeight;
            } else {
                // Mobile/Tablet: Centrado arriba
                targetX = ww / 2 - realWidth / 2;
                targetY = e.clientY - realHeight - 60;
                lx1 = e.clientX - targetX; ly1 = e.clientY - targetY;
                lx2 = realWidth / 2; ly2 = realHeight;
            }

            // Seteamos la posición inicial y lo preparamos para el estiramiento (escalaX: 0)
            gsap.set(tooltipRef.current, { 
                x: targetX, 
                y: targetY,
                scaleX: 0,
                transformOrigin: "left center",
                opacity: 0
            });

            // Sincronizar el láser (SOLO en 2XL+)
            const svgLine = tooltipRef.current.querySelector('svg');
            
            if (svgLine) {
                if (ww >= 1536) {
                    gsap.set(svgLine, { opacity: 1 });
                    const line = svgLine.querySelector('line');
                    const circles = svgLine.querySelectorAll('circle');
                    if (line && circles.length >= 2) {
                        gsap.set(line, { attr: { x1: lx1, y1: ly1, x2: lx2, y2: ly2 } });
                        gsap.set(circles[0], { attr: { cx: lx1, cy: ly1 } });
                        gsap.set(circles[1], { attr: { cx: lx2, cy: ly2 } });
                    }
                } else {
                    gsap.set(svgLine, { opacity: 0 });
                }
            }

            // 3. Reveal Holográfico (Estiramiento de izquierda a derecha)
            gsap.to(tooltipRef.current, {
                scaleX: 1,
                opacity: 1,
                duration: 0.5,
                delay: 0.45,
                ease: "power3.out"
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (tooltipRef.current && hoveredWord === id) {
            const rect = tooltipRef.current.getBoundingClientRect();
            const realWidth = rect.width;
            const realHeight = rect.height;
            const ww = window.innerWidth;

            let targetX, targetY, lx1, ly1, lx2, ly2;

            if (ww >= 1536) {
                targetX = e.clientX + 40;
                targetY = e.clientY + 40;
                lx1 = -40; ly1 = -40; lx2 = 0; ly2 = 0;
            } else if (ww >= 1024) {
                targetX = ww / 2 - realWidth / 2;
                targetY = e.clientY - realHeight - 80;
                lx1 = e.clientX - targetX; 
                ly1 = e.clientY - targetY;
                lx2 = lx1;
                ly2 = realHeight;
            } else {
                targetX = ww / 2 - realWidth / 2;
                targetY = e.clientY - realHeight - 60;
                lx1 = e.clientX - targetX; ly1 = e.clientY - targetY;
                lx2 = realWidth / 2; ly2 = realHeight;
            }

            // Animación mecánica y rápida
            gsap.to(tooltipRef.current, {
                x: targetX,
                y: targetY,
                duration: 0.15,
                ease: "power2.out"
            });

            // Actualizar láser (SOLO en 2XL+)
            const svgLine = tooltipRef.current.querySelector('svg');
            if (svgLine) {
                if (ww >= 1536) {
                    gsap.set(svgLine, { opacity: 1 });
                    const line = svgLine.querySelector('line');
                    const circles = svgLine.querySelectorAll('circle');
                    if (line && circles.length >= 2) {
                        gsap.set(line, { attr: { x1: lx1, y1: ly1, x2: lx2, y2: ly2 } });
                        gsap.set(circles[0], { attr: { cx: lx1, cy: ly1 } });
                        gsap.set(circles[1], { attr: { cx: lx2, cy: ly2 } });
                    }
                } else {
                    gsap.set(svgLine, { opacity: 0 });
                }
            }
        }
    };

    const handleMouseLeave = () => {
        setHoveredWord(null);
        if (tooltipRef.current) {
            gsap.killTweensOf(tooltipRef.current);
            // Desaparición rápida
            gsap.to(tooltipRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.15,
                ease: "power2.in"
            });
        }
        if (scanRef.current && wordContentRef.current) {
            gsap.killTweensOf([scanRef.current, wordContentRef.current]);
            gsap.to(scanRef.current, { opacity: 0, duration: 0.1 });
            gsap.set(wordContentRef.current, { clearProps: "all" });
        }
    };

    return (
        <strong 
            role="button"
            className={`manifesto-highlight inline-block font-medium relative z-20 transition-all duration-500 cursor-pointer
                ${colorClass} 
                ${isHovered ? 'scale-110 -translate-y-1' : ''} 
                ${isOtherHovered ? 'blur-[4px] opacity-40' : ''}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <span 
                ref={wordContentRef} 
                className={`inline-block relative z-10 transition-all duration-500 ${
                    isScanned 
                        ? (id === 'premium' 
                            ? 'bg-gradient-to-r from-[#07F8F2] to-[#89EA2B] bg-clip-text text-transparent font-bold' 
                            : 'text-[#07F8F2]') 
                        : ''
                }`}
            >
                {baseText}
            </span>
            
            {/* Láser de Escaneo Holo-óptico (se activa por GSAP) */}
            <span 
                ref={scanRef}
                className="absolute top-0 left-0 w-1 md:w-[6px] h-full bg-[#07F8F2] opacity-0 pointer-events-none z-30"
                style={{ 
                    boxShadow: '0 0 15px 3px rgba(7,248,242,0.8), 0 0 30px 8px rgba(137,234,43,0.4)',
                    borderRadius: '4px'
                }}
            ></span>
            
            {/* Panel HUD disruptivo renderizado en el Root, proyectado desde el dron */}
            {mounted && createPortal(
                <span 
                    ref={tooltipRef}
                    className={`fixed top-0 left-0 w-max max-w-[320px] md:max-w-[480px] 2xl:max-w-[500px] whitespace-normal text-left px-6 md:px-8 py-5 md:py-6 bg-[#001720]/90 backdrop-blur-xl border border-[#07F8F2]/30 text-[#07F8F2] font-mono pointer-events-none z-[9999] uppercase opacity-0
                    shadow-[0_0_50px_rgba(7,248,242,0.15),inset_0_0_20px_rgba(7,248,242,0.05)]
                `}
                style={{ transformOrigin: '0 0' }} // El escalado nace exactamente desde el punto de anclaje
                >
                    {/* Línea conectora al cursor (Láser de proyección del dron dinámico) - Solo visible en 2XL */}
                    <svg className="absolute top-0 left-0 w-full h-full overflow-visible transition-opacity duration-300 opacity-0 2xl:opacity-100">
                        <line x1="-40" y1="-40" x2="0" y2="0" stroke="#07F8F2" strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
                        <circle cx="-40" cy="-40" r="3" fill="#07F8F2" className="animate-pulse" />
                        <circle cx="0" cy="0" r="2" fill="#89EA2B" />
                    </svg>

                    {/* Encabezado Técnico HUD */}
                    <span className="flex items-center gap-2 text-[10px] md:text-xs 2xl:text-[10px] text-[#89EA2B] mb-3 opacity-90 tracking-[0.2em] font-sans font-bold">
                        <span className="w-2 h-2 2xl:w-1.5 2xl:h-1.5 bg-[#89EA2B] rounded-sm animate-pulse"></span>
                        DRONE_LINK // ACQUIRED
                    </span>
                    
                    {/* Texto principal ampliado con Typewriter */}
                    <span className="block text-base xs:text-lg md:text-xl lg:text-[1.3rem] xl:text-[1.5rem] 2xl:text-[1.2rem] font-semibold leading-snug tracking-tight min-h-[1.5em]">
                        {displayedText}
                        <span className="animate-pulse inline-block ml-2 bg-[#07F8F2] w-2.5 h-4 md:h-6 2xl:w-2 2xl:h-4 translate-y-1 md:translate-y-1.5 2xl:translate-y-0.5"></span>
                    </span>

                    {/* Decoraciones de esquina tipo Interfaz HUD */}
                    <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#89EA2B]/50"></span>
                    <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#89EA2B]/50"></span>
                    <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#89EA2B]/50"></span>
                </span>,
                document.body
            )}
        </strong>
    );
};

export const Landing = () => {
    const { containerRef } = useLandingEntrance();
    useServicesEntrance(containerRef);
    const servicesRef = useRef<ServicesHandle>(null);
    const manifestoRef = useRef<HTMLElement>(null);
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);
    const [scannedWords, setScannedWords] = useState<Set<string>>(new Set());
    const [showRewardCard, setShowRewardCard] = useState(false);
    const [isOpeningReward, setIsOpeningReward] = useState(false);
    const [hasSeenReward, setHasSeenReward] = useState(false);

    const handleScan = (id: string) => {
        setScannedWords(prev => {
            const newSet = new Set(prev).add(id);
            return newSet;
        });
    };

    const allScanned = scannedWords.size === 7;

    useEffect(() => {
        if (allScanned && !hasSeenReward) {
            const delayTimer = setTimeout(() => {
                setIsOpeningReward(true);
                const finalTimer = setTimeout(() => {
                    setIsOpeningReward(false);
                    setShowRewardCard(true);
                    setHasSeenReward(true);
                }, 2000);
                return () => clearTimeout(finalTimer);
            }, 1500);
            return () => clearTimeout(delayTimer);
        }
    }, [allScanned, hasSeenReward]);

    useServicesScrollDetection(containerRef, servicesRef);

    useGSAP(() => {
        if (!manifestoRef.current || !containerRef.current) return;

        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: '(min-width: 1024px)',
            isMobile: '(max-width: 1023px)',
        }, (context) => {
            const { isDesktop } = context.conditions as { isDesktop: boolean };
            const scroller = isDesktop ? containerRef.current : undefined;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: manifestoRef.current,
                    scroller: scroller,
                    start: "top 60%", // Empieza la animación cuando la sección llega al 60% de la pantalla
                    toggleActions: 'play reverse play reverse', // Se repite cada vez que entra y sale de la sección
                }
            });

            // Fase 1: "Recreando"
            tl.fromTo('.manifesto-w1', 
                { y: 60, opacity: 0, rotateX: -40, filter: 'blur(10px)' }, 
                { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.8, ease: "back.out(1.4)" }
            );

            // Fase 2: "el internet"
            tl.fromTo('.manifesto-w2', 
                { y: 60, opacity: 0, rotateX: -40, filter: 'blur(10px)' }, 
                { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.8, ease: "back.out(1.4)" },
                "-=0.5"
            );

            // Fase 3: "Revolucionando" y "un concepto"
            tl.fromTo('.manifesto-w3', 
                { y: 40, opacity: 0, rotateX: -20, filter: 'blur(8px)' }, 
                { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.8, ease: "back.out(1.2)", stagger: 0.15 },
                "-=0.4"
            );

            // Fase 4: Textos secundarios línea por línea (Aparecen con huecos en las palabras clave)
            tl.fromTo('.manifesto-text-line',
                { y: 30, opacity: 0, rotateX: 20, filter: 'blur(8px)' },
                { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 1, ease: "power3.out", stagger: 0.15 },
                "-=0.2"
            );

            // Fase 5: Pop-in de las palabras clave (Entran como un golpe)
            tl.fromTo('.manifesto-highlight',
                { scale: 0.5, opacity: 0, filter: 'blur(10px)', y: 15 },
                { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0, textShadow: "0px 0px 20px rgba(255,255,255,0.4)", duration: 0.7, ease: "back.out(2.5)", stagger: 0.1, clearProps: "transform,filter" },
                "-=0.8"
            );
        });

        return () => mm.revert();
    }, { scope: manifestoRef });

    return (
        <div
            ref={containerRef}
            className={`min-h-screen lg:h-screen w-full flex flex-col overflow-x-hidden lg:overflow-y-auto lg:snap-y lg:snap-mandatory scroll-smooth landing-container ${momoSignature.variable} ${sora.variable}`}
        >
            <CustomCursor />
            <Navbar />

            <section className="flex-none flex flex-col md:gap-20 lg:flex-row items-center relative mt-0 lg:mt-0 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 md:py-32 lg:py-0 min-h-[85svh] lg:min-h-screen lg:h-screen overflow-hidden lg:overflow-visible lg:snap-start">
                <AuroraBackground />
                <Hero />
                <Projects />
                <Validation />
            </section>

            <Services ref={servicesRef} />

            {/* Sección: La Firma / Manifiesto */}
            <section ref={manifestoRef} id="lafirma" className="flex-none flex flex-col items-center justify-center relative w-full min-h-screen lg:h-screen lg:snap-start overflow-hidden bg-[#001720] py-20 lg:py-0">
                {/* Fondo animado reutilizado del header */}
                <AuroraBackground />
                
                {/* HUD: Barra de progreso de escaneo global - Adaptado a Mobile/Tablet/Desktop/Ultra-wide */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 md:top-36 md:left-12 md:translate-x-0 xl:top-auto xl:bottom-8 xl:left-12 z-20 flex flex-col gap-3 font-mono text-[#07F8F2] text-[8px] md:text-xs tracking-[0.2em] uppercase w-[85%] md:w-auto xl:bg-[#001720]/40 xl:backdrop-blur-md xl:p-6 xl:rounded-2xl xl:border xl:border-[#07F8F2]/20 xl:shadow-[0_0_50px_rgba(7,248,242,0.05)] transition-all duration-700">
                    <div className="flex justify-between items-end w-full md:w-64 lg:w-72 xl:w-80">
                        <span className="flex items-center gap-1.5 md:gap-3">
                            <span className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full ${allScanned ? 'bg-[#89EA2B] shadow-[0_0_15px_#89EA2B]' : 'bg-[#07F8F2] animate-pulse shadow-[0_0_10px_#07F8F2]'}`}></span>
                            <span className="xl:text-sm xl:font-bold">{isOpeningReward || showRewardCard ? 'ACCESS_GRANTED' : 'SYSTEM_UPLINK'}</span>
                        </span>
                        <span className={`text-xs md:text-base xl:text-xl font-black tracking-normal ${allScanned ? 'text-[#89EA2B]' : 'text-[#07F8F2] text-shadow-[0_0_10px_rgba(7,248,242,0.5)]'}`}>
                            {Math.round((scannedWords.size / 7) * 100)}%
                        </span>
                    </div>
                    <div className="w-full md:w-64 lg:w-72 xl:w-80 h-[2px] md:h-[4px] xl:h-[6px] bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-gradient-to-r from-[#07F8F2] via-[#07F8F2] to-[#89EA2B] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(7,248,242,0.8)]`}
                            style={{ width: `${(scannedWords.size / 7) * 100}%` }}
                        ></div>
                    </div>
                    <div className="hidden xl:flex justify-between items-center text-[9px] text-[#07F8F2]/40 font-bold mt-1">
                        <span>{isOpeningReward ? 'DECRYPTING_MANIFESTO_KEY...' : 'ENCRYPTED_CONNECTION'}</span>
                        <span>{isOpeningReward ? 'STATUS: IN_PROGRESS' : 'v1.0.42_STABLE'}</span>
                    </div>
                </div>

                {/* Indicador Cinematico de Expectativa (Decryption Overlay) */}
                {isOpeningReward && (
                    <DecryptionOverlay />
                )}

                <div className="relative z-10 flex flex-col items-center max-w-6xl 2xl:max-w-screen-2xl mx-auto px-6 text-center -translate-y-2 md:translate-y-4 lg:translate-y-12 xl:translate-y-16">
                    
                    {/* Títulos principales con estetica de "HUD Card" (estilo RewardCard) */}
                    <div className="flex flex-col gap-6 md:gap-10 items-center justify-center mb-8 md:mb-16 lg:mb-20 perspective-[1000px] w-full">
                        <div className="flex flex-nowrap items-center justify-center gap-3 md:gap-8 2xl:gap-12 text-[1.2rem] xs:text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.5rem] 2xl:text-[5.5rem] leading-none font-medium tracking-tight whitespace-nowrap">
                            <span className="text-white manifesto-w3 inline-block will-change-transform">Revolucionando</span>
                            <div className="relative manifesto-w2 inline-block will-change-transform group">
                                <div className="relative bg-[#001720]/80 backdrop-blur-xl border border-[#89EA2B]/40 px-5 py-2.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-md shadow-[0_0_40px_rgba(137,234,43,0.15)] overflow-hidden">
                                    <span className="relative z-10 text-[#89EA2B] font-bold tracking-tight">el internet</span>
                                    
                                    {/* Mini Brackets HUD */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#89EA2B]/60"></div>
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#89EA2B]/60"></div>
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#89EA2B]/60"></div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#89EA2B]/60"></div>

                                    {/* Brillo interno sutil */}
                                    <div className="absolute inset-0 bg-[#89EA2B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-nowrap items-center justify-center gap-3 md:gap-8 2xl:gap-12 text-[1.2rem] xs:text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.5rem] 2xl:text-[5.5rem] leading-none font-medium tracking-tight whitespace-nowrap">
                            <div className="relative manifesto-w1 inline-block will-change-transform group">
                                <div className="relative bg-[#001720]/80 backdrop-blur-xl border border-[#07F8F2]/40 px-5 py-2.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-md shadow-[0_0_40px_rgba(7,248,242,0.15)] overflow-hidden">
                                    <span className="relative z-10 text-[#07F8F2] font-bold tracking-tight">Recreando</span>
                                    
                                    {/* Mini Brackets HUD */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#07F8F2]/60"></div>
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#07F8F2]/60"></div>
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#07F8F2]/60"></div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#07F8F2]/60"></div>

                                    {/* Brillo interno sutil */}
                                    <div className="absolute inset-0 bg-[#07F8F2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                            <span className="text-white manifesto-w3 inline-block will-change-transform">un concepto</span>
                        </div>
                    </div>

                    {/* Texto secundario unificado con leading-relaxed para mejor espaciado vertical */}
                    <div className="flex flex-col gap-6 md:gap-10 2xl:gap-14 text-sm xs:text-base sm:text-xl md:text-2xl lg:text-[1.6rem] 2xl:text-[2.1rem] text-gray-400 font-light max-w-5xl 2xl:max-w-7xl perspective-[1000px] leading-[1.8] sm:leading-[2] md:leading-[2.2] 2xl:leading-[2.1]">
                        <p className="manifesto-text-line will-change-transform opacity-0">
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}>AzzADesigns busca </span>
                            <HoverWord id="liderar" baseText="liderar" completionText="el mercado digital con autoridad" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> la web moderna.</span>
                        </p>
                        
                        <p className="manifesto-text-line will-change-transform opacity-0">
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}>Buscando </span>
                            <HoverWord id="elevar" baseText="elevar el estándar" completionText="con ideas altamente disruptivas" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> de un internet genérico y repetitivo </span>
                            <HoverWord id="redefiniendo" baseText="redefiniendo" completionText="el concepto de identidad de marca" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> con un enfoque </span>
                            <HoverWord id="premium" baseText="premium" completionText="para experiencias web de alto impacto" colorClass="text-[#89EA2B]" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> donde la </span>
                            <HoverWord id="calidad" baseText="calidad" completionText="en cada línea de código" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> en cada </span>
                            <HoverWord id="detalle" baseText="detalle" completionText="diseñado a la perfección absoluta" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> de tu producto sea la </span>
                            <HoverWord id="excepcion" baseText="excepción" completionText="que rompe todos los moldes preestablecidos" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> a la norma general.</span>
                        </p>
                    </div>

                </div>

                {/* Recompensa Final: Modal Card con Blur */}
                {showRewardCard && typeof window !== 'undefined' && createPortal(
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        {/* Backdrop con blur profundo */}
                        <div 
                            className="absolute inset-0 bg-[#001720]/80 backdrop-blur-xl"
                            onClick={() => setShowRewardCard(false)}
                        ></div>
                        <RewardCard onClose={() => setShowRewardCard(false)} />
                    </div>,
                    document.body
                )}
            </section>
        </div>
    );
};

// --- Sub-componente RewardCard para manejo de animaciones complejas ---
const RewardCard = ({ onClose }: { onClose: () => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [sessionId, setSessionId] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setSessionId(`AZZA_${Math.random().toString(36).substring(7).toUpperCase()}`);
    }, []);

    useGSAP(() => {
        if (!cardRef.current || !contentRef.current || !mounted) return;

        // Reset inicial para evitar FOUC
        gsap.set(cardRef.current, { 
            visibility: "visible", 
            opacity: 0, 
            scaleX: 0, 
            scaleY: 0.002,
            transformOrigin: "center"
        });
        
        gsap.set(contentRef.current.children, { opacity: 0, y: 20 });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // 1. Fase de Activación: Línea horizontal que aparece y se expande
        tl.to(cardRef.current, { 
            opacity: 1, 
            scaleX: 1, 
            duration: 0.6, 
            ease: "expo.inOut" 
        })
        // 2. Fase de Expansión: Se abre verticalmente de forma sólida y fluida
        .to(cardRef.current, { 
            scaleY: 1, 
            duration: 0.5, 
            ease: "expo.out" 
        })
        // 3. Revelado de Datos (Staggered)
        .to(contentRef.current.children, { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.08, 
            ease: "power3.out" 
        }, "-=0.2");

    }, { scope: cardRef, dependencies: [mounted] });

    if (!mounted) return null;

    return (
        <div 
            ref={cardRef}
            style={{ visibility: 'hidden' }}
            className="relative z-10 w-full max-w-4xl 2xl:max-w-7xl bg-[#001720]/95 backdrop-blur-3xl border border-[#07F8F2]/30 p-10 md:p-20 lg:p-24 rounded-xl shadow-[0_0_120px_rgba(7,248,242,0.15)] overflow-hidden"
        >
            {/* Decoraciones de Esquina HUD */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#07F8F2]/60 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#07F8F2]/60 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#07F8F2]/60 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#07F8F2]/60 rounded-br-xl"></div>

            {/* Botón de Cierre */}
            <button onClick={onClose} className="absolute top-6 right-6 text-[#07F8F2]/40 hover:text-[#07F8F2] transition-colors z-50 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Metadatos Técnicos */}
            <div className="absolute top-8 left-8 hidden md:flex flex-col gap-1 font-mono text-[8px] text-[#07F8F2]/40 tracking-widest uppercase">
                <span>ENC_TYPE: RSA_4096</span>
                <span>COORD: 34.0522° N, 118.2437° W</span>
                <span>STATUS: AUTHENTICATED</span>
            </div>

            <div className="absolute bottom-8 right-8 hidden md:flex flex-col gap-1 font-mono text-[8px] text-[#07F8F2]/40 tracking-widest uppercase text-right">
                <span>TIMESTAMP: {new Date().toISOString().split('T')[0]}</span>
                <span>SESSION_ID: {sessionId}</span>
                <span>UPLINK: STABLE</span>
            </div>

            <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center gap-12 md:gap-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 text-[#89EA2B] font-mono text-xs md:text-sm 2xl:text-xl tracking-[0.6em] animate-pulse font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#89EA2B] shadow-[0_0_15px_#89EA2B]"></span>
                        MANIFESTO_VERIFIED_SUCCESS
                    </div>
                    <div className="h-[1px] w-48 md:w-64 bg-gradient-to-r from-transparent via-[#07F8F2]/40 to-transparent"></div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full">
                    {/* Bloque de Matriz Binaria Cibernética (Estática) */}
                    <div className="flex flex-col items-center lg:items-end order-2 lg:order-1 relative group w-full lg:w-auto h-[200px] md:h-[300px] 2xl:h-[400px]">
                        <div className="absolute -top-8 lg:-right-4 text-[#07F8F2]/30 font-mono text-[9px] tracking-[0.5em] uppercase z-20">DATA_STREAM_v1.0</div>
                        
                        <div className="relative w-full lg:w-[400px] 2xl:w-[600px] h-full overflow-hidden">
                            <BinaryMatrix />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#001720] via-transparent to-[#001720] z-10 pointer-events-none opacity-90"></div>
                        </div>

                        <div className="mt-4 lg:mt-6 h-[2px] w-full bg-gradient-to-l from-[#07F8F2]/60 to-transparent"></div>
                    </div>

                    <div className="flex flex-col items-center gap-6 order-1 lg:order-2">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[#07F8F2]/50 font-mono text-[10px] 2xl:text-base uppercase tracking-[0.4em] mb-1">COMMAND_EXECUTION</p>
                            <div className="w-12 h-[2px] bg-[#89EA2B]/40"></div>
                        </div>
                        <CTAButton 
                            text="Quiero romper estándares ya" 
                            className="!px-14 md:!px-20 !py-6 md:!py-8 shadow-[0_0_50px_rgba(137,234,43,0.2)] hover:shadow-[0_0_80px_rgba(7,248,242,0.4)]"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col items-center gap-4 mt-8 opacity-40">
                    <div className="flex gap-4 md:gap-8 font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase">
                        <span>PRJ: AZZA_v1.0</span>
                        <span>AUTH: SYSTEM_ROOT</span>
                        <span>PERM: UNLIMITED</span>
                    </div>
                    <p className="font-mono text-[7px] md:text-[9px] tracking-widest text-[#07F8F2]">CLICK OUTSIDE OR PRESS X TO TERMINATE SESSION</p>
                </div>
            </div>
        </div>
    );
};

// --- Sub-componente BinaryMatrix para el efecto de lluvia de datos (Sin interacción) ---
const BinaryMatrix = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const columns = 15;
    const rows = 20;
    
    if (!mounted) return null;

    return (
        <div className="flex justify-between w-full h-full px-4 md:px-10 opacity-30">
            {Array.from({ length: columns }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1 font-mono text-[10px] md:text-xs 2xl:text-xl text-[#07F8F2]/60">
                    <BinaryColumn length={rows} />
                </div>
            ))}
        </div>
    );
};

const BinaryColumn = ({ length }: { length: number }) => {
    const [binary, setBinary] = useState<number[]>([]);

    useEffect(() => {
        setBinary(Array.from({ length }, () => Math.round(Math.random())));
        
        const interval = setInterval(() => {
            setBinary(prev => {
                if (prev.length === 0) return prev;
                const next = [...prev];
                next[Math.floor(Math.random() * next.length)] = Math.round(Math.random());
                return next;
            });
        }, 150 + Math.random() * 300);

        return () => clearInterval(interval);
    }, [length]);

    if (binary.length === 0) return null;

    return (
        <>
            {binary.map((val, idx) => (
                <span 
                    key={idx} 
                    className="transition-all duration-500"
                    style={{ 
                        opacity: 0.2 + (Math.random() * 0.6),
                        textShadow: val === 1 ? '0 0 10px #07F8F2' : 'none'
                    }}
                >
                    {val}
                </span>
            ))}
        </>
    );
};

// --- Sub-componente DecryptionOverlay para el efecto de transición ---
const DecryptionOverlay = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useGSAP(() => {
        if (!overlayRef.current) return;
        
        const tl = gsap.timeline();

        // 1. Entrada de fondo y desenfoque
        tl.fromTo(".decryption-bg",
            { opacity: 0, backdropFilter: "blur(0px)" },
            { opacity: 1, backdropFilter: "blur(24px)", duration: 1, ease: "power2.out" }
        );

        // 2. Flicker de activación del HUD central
        tl.fromTo(".decryption-hud",
            { scale: 0.8, opacity: 0, filter: "brightness(2)" },
            { scale: 1, opacity: 1, filter: "brightness(1)", duration: 0.4, ease: "back.out(1.7)" },
            "-=0.5"
        )
        .to(".decryption-hud", { opacity: 0.5, duration: 0.05, repeat: 3, yoyo: true })
        .to(".decryption-hud", { opacity: 1, duration: 0.1 });

        // 3. Animación del contador de progreso
        const progressObj = { value: 0 };
        gsap.to(progressObj, {
            value: 100,
            duration: 2,
            ease: "none",
            onUpdate: () => setProgress(Math.floor(progressObj.value))
        });

    }, { scope: overlayRef });

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden">
            <div className="decryption-bg absolute inset-0 bg-[#001720]/85"></div>
            
            <div className="decryption-hud relative z-10 flex flex-col items-center gap-12 p-12 md:p-20">
                {/* Esquinas HUD */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#07F8F2]/40"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#07F8F2]/40"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#07F8F2]/40"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#07F8F2]/40"></div>

                {/* Escáner Circular */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Anillos rotatorios */}
                    <div className="absolute inset-0 border border-[#07F8F2]/20 rounded-full"></div>
                    <div className="absolute inset-2 border-2 border-dashed border-[#07F8F2]/40 rounded-full animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute inset-6 border border-[#89EA2B]/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                    
                    {/* Indicador de Porcentaje */}
                    <div className="flex flex-col items-center">
                        <span className="font-mono text-[#07F8F2] text-4xl md:text-6xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(7,248,242,0.5)]">
                            {progress}%
                        </span>
                        <span className="font-mono text-[#07F8F2]/40 text-[10px] tracking-[0.3em] uppercase mt-2">DECRYPTING</span>
                    </div>
                </div>

                {/* Etiquetas de Estado */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#89EA2B] rounded-full animate-pulse shadow-[0_0_10px_#89EA2B]"></span>
                        <h3 className="font-mono text-white text-xl md:text-3xl font-bold tracking-[0.4em] uppercase">Bypass_Sequence</h3>
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-[9px] md:text-xs text-[#07F8F2]/60 tracking-widest">
                        <p>TARGET: MANIFESTO_PROTOCOL_v1.0</p>
                        <p>ENCRYPTION: RSA_AES_STRICT</p>
                        <p className="text-[#89EA2B]/60">STATUS: OVERRIDING_SECURITY_LAYER...</p>
                    </div>
                </div>
            </div>

            {/* Micro-líneas de escaneo moviéndose por el fondo */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="w-full h-[1px] bg-[#07F8F2] absolute top-1/4 animate-[scan_3s_linear_infinite]"></div>
                <div className="w-full h-[1px] bg-[#07F8F2] absolute top-3/4 animate-[scan_3s_linear_infinite_reverse]"></div>
            </div>
        </div>
    );
};

