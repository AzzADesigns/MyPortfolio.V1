import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    setupServicesScene,
    animateServicesHeader,
    animateServicesCardsDesktop,
    animateServicesCardsMobile,
} from '../../services/animation/servicesAnimation';

gsap.registerPlugin(ScrollTrigger);

export const useServicesEntrance = (containerRef: RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const triggerElement = container.querySelector('#servicios') as HTMLElement | null;
        if (!triggerElement) return;

        let mm: ReturnType<typeof gsap.matchMedia> | null = null;
        let initialized = false;

        const initAnimation = () => {
            if (initialized) return;
            initialized = true;

            const scene = setupServicesScene(container);
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

                animateServicesHeader(tl, bg as Element, titleWords, subtitle);

                if (isDesktop) {
                    animateServicesCardsDesktop(tl, cards as Element[]);
                } else {
                    animateServicesCardsMobile(cards as Element[]);
                }
            });
        };

        // Diferimos la init de GSAP hasta que el usuario esté a 300px de Services
        // Esto evita que el setup pesado ocurra durante la carga inicial del Landing
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
            observer.disconnect();
            if (mm) mm.revert();
        };
    }, [containerRef]);
};

