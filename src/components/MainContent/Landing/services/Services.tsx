'use client';

import React from 'react';
import { FluidBackground } from './components/FluidBackground';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ServicesContent } from './components/ServicesContent';

export const Services = () => {
    return (
        <section id="servicios" data-theme="light" className="flex-none w-full min-h-screen relative z-10 bg-[#c0c6cf] overflow-hidden lg:snap-start lg:snap-always">
            <FluidBackground />
            <ScrollIndicator />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-20 lg:py-0">
                <ServicesContent />
            </div>
        </section>
    );
};

Services.displayName = 'Services';