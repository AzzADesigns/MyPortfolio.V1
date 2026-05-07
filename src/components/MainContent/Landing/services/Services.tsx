'use client';
// Force refresh to clear stale exit animations

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { FluidBackground } from './components/FluidBackground';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ServicesContent } from './components/ServicesContent';
import { PROCESS_STEPS } from './constants/servicesData';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const Services = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const currentStep = PROCESS_STEPS[activeStep];

    // Refs para acceder al estado más reciente dentro de GSAP (evitando cierres obsoletos / stale closures)
    const activeStepRef = useRef(activeStep);
    const isAnimatingRef = useRef(isAnimating);

    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

    useEffect(() => {
        isAnimatingRef.current = isAnimating;
    }, [isAnimating]);

    const handleStepChange = (newIdx: number) => {
        if (isAnimatingRef.current || newIdx === activeStepRef.current) return;
        setIsAnimating(true);
        isAnimatingRef.current = true; // Síncrono para bloqueo inmediato

        const direction = newIdx > activeStepRef.current ? 1 : -1;
        const processSection = processRef.current;
        if (!processSection) {
            setActiveStep(newIdx);
            setIsAnimating(false);
            isAnimatingRef.current = false;
            return;
        }

        // Seleccionamos los elementos específicos del contenido para animar
        const number = processSection.querySelector('.step-number-huge');
        const subtitle = processSection.querySelector('.step-content-subtitle');
        const pill = processSection.querySelector('.step-content-pill');
        const desc = processSection.querySelector('.step-content-desc');
        const list = processSection.querySelector('.step-content-list');

        const targets = [number, subtitle, pill, desc, list].filter(Boolean);

        // Seleccionamos las líneas decorativas
        const titleLine = processSection.querySelector('.process-title-line');
        const vLine = processSection.querySelector('.process-v-line');
        const bLine = processSection.querySelector('.process-b-line');
        const rLine = processSection.querySelector('.process-r-line');
        const tLine = processSection.querySelector('.process-t-line');

        const hLines = [titleLine, bLine, tLine].filter(Boolean);
        const vLines = [vLine, rLine].filter(Boolean);

        if (targets.length === 0) {
            setActiveStep(newIdx);
            setIsAnimating(false);
            isAnimatingRef.current = false;
            return;
        }

        // --- CONFIGURACIÓN DE EFECTOS DINÁMICOS POR SECCIÓN ---
        let textOut: gsap.TweenVars, textInFrom: gsap.TweenVars, textInTo: gsap.TweenVars;
        let hLinesOut: gsap.TweenVars, vLinesOut: gsap.TweenVars;
        let hLinesInFrom: gsap.TweenVars, vLinesInFrom: gsap.TweenVars;
        let hLinesIn: gsap.TweenVars, vLinesIn: gsap.TweenVars;

        // Limpieza universal de transformaciones para evitar que "basura" de otros efectos se acumule
        const baseFrom = { x: 0, y: 0, scale: 1, rotationX: 0, rotationZ: 0, skewX: 0, opacity: 0, filter: "blur(10px)" };

        if (newIdx === 2) { 
            // ----- SECCIÓN 03: 3D DEPTH DIVE (Efecto de Inmersión) -----
            textOut = { scale: 1.5, opacity: 0, filter: "blur(20px)", y: -50, duration: 0.5, stagger: 0.04, ease: "power3.in" };
            textInFrom = { ...baseFrom, scale: 0.5, rotationX: 45, y: 100, filter: "blur(15px)" };
            textInTo = { scale: 1, rotationX: 0, y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.06, ease: "elastic.out(1, 0.75)" };
            
            // Las líneas "explotan" hacia afuera del marco
            hLinesOut = { scaleX: 1.5, opacity: 0, duration: 0.4, ease: "power3.in", stagger: 0.05 };
            vLinesOut = { scaleY: 1.5, opacity: 0, duration: 0.4, ease: "power3.in", stagger: 0.05 };
            hLinesInFrom = { scaleX: 0, opacity: 0 };
            vLinesInFrom = { scaleY: 0, opacity: 0 };
            hLinesIn = { scaleX: 1, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.1 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.1, delay: 0.2 };
        }
        else if (newIdx === 3) { 
            // ----- SECCIÓN 04: GRAVITY BOUNCE & GLITCH (Efecto Disruptivo) -----
            textOut = { y: 150, skewX: -15, rotationZ: direction * 5, opacity: 0, filter: "blur(5px)", duration: 0.4, stagger: 0.02, ease: "back.in(2)" };
            textInFrom = { ...baseFrom, y: -200, skewX: 15, rotationZ: direction * -5 };
            textInTo = { y: 0, skewX: 0, rotationZ: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.04, ease: "bounce.out" };
            
            // Las líneas colapsan violentamente y rebotan de forma caótica (stagger invertido)
            hLinesOut = { scaleX: 0, opacity: 0, duration: 0.3, ease: "power4.in" };
            vLinesOut = { scaleY: 0, opacity: 0, duration: 0.3, ease: "power4.in" };
            hLinesInFrom = { scaleX: 0, opacity: 0 };
            vLinesInFrom = { scaleY: 0, opacity: 0 };
            hLinesIn = { scaleX: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)", stagger: -0.05 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)", stagger: -0.05, delay: 0.1 };
        }
        else if (newIdx >= 4) {
            // ----- SECCIÓN 05: HYPER-WARP / VELOCIDAD DE LA LUZ (Efecto Final) -----
            // El texto colapsa en un agujero negro súper rápido
            textOut = { scale: 0, rotationZ: direction * 15, opacity: 0, filter: "blur(10px)", duration: 0.3, stagger: 0.02, ease: "expo.in" };
            // El texto nuevo viene disparado desde detrás del usuario
            textInFrom = { ...baseFrom, scale: 5, filter: "blur(30px)", opacity: 0 };
            textInTo = { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.9, stagger: 0.05, ease: "expo.out" };

            // Las líneas se estiran hacia el infinito y desaparecen
            hLinesOut = { scaleX: 3, opacity: 0, duration: 0.3, ease: "expo.in" };
            vLinesOut = { scaleY: 3, opacity: 0, duration: 0.3, ease: "expo.in" };
            hLinesInFrom = { scaleX: 0, opacity: 0 };
            vLinesInFrom = { scaleY: 0, opacity: 0 };
            // Las líneas entran como un rayo láser limpio
            hLinesIn = { scaleX: 1, opacity: 1, duration: 0.7, ease: "circ.out", stagger: 0.05 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 0.7, ease: "circ.out", stagger: 0.05, delay: 0.1 };
        }
        else { 
            // ----- SECCIÓN 01 y 02: SLIDE MECÁNICO (Línea de tiempo progresiva) -----
            textOut = { x: -80 * direction, opacity: 0, filter: "blur(10px)", duration: 0.4, stagger: 0.03, ease: "power2.in" };
            textInFrom = { ...baseFrom, x: 80 * direction };
            textInTo = { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.05, ease: "back.out(1.2)" };
            
            hLinesOut = { scaleX: 0.2, opacity: 0.2, duration: 0.4, ease: "power2.inOut", stagger: 0.05 };
            vLinesOut = { scaleY: 0.2, opacity: 0.2, duration: 0.4, ease: "power2.inOut", stagger: 0.05 };
            hLinesInFrom = { scaleX: 0.2, opacity: 0.2 };
            vLinesInFrom = { scaleY: 0.2, opacity: 0.2 };
            hLinesIn = { scaleX: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)", stagger: 0.05 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)", stagger: 0.05, delay: 0.1 };
        }

        // Ejecutar Animación de Salida del contenido
        gsap.to(targets, {
            ...textOut,
            onComplete: () => {
                setActiveStep(newIdx);
                activeStepRef.current = newIdx;
                
                setTimeout(() => {
                    // Ejecutar Animación de Entrada de las Líneas
                    if (hLines.length) gsap.fromTo(hLines, hLinesInFrom, hLinesIn);
                    if (vLines.length) gsap.fromTo(vLines, vLinesInFrom, vLinesIn);

                    // Ejecutar Animación de Entrada del contenido
                    gsap.fromTo(targets, textInFrom, {
                        ...textInTo,
                        onComplete: () => {
                            setIsAnimating(false);
                            isAnimatingRef.current = false;
                        }
                    });
                }, 20);
            }
        });

        // Ejecutar Animación de Salida de las Líneas simultáneamente
        if (hLines.length) gsap.to(hLines, hLinesOut);
        if (vLines.length) gsap.to(vLines, vLinesOut);
    };

    // Ref para la función fresca
    const handleStepChangeRef = useRef(handleStepChange);
    useEffect(() => {
        handleStepChangeRef.current = handleStepChange;
    });

    useGSAP(() => {
        if (!scrollRef.current || !processRef.current) return;
        const scroller = scrollRef.current;
        const processSection = processRef.current;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // 1. Efecto de "Snap" fluido hecho con GSAP para mayor suavidad que el Snap nativo
            ScrollTrigger.create({
                trigger: processSection,
                scroller: scroller,
                start: "top 90%",
                onEnter: () => {
                    gsap.to(scroller, {
                        scrollTo: { y: processSection.offsetTop },
                        duration: 1.2,
                        ease: "power4.inOut",
                        overwrite: true
                    });
                }
            });

            ScrollTrigger.create({
                trigger: processSection,
                scroller: scroller,
                start: "top 10%",
                onLeaveBack: () => {
                    gsap.to(scroller, {
                        scrollTo: { y: 0 },
                        duration: 1.2,
                        ease: "power4.inOut",
                        overwrite: true
                    });
                }
            });

            // 2. Animación de salida elegante (Parallax Exit)
            const servicesHeader = scroller.querySelector('.text-center');
            const cards = scroller.querySelectorAll('.service-card');

            if (servicesHeader) {
                gsap.to(servicesHeader, {
                    y: -50,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top bottom",
                        end: "top 40%",
                        scrub: true,
                    }
                });
            }

            cards.forEach((card, i) => {
                gsap.to(card, {
                    y: -150 - (i * 60),
                    opacity: 0,
                    scale: 0.9,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top bottom",
                        end: "top 10%",
                        scrub: true,
                    }
                });
            });

            // 3. Animación de "01" Gigante
            const bigNumber = processSection.querySelector('.step-number-huge');
            if (bigNumber) {
                gsap.fromTo(bigNumber,
                    {
                        scale: 15,
                        opacity: 1,
                        filter: "blur(20px)",
                        x: 330, // Offset inicial para que parezca venir del centro de la pantalla
                        y: -110
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                        x: 0,
                        y: 0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: processSection,
                            scroller: scroller,
                            start: "top top",
                            end: "center top",
                            scrub: 1,
                        }
                    }
                );
            }

            // 4. Entrada Épica del Contenido
            const titleEl = processSection.querySelector('h3') as HTMLElement | null;
            const subtitleContainer = processSection.querySelector('.mt-8.space-y-1') as HTMLElement | null;
            const pillEl = processSection.querySelector('.mb-8.self-start') as HTMLElement | null;
            const descriptionEl = processSection.querySelector('p.max-w-2xl') as HTMLElement | null;
            const listItemEls = Array.from(processSection.querySelectorAll('ul li')) as HTMLElement[];
            const buttonsEl = processSection.querySelector('.flex-col.gap-6') as HTMLElement | null;
            const stepLabelEl = processSection.querySelector('.process-step-label') as HTMLElement | null;

            const titleLineEl = processSection.querySelector('.process-title-line') as HTMLElement | null;
            const vLineEl = processSection.querySelector('.process-v-line') as HTMLElement | null;
            const bLineEl = processSection.querySelector('.process-b-line') as HTMLElement | null;
            const rLineEl = processSection.querySelector('.process-r-line') as HTMLElement | null;
            const tLineEl = processSection.querySelector('.process-t-line') as HTMLElement | null;

            const allElements = [titleEl, subtitleContainer, pillEl, descriptionEl, ...listItemEls, buttonsEl, stepLabelEl].filter(Boolean);

            gsap.set(allElements, { opacity: 0, y: 40, filter: "blur(10px)" });

            ScrollTrigger.create({
                trigger: processSection,
                scroller: scroller,
                start: "center top",
                onEnter: () => {
                    const tl = gsap.timeline();
                    if (titleLineEl) tl.to(titleLineEl, { scaleX: 1, opacity: 1, duration: 0.3, ease: "none" }, 0);
                    if (vLineEl) tl.to(vLineEl, { scaleY: 1, opacity: 1, duration: 0.7, ease: "none" }, 0.3);
                    if (bLineEl) tl.to(bLineEl, { scaleX: 1, opacity: 1, duration: 0.6, ease: "none" }, 1.0);
                    if (rLineEl) tl.to(rLineEl, { scaleY: 1, opacity: 1, duration: 0.6, ease: "none" }, 1.6);
                    if (tLineEl) tl.to(tLineEl, { scaleX: 1, opacity: 1, duration: 0.3, ease: "none" }, 2.2);

                    if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0);
                    if (stepLabelEl) tl.to(stepLabelEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.15);
                    if (subtitleContainer) tl.to(subtitleContainer, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.3);
                    if (pillEl) tl.to(pillEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.6);
                    const col4 = [descriptionEl, ...listItemEls].filter(Boolean);
                    if (col4.length) tl.to(col4, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.9);
                    if (buttonsEl) tl.to(buttonsEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 1.4);
                },
                onLeaveBack: () => {
                    gsap.to(allElements, { opacity: 0, y: 40, filter: "blur(10px)", duration: 0.3, stagger: 0.02, ease: "power2.in", overwrite: true });
                    if (titleLineEl) gsap.to(titleLineEl, { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                    if (vLineEl) gsap.to(vLineEl, { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                    if (bLineEl) gsap.to(bLineEl, { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                    if (rLineEl) gsap.to(rLineEl, { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                    if (tLineEl) gsap.to(tLineEl, { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                }
            });

            // 5. Efecto Acuoso / Expansión del Contenedor
            const mainSection = document.getElementById('servicios');
            const bgContainer = mainSection?.querySelector('.services-bg');
            if (mainSection && bgContainer) {
                gsap.to(mainSection, {
                    paddingTop: 0, paddingLeft: 0, paddingRight: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: processSection, scroller: scroller,
                        start: "top 95%", end: "top 10%", scrub: true,
                    }
                });
                gsap.to(bgContainer, {
                    borderTopLeftRadius: 0, borderTopRightRadius: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: processSection, scroller: scroller,
                        start: "top 95%", end: "top 10%", scrub: true,
                    }
                });
            }

            // 6. Integración del Scroll con los Pasos (Scroll-driven Carousel)
            // Esto asegura que el efecto se haga con el scroll, y arranca DESPUÉS de que el 01 entra.
            ScrollTrigger.create({
                trigger: processSection,
                scroller: scroller,
                // Empieza considerablemente después de "center top" para dar margen a que
                // la animación épica de entrada termine y todo esté ya en pantalla.
                start: "center -30%", 
                end: "bottom bottom",
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalSteps = PROCESS_STEPS.length;
                    
                    // Divide el scroll restante equitativamente entre todos los pasos
                    let targetStep = Math.floor(progress * totalSteps);
                    if (targetStep >= totalSteps) targetStep = totalSteps - 1;

                    if (targetStep !== activeStepRef.current && !isAnimatingRef.current) {
                        handleStepChangeRef.current(targetStep);
                    }
                }
            });
        });

        return () => mm.revert();
    }, { scope: scrollRef });

    return (
        <section id="servicios" className="flex-none w-full h-auto lg:h-screen px-0 lg:px-6 pt-0 lg:pt-27 relative z-10 lg:snap-start">
            <div className="services-bg relative w-full h-auto lg:h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[23px] shadow-[0_-20px_50px_rgba(255,255,255,0.1)] overflow-hidden">
                <FluidBackground />
                <ScrollIndicator />

                {/* Contenedor de Scroll principal: En móvil es relativo y fluye con la página, en desktop es absoluto y scrolleable internamente */}
                <div
                    ref={scrollRef}
                    className="relative lg:absolute lg:inset-0 h-auto lg:h-full overflow-visible lg:overflow-y-auto lg:overflow-x-hidden services-internal-scroll z-10 flex flex-col"
                >
                    {/* Primera sección: Contenido de Servicios */}
                    <div className="relative w-full h-auto lg:min-h-screen flex-shrink-0">
                        <ServicesContent />
                    </div>

                    {/* Nueva sección: El Proceso */}
                    <div
                        ref={processRef}
                        id="proceso-section"
                        // Incrementamos la altura para tener suficiente espacio de scroll (track) para los 4 pasos
                        className="w-full relative h-auto lg:min-h-[400vh]"
                    >
                        {/* VERSION DESKTOP: Sticky + Interactivo (Solo visible en LG+) */}
                        <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center overflow-hidden">


                            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-16 relative z-10 lg:mt-24">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full">

                                    {/* Columna 1: Títulos y Selectores */}
                                    <div className="lg:col-span-5 flex flex-col space-y-8 lg:space-y-10">
                                        <div className="flex items-center">
                                            <h3 className="text-3xl md:text-[50px] font-bold text-[#001720] tracking-tight whitespace-nowrap">
                                                El proceso
                                            </h3>
                                            <div
                                                className="process-title-line ml-3 h-[3px] flex-1 origin-left bg-[#001720]"
                                                style={{ transform: 'scaleX(0)' }}
                                            />
                                        </div>

                                        <div className="flex items-start gap-8 lg:gap-10">
                                            {/* Selectores de pasos */}
                                            <div className="flex flex-col gap-6 mt-4">
                                                {PROCESS_STEPS.map((step, idx) => (
                                                    <button
                                                        key={step.id}
                                                        onClick={() => handleStepChange(idx)}
                                                        disabled={isAnimating}
                                                        className={`w-[67px] h-[60px] rounded-xl border-[3px] flex items-center justify-center font-bold text-xl transition-all duration-300 ${activeStep === idx
                                                            ? 'border-[#001720] bg-[#001720] text-white shadow-md'
                                                            : 'border-[#001720] text-[#001720] hover:bg-[#001720]/5'
                                                            } ${isAnimating ? 'cursor-default' : ''}`}
                                                    >
                                                        {step.id}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Bloque central: Paso + Número Gigante + Subtítulo */}
                                            <div className="flex flex-col ml-10 lg:ml-0 xl:ml-20 lg:mt-20">
                                                <div className="relative inline-block">
                                                    <span className="process-step-label absolute -top-10 -right-2 origin-center rotate-90 text-[11px] font-black tracking-[0.3em] text-[#001720]/40 uppercase whitespace-nowrap">
                                                        Paso
                                                    </span>

                                                    {/* El número gigante ahora vive en el flujo, alineándose naturalmente */}
                                                    <span
                                                        className="step-number-huge block text-[120px] md:text-[180px] lg:text-[210px] font-bold leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan to-brand-green drop-shadow-[0_15px_30px_rgba(7,248,242,0.25)]"
                                                        style={{ WebkitTextStroke: '2px #001720' }}
                                                    >
                                                        {currentStep.id}
                                                    </span>
                                                </div>

                                                <div className="mt-8 space-y-1 text-right mr-4 step-content-subtitle">
                                                    <h4 className="text-3xl md:text-[45px] font-bold text-[#001720] tracking-tight leading-tight">
                                                        {currentStep.title}
                                                    </h4>
                                                    <p className="text-2xl md:text-[35px] font-medium text-gray-500 leading-tight">
                                                        {currentStep.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Columna 2: Texto y Detalles */}
                                    <div className="lg:col-span-7 flex flex-col justify-center lg:pt-24 pl-10 lg:pl-16 pb-16 relative">
                                        {/* Líneas decorativas */}
                                        <div className="process-v-line absolute left-0 top-[29px] bottom-0 w-[3px] bg-[#001720] origin-top" style={{ transform: 'scaleY(0)' }} />
                                        <div className="process-b-line absolute bottom-0 left-0 -right-10 h-[3px] bg-[#001720] origin-left" style={{ transform: 'scaleX(0)' }} />
                                        <div className="process-r-line absolute bottom-0 -right-10 top-[29px] w-[3px] bg-[#001720] origin-bottom" style={{ transform: 'scaleY(0)' }} />
                                        <div className="process-t-line absolute top-[29px] -right-10 w-24 h-[3px] bg-[#001720] origin-right" style={{ transform: 'scaleX(0)' }} />

                                        {/* Pregunta / Pill */}
                                        <div className="mb-8 self-start flex items-center gap-3 step-content-pill">
                                            <span className="text-[#001720] font-medium text-lg md:text-[20px]">Todo comienza con</span>
                                            <div className="bg-[#001720] px-6 py-3 rounded-3xl border border-brand-cyan/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] transform -rotate-1">
                                                <span className="text-brand-green font-bold text-lg md:text-[20px] italic tracking-tight block mb-[2px]">“{currentStep.question}”</span>
                                            </div>
                                        </div>

                                        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-10 max-w-2xl step-content-desc">{currentStep.description}</p>

                                        <ul className="space-y-6 step-content-list">
                                            {currentStep.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-5">
                                                    <div className="w-2.5 h-2.5 bg-[#001720] mt-2.5 flex-shrink-0"></div>
                                                    <p className="text-lg md:text-[19px] text-gray-700 leading-snug">
                                                        <span className="font-bold text-[#001720]">{point.label}:</span> {point.text}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VERSION MOBILE: Lista completa de todos los pasos uno tras otro */}
                        <div className="lg:hidden flex flex-col py-16 px-6 space-y-24 bg-transparent relative z-10">
                            <div className="flex flex-col space-y-4 mb-8">
                                <h2 className="text-4xl font-bold text-[#001720]">El Proceso</h2>
                                <div className="w-20 h-1 bg-brand-cyan"></div>
                            </div>

                            {PROCESS_STEPS.map((step) => (
                                <div key={step.id} className="flex flex-col space-y-10 border-b border-gray-100 pb-16 last:border-0 last:pb-0">
                                    {/* Cabecera del paso */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-brand-cyan font-bold tracking-widest uppercase text-sm mb-1">Paso {step.id}</span>
                                            <h3 className="text-3xl font-bold text-[#001720] leading-tight">{step.title}</h3>
                                            <p className="text-xl text-gray-500 font-medium italic mt-1">{step.subtitle}</p>
                                        </div>
                                        <div className="text-6xl font-black text-[#001720]/5 select-none">{step.id}</div>
                                    </div>

                                    {/* Pill de pregunta */}
                                    <div className="bg-[#001720] px-6 py-4 rounded-2xl self-start transform -rotate-1 shadow-lg">
                                        <span className="text-brand-green font-bold text-lg italic tracking-tight">“{step.question}”</span>
                                    </div>

                                    {/* Descripción y puntos */}
                                    <div className="space-y-8">
                                        <p className="text-lg text-gray-600 leading-relaxed font-medium">{step.description}</p>
                                        <ul className="space-y-6">
                                            {step.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <div className="w-2 h-2 bg-[#001720] mt-2.5 flex-shrink-0"></div>
                                                    <p className="text-gray-700 leading-snug">
                                                        <span className="font-bold text-[#001720]">{point.label}:</span> {point.text}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

