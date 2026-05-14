'use client';

import { useRef } from 'react';
import './Landing.css';
import { Hero, Projects, Validation, AuroraBackground } from './header';
import { Navbar, CustomCursor, useLandingEntrance, useServicesEntrance, useServicesScrollDetection, useLandingScrollManager, sora, momoSignature, LazySection } from './shared';
import { Services, ServicesHandle } from './services';
import { Signature } from './signature';
import { BrandIdentity } from './brand';
import { Experience } from './experience';
import { Contact } from './contact';

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

            {/* Hero: siempre montado, es la primera pantalla */}
            <section className="flex-none flex flex-col md:gap-20 lg:flex-row items-center relative mt-0 lg:mt-0 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 md:py-32 lg:py-0 min-h-[85svh] lg:min-h-screen lg:h-screen overflow-hidden lg:overflow-visible lg:snap-start lg:snap-always">
                <AuroraBackground />
                <Hero />
                <Projects />
                <Validation />
            </section>

            {/* Services: pre-carga con margen amplio porque tiene mucha lógica GSAP */}
            <LazySection
                rootMargin="500px 0px"
                placeholderClassName="flex-none w-full lg:h-screen lg:snap-start lg:snap-always"
            >
                <Services ref={servicesRef} />
            </LazySection>

            {/* Signature */}
            <LazySection
                rootMargin="300px 0px"
                placeholderClassName="flex-none w-full min-h-screen lg:h-screen lg:snap-start"
            >
                <Signature containerRef={containerRef} />
            </LazySection>

            {/* Brand Identity */}
            <LazySection
                rootMargin="300px 0px"
                placeholderClassName="flex-none w-full min-h-screen lg:snap-start"
            >
                <BrandIdentity containerRef={containerRef} />
            </LazySection>

            {/* Experience */}
            <LazySection
                rootMargin="300px 0px"
                placeholderClassName="flex-none w-full min-h-screen lg:snap-start"
            >
                <Experience containerRef={containerRef} />
            </LazySection>

            {/* Contact */}
            <LazySection
                rootMargin="200px 0px"
                placeholderClassName="flex-none w-full min-h-screen lg:snap-start"
            >
                <Contact containerRef={containerRef} />
            </LazySection>
        </div>
    );
};
