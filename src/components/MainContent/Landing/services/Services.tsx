'use client';

import React, { useState } from 'react';
import { FluidBackground } from './components/FluidBackground';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ServicesContent } from './components/ServicesContent';
import { PROCESS_STEPS } from './constants/servicesData';

export const Services = () => {
    const [activeStep, setActiveStep] = useState(0);
    const currentStep = PROCESS_STEPS[activeStep];

    return (
        <section id="servicios" className="flex-none w-full h-screen px-0 lg:px-6 pt-0 lg:pt-27 relative z-10 lg:snap-start">
            <div className="services-bg relative w-full h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[23px] shadow-[0_-20px_50px_rgba(255,255,255,0.1)] overflow-hidden">
                <FluidBackground />
                <ScrollIndicator />

                {/* Contenedor de Scroll principal */}
                <div className="absolute inset-0 overflow-y-auto overflow-x-hidden services-internal-scroll z-10 flex flex-col scroll-smooth">

                    {/* Primera sección: Contenido de Servicios */}
                    <div className="relative w-full h-screen flex-shrink-0">
                        <ServicesContent />
                    </div>

                    {/* Nueva sección: El Proceso - Escala final equilibrada */}
                    <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 relative min-h-screen flex items-center">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full">
                            
                            {/* Columna 1: Títulos y Selectores */}
                            <div className="flex flex-col space-y-8 lg:space-y-10">
                                <h3 className="text-3xl md:text-[50px] font-bold text-[#001720] tracking-tight">
                                    El proceso
                                </h3>

                                <div className="flex items-start gap-8 lg:gap-10">
                                    {/* Selectores de pasos */}
                                    <div className="flex flex-col gap-3 mt-4">
                                        {PROCESS_STEPS.map((step, idx) => (
                                            <button
                                                key={step.id}
                                                onClick={() => setActiveStep(idx)}
                                                className={`w-12 h-10 rounded-xl border-2 flex items-center justify-center font-bold text-base transition-all duration-300 ${
                                                    activeStep === idx 
                                                    ? 'border-[#001720] bg-[#001720] text-white shadow-md' 
                                                    : 'border-gray-300 text-gray-400 hover:border-[#001720] hover:text-[#001720]'
                                                }`}
                                            >
                                                {step.id}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Bloque central: Paso + Número + Subtítulo */}
                                    <div className="flex flex-col">
                                        <div className="relative inline-block">
                                            <span className="block text-[10px] font-black tracking-[0.5em] text-gray-400 uppercase mb-1 ml-1">
                                                Paso
                                            </span>
                                            <span className="text-[120px] md:text-[180px] lg:text-[210px] font-bold leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan to-brand-green drop-shadow-[0_15px_30px_rgba(7,248,242,0.25)]">
                                                {currentStep.id}
                                            </span>
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
                            <div className="flex flex-col justify-center lg:pt-12">
                                {/* Pregunta / Pill */}
                                <div className="mb-8 self-start">
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
        </section>
    );
};


