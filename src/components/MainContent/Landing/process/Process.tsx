'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PROCESS_STEPS } from './constants/processData';

// Cada paso tiene su propio par de clases de animación único
const STEP_ANIMATIONS = [
    { out: 'anim-glitch-out',  in: 'anim-glitch-in'  }, // 01 Planeacion  → Glitch cromático
    { out: 'anim-drop-out',    in: 'anim-drop-in'    }, // 02 Diseño      → Cyber Drop
    { out: 'anim-flip-out',    in: 'anim-flip-in'    }, // 03 Construccion → 3D Flip
    { out: 'anim-warp-out',    in: 'anim-warp-in'    }, // 04 Validacion  → Warp Speed
    { out: 'anim-crt-out',     in: 'anim-crt-in'     }, // 05 Produccion  → CRT Boot
];

// Todas las clases de animación para limpiar antes de cada transición
const ALL_ANIM_CLASSES = STEP_ANIMATIONS.flatMap(a => [a.in, a.out]);

const EXIT_DURATION = 380; // ms

export const Process = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayIndex, setDisplayIndex] = useState(0);
    const isAnimatingRef = useRef(false);

    // Refs para manipulación DOM directa (sin setState para clases = sin re-render)
    const sectionRef  = useRef<HTMLElement>(null);
    const contentRef  = useRef<HTMLDivElement>(null);
    const bgNumberRef = useRef<HTMLDivElement>(null);

    // Efecto para disparar la animación de entrada cada vez que la sección entra en pantalla
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isAnimatingRef.current) {
                    const content = contentRef.current;
                    const bgNum = bgNumberRef.current;
                    const enterAnim = STEP_ANIMATIONS[activeIndex];

                    if (content) {
                        content.classList.remove(...ALL_ANIM_CLASSES);
                        void content.offsetWidth; // Forzar reflow para reiniciar la animación
                        content.classList.add(enterAnim.in);
                        
                        setTimeout(() => {
                            if (!isAnimatingRef.current) content.classList.remove(enterAnim.in);
                        }, 800);
                    }
                    if (bgNum) {
                        bgNum.classList.remove('anim-bg-num-in', 'anim-bg-num-out');
                        void bgNum.offsetWidth; // Forzar reflow
                        bgNum.classList.add('anim-bg-num-in');
                        
                        setTimeout(() => {
                            if (!isAnimatingRef.current) bgNum.classList.remove('anim-bg-num-in');
                        }, 800);
                    }
                }
            },
            { threshold: 0.25 } // Se dispara cuando el 25% de la sección es visible
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [activeIndex]);

    const handleStepChange = useCallback((nextIndex: number) => {
        if (nextIndex === activeIndex || isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        const content   = contentRef.current;
        const bgNum     = bgNumberRef.current;
        const exitAnim  = STEP_ANIMATIONS[activeIndex]; // efecto de salida = el del paso actual
        const enterAnim = STEP_ANIMATIONS[nextIndex];   // efecto de entrada = el del paso siguiente

        // ─── FASE 1: Aplicar animación de SALIDA ──────────────────────
        if (content) {
            content.classList.remove(...ALL_ANIM_CLASSES);
            content.classList.add(exitAnim.out);
        }
        if (bgNum) {
            bgNum.classList.remove('anim-bg-num-in', 'anim-bg-num-out');
            bgNum.classList.add('anim-bg-num-out');
        }

        // Cambiar el tab activo visualmente al instante
        setActiveIndex(nextIndex);

        // ─── FASE 2: Swap de contenido y animación de ENTRADA ─────────
        setTimeout(() => {
            setDisplayIndex(nextIndex);

            requestAnimationFrame(() => {
                if (content) {
                    content.classList.remove(exitAnim.out);
                    content.classList.add(enterAnim.in);
                }
                if (bgNum) {
                    bgNum.classList.remove('anim-bg-num-out');
                    bgNum.classList.add('anim-bg-num-in');
                }
                // Limpiar clases al terminar la animación de entrada
                setTimeout(() => {
                    content?.classList.remove(enterAnim.in);
                    bgNum?.classList.remove('anim-bg-num-in');
                    isAnimatingRef.current = false;
                }, 800);
            });
        }, EXIT_DURATION);
    }, [activeIndex]);

    const activeStep = PROCESS_STEPS[displayIndex];

    return (
        <section ref={sectionRef} id="proceso" className="flex-none lg:snap-start lg:snap-always relative w-full min-h-screen lg:h-screen bg-[#001720] overflow-hidden flex flex-col justify-center py-20 lg:py-0">

            {/* Número gigante de fondo — tiene su propio flip independiente */}
            <div
                ref={bgNumberRef}
                className="absolute left-[-15%] lg:left-[-10%] bottom-[-5%] lg:bottom-[-10%] select-none pointer-events-none opacity-20"
            >
                <span className="text-[250px] lg:text-[400px] xl:text-[500px] font-black text-gray-400 leading-none tracking-tighter">
                    {activeStep.id}
                </span>
            </div>

            <div className="container mx-auto px-6 md:px-16 lg:px-24 h-full relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-0">

                {/* Columna izquierda: Contenido — recibe la clase de animación directamente */}
                <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 mt-4 lg:mt-0 relative">

                    {/* Badge tecnológico con watermark */}
                    <div className="relative mb-2 lg:mb-4 flex items-center">
                        {/* Watermark hollow en el fondo */}
                        <div className="absolute -top-12 lg:-top-16 -left-2 lg:-left-6 text-[50px] lg:text-[80px] font-black text-transparent [-webkit-text-stroke:1px_rgba(7,248,242,0.15)] uppercase tracking-widest select-none pointer-events-none opacity-80 z-0">
                            {activeStep.title}
                        </div>

                        {/* Badge principal */}
                        <div className="relative z-10 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#07F8F2]/30 bg-[#07F8F2]/5 backdrop-blur-md shadow-[0_0_15px_rgba(7,248,242,0.1)]">
                            <span className="w-2 h-2 rounded-full bg-[#07F8F2] shadow-[0_0_8px_#07F8F2] animate-pulse" />
                            <span className="text-[#07F8F2] font-mono text-xs lg:text-sm tracking-[0.3em] uppercase font-bold">
                                Fase {activeStep.id} <span className="opacity-50 mx-1">/</span> {activeStep.title}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-white text-2xl lg:text-3xl font-medium tracking-wide relative z-10">
                        Todo comienza con . <span className="text-brand-green font-semibold">&quot;{activeStep.question}&quot;</span>
                    </h2>

                    <p className="text-gray-300 text-base lg:text-lg xl:text-xl font-medium leading-relaxed max-w-2xl">
                        {activeStep.description}
                    </p>

                    <div className="flex flex-col gap-6 mt-4 max-w-2xl">
                        {activeStep.points.map((point, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="mt-2.5 w-1.5 h-1.5 bg-gray-400 shrink-0" />
                                <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                                    <span className="font-bold text-gray-200">{point.label}:</span> {point.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna derecha: Pasos / Timeline */}
                <div className="w-full lg:w-5/12 flex relative lg:pl-12 justify-center lg:justify-start">
                    {/* Línea con degradado animado (lava) */}
                    <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-green via-brand-cyan to-brand-green animate-lava-vertical" />

                    <div className="flex flex-row lg:flex-col gap-3 sm:gap-6 lg:gap-10 w-full lg:ml-12 justify-center lg:justify-start">
                        {PROCESS_STEPS.map((step, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => handleStepChange(index)}
                                    className="group flex flex-col lg:flex-row items-center gap-2 lg:gap-6 lg:w-full text-left focus:outline-none"
                                >
                                    {/* Ícono */}
                                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                                        isActive
                                            ? 'bg-brand-green text-[#001720] shadow-[0_0_20px_rgba(50,220,110,0.4)] scale-110 lg:scale-100'
                                            : 'bg-brand-green/20 text-brand-green group-hover:bg-brand-green/30'
                                    }`}>
                                        {step.icon}
                                    </div>

                                    {/* Título del paso — solo desktop */}
                                    <span className={`hidden lg:block text-xl lg:text-2xl font-medium transition-colors duration-300 ${
                                        isActive ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-300'
                                    }`}>
                                        {step.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};
