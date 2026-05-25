import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export const useManifestoEntrance = (
    manifestoRef: RefObject<HTMLElement | null>,
    containerRef: RefObject<HTMLDivElement | null>
) => {
    useEffect(() => {
        const el = manifestoRef.current;
        const container = containerRef.current;
        if (!el || !container) return;

        // Helper: scoped selector within manifestoRef
        const q = (selector: string) => el.querySelectorAll(selector);

        const ctx = gsap.context(() => {
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
                        start: "top 60%",
                        toggleActions: 'play reverse play reverse',
                    }
                });

                // Fase 1: "Recreando"
                tl.fromTo(q('.manifesto-w1'), 
                    { y: 60, opacity: 0, rotateX: -40 }, 
                    { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "back.out(1.4)" }
                );

                // Fase 2: "el internet"
                tl.fromTo(q('.manifesto-w2'), 
                    { y: 60, opacity: 0, rotateX: -40 }, 
                    { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "back.out(1.4)" },
                    "-=0.5"
                );

                // Fase 3: "Revolucionando" y "un concepto"
                tl.fromTo(q('.manifesto-w3'), 
                    { y: 40, opacity: 0, rotateX: -20 }, 
                    { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "back.out(1.2)", stagger: 0.15 },
                    "-=0.4"
                );

                // Fase 4: Textos secundarios línea por línea
                tl.fromTo(q('.manifesto-text-line'),
                    { y: 30, opacity: 0, rotateX: 20 },
                    { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out", stagger: 0.15 },
                    "-=0.2"
                );

                // Fase 5: Pop-in de las palabras clave
                tl.fromTo(q('.manifesto-highlight'),
                    { scale: 0.5, opacity: 0, y: 15 },
                    { scale: 1, opacity: 1, y: 0, textShadow: "0px 0px 20px rgba(255,255,255,0.4)", duration: 0.7, ease: "back.out(2.5)", stagger: 0.1, clearProps: "transform" },
                    "-=0.8"
                );
            });
        }, el);

        return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
