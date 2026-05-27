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
                /** En mobile: sin reverse al scroll (evita re-ejecutar 3D/blur en cada pasada) y animación más barata (sin rotateX / textShadow). */
                const isMobile = !isDesktop;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        scroller: scroller,
                        start: "top 60%",
                        toggleActions: isMobile ? 'play none none none' : 'play reverse play reverse',
                        fastScrollEnd: true,
                    }
                });

                const rxIn = isMobile ? 0 : -40;
                const rxInSoft = isMobile ? 0 : -20;
                const easeMain = isMobile ? 'power2.out' : 'back.out(1.4)';
                const easeSoft = isMobile ? 'power2.out' : 'back.out(1.2)';
                const durMain = isMobile ? 0.55 : 0.8;
                const durSoft = isMobile ? 0.5 : 0.8;

                // Fase 1: "Recreando"
                tl.fromTo(q('.manifesto-w1'),
                    { y: isMobile ? 36 : 60, opacity: 0, rotateX: rxIn },
                    { y: 0, opacity: 1, rotateX: 0, duration: durMain, ease: easeMain }
                );

                // Fase 2: "el internet"
                tl.fromTo(q('.manifesto-w2'),
                    { y: isMobile ? 36 : 60, opacity: 0, rotateX: rxIn },
                    { y: 0, opacity: 1, rotateX: 0, duration: durMain, ease: easeMain },
                    isMobile ? "-=0.35" : "-=0.5"
                );

                // Fase 3: "Revolucionando" y "un concepto"
                tl.fromTo(q('.manifesto-w3'),
                    { y: isMobile ? 28 : 40, opacity: 0, rotateX: rxInSoft },
                    { y: 0, opacity: 1, rotateX: 0, duration: durSoft, ease: easeSoft, stagger: isMobile ? 0.08 : 0.15 },
                    isMobile ? "-=0.3" : "-=0.4"
                );

                // Fase 4: Textos secundarios línea por línea
                tl.fromTo(q('.manifesto-text-line'),
                    { y: isMobile ? 20 : 30, opacity: 0, rotateX: isMobile ? 0 : 20 },
                    { y: 0, opacity: 1, rotateX: 0, duration: isMobile ? 0.65 : 1, ease: "power3.out", stagger: isMobile ? 0.1 : 0.15 },
                    isMobile ? "-=0.15" : "-=0.2"
                );

                // Fase 5: Pop-in de las palabras clave
                tl.fromTo(q('.manifesto-highlight'),
                    { scale: isMobile ? 0.92 : 0.5, opacity: 0, y: isMobile ? 8 : 15 },
                    isMobile
                        ? { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06, clearProps: "transform" }
                        : { scale: 1, opacity: 1, y: 0, textShadow: "0px 0px 20px rgba(255,255,255,0.4)", duration: 0.7, ease: "back.out(2.5)", stagger: 0.1, clearProps: "transform" },
                    isMobile ? "-=0.4" : "-=0.8"
                );
            });
        }, el);

        return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
