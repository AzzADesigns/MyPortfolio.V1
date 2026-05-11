import React from 'react';
import { PROCESS_STEPS } from '../constants/servicesData';

interface ProcessDesktopProps {
    activeStep: number;
    currentStep: typeof PROCESS_STEPS[0];
    isAnimating: boolean;
    handleStepChange: (newIdx: number) => void;
}

export const ProcessDesktop: React.FC<ProcessDesktopProps> = ({
    activeStep,
    currentStep,
    isAnimating,
    handleStepChange
}) => {
    return (
        <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center overflow-hidden">
            <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-16 relative z-10 lg:mt-12 xl:mt-16 2xl:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full">

                    {/* Columna 1: Títulos y Selectores */}
                    <div className="lg:col-span-5 flex flex-col space-y-8 lg:space-y-6 2xl:space-y-10">
                        <div className="flex items-center">
                            <h3 className="text-3xl md:text-[50px] lg:text-[36px] xl:text-[32px] 2xl:text-[50px] font-bold text-[#001720] tracking-tight whitespace-nowrap">
                                El proceso
                            </h3>
                            <div
                                className="process-title-line ml-3 h-[3px] flex-1 origin-left bg-[#001720]"
                                style={{ transform: 'scaleX(0)' }}
                            />
                        </div>

                        <div className="flex items-start gap-8 lg:gap-8 2xl:gap-10">
                            {/* Selectores de pasos */}
                            <div className="flex flex-col gap-6 lg:gap-4 2xl:gap-6 mt-4 lg:mt-2 2xl:mt-4">
                                {PROCESS_STEPS.map((step, idx) => (
                                    <button
                                        key={step.id}
                                        onClick={() => handleStepChange(idx)}
                                        className={`relative z-20 cursor-pointer w-[67px] h-[60px] lg:w-[45px] lg:h-[40px] 2xl:w-[67px] 2xl:h-[60px] rounded-xl border-[3px] lg:border-[2px] 2xl:border-[3px] flex items-center justify-center font-bold text-xl lg:text-base 2xl:text-xl transition-all duration-300 ${activeStep === idx
                                            ? 'border-[#001720] bg-[#001720] text-white shadow-md'
                                            : 'border-[#001720] text-[#001720] hover:bg-[#001720]/5'
                                            } ${isAnimating ? 'opacity-80' : 'hover:scale-105'}`}
                                    >
                                        <span className="pointer-events-none w-full h-full flex items-center justify-center">
                                            {step.id}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Bloque central: Paso + Número Gigante + Subtítulo */}
                            <div className="flex flex-col ml-10 lg:ml-6 xl:ml-12 2xl:ml-20 lg:mt-10 2xl:mt-20">
                                <div className="relative inline-block">
                                    <span className="process-step-label absolute -top-10 -right-2 origin-center rotate-90 text-[11px] lg:text-[9px] 2xl:text-[11px] font-black tracking-[0.3em] text-[#001720]/40 uppercase whitespace-nowrap">
                                        Paso
                                    </span>

                                    {/* El número gigante ahora vive en el flujo, alineándose naturalmente */}
                                    <span
                                        className="step-number-huge block text-[120px] md:text-[180px] lg:text-[130px] xl:text-[110px] 2xl:text-[210px] font-bold leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan to-brand-green drop-shadow-[0_15px_30px_rgba(7,248,242,0.25)]"
                                        style={{ WebkitTextStroke: '2px #001720' }}
                                    >
                                        {currentStep.id}
                                    </span>
                                </div>

                                <div className="step-content-subtitle mt-8 lg:mt-4 2xl:mt-8 space-y-1 text-right mr-4">
                                    <h4 className="text-3xl md:text-[45px] lg:text-[32px] xl:text-[28px] 2xl:text-[45px] font-bold text-[#001720] tracking-tight leading-tight">
                                        {currentStep.title}
                                    </h4>
                                    <p className="text-2xl md:text-[35px] lg:text-[24px] xl:text-[20px] 2xl:text-[35px] font-medium text-gray-500 leading-tight">
                                        {currentStep.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna 2: Texto y Detalles */}
                    <div className="lg:col-span-7 flex flex-col justify-center lg:pt-12 2xl:pt-24 pl-10 lg:pl-12 2xl:pl-16 lg:pr-24 xl:pr-36 2xl:pr-16 pb-16 relative">
                        {/* Líneas decorativas */}
                        <div className="process-v-line absolute left-0 top-[29px] bottom-0 w-[3px] bg-[#001720] origin-top" style={{ transform: 'scaleY(0)' }} />
                        <div className="process-b-line absolute bottom-0 left-0 -right-10 h-[3px] bg-[#001720] origin-left" style={{ transform: 'scaleX(0)' }} />
                        <div className="process-r-line absolute bottom-0 -right-10 top-[29px] w-[3px] bg-[#001720] origin-bottom" style={{ transform: 'scaleY(0)' }} />
                        <div className="process-t-line absolute top-[29px] -right-10 w-24 h-[3px] bg-[#001720] origin-right" style={{ transform: 'scaleX(0)' }} />

                        {/* Pregunta / Pill */}
                        <div className="step-content-pill mb-8 lg:mb-6 2xl:mb-8 self-start flex items-center gap-3">
                            <span className="text-[#001720] font-medium text-lg lg:text-[15px] xl:text-[14px] 2xl:text-[20px]">Todo comienza con</span>
                            <div className="bg-[#001720] px-6 py-3 lg:px-4 lg:py-2 2xl:px-6 2xl:py-3 rounded-3xl border border-brand-cyan/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] transform -rotate-1">
                                <span className="text-brand-green font-bold text-lg lg:text-[15px] xl:text-[14px] 2xl:text-[20px] italic tracking-tight block mb-[2px]">“{currentStep.question}”</span>
                            </div>
                        </div>

                        <p className="step-content-desc text-lg lg:text-[15px] xl:text-[14px] 2xl:text-xl text-gray-600 font-medium leading-relaxed mb-10 lg:mb-6 2xl:mb-10 max-w-4xl 2xl:max-w-none">{currentStep.description}</p>

                        <ul className="step-content-list space-y-6 lg:space-y-4 2xl:space-y-6">
                            {currentStep.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-5 lg:gap-3 2xl:gap-5">
                                    <div className="w-2.5 h-2.5 lg:w-2 lg:h-2 2xl:w-2.5 2xl:h-2.5 bg-[#001720] mt-2.5 lg:mt-1.5 2xl:mt-2.5 flex-shrink-0"></div>
                                    <p className="text-lg lg:text-[15px] xl:text-[14px] 2xl:text-[19px] text-gray-700 leading-snug">
                                        <span className="font-bold text-[#001720]">{point.label}:</span> {point.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
