'use client';

import { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const useBrandEntrance = (
    brandSectionRef: RefObject<HTMLDivElement | null>,
    containerRef: RefObject<HTMLDivElement | null>
) => {
    useGSAP(() => {
        const el = brandSectionRef.current;
        const container = containerRef.current;
        
        if (!el || !container) return;

        // Selector rápido integrado de GSAP que respeta el scope automáticamente
        const q = gsap.utils.selector(el);

        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: '(min-width: 1024px)',
        }, () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    scroller: container,
                    start: "top 65%",
                    toggleActions: 'play reverse play reverse',
                }
            });

            // Fase 1: Enfoque Líquido y Expansión (Sin blur para mejor rendimiento)
            tl.fromTo(q('.brand-reveal'), 
                { 
                    y: 30, 
                    x: 15, 
                    opacity: 0, 
                    scale: 1.05 
                }, 
                { 
                    y: 0, 
                    x: 0, 
                    opacity: 1, 
                    scale: 1, 
                    duration: 1.2, 
                    ease: "power3.out", 
                    stagger: 0.12 
                }
            );
        });

    }, { dependencies: [], scope: brandSectionRef });
};
