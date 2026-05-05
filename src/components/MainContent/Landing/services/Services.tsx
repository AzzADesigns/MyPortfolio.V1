'use client';
// Force refresh to clear stale exit animations

import React, { useState, useRef } from 'react';
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const currentStep = PROCESS_STEPS[activeStep];

    useGSAP(() => {
        if (!scrollRef.current || !processRef.current) return;

        const scroller = scrollRef.current;
        const processSection = processRef.current;

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
        // Se activa SOLO cuando la sección de proceso empieza a entrar
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
                y: -80 - (i * 30), // Efecto de velocidad distinta para cada card
                opacity: 0,
                scale: 0.95,
                scrollTrigger: {
                    trigger: processSection,
                    scroller: scroller,
                    start: "top bottom",
                    end: "top 20%",
                    scrub: true,
                }
            });
        });

        // 3. Animación de "01" Gigante (Zoom-out entry)
        const bigNumber = processSection.querySelector('.step-number-huge');

        if (bigNumber) {
            gsap.fromTo(bigNumber,
                { 
                    scale: 20,
                    opacity: 0,
                    filter: "blur(20px)",
                    x: 0,
                    y: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    // Ajuste fino para que caiga justo sobre el placeholder
                    x: -320, 
                    y: -90,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        // Empieza a achicarse justo cuando la sección se fija (sticky) en pantalla
                        start: "top top", 
                        // Termina a la mitad del recorrido total de la sección
                        end: "center top", 
                        scrub: 1,
                    }
                }
            );
        }

        // 4. Entrada Épica del Contenido (Sincronizada por grupos)
        const titleEl    = processSection.querySelector('h3') as HTMLElement | null;
        const subtitleContainer = processSection.querySelector('.mt-4.space-y-1') as HTMLElement | null;
        const pillEl      = processSection.querySelector('.mb-8.self-start') as HTMLElement | null;
        const descriptionEl = processSection.querySelector('p.max-w-2xl') as HTMLElement | null;
        const listItemEls = Array.from(processSection.querySelectorAll('ul li')) as HTMLElement[];
        const buttonsEl   = processSection.querySelector('.flex-col.gap-3') as HTMLElement | null;
        // ─── Líneas decorativas: elemento CSS, sin cálculos ───
        const titleLineEl  = processSection.querySelector('.process-title-line')  as HTMLElement | null;
        const vLineEl      = processSection.querySelector('.process-v-line')       as HTMLElement | null;
        const bLineEl      = processSection.querySelector('.process-b-line')       as HTMLElement | null;
        const rLineEl      = processSection.querySelector('.process-r-line')       as HTMLElement | null;
        const exitLineEl   = processSection.querySelector('.process-exit-line')    as HTMLElement | null;

        const allElements = [titleEl, subtitleContainer, pillEl, descriptionEl, ...listItemEls, buttonsEl].filter(Boolean);

        // Estado inicial oculto para todo
        gsap.set(allElements, { 
            opacity: 0, 
            y: 40, 
            filter: "blur(10px)",
        });

        // Trigger unificado: contenido + línea CSS del título
        ScrollTrigger.create({
            trigger: processSection,
            scroller: scroller,
            start: "center top", 
            onEnter: () => {
                const tl = gsap.timeline();

                // Líneas decorativas: dibujado puro con scale (velocidad constante = ease: "none")
                // Duración calibrada a ~833 píxeles por segundo para igualar la velocidad física en todas.
                // exitLineEl tiene un ancho fijo de 2000px (ver JSX) y toma 2.4s, garantizando que su parte visible
                // se desplace a la misma velocidad que titleLineEl.
                if (titleLineEl) tl.to(titleLineEl, { scaleX: 1, duration: 0.3,  ease: "none" }, 0);
                if (vLineEl)     tl.to(vLineEl,     { scaleY: 1, duration: 0.7,  ease: "none" }, 0.3);
                if (bLineEl)     tl.to(bLineEl,     { scaleX: 1, duration: 0.6,  ease: "none" }, 1.0);
                if (rLineEl)     tl.to(rLineEl,     { scaleY: 1, duration: 0.18, ease: "none" }, 1.6);
                if (exitLineEl)  tl.to(exitLineEl,  { scaleX: 1, duration: 2.4,  ease: "none" }, 1.78);

                // 1. Título principal ("El proceso")
                if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0);
                // 2. "Estrategia y Estructura"
                if (subtitleContainer) tl.to(subtitleContainer, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.3);
                // 3. Píldora de pregunta
                if (pillEl) tl.to(pillEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.6);
                // 4. Texto + lista
                const col4 = [descriptionEl, ...listItemEls].filter(Boolean);
                if (col4.length) tl.to(col4, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.9);
                // 5. Botones de pasos
                if (buttonsEl) tl.to(buttonsEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 1.4);
            },
            onLeaveBack: () => {
                gsap.to(allElements, {
                    opacity: 0, y: 40, filter: "blur(10px)",
                    duration: 0.3, stagger: 0.02, ease: "power2.in", overwrite: true,
                });
                if (titleLineEl) gsap.to(titleLineEl, { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                if (vLineEl)     gsap.to(vLineEl,     { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                if (bLineEl)     gsap.to(bLineEl,     { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                if (rLineEl)     gsap.to(rLineEl,     { scaleY: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
                if (exitLineEl)  gsap.to(exitLineEl,  { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" });

            }
        });


    }, { scope: scrollRef });

    return (
        <section id="servicios" className="flex-none w-full h-screen px-0 lg:px-6 pt-0 lg:pt-27 relative z-10 lg:snap-start">
            <div className="services-bg relative w-full h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[23px] shadow-[0_-20px_50px_rgba(255,255,255,0.1)] overflow-hidden">
                <FluidBackground />
                <ScrollIndicator />

                {/* Contenedor de Scroll principal */}
                <div
                    ref={scrollRef}
                    className="absolute inset-0 overflow-y-auto overflow-x-hidden services-internal-scroll z-10 flex flex-col"
                >
                    {/* Primera sección: Contenido de Servicios */}
                    <div className="relative w-full min-h-screen flex-shrink-0">
                        <ServicesContent />
                    </div>

                    {/* Nueva sección: El Proceso - Con animación fluida y scroll extendido */}
                    <div
                        ref={processRef}
                        id="proceso-section"
                        className="w-full relative min-h-[300vh]"
                    >
                        {/* Contenedor Sticky: Mantiene el contenido en pantalla mientras scrolleamos el "aire" de los 200vh */}
                        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                            
                            {/* El número gigante posicionado de forma absoluta dentro del contenedor sticky */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                                <span className="step-number-huge text-[120px] md:text-[180px] lg:text-[210px] font-bold leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan to-brand-green drop-shadow-[0_15px_30px_rgba(7,248,242,0.25)]">
                                    {currentStep.id}
                                </span>
                            </div>

                            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-16 relative z-10">
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
                                            <div className="flex flex-col gap-3 mt-4">
                                                {PROCESS_STEPS.map((step, idx) => (
                                                    <button
                                                        key={step.id}
                                                        onClick={() => setActiveStep(idx)}
                                                        className={`w-12 h-10 rounded-xl border-2 flex items-center justify-center font-bold text-base transition-all duration-300 ${activeStep === idx
                                                            ? 'border-[#001720] bg-[#001720] text-white shadow-md'
                                                            : 'border-gray-300 text-gray-400 hover:border-[#001720] hover:text-[#001720]'
                                                            }`}
                                                    >
                                                        {step.id}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Bloque central: Paso + Espacio para el número + Subtítulo */}
                                            <div className="flex flex-col">
                                                <div className="relative inline-block h-[120px] md:h-[180px] lg:h-[210px]">
                                                    <span className="block text-[10px] font-black tracking-[0.5em] text-gray-400 uppercase mb-1 ml-1">
                                                        Paso
                                                    </span>
                                                    {/* Placeholder para mantener el espacio del número en el grid */}
                                                    <div className="w-[1.2em]"></div>
                                                </div>

                                                <div className="mt-4 space-y-1">
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
                                    <div className="lg:col-span-7 flex flex-col justify-center lg:pt-12 pl-10 lg:pl-16 pb-16 relative">
                                        {/* Línea vertical izquierda */}
                                        <div
                                            className="process-v-line absolute left-0 top-[29px] bottom-0 w-[3px] bg-[#001720] origin-top"
                                            style={{ transform: 'scaleY(0)' }}
                                        />
                                        {/* Línea horizontal inferior */}
                                        <div
                                            className="process-b-line absolute bottom-0 left-0 -right-10 h-[3px] bg-[#001720] origin-left"
                                            style={{ transform: 'scaleX(0)' }}
                                        />
                                        {/* Línea vertical derecha corta */}
                                        <div
                                            className="process-r-line absolute bottom-0 -right-10 w-[3px] h-[150px] bg-[#001720] origin-bottom"
                                            style={{ transform: 'scaleY(0)' }}
                                        />
                                        {/* Línea suelta que sale a la derecha desde el top de process-r-line */}
                                        <div
                                            className="process-exit-line absolute h-[3px] bg-[#001720] origin-left"
                                            style={{ bottom: '149px', left: 'calc(100% + 39px)', width: '2000px', transform: 'scaleX(0)' }}
                                        />
                                        {/* Pregunta / Pill */}
                                        <div className="mb-8 self-start flex items-center gap-3">
                                            <span className="text-[#001720] font-medium text-lg md:text-[20px]">
                                                Todo comienza con
                                            </span>
                                            <div className="bg-[#001720] px-6 py-3 rounded-3xl border border-brand-cyan/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] transform -rotate-1">
                                                <span className="text-brand-green font-bold text-lg md:text-[20px] italic tracking-tight">
                                                    “{currentStep.question}”
                                                </span>
                                            </div>
                                        </div>

                                        {/* Texto principal ~20px */}
                                        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-10 max-w-2xl">
                                            {currentStep.description}
                                        </p>

                                        <ul className="space-y-6">
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
                    </div>
                </div>
            </div>
        </section>
    );
};

