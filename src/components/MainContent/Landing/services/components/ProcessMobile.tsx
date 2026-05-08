import React from 'react';
import { PROCESS_STEPS } from '../constants/servicesData';

export const ProcessMobile = () => {
    return (
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
    );
};
