'use client';

import { useRef } from 'react';
import './Landing.css';
import { Hero, Projects, Validation, AuroraBackground } from './header';
import { Navbar, CustomCursor, useLandingEntrance, useServicesEntrance, useLandingScrollManager, sora, momoSignature, LazySection } from './shared';
import { Services } from './services';
import { Process } from './process';
import { Signature } from './signature';
import { BrandIdentity } from './brand';
import { Experience } from './experience';
import { Contact } from './contact';

export const Landing = () => {
    const { containerRef } = useLandingEntrance();
    const isNavigatingRef = useRef(false);
    
    useServicesEntrance(containerRef);
    useLandingScrollManager(containerRef);

    return (
        <div ref={containerRef} className={`min-h-screen lg:h-screen w-full flex flex-col overflow-x-hidden lg:overflow-y-auto lg:snap-y lg:snap-mandatory scroll-smooth landing-container ${momoSignature.variable} ${sora.variable}`}>
            <CustomCursor />
            <Navbar isNavigatingRef={isNavigatingRef} />

            {/* Hero: siempre montado, es la primera pantalla */}
            <section className="flex-none flex flex-col md:gap-20 lg:flex-row items-center relative mt-0 lg:mt-0 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 md:py-32 lg:py-0 min-h-[85svh] lg:min-h-screen lg:h-screen overflow-hidden lg:overflow-visible lg:snap-start lg:snap-always">
                <AuroraBackground />
                <Hero />
                <Projects />
                <Validation />
            </section>

            {/* Services & Methodology: Secciones directas para que funcione el Snap de CSS */}
            <LazySection
                id="servicios"
                rootMargin="500px 0px"
                placeholderClassName="flex-none w-full lg:h-screen lg:snap-start lg:snap-always"
            >
                <Services />
            </LazySection>

            <LazySection
                id="proceso"
                rootMargin="400px 0px"
                placeholderClassName="flex-none w-full lg:h-screen lg:snap-start lg:snap-always bg-[#001720]"
            >
                <Process />
            </LazySection>

            {/* Signature */}
            <LazySection
                id="firma"
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
                id="destacados"
                rootMargin="300px 0px"
                placeholderClassName="flex-none w-full min-h-screen lg:snap-start"
            >
                <Experience containerRef={containerRef} />
            </LazySection>

            {/* Contact */}
            <LazySection
                id="contacto"
                rootMargin="200px 0px"
                placeholderClassName="flex-none w-full min-h-screen lg:snap-start"
            >
                <Contact containerRef={containerRef} />
            </LazySection>
        </div>
    );
};

/*el observer siempre tiene quie mirar la ultima accion del usuario */