'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const useBrandEntrance = (
    brandSectionRef: RefObject<HTMLDivElement | null>,
    containerRef: RefObject<HTMLDivElement | null>
) => {
    useEffect(() => {
        let ctx: gsap.Context;
        
        const timer = setTimeout(() => {
            const el = brandSectionRef.current;
            const container = containerRef.current;
            if (!el || !container) return;

            // Selector rápido dentro del componente
            const q = (selector: string) => el.querySelectorAll(selector);

            ctx = gsap.context(() => {
                const mm = gsap.matchMedia();

                mm.add({
                    isDesktop: '(min-width: 1024px)',
                    isMobile: '(max-width: 1023px)',
                }, (context) => {
                    const { isDesktop } = context.conditions as { isDesktop: boolean };
                    const scroller = isDesktop ? container : undefined;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            scroller: scroller,
                            start: "top 65%",
                            toggleActions: 'play reverse play reverse',
                        }
                    });

                    // Fase 1: Enfoque Líquido y Expansión
                    tl.fromTo(q('.brand-reveal'), 
                        { 
                            y: 30, 
                            x: 15, 
                            opacity: 0, 
                            filter: 'blur(10px)', 
                            scale: 1.05 
                        }, 
                        { 
                            y: 0, 
                            x: 0, 
                            opacity: 1, 
                            filter: 'blur(0px)', 
                            scale: 1, 
                            duration: 1.2, 
                            ease: "power3.out", 
                            stagger: 0.12 
                        }
                    );
                });
            }, el);
        }, 50);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
