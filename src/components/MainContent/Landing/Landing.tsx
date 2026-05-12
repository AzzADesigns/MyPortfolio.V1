'use client';

import { useRef } from 'react';
import './Landing.css';
import { Hero, Projects, Validation, AuroraBackground } from './header';
import { Navbar, CustomCursor, useLandingEntrance, useServicesEntrance, useServicesScrollDetection, useLandingScrollManager, sora, momoSignature } from './shared';
import { Services, ServicesHandle } from './services';
import { Signature } from './signature';
import { BrandIdentity } from './brand';

export const Landing = () => {
    const servicesRef = useRef<ServicesHandle>(null);
    const { containerRef } = useLandingEntrance();
    
    useServicesEntrance(containerRef);
    useServicesScrollDetection(containerRef, servicesRef);
    useLandingScrollManager(containerRef);

    return (
        <div ref={containerRef} className={`min-h-screen lg:h-screen w-full flex flex-col overflow-x-hidden lg:overflow-y-auto lg:snap-y lg:snap-mandatory scroll-smooth landing-container ${momoSignature.variable} ${sora.variable}`}>
            <CustomCursor />
            <Navbar />

            <section className="flex-none flex flex-col md:gap-20 lg:flex-row items-center relative mt-0 lg:mt-0 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 md:py-32 lg:py-0 min-h-[85svh] lg:min-h-screen lg:h-screen overflow-hidden lg:overflow-visible lg:snap-start lg:snap-always">
                <AuroraBackground />
                <Hero />
                <Projects />
                <Validation />
            </section>

            <Services ref={servicesRef} />

            <Signature containerRef={containerRef} />

            <BrandIdentity containerRef={containerRef} />
        </div>
    );
};
