'use client';

import React from 'react';
import { FloatingShapes } from './components/FloatingShapes';
import { CodeExplorer } from './components/CodeExplorer';
import { ServiceCard } from './components/ServiceCard';
import { SERVICES_TEXTS, SERVICES_CARDS } from './constants/servicesData';
import { FluidBackground } from './components/FluidBackground';
import { ScrollIndicator } from './components/ScrollIndicator';

const decorationMap = {
    design: <FloatingShapes type="design" />,
    product: <FloatingShapes type="product" />,
    code: <CodeExplorer />,
};

export const Services = () => {
    return (
        <section id="servicios" className="flex-none w-full h-screen px-0 lg:px-6 pt-0 lg:pt-27 relative z-10 lg:snap-start">
            <div className="services-bg relative w-full h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[23px] shadow-[0_-20px_50px_rgba(255,255,255,0.1)] overflow-hidden">
                {/* Capas fijas de fondo */}
                <FluidBackground />
                <ScrollIndicator />
                
                {/* Contenido que sí hace scroll */}
                <div className="absolute inset-0 flex flex-col items-center justify-start gap-8 lg:gap-6 xl:gap-12 px-6 md:px-16 lg:px-24 pt-6 lg:pt-10 pb-20 overflow-y-auto overflow-x-hidden services-internal-scroll z-10">
                    <div className="text-center space-y-1 px-4">
                        <h2 className="text-[#001720] text-3xl md:text-[50px] font-bold tracking-tight">
                            {SERVICES_TEXTS.title.words.map((word) => (
                                <React.Fragment key={word}>
                                    <span className="title-word inline-block">{word}</span>{' '}
                                </React.Fragment>
                            ))}
                            <span className="title-word relative inline-block px-4 lg:px-6 py-1 lg:py-2 bg-brand-dark border border-brand-cyan/30 rounded-2xl lg:rounded-3xl text-brand-cyan shadow-[0_0_40px_rgba(7,248,242,0.25)] ml-1">
                                {SERVICES_TEXTS.title.highlight}
                            </span>
                        </h2>
                        <p className="services-subtitle text-gray-600 text-lg mt-5 lg:text-xl xl:text-2xl font-medium">
                            {SERVICES_TEXTS.subtitle}
                        </p>
                    </div>

                    <div className="grid  2xl:mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-5 xl:gap-10 2xl:gap-[6%] w-full max-w-8xl ">
                        {SERVICES_CARDS.map((card, index) => (
                            <ServiceCard
                                key={card.titleAccent}
                                {...card}
                                decoration={decorationMap[card.decorationType]}
                                wrapperClassName={`
                                    ${index === 0 ? "2xl:-translate-y-12" : ""}
                                    ${index === 1 ? "2xl:translate-y-4" : ""}
                                    ${index === 2 ? "2xl:translate-y-20 md:col-span-2 md:w-[70%] md:mx-auto lg:col-span-1 lg:w-full" : ""}
                                `.trim()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
