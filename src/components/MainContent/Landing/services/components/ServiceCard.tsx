'use client';

import React from 'react';
import CTAButton from '../../shared/CTAButton/CTAButton';

interface ServiceCardProps {
    // Título
    titleBase: string;        // Ej: "Diseño "
    titleAccent: string;      // Ej: "UX / UI"
    titleAccentColor: string; // Ej: "text-[#89EA2B]"
    titleLineBreak?: boolean; // Si el acento va en una nueva línea
    // Contenido
    description: string;
    ctaText: string;
    // Layout
    wrapperClassName?: string; // Ej: "lg:translate-y-12"
    cardBg?: string;           // Ej: "bg-[#011D26]" (default: bg-[#001720])
    hoverBg?: string;          // Ej: "hover:bg-[#001720]/95"
    // Decoración interna (FloatingShapes o CodeExplorer)
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
    hoverBg = 'hover:bg-[#001c26]/95',
    decoration,
}: ServiceCardProps) => {
    return (
        <div className={wrapperClassName}>
            <div className={`service-card h-full ${cardBg} border border-white/5 p-8 lg:p-12 rounded-[16px] lg:rounded-[23px] flex flex-col gap-6 lg:gap-8 relative overflow-hidden group ${hoverBg} transition-colors duration-500 shadow-2xl`}>
                <h3 className="text-white text-3xl lg:text-5xl font-bold leading-[1.1]">
                    {titleBase}
                    {titleLineBreak && <br />}
                    <span className={titleAccentColor}>{titleAccent}</span>
                </h3>
                <p className="text-gray-50 text-base lg:text-xl leading-relaxed flex-1 font-medium">
                    {description}
                </p>
                <CTAButton fullWidth text={ctaText} />
                {decoration}
            </div>
        </div>
    );
};
