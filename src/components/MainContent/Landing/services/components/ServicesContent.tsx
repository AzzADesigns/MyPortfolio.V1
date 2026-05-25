import React, { useRef } from 'react';
import '../scrollReveal.css';
import { SERVICES_TEXTS, SERVICES_CARDS } from '../constants/servicesData';
import { ServiceCard } from './ServiceCard';
import { FloatingShapes } from './FloatingShapes';
import { CodeExplorer } from './CodeExplorer';
import { useScrollReveal } from '../hooks/useScrollReveal';

const decorationMap = {
    design: <FloatingShapes type="design" />,
    product: <FloatingShapes type="product" />,
    code: <CodeExplorer />,
};

export const ServicesContent = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Reveal del header (título + subtítulo) → fade-up escalonado
    useScrollReveal(sectionRef, {
        selector: '.sr-services-header-item',
        variant: 'fade-up',
        staggerMs: 100,
        rootMargin: '-5% 0px',
        mobileOnly: false,
    });

    // Reveal de las cards → fade-left en cascada
    useScrollReveal(sectionRef, {
        selector: '.sr-service-card-wrapper',
        variant: 'fade-left',
        staggerMs: 130,
        rootMargin: '-2% 0px',
        mobileOnly: false,
    });

    return (
        <div ref={sectionRef} className="relative w-full flex flex-col lg:absolute lg:inset-0 h-auto lg:h-full items-center justify-start gap-8 lg:gap-6 xl:gap-12 px-6 md:px-16 lg:px-24 pt-20 lg:pt-28 pb-20 z-10">
            <div className="text-center space-y-1 px-4">
                {/* En mobile, el h2 completo es una unidad de reveal */}
                <h2 className="sr-services-header-item text-[#001720] text-3xl md:text-[50px] font-bold tracking-tight">
                    {SERVICES_TEXTS.title.words.map((word) => (
                        <React.Fragment key={word}>
                            <span className="title-word inline-block">{word}</span>{' '}
                        </React.Fragment>
                    ))}
                    <span className="title-word relative inline-block px-4 lg:px-6 py-1 lg:py-2 bg-brand-dark border border-brand-cyan/30 rounded-2xl lg:rounded-3xl text-brand-cyan shadow-[0_0_40px_rgba(7,248,242,0.25)] ml-1">
                        {SERVICES_TEXTS.title.highlight}
                    </span>
                </h2>
                <p className="sr-services-header-item services-subtitle text-gray-600 text-lg mt-8 lg:text-xl xl:text-2xl font-medium">
                    {SERVICES_TEXTS.subtitle}
                </p>
            </div>

            <div className="grid 3xl:mt-15 grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-5 xl:gap-20 3xl:gap-[7%] w-full max-w-8xl items-stretch">
                {SERVICES_CARDS.map((card) => (
                    <div
                        key={card.titleAccent}
                        className="sr-service-card-wrapper h-full"
                    >
                        <ServiceCard
                            {...card}
                            decoration={decorationMap[card.decorationType as keyof typeof decorationMap]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

