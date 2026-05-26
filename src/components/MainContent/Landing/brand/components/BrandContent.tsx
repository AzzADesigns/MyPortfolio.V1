'use client';

import React, { memo } from 'react';
import { BrandHoverState } from '../hooks/useBrandState';
import { CTAButton } from '../../shared';

interface BrandContentProps {
    setHoveredWord: (state: BrandHoverState) => void;
}

const BrandContentBase = ({ setHoveredWord }: BrandContentProps) => {
    return (
        <div className="relative z-10 w-full xl:mt-3 3xl:mt-0 max-w-[1400px] xl:max-w-[1600px] 3xl:max-w-[2000px] mx-auto flex flex-col h-full py-10 3xl:max-h-auto justify-between">
            {/* Cabecera de Sección */}
            <div className="flex flex-col items-center lg:items-start max-w-4xl 3xl:max-w-6xl brand-reveal text-center lg:text-left">
                <p className="text-[#07F8F2]/60 font-outfit text-xs sm:text-sm md:text-sm xl:text-base 3xl:text-xl tracking-[0.2em] mb-4 md:mb-6 uppercase font-medium">
                    Donde la Inteligencia Artificial crea clones en tiempo récord
                </p>
                <h2 className="text-white text-2xl sm:text-4xl md:text-5xl xl:text-5xl 3xl:text-7xl font-bold tracking-tight leading-[1.1]">
                    AD crea experiencias únicas
                </h2>
            </div>

            {/* Palabras Interactivas y Titular Principal */}
            <div className="relative flex-1 w-full my-8 lg:my-0 flex flex-col lg:block">
                <div 
                    className="lg:absolute lg:top-[5%] lg:left-[10%] xl:left-[28%] 3xl:left-[40%] flex flex-col items-center mb-12 lg:mb-0 brand-reveal cursor-pointer group"
                    onMouseEnter={() => setHoveredWord('vivas')}
                    onMouseLeave={() => setHoveredWord(null)}
                >
                    <span className="text-gray-500 text-sm md:text-base xl:text-lg 3xl:text-2xl font-light tracking-widest mb-1 transition-colors group-hover:text-gray-300">Experiencias</span>
                    <span className="text-[#07F8F2] text-3xl md:text-4xl xl:text-4xl 3xl:text-6xl font-bold drop-shadow-[0_0_15px_rgba(7,248,242,0.3)] transition-transform group-hover:scale-110">Vivas</span>
                </div>

                <div 
                    className="lg:absolute lg:top-[45%] lg:-translate-y-1/2 lg:left-0 xl:left-[8%] 3xl:left-[10%] flex flex-col items-center mb-12 lg:mb-0 brand-reveal cursor-pointer group"
                    onMouseEnter={() => setHoveredWord('personalizados')}
                    onMouseLeave={() => setHoveredWord(null)}
                >
                    <span className="text-gray-500 text-sm md:text-base xl:text-lg 3xl:text-2xl font-light tracking-widest mb-1 transition-colors group-hover:text-gray-300">Productos</span>
                    <span className="text-[#89EA2B] text-3xl md:text-4xl xl:text-4xl 3xl:text-6xl font-bold drop-shadow-[0_0_15px_rgba(137,234,43,0.3)] transition-transform group-hover:scale-110">Personalizados</span>
                </div>

                <div 
                    className="lg:absolute lg:bottom-[5%] lg:left-[5%] 3xl:left-0 flex flex-col items-center mb-16 lg:mb-0 brand-reveal cursor-pointer group"
                    onMouseEnter={() => setHoveredWord('fluidas')}
                    onMouseLeave={() => setHoveredWord(null)}
                >
                    <span className="text-gray-500 text-sm md:text-base xl:text-lg 3xl:text-2xl font-light tracking-widest mb-1 transition-colors group-hover:text-gray-300">Animaciones</span>
                    <span className="text-white text-3xl md:text-4xl xl:text-4xl 3xl:text-6xl font-bold transition-transform group-hover:scale-110">Fluidas</span>
                </div>

                {/* Bloque de Webs de Marca */}
                <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 max-w-full lg:max-w-[45%] xl:max-w-[42%] 3xl:max-w-[38%] text-center lg:text-left xl:text-center flex flex-col xl:items-center gap-4 lg:gap-8 3xl:gap-12 brand-reveal">
                    <h3 className="text-white text-xl sm:text-3xl md:text-2xl xl:text-3xl 3xl:text-5xl font-medium leading-tight">
                        Introduciendo el concepto de <br className="hidden lg:block" />
                        <span 
                            className="bg-gradient-to-r from-[#07F8F2] via-[#89EA2B] to-[#07F8F2] bg-[length:200%_auto] animate-gradient-move bg-clip-text text-transparent text-4xl sm:text-5xl md:text-5xl xl:text-5xl 3xl:text-7xl font-bold drop-shadow-[0_0_20px_rgba(137,234,43,0.2)] cursor-pointer"
                            onMouseEnter={() => setHoveredWord('marca')}
                            onMouseLeave={() => setHoveredWord(null)}
                        >
                            webs de marca
                        </span>
                    </h3>
                    <p className="text-gray-400 text-base sm:text-xl md:text-lg xl:text-lg 3xl:text-3xl font-light leading-relaxed">
                        Páginas diseñadas para conectar, <br className="hidden xl:block" />
                        y comunicar el valor real de tu producto.
                    </p>
                </div>
            </div>

            {/* Botón de Acción */}
            <div className="flex justify-center w-full pt-6 md:pt-0 brand-reveal">
                <CTAButton 
                    text="Empezar mi proyecto hoy" 
                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                />
            </div>
        </div>
    );
};

export const BrandContent = memo(BrandContentBase);
