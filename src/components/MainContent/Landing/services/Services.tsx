'use client';

import React from 'react';
import { FloatingShapes } from './components/FloatingShapes';
import { CodeExplorer } from './components/CodeExplorer';
import { ServiceCard } from './components/ServiceCard';
import { SERVICES_TEXTS, SERVICES_CARDS } from './constants/servicesData';

const decorationMap = {
    design: <FloatingShapes type="design" />,
    product: <FloatingShapes type="product" />,
    code: <CodeExplorer />,
};

export const Services = () => {
    return (
        <section id="servicios" className="flex-none w-full min-h-screen lg:h-screen px-0 lg:px-6 pt-0 lg:pt-27 relative z-10 lg:snap-start">
            <div className="services-bg w-full h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[23px] flex flex-col items-center justify-start gap-8 lg:gap-12 px-6 md:px-16 lg:px-24 pt-6 lg:pt-10 pb-20 shadow-[0_-20px_50px_rgba(255,255,255,0.1)]">


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
                    <p className="services-subtitle text-gray-600 text-lg mt-5 md:text-3xl font-medium">
                        {SERVICES_TEXTS.subtitle}
                    </p>
                </div>


                <div className="grid mb-50 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-30 w-full max-w-8xl pb-32">
                    {SERVICES_CARDS.map((card, index) => (
                        <ServiceCard
                            key={card.titleAccent}
                            {...card}
                            decoration={decorationMap[card.decorationType]}
                            wrapperClassName={index === 2 ? "md:col-span-2 md:w-[70%] md:mx-auto lg:col-span-1 lg:w-full" : ""}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};
