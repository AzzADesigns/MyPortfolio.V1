'use client';

import './Landing.css';
import { Hero, Projects, Validation } from './header';
import { Navbar, useLandingEntrance, sora, momoSignature } from './shared';

export const Landing = () => {
    const { containerRef } = useLandingEntrance();

    return (
        <div
            ref={containerRef}
            className={`min-h-screen w-full flex flex-col overflow-x-hidden landing-container ${momoSignature.variable} ${sora.variable}`}
        >
            <Navbar />

            <section className="flex-1 flex flex-col lg:flex-row items-center relative mt-0 lg:mt-15 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 gap-16 lg:gap-8 min-h-screen lg:min-h-0 overflow-hidden lg:overflow-visible">
                <Hero />
                <Projects />
                <Validation />
            </section>
        </div>
    );
};
