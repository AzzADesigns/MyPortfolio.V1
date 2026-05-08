'use client';

import { useRef } from 'react';
import './Landing.css';
import { Hero, Projects, Validation, AuroraBackground } from './header';
import { Navbar, CustomCursor, useLandingEntrance, useServicesEntrance, useServicesScrollDetection, sora, momoSignature } from './shared';
import { Services, ServicesHandle } from './services';

export const Landing = () => {
    const { containerRef } = useLandingEntrance();
    useServicesEntrance(containerRef);
    const servicesRef = useRef<ServicesHandle>(null);

    useServicesScrollDetection(containerRef, servicesRef);

    return (
        <div
            ref={containerRef}
            className={`min-h-screen lg:h-screen w-full flex flex-col overflow-x-hidden lg:overflow-y-auto lg:snap-y lg:snap-mandatory scroll-smooth landing-container ${momoSignature.variable} ${sora.variable}`}
        >
            <CustomCursor />
            <Navbar />

            <section className="flex-none flex flex-col md:gap-20 lg:flex-row items-center relative mt-0 lg:mt-0 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 md:py-32 lg:py-0 min-h-[85svh] lg:min-h-screen lg:h-screen overflow-hidden lg:overflow-visible lg:snap-start">
                <AuroraBackground />
                <Hero />
                <Projects />
                <Validation />
            </section>

            <Services ref={servicesRef} />

            <section id="contacto" className="flex-none w-full h-screen bg-slate-900 flex flex-col items-center justify-center lg:snap-start">
                <h1 className="text-6xl font-black text-white">Contacto</h1>
                <p className="text-gray-400 mt-4 text-xl">¿Tienes un proyecto en mente?</p>
            </section>
        </div>
    );
};
