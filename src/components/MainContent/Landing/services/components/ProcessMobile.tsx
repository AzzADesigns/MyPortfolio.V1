import React, { useRef } from 'react';
import { PROCESS_STEPS } from '../constants/servicesData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../scrollReveal.css';

export const ProcessMobile = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Header del paso (número + título) → entra desde la izquierda
    useScrollReveal(containerRef, {
        selector: '.sr-step-header',
        variant: 'fade-left',
        staggerMs: 0,
        rootMargin: '-3% 0px',
    });

    // Pill de pregunta → entra desde la derecha (contraste visual)
    useScrollReveal(containerRef, {
        selector: '.sr-step-pill',
        variant: 'fade-right',
        staggerMs: 0,
        rootMargin: '-3% 0px',
    });

    // Número decorativo gigante → escala desde el centro
    useScrollReveal(containerRef, {
        selector: '.sr-step-number',
        variant: 'scale-up',
        staggerMs: 0,
        rootMargin: '-3% 0px',
    });

    // Bloque de descripción y puntos → fade-up final
    useScrollReveal(containerRef, {
        selector: '.sr-step-body',
        variant: 'fade-up',
        staggerMs: 0,
        rootMargin: '-3% 0px',
    });

    // Título de sección "El Proceso"
    useScrollReveal(containerRef, {
        selector: '.sr-section-title',
        variant: 'clip-in',
        staggerMs: 120,
        rootMargin: '-5% 0px',
    });


    return (
        <div ref={containerRef} className="lg:hidden flex flex-col py-16 px-6 space-y-24 bg-transparent relative z-10">
            {/* Título de sección */}
            <div className="flex flex-col space-y-4 mb-8">
                <h2 className="sr-section-title text-4xl font-bold text-[#001720]">El Proceso</h2>
                <div className="sr-section-title w-20 h-1 bg-brand-cyan"></div>
            </div>

            {PROCESS_STEPS.map((step) => (
                <div key={step.id} className="flex flex-col space-y-10 border-b border-gray-100 pb-16 last:border-0 last:pb-0">
                    {/* Cabecera del paso */}
                    <div className="sr-step-header flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-brand-cyan font-bold tracking-widest uppercase text-sm mb-1">
                                Paso {step.id}
                            </span>
                            <h3 className="text-3xl font-bold text-[#001720] leading-tight">{step.title}</h3>
                            <p className="text-xl text-gray-500 font-medium italic mt-1">{step.subtitle}</p>
                        </div>
                        <div className="sr-step-number text-6xl font-black text-[#001720]/5 select-none">
                            {step.id}
                        </div>
                    </div>

                    {/* Pill de pregunta */}
                    <div className="sr-step-pill bg-[#001720] px-6 py-4 rounded-2xl self-start transform -rotate-1 shadow-lg">
                        <span className="text-brand-green font-bold text-lg italic tracking-tight">
                            &ldquo;{step.question}&rdquo;
                        </span>
                    </div>

                    {/* Descripción y puntos */}
                    <div className="sr-step-body space-y-8">
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
    );
};

