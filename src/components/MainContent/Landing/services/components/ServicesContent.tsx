import React from 'react';
import { SERVICES_TEXTS, SERVICES_CARDS } from '../constants/servicesData';
import { ServiceCard } from './ServiceCard';
import { FloatingShapes } from './FloatingShapes';
import { CodeExplorer } from './CodeExplorer';

const decorationMap = {
    design: <FloatingShapes type="design" />,
    product: <FloatingShapes type="product" />,
    code: <CodeExplorer />,
};

export const ServicesContent = () => {
    return (
        <div className="relative w-full flex flex-col lg:absolute lg:inset-0 h-auto lg:h-full items-center justify-start gap-8 lg:gap-6 xl:gap-12 px-6 md:px-16 lg:px-24 pt-6 lg:pt-10 pb-20 z-10">
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

            <div className="grid 2xl:mt-8 grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-5 xl:gap-10 2xl:gap-[7%] w-full max-w-8xl ">
                {SERVICES_CARDS.map((card, index) => (
                    <ServiceCard
                        key={card.titleAccent}
                        {...card}
                        decoration={decorationMap[card.decorationType as keyof typeof decorationMap]}
                        wrapperClassName={`
                            ${index === 0 ? "2xl:-translate-y-12" : ""}
                            ${index === 1 ? "2xl:translate-y-4" : ""}
                            ${index === 2 ? "2xl:translate-y-20 lg:col-span-1" : ""}
                        `.trim()}
                    />
                ))}
            </div>
        </div>
    );
};
