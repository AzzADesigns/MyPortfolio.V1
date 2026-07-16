'use client';

import Image from 'next/image';
import { useRef, useEffect, useCallback } from 'react';
import { CTAButton } from '../../shared';
import { scrollToSection } from '../../shared/scrollToSection';
import { PROJECTS } from '../constants/projects';

interface ProjectDetailProps {
    selectedProject: number | null;
    setSelectedProject: (num: number | null) => void;
}

export const ProjectDetail = ({ selectedProject, setSelectedProject }: ProjectDetailProps) => {
    const project = PROJECTS.find(p => p.num === selectedProject);

    // Scroll container
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Hero refs
    const heroStickyRef   = useRef<HTMLDivElement>(null);
    const heroTitleRef    = useRef<HTMLHeadingElement>(null);
    const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
    const heroWatermarkRef = useRef<HTMLDivElement>(null);
    const heroIndicatorRef = useRef<HTMLDivElement>(null);
    const cardsWrapperRef  = useRef<HTMLDivElement>(null);

    // Card physics refs
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    // RAF / spring state
    const rafRef    = useRef<number | null>(null);
    const isRunning = useRef(false);
    const springs   = useRef([
        { rotateX: 18, scale: 0.90 },
        { rotateX: 16, scale: 0.91 },
        { rotateX: 14, scale: 0.92 },
    ]);

    const CARD_PHYSICS = [
        { stickyFrac: 0.12, maxRotateX: 18, minScale: 0.90, travelFrac: 0.55 },
        { stickyFrac: 0.14, maxRotateX: 16, minScale: 0.91, travelFrac: 0.50 },
        { stickyFrac: 0.16, maxRotateX: 14, minScale: 0.92, travelFrac: 0.45 },
    ];
    const SPRING_K         = 0.07;
    const SETTLE_THRESHOLD = 0.0008;

    // ─── Hero scroll-driven animation ─────────────────────────────────────────
    const animateHero = useCallback((scrollTop: number, vh: number) => {
        // Hero animates over the first 150vh of scroll space (out of 250vh wrapper)
        const progress = Math.min(1, scrollTop / (1.25 * vh));

        // ── Title ──
        // Scale: peaks at 1.08 at 50% progress, then compresses back
        const scaleT = Math.sin(progress * Math.PI) * 0.08;
        const titleScale = 1 + scaleT;
        // Move up: starts lifting at 30% progress
        const titleY = progress < 0.30 ? 0 : -(progress - 0.30) * vh * 0.55;
        // Opacity: holds full until 42%, then fades to 0 by 80%
        const titleOpacity = progress < 0.42 ? 1 : Math.max(0, 1 - (progress - 0.42) / 0.38);

        if (heroTitleRef.current) {
            heroTitleRef.current.style.transform =
                `scale(${titleScale.toFixed(4)}) translateY(${titleY.toFixed(1)}px)`;
            heroTitleRef.current.style.opacity = `${titleOpacity.toFixed(3)}`;
        }

        // ── Subtitle ──
        const subY       = progress < 0.25 ? 0 : -(progress - 0.25) * vh * 0.65;
        const subOpacity = progress < 0.32 ? 1 : Math.max(0, 1 - (progress - 0.32) / 0.25);
        if (heroSubtitleRef.current) {
            heroSubtitleRef.current.style.transform  = `translateY(${subY.toFixed(1)}px)`;
            heroSubtitleRef.current.style.opacity    = `${subOpacity.toFixed(3)}`;
        }

        // ── Watermark number — slower parallax ──
        if (heroWatermarkRef.current) {
            heroWatermarkRef.current.style.transform = `translateY(${(-scrollTop * 0.07).toFixed(1)}px) scale(${(1 + progress * 0.05).toFixed(3)})`;
            heroWatermarkRef.current.style.opacity   = `${Math.max(0, 0.05 - progress * 0.06).toFixed(3)}`;
        }

        // ── Scroll indicator ──
        if (heroIndicatorRef.current) {
            heroIndicatorRef.current.style.opacity = `${Math.max(0, 1 - progress * 6).toFixed(3)}`;
        }

        // ── Hero sticky clip-path: mask-reveal from bottom ──
        // Starts clipping at 45% progress; by 82% the hero is fully hidden
        if (heroStickyRef.current) {
            const clipProg = Math.max(0, (progress - 0.45) / 0.37);
            const bottomPct = (clipProg * 100).toFixed(1);
            heroStickyRef.current.style.clipPath = clipProg > 0
                ? `inset(0 0 ${bottomPct}% 0 round 0 0 20px 20px)`
                : 'none';
        }
    }, []);

    // ─── Card spring physics ──────────────────────────────────────────────────
    const computeTargets = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return springs.current.map((_, i) => ({
            rotateX: CARD_PHYSICS[i].maxRotateX,
            scale:   CARD_PHYSICS[i].minScale,
        }));

        const containerRect = container.getBoundingClientRect();
        const vh    = container.clientHeight;
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
        const cardTops = [0.15, 0.18, 0.21]; // Matches CSS top: 15vh, 18vh, 21vh

        return cards.map((card, i) => {
            const { maxRotateX, minScale, travelFrac } = CARD_PHYSICS[i];
            if (!card) return { rotateX: maxRotateX, scale: minScale };
            const cardRect   = card.getBoundingClientRect();
            
            // Calculate distance to the actual top offset where it sticks
            const targetY = cardTops[i] * vh;
            const distToSticky = cardRect.top - targetY;
            
            const raw  = 1 - Math.max(0, Math.min(1, distToSticky / (travelFrac * vh)));
            const eased = 1 - Math.pow(1 - raw, 4);
            return {
                rotateX: maxRotateX * (1 - eased),
                scale:   minScale + (1 - minScale) * eased,
            };
        });
    }, []);

    const loop = useCallback(() => {
        const container = scrollContainerRef.current;
        const scrollTop = container?.scrollTop ?? 0;
        const vh        = container?.clientHeight ?? window.innerHeight;

        // Hero animation (direct, no spring)
        animateHero(scrollTop, vh);

        // Card spring physics
        const targets = computeTargets();
        const cards   = [card1Ref.current, card2Ref.current, card3Ref.current];
        let stillMoving = false;

        springs.current.forEach((spring, i) => {
            const target = targets[i];
            const dR = target.rotateX - spring.rotateX;
            const dS = target.scale   - spring.scale;
            spring.rotateX += dR * SPRING_K;
            spring.scale   += dS * SPRING_K;
            if (Math.abs(dR) > SETTLE_THRESHOLD || Math.abs(dS) > SETTLE_THRESHOLD) stillMoving = true;
            const card = cards[i];
            if (card) {
                card.style.transform = `perspective(1400px) rotateX(${spring.rotateX.toFixed(3)}deg) scale(${spring.scale.toFixed(4)})`;
            }
        });

        if (stillMoving) {
            rafRef.current = requestAnimationFrame(loop);
        } else {
            isRunning.current = false;
        }
    }, [computeTargets, animateHero]);

    const startLoop = useCallback(() => {
        if (isRunning.current) return;
        isRunning.current = true;
        rafRef.current = requestAnimationFrame(loop);
    }, [loop]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || !project) return;

        // Reset spring state
        springs.current = [
            { rotateX: 18, scale: 0.90 },
            { rotateX: 16, scale: 0.91 },
            { rotateX: 14, scale: 0.92 },
        ];
        // Reset hero transforms
        if (heroStickyRef.current) heroStickyRef.current.style.clipPath = 'none';

        const onScroll = () => startLoop();
        startLoop();
        container.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            isRunning.current = false;
        };
    }, [selectedProject, startLoop, project]);

    return (
        <div
            className={`fixed inset-0 z-[100] transition-all duration-1000 ease-in-out
                ${selectedProject !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-full'}`}
            style={{ background: '#121316' }}
        >
            {project && (
                <>
                    {/* Close button */}
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-8 right-8 md:top-12 md:right-12 z-[110] border border-black/10 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full text-black text-xs font-mono uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-md cursor-pointer"
                    >
                        <span>✕</span> Cerrar
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="w-full h-full overflow-y-auto custom-scrollbar selection:bg-[#89EA2B] selection:text-black"
                        style={{ overscrollBehavior: 'contain', background: '#121316' }}
                    >
                        {/* ══════════════════════════════════════════════════════
                            HERO: 250vh scroll wrapper → sticky panel (100vh)
                            The extra 150vh of scroll space is what drives the
                            transform animations before hero disappears.
                        ══════════════════════════════════════════════════════ */}
                        <div className="relative" style={{ height: '175vh' }}>
                            <div
                                ref={heroStickyRef}
                                className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden will-change-[clip-path] dot-grid-bg"
                            >
                                {/* Ambient glowing blobs */}
                                <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#07F8F2] glow-blob pointer-events-none z-0" />
                                <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#89EA2B] glow-blob pointer-events-none z-0" />
                                <div className="absolute top-[50%] left-[40%] w-[35vw] h-[35vw] rounded-full bg-[#07F8F2] glow-blob pointer-events-none z-0" />

                                {/* Monospace label */}
                                <div className="absolute top-10 left-10 opacity-30 select-none pointer-events-none font-mono text-sm tracking-[0.2em] text-black z-10">
                                    CASE_STUDY // 0{selectedProject}
                                </div>

                                {/* Large watermark number — slower parallax layer */}
                                <div
                                    ref={heroWatermarkRef}
                                    className="absolute top-20 left-8 select-none pointer-events-none z-0 will-change-transform"
                                    style={{ opacity: 0.05, transformOrigin: 'top left' }}
                                >
                                    <span className="text-[24vw] font-black text-black leading-none">0{selectedProject}</span>
                                </div>

                                {/* Main title — scale + lift + fade */}
                                <h2
                                    ref={heroTitleRef}
                                    className="text-black text-5xl md:text-7xl lg:text-[7vw] xl:text-[8vw] font-black tracking-tighter uppercase leading-[0.95] text-center z-10 will-change-transform"
                                    style={{ transformOrigin: 'center center' }}
                                >
                                    {project?.fullTitle}
                                </h2>

                                {/* Subtitle — fades slightly faster */}
                                <p
                                    ref={heroSubtitleRef}
                                    className="text-gray-400 text-xs md:text-sm mt-8 tracking-[0.6em] uppercase font-mono text-center z-10 will-change-transform"
                                >
                                    [ Caso de Estudio & Desarrollo ]
                                </p>

                                {/* Scroll indicator */}
                                <div
                                    ref={heroIndicatorRef}
                                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10 will-change-[opacity]"
                                >
                                    <div className="w-[1px] h-20 bg-black/20 relative">
                                        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#89EA2B]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ══════════════════════════════════════════════════════
                            CARDS SECTION
                            Negative margin pulls the sections container up so
                            they overlap the hero's space directly, allowing
                            standard CSS sticky behavior to anchor each card in
                            the viewport center as the user scrolls.
                        ══════════════════════════════════════════════════════ */}
                        <div
                            ref={cardsWrapperRef}
                            className="relative z-20"
                            style={{ marginTop: '-45vh' }}
                        >
                            <div className="max-w-[1600px] mx-auto px-6 space-y-24 md:space-y-40 pb-40">

                                {/* Sticky card stack — sections 1, 2, 3 */}
                                <div className="space-y-24 md:space-y-40">

                                    {/* Section 1: El Desafío */}
                                    <div
                                        ref={card1Ref}
                                        className="grid lg:grid-cols-12 gap-10 items-center bg-white/95 backdrop-blur-md border border-black/5 p-8 md:p-14 rounded-3xl shadow-xl sticky z-10 will-change-transform"
                                        style={{ transformOrigin: 'center center', top: '15vh' }}
                                    >
                                        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                                            <div className="text-xs font-mono text-gray-400 tracking-[0.3em] uppercase">[ 01 / EL DESAFÍO ]</div>
                                            <h3 className="text-black text-4xl md:text-6xl font-black tracking-tighter uppercase">El Desafío</h3>
                                            {project?.challenge.split('\n\n').map((p, i) => (
                                                <p key={i} className="text-gray-500 text-base md:text-lg leading-relaxed font-light">{p}</p>
                                            ))}
                                        </div>
                                        <div className="lg:col-span-7 relative aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden order-1 lg:order-2 group border border-black/5 shadow-lg">
                                            <Image src={project?.challengeImg ?? `/${project?.imgPrefix}1.${project?.imgExt}`} alt="Challenge" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-black/5 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                                        </div>
                                    </div>

                                    {/* Section 2: Arquitectura */}
                                    <div
                                        ref={card2Ref}
                                        className="grid lg:grid-cols-12 gap-10 items-center bg-[#001720] border border-white/10 p-8 md:p-14 pb-24 md:pb-36 rounded-3xl sticky z-20 will-change-transform shadow-[0_20px_50px_rgba(7,248,242,0.15)]"
                                        style={{ transformOrigin: 'center center', top: '18vh' }}
                                    >
                                        <div className="lg:col-span-7 relative aspect-[16/10] bg-black/30 rounded-2xl overflow-hidden group border border-white/5 shadow-2xl">
                                            <Image src={project?.architectureImg ?? `/${project?.imgPrefix}2.${project?.imgExt}`} alt="Architecture" fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                                        </div>
                                        <div className="lg:col-span-5 space-y-6 text-[#c0c6cf] lg:pl-4">
                                            <div className="text-xs font-mono text-[#07F8F2]/60 tracking-[0.3em] uppercase">[ 02 / ARQUITECTURA ]</div>
                                            <h3 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase border-b border-white/10 pb-4">Arquitectura</h3>
                                            {project?.architecture.split('\n\n').map((p, i) => (
                                                <p key={i} className="text-gray-400 text-base md:text-lg leading-relaxed font-light">{p}</p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section 3: Impacto Real */}
                                    <div
                                        ref={card3Ref}
                                        className="space-y-16 bg-white/95 backdrop-blur-md border border-black/5 p-8 md:p-14 rounded-3xl shadow-xl sticky z-30 will-change-transform"
                                        style={{ transformOrigin: 'center center', top: '21vh' }}
                                    >
                                        <div className="text-center max-w-4xl mx-auto space-y-6">
                                            <div className="text-xs font-mono text-gray-400 tracking-[0.3em] uppercase">[ 03 / RESULTADO & IMPACTO ]</div>
                                            <h3 className="text-black text-5xl md:text-7xl font-black tracking-tighter uppercase">Impacto Real</h3>
                                            {project?.impact.split('\n\n').map((p, i) => (
                                                <p key={i} className="text-gray-500 text-lg md:text-2xl font-light leading-relaxed">{p}</p>
                                            ))}
                                        </div>
                                        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                                            <div className="lg:col-span-8 relative aspect-video bg-gray-50 rounded-2xl overflow-hidden shadow-xl group border border-black/5">
                                                <Image src={project?.impactImg ?? `/${project?.imgPrefix}3.${project?.imgExt}`} alt="Impact" fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                                                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] font-mono font-bold text-black border border-black/5 rounded-lg shadow-md">
                                                    [ VISTA PRINCIPAL DE LA INTERFAZ ]
                                                </div>
                                            </div>
                                            <div className="lg:col-span-4 flex flex-col gap-6">
                                                {[4, 5].map((idx) => (
                                                    <div key={idx} className="relative flex-1 aspect-video lg:aspect-auto bg-gray-50 rounded-2xl overflow-hidden shadow-lg group border border-black/5">
                                                        <Image src={project?.detailImgs?.[idx - 4] ?? `/${project?.imgPrefix}${idx}.${project?.imgExt}`} alt="Detail" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                            <span className="text-white text-[9px] font-mono uppercase tracking-widest font-medium">Detalle // 0{idx - 2}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Final section: Technologies + CTA — normal scroll */}
                                <div className="border-t border-black/10 pt-16 space-y-16 relative z-40">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white/50 backdrop-blur-md border border-black/5 p-8 rounded-3xl">
                                        <div className="space-y-4">
                                            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">[ TECNOLOGÍAS PRINCIPALES ]</span>
                                            <div className="flex flex-wrap gap-3">
                                                {project?.technologies.map(t => (
                                                    <span key={t} className="text-sm font-mono font-bold text-black bg-black/5 px-4 py-1.5 rounded-lg border border-black/5 shadow-sm">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="bg-black text-white px-10 py-4 rounded-2xl hover:bg-[#89EA2B] hover:text-black transition-all duration-500 font-mono text-xs uppercase tracking-widest group border border-black/10 active:scale-95 shadow-md cursor-pointer"
                                        >
                                            Siguiente Proyecto
                                            <span className="ml-4 group-hover:ml-6 transition-all inline-block">→</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center text-center space-y-8 pt-10 pb-10 bg-gradient-to-b from-white/30 to-transparent border border-black/5 rounded-3xl p-8 backdrop-blur-md">
                                        <p className="text-gray-500 text-lg md:text-xl font-light tracking-wide max-w-xl">¿Te gustaría tener un proyecto con este nivel de detalle y calidad?</p>
                                        <CTAButton
                                            text="Contrátame"
                                            onClick={() => {
                                                setSelectedProject(null);
                                                setTimeout(() => scrollToSection('contacto'), 150);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};