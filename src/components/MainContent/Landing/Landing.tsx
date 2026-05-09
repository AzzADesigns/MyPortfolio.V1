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

        // 2. Pre-posicionamiento del HUD (Invisible)
        if (tooltipRef.current) {
            gsap.killTweensOf(tooltipRef.current);
            gsap.set(tooltipRef.current, { 
                x: e.clientX + 40, 
                y: e.clientY + 40,
                scale: 0.85,
                opacity: 0
            });
            // 3. Pop-in del HUD una vez completado el escaneo
            gsap.to(tooltipRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                delay: 0.45, // Sincronizado con el fin del láser
                ease: "back.out(2)"
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (tooltipRef.current && hoveredWord === id) {
            // Animación mecánica y rápida (propia de un HUD)
            gsap.to(tooltipRef.current, {
                x: e.clientX + 40,
                y: e.clientY + 40,
                duration: 0.15,
                ease: "power2.out"
            });
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
            className={`manifesto-highlight inline-block font-medium relative z-20 transition-all duration-500 
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
                    className={`fixed top-0 left-0 w-max max-w-[320px] md:max-w-[480px] whitespace-normal text-left px-6 md:px-8 py-5 md:py-6 bg-[#001720]/90 backdrop-blur-xl border border-[#07F8F2]/30 text-[#07F8F2] font-mono pointer-events-none z-[9999] uppercase opacity-0
                    shadow-[0_0_50px_rgba(7,248,242,0.15),inset_0_0_20px_rgba(7,248,242,0.05)]
                `}
                style={{ transformOrigin: '0 0' }} // El escalado nace exactamente desde el punto de anclaje
                >
                    {/* Línea conectora al cursor (Láser de proyección del dron) */}
                    <svg className="absolute -top-[40px] -left-[40px] w-[40px] h-[40px] overflow-visible">
                        <line x1="0" y1="0" x2="40" y2="40" stroke="#07F8F2" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />
                        <circle cx="0" cy="0" r="4" fill="#07F8F2" className="animate-pulse" />
                        <circle cx="40" cy="40" r="3" fill="#89EA2B" />
                    </svg>

                    {/* Encabezado Técnico HUD */}
                    <span className="flex items-center gap-2 text-[10px] md:text-xs text-[#89EA2B] mb-3 opacity-90 tracking-[0.2em] font-sans font-bold">
                        <span className="w-2 h-2 bg-[#89EA2B] rounded-sm animate-pulse"></span>
                        DRONE_LINK // ACQUIRED
                    </span>
                    
                    {/* Texto principal ampliado */}
                    <span className="block text-xl md:text-[1.8rem] font-semibold leading-snug tracking-tight">
                        {completionText}
                        <span className="animate-pulse inline-block ml-2 bg-[#07F8F2] w-3 h-6 md:h-8 translate-y-1 md:translate-y-2"></span>
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

    const handleScan = (id: string) => {
        setScannedWords(prev => new Set(prev).add(id));
    };

    const allScanned = scannedWords.size === 7;

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
            <section ref={manifestoRef} id="lafirma" className="flex-none flex flex-col items-center justify-center relative w-full h-screen lg:snap-start overflow-hidden bg-[#001720]">
                {/* Fondo animado reutilizado del header */}
                <AuroraBackground />
                
                {/* HUD: Barra de progreso de escaneo global - Proporcional al logo */}
                <div className="absolute top-24 left-6 md:top-32 md:left-12 z-20 flex flex-col gap-3 font-mono text-[#07F8F2]/80 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                    <div className="flex justify-between items-end w-64 md:w-80">
                        <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${allScanned ? 'bg-[#89EA2B] shadow-[0_0_10px_#89EA2B]' : 'bg-[#07F8F2] animate-ping'}`}></span>
                            MANIFESTO_UPLINK_STATUS
                        </span>
                        <span className={`text-sm md:text-base font-bold ${allScanned ? 'text-[#89EA2B]' : 'text-[#07F8F2]'}`}>
                            {Math.round((scannedWords.size / 7) * 100)}%
                        </span>
                    </div>
                    <div className="w-64 md:w-80 h-[3px] bg-white/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(7,248,242,0.1)]">
                        <div 
                            className={`h-full bg-gradient-to-r from-[#07F8F2] to-[#89EA2B] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(7,248,242,0.5)]`}
                            style={{ width: `${(scannedWords.size / 7) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex flex-col gap-1">
                        {allScanned ? (
                            <span className="text-[#89EA2B] text-[9px] animate-pulse">>> VERIFICATION_COMPLETE: SYSTEM_STABLE</span>
                        ) : (
                            <span className="text-[#07F8F2]/40 text-[8px] italic">
                                >> WAITING_FOR_DATA_PACKETS ({scannedWords.size}/7)
                            </span>
                        )}
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto px-6 text-center">
                    
                    {/* Títulos principales con efecto de perspectiva para la animación 3D */}
                    <div className="flex flex-col gap-4 md:gap-6 items-center justify-center mb-16 md:mb-24 perspective-[1000px] w-full">
                        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 md:gap-4 lg:gap-6 text-[1.8rem] md:text-4xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.8rem] leading-none font-medium tracking-tight whitespace-nowrap">
                            <span className="text-white manifesto-w3 inline-block will-change-transform">Revolucionando</span>
                            <span className="bg-[#89EA2B] text-[#001720] px-4 py-2 md:px-5 md:py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-xl md:rounded-2xl lg:rounded-[2rem] manifesto-w2 inline-block will-change-transform shadow-[0_0_40px_rgba(137,234,43,0.15)]">el internet</span>
                        </div>
                        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 md:gap-4 lg:gap-6 text-[1.8rem] md:text-4xl lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[4.8rem] leading-none font-medium tracking-tight whitespace-nowrap">
                            <span className="bg-[#07F8F2] text-[#001720] px-4 py-2 md:px-5 md:py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-xl md:rounded-2xl lg:rounded-[2rem] manifesto-w1 inline-block will-change-transform shadow-[0_0_40px_rgba(7,248,242,0.15)]">Recreando</span>
                            <span className="text-white manifesto-w3 inline-block will-change-transform">un concepto</span>
                        </div>
                    </div>

                    {/* Texto secundario con animación creativa (Líneas y palabras clave) */}
                    <div className="flex flex-col gap-10 md:gap-14 text-lg md:text-2xl lg:text-[1.7rem] text-gray-400 font-light max-w-5xl perspective-[1000px]">
                        <p className="manifesto-text-line will-change-transform opacity-0">
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}>AzzADesigns busca </span>
                            <HoverWord id="liderar" baseText="liderar" completionText="el mercado digital con autoridad" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                            <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> la web moderna.</span>
                        </p>
                        
                        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
                            <p className="manifesto-text-line will-change-transform opacity-0">
                                <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}>Buscando </span>
                                <HoverWord id="elevar" baseText="elevar el estándar" completionText="con ideas altamente disruptivas" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                                <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> de un internet genérico y repetitivo</span>
                            </p>
                            <p className="manifesto-text-line will-change-transform opacity-0">
                                <HoverWord id="redefiniendo" baseText="redefiniendo" completionText="el concepto de identidad de marca" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                                <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> con un enfoque </span>
                                <HoverWord id="premium" baseText="premium" completionText="para experiencias web de alto impacto" colorClass="text-[#89EA2B]" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                                <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> donde la </span>
                                <HoverWord id="calidad" baseText="calidad" completionText="en cada línea de código" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                                <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> en cada</span>
                            </p>
                            <p className="manifesto-text-line will-change-transform opacity-0">
                                <HoverWord id="detalle" baseText="detalle" completionText="diseñado a la perfección absoluta" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                                <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> de tu producto sea la </span>
                                <HoverWord id="excepcion" baseText="excepción" completionText="que rompe todos los moldes preestablecidos" hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                                <span className={`transition-all duration-500 ${hoveredWord ? 'blur-sm opacity-40' : ''}`}> a la norma general</span>
                            </p>
                        </div>
                    </div>

                </div>

                {/* Recompensa Final: Firma + CTA (Más compacto y bajo) */}
                <div className={`absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6 transition-all duration-1000 ease-out ${allScanned ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
                    
                    {/* Resplandor de fondo refinado */}
                    <div className="absolute -inset-x-20 md:-inset-x-40 -inset-y-10 bg-gradient-to-r from-[#07F8F2]/5 via-[#89EA2B]/5 to-[#07F8F2]/5 blur-[60px] md:blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative z-10 w-full">
                        {/* Firma más pequeña */}
                        <div className="flex flex-col items-center md:items-end">
                            <p className="text-[#07F8F2]/40 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] mb-2">SIGNED_BY</p>
                            <div 
                                className="text-4xl md:text-5xl lg:text-6xl text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] rotate-[-4deg] select-none"
                                style={{ fontFamily: 'var(--font-momo)' }}
                            >
                                AzzA Designs
                            </div>
                        </div>

                        {/* Botón CTA más compacto */}
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[#07F8F2]/40 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] mb-1">EXECUTE_CALL_TO_ACTION</p>
                            <CTAButton 
                                text="Quiero romper estándares ya" 
                                className="!px-8 md:!px-10 !py-4 md:!py-5 !text-sm md:!text-lg !rounded-xl md:!rounded-2xl shadow-[0_0_30px_rgba(137,234,43,0.2)] hover:shadow-[0_0_40px_rgba(7,248,242,0.4)] transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
