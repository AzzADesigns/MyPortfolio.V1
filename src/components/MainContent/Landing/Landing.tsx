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
import { FiLinkedin, FiGithub, FiInstagram, FiEye, FiChevronDown } from 'react-icons/fi';

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
    onScan,
    isLastScan = false,
    onAllScannedClose,
}: { 
    id: string, 
    baseText: string, 
    completionText: string, 
    colorClass?: string,
    hoveredWord: string | null,
    setHoveredWord: (id: string | null) => void,
    onScan: (id: string) => void,
    isLastScan?: boolean,
    onAllScannedClose?: () => void,
}) => {
    const isHovered = hoveredWord === id;
    const isOtherHovered = hoveredWord !== null && hoveredWord !== id;
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const scanRef = useRef<HTMLSpanElement>(null);
    const wordContentRef = useRef<HTMLSpanElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isScanned, setIsScanned] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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

    const handleMouseEnter = (e?: React.MouseEvent) => {
        setHoveredWord(id);
        setIsScanned(false);
        setTooltipVisible(false);

        const ww = window.innerWidth;
        const wh = window.innerHeight;
        const isMobile = ww < 1024;

        // Efecto Láser + resplandor solo en desktop (demasiado costoso en móvil)
        if (!isMobile && scanRef.current && wordContentRef.current) {
            gsap.killTweensOf([scanRef.current, wordContentRef.current]);
            gsap.fromTo(scanRef.current,
                { left: '0%', opacity: 0 },
                { 
                    left: '100%', 
                    opacity: 1, 
                    duration: 0.45, 
                    ease: "power2.inOut",
                    onComplete: () => {
                        setIsScanned(true);
                        onScan(id);
                    }
                }
            );
            gsap.to(scanRef.current, { opacity: 0, duration: 0.2, delay: 0.45 });
            gsap.fromTo(wordContentRef.current,
                { color: '#07F8F2', filter: 'brightness(1.5) blur(1px)' },
                { color: '', filter: 'brightness(1) blur(0px)', duration: 0.4, delay: 0.15, clearProps: "color,filter" }
            );
        } else if (isMobile) {
            // En móvil: activar escaneo directamente sin animación pesada
            setIsScanned(true);
            onScan(id);
        }

        // Posicionamiento y reveal del tooltip
        if (tooltipRef.current) {
            gsap.killTweensOf(tooltipRef.current);

            const rect = tooltipRef.current.getBoundingClientRect();
            const realWidth = rect.width || (ww < 768 ? 280 : 380);
            const realHeight = rect.height || 140;

            const clientX = e ? e.clientX : ww / 2;
            const clientY = e ? e.clientY : wh / 2;

            if (isMobile) {
                // Móvil: posición vía estado React, reveal con CSS transition (GPU puro)
                const px = (ww - realWidth) / 2;
                const py = Math.max(20, clientY - realHeight - 40);
                setTooltipPos({ x: px, y: py });
                // Pequeño delay para que React renderice la posición antes de mostrar
                setTimeout(() => setTooltipVisible(true), 20);
            } else {
                // Desktop: animación GSAP scaleX (efecto mecánico)
                let targetX, targetY, lx1, ly1, lx2, ly2;

                if (ww >= 1536) {
                    targetX = clientX + 40;
                    targetY = clientY + 40;
                    lx1 = -40; ly1 = -40; lx2 = 0; ly2 = 0;
                } else {
                    targetX = ww / 2 - realWidth / 2;
                    targetY = clientY - realHeight - 80;
                    lx1 = clientX - targetX;
                    ly1 = clientY - targetY;
                    lx2 = lx1;
                    ly2 = realHeight;
                }

                gsap.set(tooltipRef.current, {
                    x: targetX,
                    y: targetY,
                    scaleX: 0,
                    transformOrigin: "left center",
                    opacity: 0
                });

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

                gsap.to(tooltipRef.current, {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.45,
                    ease: "power3.out"
                });
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (tooltipRef.current && hoveredWord === id) {
            const ww = window.innerWidth;
            
            // Móvil/Tablet: No ejecutar mousemove, la posición es estática y manejada por CSS top/left
            if (ww < 1024) return;

            const rect = tooltipRef.current.getBoundingClientRect();
            const realWidth = rect.width;
            const realHeight = rect.height;

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
                targetX = (ww - realWidth) / 2;
                targetY = Math.max(20, e.clientY - realHeight - 40);
                lx1 = e.clientX - targetX; 
                ly1 = e.clientY - targetY;
                lx2 = realWidth / 2; 
                ly2 = realHeight;
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
        // Matar animaciones locales siempre
        setTooltipVisible(false);

        if (scanRef.current && wordContentRef.current) {
            gsap.killTweensOf([scanRef.current, wordContentRef.current]);
            gsap.to(scanRef.current, { opacity: 0, duration: 0.1 });
            gsap.set(wordContentRef.current, { clearProps: "all" });
        }

        if (tooltipRef.current) {
            gsap.killTweensOf(tooltipRef.current);
            const ww = window.innerWidth;
            if (ww >= 1024) {
                // Desktop: animación GSAP
                gsap.to(tooltipRef.current, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        if (hoveredWord === id) setHoveredWord(null);
                    }
                });
            } else {
                // Móvil: la CSS transition ya oculta el tooltip via tooltipVisible=false
                setTimeout(() => {
                    if (hoveredWord === id) setHoveredWord(null);
                }, 250);
            }
        } else {
            if (hoveredWord === id) setHoveredWord(null);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (window.innerWidth < 1024) {
            e.stopPropagation();
            if (isHovered) return;

            handleMouseEnter(e);

            if (isLastScan) {
                // Última palabra: cerrar en 2.5s y disparar la secuencia de recompensa
                setTimeout(() => {
                    setTooltipVisible(false);
                    if (scanRef.current) gsap.to(scanRef.current, { opacity: 0, duration: 0.1 });
                    setTimeout(() => {
                        if (hoveredWord === id) setHoveredWord(null);
                        onAllScannedClose?.();
                    }, 250);
                }, 2500);
            } else {
                // Palabra normal: auto-cerrar en 5s con setters directos (evita stale closure)
                setTimeout(() => {
                    setTooltipVisible(false);
                    if (scanRef.current) {
                        gsap.killTweensOf(scanRef.current);
                        gsap.to(scanRef.current, { opacity: 0, duration: 0.1 });
                    }
                    // Limpiar estado tras la CSS transition (250ms)
                    setTimeout(() => {
                        setHoveredWord(null);
                    }, 250);
                }, 5000);
            }
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
            onClick={handleClick}
        >
            <span 
                ref={wordContentRef} 
                className={`inline-block relative z-10 transition-all duration-500 ${
                    !isScanned ? 'hover-word-hint' : ''
                } ${
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
            
            {/* Panel HUD proyectado al Root */}
            {mounted && createPortal(
                <>
                    {/* Backdrop para cerrar al tocar fuera en Mobile */}
                    {isHovered && window.innerWidth < 1024 && (
                        <div 
                            className="fixed inset-0 z-[9998]" 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMouseLeave();
                            }}
                        />
                    )}

                    <span 
                        ref={tooltipRef}
                        className={`fixed w-max max-w-[260px] md:max-w-[480px] 2xl:max-w-[500px] whitespace-normal text-left px-4 md:px-8 py-3 md:py-6 bg-[#001720]/95 backdrop-blur-2xl border border-[#07F8F2]/30 text-[#07F8F2] font-mono pointer-events-none z-[9999] uppercase rounded-md
                        shadow-[0_0_50px_rgba(7,248,242,0.2),inset_0_0_20px_rgba(7,248,242,0.05)]
                        ${window.innerWidth >= 1024 ? 'top-0 left-0 opacity-0' : ''}
                    `}
                    style={window.innerWidth < 1024 ? {
                        // Móvil: posición fija vía CSS, reveal con transition GPU
                        left: `${tooltipPos.x}px`,
                        top: `${tooltipPos.y}px`,
                        opacity: tooltipVisible ? 1 : 0,
                        transform: tooltipVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
                        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                        willChange: 'opacity, transform',
                        transformOrigin: 'center bottom',
                    } : { transformOrigin: '0 0' }}
                    >
                        {/* Láser conector - Solo en 2XL */}
                        <svg className="absolute top-0 left-0 w-full h-full overflow-visible transition-opacity duration-300 opacity-0 2xl:opacity-100">
                            <line x1="-40" y1="-40" x2="0" y2="0" stroke="#07F8F2" strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
                            <circle cx="-40" cy="-40" r="3" fill="#07F8F2" className="animate-pulse" />
                            <circle cx="0" cy="0" r="2" fill="#89EA2B" />
                        </svg>

                        {/* Header HUD - especial si es el último escaneo */}
                        <span className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-xs mb-2 md:mb-3 opacity-90 tracking-[0.15em] md:tracking-[0.2em] font-sans font-bold"
                            style={{ color: isLastScan ? '#07F8F2' : '#89EA2B' }}
                        >
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-sm animate-pulse"
                                style={{ backgroundColor: isLastScan ? '#07F8F2' : '#89EA2B' }}
                            ></span>
                            {isLastScan ? 'SISTEMA_DESBLOQUEADO //' : 'DRONE_LINK // ACQUIRED'}
                        </span>

                        {/* Barra de progreso solo en el último escaneo en móvil */}
                        {isLastScan && window.innerWidth < 1024 && (
                            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-2">
                                <div 
                                    className="h-full bg-[#07F8F2] rounded-full"
                                    style={{
                                        animation: 'fillBar 2.3s linear forwards',
                                    }}
                                />
                            </div>
                        )}

                        {/* Texto Typewriter - más pequeño en móvil */}
                        <span className="block text-xs md:text-xl lg:text-[1.3rem] xl:text-[1.5rem] 2xl:text-[1.2rem] font-semibold leading-snug tracking-tight min-h-[1.2em] md:min-h-[1.5em]">
                            {displayedText}
                            <span className="animate-pulse inline-block ml-1 md:ml-2 bg-[#07F8F2] w-1.5 md:w-2.5 h-3 md:h-6 translate-y-0.5 md:translate-y-1.5"></span>
                        </span>

                        {/* Esquinas HUD */}
                        <span className="absolute top-0 right-0 w-4 md:w-6 h-4 md:h-6 border-t-2 border-r-2 border-[#89EA2B]/50"></span>
                        <span className="absolute bottom-0 left-0 w-4 md:w-6 h-4 md:h-6 border-b-2 border-l-2 border-[#89EA2B]/50"></span>
                        <span className="absolute bottom-0 right-0 w-4 md:w-6 h-4 md:h-6 border-b-2 border-r-2 border-[#89EA2B]/50"></span>
                    </span>
                </>,
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
    const [isClosingReward, setIsClosingReward] = useState(false);

    const handleRewardClose = () => {
        setIsClosingReward(true);
        setTimeout(() => {
            setShowRewardCard(false);
            setIsClosingReward(false);
        }, 350);
    };

    const handleScan = (id: string) => {
        setScannedWords(prev => {
            const newSet = new Set(prev).add(id);
            return newSet;
        });
    };

    const handleAllScannedClose = () => {
        // Disparado desde el último tooltip en móvil al cerrarse
        if (!hasSeenReward) {
            setIsOpeningReward(true);
            setTimeout(() => {
                setIsOpeningReward(false);
                setShowRewardCard(true);
                setHasSeenReward(true);
            }, 2000);
        }
    };

    const allScanned = scannedWords.size === 7;

    useEffect(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
        // En móvil se usa delay más largo para dar tiempo al tooltip a cerrarse
        // En móvil el flujo ideal es vía handleAllScannedClose, pero esto es el fallback
        if (allScanned && !hasSeenReward) {
            const delay = isMobile ? 4000 : 1500;
            const delayTimer = setTimeout(() => {
                setIsOpeningReward(true);
                const finalTimer = setTimeout(() => {
                    setIsOpeningReward(false);
                    setShowRewardCard(true);
                    setHasSeenReward(true);
                }, 2000);
                return () => clearTimeout(finalTimer);
            }, delay);
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
                <div 
                    onClick={allScanned ? () => setShowRewardCard(true) : undefined}
                    className={`absolute top-24 left-1/2 -translate-x-1/2 md:top-36 md:left-12 md:translate-x-0 xl:top-auto xl:bottom-12 xl:left-1/2 xl:-translate-x-1/2 z-20 flex flex-col xl:flex-col-reverse gap-3 xl:gap-0.5 font-outfit text-[#07F8F2] text-[8px] md:text-xs tracking-[0.2em] w-[85%] md:w-auto xl:w-[420px] xl:bg-[#001720]/40 xl:backdrop-blur-md xl:px-5 xl:py-2 xl:rounded-2xl xl:border xl:border-[#07F8F2]/20 xl:shadow-[0_0_50px_rgba(7,248,242,0.05)] transition-all duration-700 
                    ${allScanned ? 'cursor-pointer hover:border-[#07F8F2]/50 hover:bg-[#001720]/60 active:scale-95 group/hud' : ''}`}
                >
                    <div className="flex justify-between items-center w-full">
                        <span className="flex items-center gap-1.5 md:gap-3">
                            <span className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full ${allScanned ? 'bg-[#89EA2B] shadow-[0_0_15px_#89EA2B]' : 'bg-[#07F8F2] animate-pulse shadow-[0_0_10px_#07F8F2]'}`}></span>
                            <span className="xl:text-base xl:font-bold">
                                {showRewardCard || allScanned ? 'misión_cumplida' : 'experiencia_cursor'}
                            </span>
                        </span>
                        <span className={`text-xs md:text-base xl:text-xl font-bold tracking-tight ${allScanned ? 'text-[#89EA2B]' : 'text-[#07F8F2] text-shadow-[0_0_10px_rgba(7,248,242,0.5)]'}`}>
                            {Math.round((scannedWords.size / 7) * 100)}%
                        </span>
                    </div>
                    <div className="w-full h-[2px] md:h-[4px] xl:h-[6px] bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-gradient-to-r from-[#07F8F2] via-[#07F8F2] to-[#89EA2B] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(7,248,242,0.8)]`}
                            style={{ width: `${(scannedWords.size / 7) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[#07F8F2]/40 font-bold mt-1 xl:mt-0 xl:mb-0">
                        <div className="flex flex-col gap-1">
                            <span>
                                {allScanned 
                                    ? 'manifiesto_desbloqueado' 
                                    : isOpeningReward 
                                        ? 'desencriptando_manifiesto...' 
                                        : 'esperando_exploración...'}
                            </span>
                            <div className="flex items-center gap-5 mt-3 xl:mt-1 opacity-60 group-hover/hud:opacity-100 transition-opacity">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full hover:text-[#07F8F2] transition-all"><FiLinkedin size={14} /></a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full hover:text-[#07F8F2] transition-all"><FiGithub size={14} /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full hover:text-[#07F8F2] transition-all"><FiInstagram size={14} /></a>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                            <span>{isOpeningReward ? 'Estado: En_proceso' : 'v1.0.42_estable'}</span>
                            {allScanned && (
                                <div className="mt-2 text-[#89EA2B] animate-pulse">
                                    <FiEye size={18} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Indicador Cinematico de Expectativa (Decryption Overlay) */}
                {isOpeningReward && (
                    <DecryptionOverlay />
                )}

                <div className="relative z-10 flex flex-col items-center max-w-6xl 2xl:max-w-screen-2xl mx-auto px-6 text-center -translate-y-2 md:translate-y-4 lg:translate-y-12 xl:-translate-y-6">
                    
                    <div className="flex flex-col gap-6 md:gap-10 xl:gap-8 items-center justify-center mb-8 md:mb-16 lg:mb-20 xl:mb-4 perspective-[1000px] w-full">
                        <div className="flex flex-nowrap items-center justify-center gap-3 md:gap-8 2xl:gap-12 text-[1.4rem] xs:text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-4xl 2xl:text-[5.5rem] leading-none font-medium tracking-tight whitespace-nowrap">
                            <span className="text-white manifesto-w3 inline-block will-change-transform">Revolucionando</span>
                            <div className="relative manifesto-w2 inline-block will-change-transform group">
                                <div className="relative bg-[#001720]/80 backdrop-blur-xl border border-[#89EA2B]/40 px-5 py-2.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-2xl shadow-[0_0_40px_rgba(137,234,43,0.15)] overflow-hidden">
                                    <span className="relative z-10 text-[#89EA2B] font-bold tracking-tight">el internet</span>
                                    
                                    {/* Mini Brackets HUD */}
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#89EA2B]/60 rounded-tl-2xl"></div>
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#89EA2B]/60 rounded-tr-2xl"></div>
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#89EA2B]/60 rounded-bl-2xl"></div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#89EA2B]/60 rounded-br-2xl"></div>

                                    {/* Brillo interno sutil */}
                                    <div className="absolute inset-0 bg-[#89EA2B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-nowrap items-center justify-center gap-3 md:gap-8 2xl:gap-12 text-[1.2rem] xs:text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-4xl 2xl:text-[5.5rem] leading-none font-medium tracking-tight whitespace-nowrap">
                            <div className="relative manifesto-w1 inline-block will-change-transform group">
                                <div className="relative bg-[#001720]/80 backdrop-blur-xl border border-[#07F8F2]/40 px-5 py-2.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-2xl shadow-[0_0_40px_rgba(7,248,242,0.15)] overflow-hidden">
                                    <span className="relative z-10 text-[#07F8F2] font-bold tracking-tight">Recreando</span>
                                    
                                    {/* Mini Brackets HUD */}
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#07F8F2]/60 rounded-tl-2xl"></div>
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#07F8F2]/60 rounded-tr-2xl"></div>
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#07F8F2]/60 rounded-bl-2xl"></div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#07F8F2]/60 rounded-br-2xl"></div>

                                    {/* Brillo interno sutil */}
                                    <div className="absolute inset-0 bg-[#07F8F2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                            <span className="text-white manifesto-w3 inline-block will-change-transform">un concepto</span>
                        </div>
                    </div>

                    {/* Texto secundario unificado con leading-relaxed para mejor espaciado vertical */}
                    <div className="flex flex-col gap-6 md:gap-10 xl:gap-10 2xl:gap-14 text-sm xs:text-base sm:text-xl md:text-2xl lg:text-[1.6rem] 2xl:text-[2.1rem] text-gray-400 font-light max-w-5xl 2xl:max-w-7xl perspective-[1000px] leading-[1.8] sm:leading-[2] md:leading-[2.2] xl:leading-[1.8] 2xl:leading-[2.1]">
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
                            <HoverWord id="excepcion" baseText="excepción" completionText="que rompe todos los moldes preestablecidos" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} isLastScan={scannedWords.size >= 6 && !scannedWords.has('excepcion')} onAllScannedClose={handleAllScannedClose} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> a la norma general.</span>
                        </p>
                    </div>

                </div>

                {/* Recompensa Final: Modal Card con Blur */}
                {showRewardCard && typeof window !== 'undefined' && createPortal(
                    <div 
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                        style={{
                            opacity: isClosingReward ? 0 : 1,
                            transition: 'opacity 0.35s ease-in',
                        }}
                    >
                        {/* Backdrop con blur profundo */}
                        <div 
                            className="absolute inset-0 bg-[#001720]/80 backdrop-blur-xl"
                            onClick={handleRewardClose}
                        ></div>
                        <RewardCard onClose={handleRewardClose} isClosing={isClosingReward} />
                    </div>,
                    document.body
                )}
            </section>
        </div>
    );
};

// --- Sub-componente RewardCard para manejo de animaciones complejas ---
const RewardCard = ({ onClose, isClosing = false }: { onClose: () => void, isClosing?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [sessionId, setSessionId] = useState("");
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        setSessionId(`AZZA_${Math.random().toString(36).substring(7).toUpperCase()}`);
        // Fase 1: revelar la tarjeta (30ms - permite que el browser pinte primero)
        const t1 = setTimeout(() => setIsVisible(true), 30);
        // Fase 2: revelar el contenido después de la transición de la tarjeta (350ms)
        const t2 = setTimeout(() => setIsContentVisible(true), 380);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useGSAP(() => {
        if (!cardRef.current || !contentRef.current || !mounted) return;

        const isMobile = window.innerWidth < 1024;

        if (isMobile) {
            // Móvil: 100% CSS transitions, sin GSAP. El contenido se anima via isContentVisible.
            // No se necesita ninguna instrucción de GSAP aquí.
        } else {
            // Desktop: animación mecánica por fases con GSAP (potencia total)
            gsap.set(cardRef.current, { 
                visibility: "visible", 
                opacity: 0, 
                scaleX: 0, 
                scaleY: 0.002,
                transformOrigin: "center"
            });
            gsap.set(contentRef.current.children, { opacity: 0, y: 20 });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.to(cardRef.current, { 
                opacity: 1, 
                scaleX: 1, 
                duration: 0.6, 
                ease: "expo.inOut" 
            })
            .to(cardRef.current, { 
                scaleY: 1, 
                duration: 0.5, 
                ease: "expo.out" 
            })
            .to(contentRef.current.children, { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.08, 
                ease: "power3.out" 
            }, "-=0.2");
        }

    }, { scope: cardRef, dependencies: [mounted] });

    if (!mounted) return null;

    const isMobileRender = typeof window !== 'undefined' && window.innerWidth < 1024;

    // Estilos de salida: scale down + fade (ambos dispositivos)
    const exitStyle = isClosing ? {
        opacity: 0,
        transform: 'scale(0.93)',
        transition: 'opacity 0.3s ease-in, transform 0.3s ease-in',
    } : {};

    return (
        <div 
            ref={cardRef}
            style={isMobileRender ? {
                opacity: isClosing ? 0 : (isVisible ? 1 : 0),
                transform: isClosing ? 'scale(0.93)' : (isVisible ? 'scale(1)' : 'scale(0.92)'),
                transition: isClosing 
                    ? 'opacity 0.3s ease-in, transform 0.3s ease-in'
                    : 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                willChange: 'opacity, transform',
            } : { ...exitStyle }}
            className="relative z-10 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl bg-[#001720]/95 backdrop-blur-3xl border border-[#07F8F2]/30 p-5 md:p-16 lg:p-20 2xl:p-24 rounded-xl shadow-[0_0_120px_rgba(7,248,242,0.15)] overflow-hidden"
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
            <div className="absolute top-8 left-8 hidden md:flex flex-col gap-1 font-outfit text-[10px] text-[#07F8F2]/40 tracking-widest">
                <span>Enc_Type: RSA_4096</span>
                <span>Coord: 34.0522° N, 118.2437° W</span>
                <span>Status: Authenticated</span>
            </div>

            <div className="absolute bottom-8 right-8 hidden md:flex flex-col gap-1 font-outfit text-[10px] text-[#07F8F2]/40 tracking-widest text-right">
                <span>Timestamp: {new Date().toISOString().split('T')[0]}</span>
                <span>Session_id: {sessionId}</span>
                <span>Uplink: Stable</span>
            </div>

            <div 
                ref={contentRef} 
                className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-20 pt-10 md:pt-0"
                style={isMobileRender ? {
                    opacity: isContentVisible ? 1 : 0,
                    transform: isContentVisible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                    willChange: 'opacity, transform',
                } : {}}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-1.5 md:gap-3 text-[#89EA2B] font-syne text-[9px] xs:text-xs md:text-base 2xl:text-xl tracking-widest md:tracking-[0.4em] animate-pulse font-bold uppercase">
                        <span className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#89EA2B] shadow-[0_0_15px_#89EA2B]"></span>
                        comencemos_a_trabajar_juntos
                    </div>
                    <div className="h-[1px] w-48 md:w-64 bg-gradient-to-r from-transparent via-[#07F8F2]/40 to-transparent"></div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-12 xl:gap-24 2xl:gap-32 w-full">
                    {/* Bloque de Matriz Binaria Cibernética (Estática) */}
                    <div className="flex flex-col items-center lg:items-end order-2 lg:order-1 relative group w-full lg:w-auto h-[150px] md:h-[300px] 2xl:h-[400px]">
                        <div className="absolute -top-8 lg:-right-4 text-[#07F8F2]/30 font-outfit text-[10px] tracking-[0.5em] z-20">data_stream_v1.0</div>
                        
                        <div className="relative w-full lg:w-[320px] xl:w-[450px] 2xl:w-[600px] h-full overflow-hidden">
                            <BinaryMatrix />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#001720] via-transparent to-[#001720] z-10 pointer-events-none opacity-90"></div>
                        </div>

                        <div className="mt-4 lg:mt-6 h-[2px] w-full bg-gradient-to-l from-[#07F8F2]/60 to-transparent"></div>
                    </div>

                    <div className="flex flex-col items-center gap-6 order-1 lg:order-2">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[#07F8F2]/50 font-syne text-[10px] xl:text-xs 2xl:text-base tracking-[0.15em] xl:tracking-[0.2em] mb-1 text-center">si descubriste esto, agendemos una planeación gratuita</p>
                            <div className="w-12 h-[2px] bg-[#89EA2B]/40"></div>
                        </div>
                        <CTAButton 
                            text="Quiero romper estándares ya" 
                            className="!px-14 md:!px-20 !py-6 md:!py-8 shadow-[0_0_50px_rgba(137,234,43,0.2)] hover:shadow-[0_0_80px_rgba(7,248,242,0.4)]"
                        />
                    </div>
                </div>
                
                {/* Botón de Scroll Automático Maqueteado */}
                <div className="mt-12 flex flex-col items-center gap-3 group/scroll cursor-pointer">
                    <span className="text-[#07F8F2]/40 text-[10px] tracking-[0.4em] group-hover/scroll:text-[#07F8F2] transition-colors">CONTINUAR_VIAJE</span>
                    <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#07F8F2]/20 bg-[#07F8F2]/5 backdrop-blur-sm group-hover/scroll:border-[#07F8F2]/60 group-hover/scroll:bg-[#07F8F2]/10 transition-all duration-500">
                        <FiChevronDown size={24} className="text-[#07F8F2] animate-bounce" />
                        <div className="absolute inset-0 rounded-full bg-[#07F8F2]/20 blur-xl opacity-0 group-hover/scroll:opacity-100 transition-opacity"></div>
                    </div>
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

