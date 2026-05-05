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
    hoverBg = 'hover:bg-[#001c26]/95',
    decoration,
}: ServiceCardProps) => {
    return (
        <div className={wrapperClassName}>
            <div className={`service-card h-auto lg:h-full ${cardBg} border border-white/5 p-8 lg:p-6 xl:p-8 2xl:p-12 rounded-[16px] lg:rounded-[23px] flex flex-col gap-6 lg:gap-3 xl:gap-6 2xl:gap-8 relative overflow-hidden ${hoverBg} transition-colors duration-500 shadow-2xl`}>
                <h3 className="text-white text-3xl lg:text-xl xl:text-2xl 2xl:text-5xl font-light leading-[1.1]">
                    {titleBase}
                    {titleLineBreak && <br />}
                    <span className={titleAccentColor}>{titleAccent}</span>
                </h3>
                <p className="text-gray-50 text-base lg:text-[16px] 2xl:text-xl leading-relaxed flex-1 font-medium">
                    {description}
                </p>
                <CTAButton fullWidth text={ctaText} />
                {decoration}
            </div>
        </div>
    );
};
