'use client';

import React from 'react';
import CTAButton from '../../shared/CTAButton/CTAButton';

interface ServiceCardProps {
    titleBase: string;
    titleAccent: string;
    titleAccentColor: string;
    titleLineBreak?: boolean;
    description: string;
    ctaText: string;
    wrapperClassName?: string;
    cardBg?: string;
    hoverBg?: string;
    decoration: React.ReactNode;
}

export const ServiceCard = ({
    titleBase,
    titleAccent,
    titleAccentColor,
    titleLineBreak = false,
    description,
    ctaText,
    wrapperClassName = '',
    cardBg = 'bg-[#001720]',
    hoverBg = 'hover:bg-[#001c26]',
    decoration,
}: ServiceCardProps) => {
    return (
        <div className={wrapperClassName}>
            <div className={`service-card h-auto lg:h-full ${cardBg} border border-[#07F8F2]/30 p-8 lg:p-6 xl:p-8 2xl:p-12 rounded-[1.5rem] flex flex-col gap-6 lg:gap-3 xl:gap-6 2xl:gap-8 relative overflow-hidden ${hoverBg} transition-[background-color,border-color,box-shadow] duration-500 shadow-2xl group hover:border-[#07F8F2]/60 hover:shadow-[0_0_60px_rgba(7,248,242,0.1)] will-change-transform`}>
                
                {/* Decoraciones HUD: Patrón de Rejilla Técnica */}
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-700" 
                    style={{ backgroundImage: 'radial-gradient(#07F8F2 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>

                {/* Brackets Técnicos HUD (Alta Definición) */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#07F8F2]/40 group-hover:border-[#07F8F2]/70 rounded-tl-lg transition-colors duration-500" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#07F8F2]/40 group-hover:border-[#07F8F2]/70 rounded-br-lg transition-colors duration-500" />

                
                <div className="relative z-10 flex flex-col gap-6 lg:gap-3 xl:gap-6  3xl:gap-8 h-full">
                    <h3 className="text-white text-3xl lg:text-xl xl:text-2xl 3xl:text-5xl font-bold leading-[1.1]">
                        {titleBase}
                        {titleLineBreak && <br />}
                        <span className={titleAccentColor}>{titleAccent}</span>
                    </h3>
                    <p className="text-gray-100 text-base lg:text-[16px] 3xl:text-xl leading-relaxed flex-1 font-medium">
                        {description}
                    </p>
                    <CTAButton 
                        fullWidth 
                        text={ctaText} 
                        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    />
                </div>

                {/* Decoración Original (Iconos - Colores Originales) */}
                <div className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-700">
                    {decoration}
                </div>
            </div>
        </div>
    );
};



