'use client';

import React, { useRef, useEffect, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';
import { FluidBackground } from './components/FluidBackground';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ServicesContent } from './components/ServicesContent';
import { ProcessDesktop } from './components/ProcessDesktop';
import { ProcessMobile } from './components/ProcessMobile';
import { useServicesState } from './hooks/useServicesState';
import { useProcessStepTransition } from './animation/useProcessStepTransition';
import { useServicesAnimations } from './animation/useServicesAnimations';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

export interface ServicesHandle {
    enterFromBottom: () => void;
}

export const Services = React.forwardRef<ServicesHandle>((_, ref) => {
    const state = useServicesState();

    const { handleStepChange } = useProcessStepTransition(state);

    const handleStepChangeRef = useRef(handleStepChange);
    useEffect(() => {
        handleStepChangeRef.current = handleStepChange;
    });

    useServicesAnimations({
        ...state,
        handleStepChangeRef
    });

    useImperativeHandle(ref, () => ({
        enterFromBottom: () => {
            state.enterFromBottomFnRef.current?.();
        }
    }), [state.enterFromBottomFnRef]);

    return (
        <section id="servicios" className="flex-none w-full h-auto lg:h-screen relative z-10 lg:snap-start lg:snap-always">
            <div className="services-bg relative w-full h-auto lg:h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[30px] shadow-[0_-20px_50px_rgba(255,255,255,0.1)] overflow-hidden" style={{ transformOrigin: 'bottom center' }}>
                <FluidBackground />
                <ScrollIndicator />

                {/* Contenedor de Scroll principal: En móvil es relativo y fluye con la página, en desktop es absoluto y scrolleable internamente */}
                <div
                    ref={state.scrollRef}
                    className="relative lg:absolute lg:inset-0 h-auto lg:h-full overflow-visible lg:overflow-y-auto lg:overflow-x-hidden services-internal-scroll z-10 flex flex-col"
                >
                    {/* Primera sección: Contenido de Servicios */}
                    <div className="relative w-full h-auto lg:min-h-screen flex-shrink-0">
                        <ServicesContent />
                    </div>

                    {/* Nueva sección: El Proceso */}
                    <div
                        ref={state.processRef}
                        id="proceso-section"
                        className="w-full relative h-auto lg:min-h-[400vh]"
                    >
                        <ProcessDesktop
                            activeStep={state.activeStep}
                            currentStep={state.currentStep}
                            isAnimating={state.isAnimating}
                            handleStepChange={handleStepChange}
                        />
                        <ProcessMobile />
                    </div>
                </div>
            </div>
        </section>
    );
});

Services.displayName = 'Services';