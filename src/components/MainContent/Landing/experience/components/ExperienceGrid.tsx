'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { momoSignature } from '../../shared';
import { PROJECTS } from '../constants/projects';

interface ExperienceGridProps {
    hoveredNumber: number | null;
    setHoveredNumber: (num: number | null) => void;
    setSelectedProject: (num: number) => void;
}

export const ExperienceGrid = ({ hoveredNumber, setHoveredNumber, setSelectedProject }: ExperienceGridProps) => {
    const mobileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleProjectClick = (num: number) => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            // Si el número ya estaba "hovered" (segundo tap), abre de inmediato
            if (hoveredNumber === num) {
                if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);
                setSelectedProject(num);
                return;
            }

            // Primer tap en móvil: muestra preview y setea timeout de 2s
            setHoveredNumber(num);
            if (mobileTimeoutRef.current) clearTimeout(mobileTimeoutRef.current);

            mobileTimeoutRef.current = setTimeout(() => {
                setSelectedProject(num);
            }, 1000);
        } else {
            // En desktop abre directo porque el hover ya hizo su trabajo
            setSelectedProject(num);
        }
    };
    return (
        <>
            {/* Texto de Fondo Masivo con Marca y Desenfoque Sutil */}
            <div className={`absolute bottom-32 lg:bottom-[-5%] left-1/2 -translate-x-1/2 w-full flex justify-center items-end select-none pointer-events-none whitespace-nowrap transition-all duration-700 ease-out
                ${hoveredNumber !== null ? 'blur-[8px] opacity-10' : 'blur-0 opacity-100'}`}>
                <span className="text-[12vw]  text-[#1A2E35] leading-none tracking-tighter uppercase">Experiencia</span>
                <span className={`text-[16vw] text-[#89EA2B] leading-none ml-[-1vw]  ${momoSignature.className}`}>AD</span>
            </div>

            {/* Grid de Números Refinado con Preview Centrada */}
            <div className="relative z-10 w-full max-w-[1200px] xl:max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-24">
                {PROJECTS.map(({ num, title, img }) => (
                    <div
                        key={num}
                        className="relative flex justify-center items-center group cursor-pointer"
                        onMouseEnter={() => setHoveredNumber(num)}
                        onMouseLeave={() => setHoveredNumber(null)}
                        onClick={() => handleProjectClick(num)}
                    >
                        {/* Imagen de Preview Centrada (Aparece en Hover) */}
                        <div
                            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-none transition-all duration-700 ease-out z-0
                                ${hoveredNumber === num ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-md'}`}
                        >
                            <div className="relative w-[180px] sm:w-[220px] md:w-[250px] lg:w-[280px] xl:w-[320px] aspect-[9/18]">
                                <Image
                                    src={img}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 340px, 380px"
                                    className="object-contain brightness-[0.4] grayscale-[0.2] contrast-[1.1] transition-all duration-700"
                                    priority={num === 1}
                                />
                            </div>
                        </div>

                        {/* El Número (Siempre encima y centrado) */}
                        <div className={`relative z-10 transition-all duration-500 pointer-events-none flex items-center justify-center
                            ${hoveredNumber === num ? 'scale-110' : ''}`}
                        >
                            <svg
                                className="w-[10rem] h-[10rem] sm:w-[12rem] sm:h-[12rem] md:w-[15rem] md:h-[15rem] lg:w-[18rem] lg:h-[18rem] xl:w-[20rem] xl:h-[20rem]"
                                viewBox="0 0 100 100"
                            >
                                <defs>
                                    <linearGradient id={`grad-${num}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#07F8F2" />
                                        <stop offset="100%" stopColor="#ffffff" />
                                    </linearGradient>
                                </defs>
                                <text
                                    x="50%" y="55%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="font-medium"
                                    style={{
                                        fontSize: '85px',
                                        fill: hoveredNumber === num ? 'transparent' : 'url(#grad-fill)',
                                        stroke: hoveredNumber === num ? `url(#grad-${num})` : 'transparent',
                                        strokeWidth: hoveredNumber === num ? '2.5' : '0',
                                        opacity: 1,
                                        transition: 'all 0.5s ease'
                                    }}
                                >
                                    {num}
                                </text>
                                {/* Definición para el estado no-hover (relleno gradiente) */}
                                <defs>
                                    <linearGradient id="grad-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#07F8F2" />
                                        <stop offset="50%" stopColor="#07F8F2" />
                                        <stop offset="100%" stopColor="#89EA2B" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info del Proyecto (Estilo Modelo - Abajo Izquierda) */}
            <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 z-20 pointer-events-none overflow-hidden h-[120px] md:h-[160px] lg:h-[200px] w-full">
                {PROJECTS.map((proj) => (
                    <div
                        key={proj.num}
                        className={`flex flex-col gap-0 md:gap-2 transition-all duration-700 absolute bottom-0 left-0
                            ${hoveredNumber === proj.num ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    >
                        <h4 className="text-[#89EA2B] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none">{proj.fullTitle}</h4>
                        <p className="text-gray-400 text-lg md:text-2xl lg:text-3xl font-light opacity-80">{proj.category}</p>
                    </div>
                ))}
            </div>
        </>
    );
};
