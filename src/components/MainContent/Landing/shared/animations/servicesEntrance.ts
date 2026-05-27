import { RefObject, useEffect } from 'react';

export const useServicesEntrance = (containerRef: RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const triggerElement = container.querySelector('#servicios') as HTMLElement | null;
        if (!triggerElement) return;

        let mm: { revert: () => void; add: (conditions: Record<string, string>, callback: (context: { conditions?: Record<string, boolean> }) => void) => void } | null = null;
        let initialized = false;
        let cancelled = false;

        const initAnimation = () => {
            if (initialized) return;
            initialized = true;

            Promise.all([
                import('gsap'),
                import('gsap/ScrollTrigger'),
                import('../../services/animation/servicesAnimation'),
            ]).then(([{ default: gsap }, { ScrollTrigger }, servicesAnim]) => {
                if (cancelled) return;
                gsap.registerPlugin(ScrollTrigger);

                const scene = servicesAnim.setupServicesScene(gsap, container);
                if (!scene) return;

                const { bg, titleWords, subtitle, cards } = scene;
                mm = gsap.matchMedia();

                mm.add({
                    isDesktop: '(min-width: 1024px)',
                    isMobile: '(max-width: 1023px)',
                }, (context) => {
                    const { isDesktop } = context.conditions as { isDesktop: boolean };
                    const scroller = isDesktop ? container : undefined;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            scroller: scroller,
                            start: isDesktop ? 'top 70%' : 'top 80%',
                            toggleActions: isDesktop ? 'play reset play reset' : 'play none none none',
                        },
                    });

                    servicesAnim.animateServicesHeader(tl, bg as Element, titleWords, subtitle);

                    if (isDesktop) {
                        servicesAnim.animateServicesCardsDesktop(tl, cards as Element[]);
                    } else {
                        servicesAnim.animateServicesCardsMobile(gsap, cards as Element[]);
                    }
                });
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    initAnimation();
                    observer.disconnect();
                }
            },
            { rootMargin: '300px 0px', threshold: 0 }
        );

        observer.observe(triggerElement);

        return () => {
            cancelled = true;
            observer.disconnect();
            if (mm) mm.revert();
        };
    }, [containerRef]);
};
