import { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    setupServicesScene,
    animateServicesHeader,
    animateServicesCardsDesktop,
    animateServicesCardsMobile,
} from '../../services/animation/servicesAnimation';

gsap.registerPlugin(ScrollTrigger);

export const useServicesEntrance = (containerRef: RefObject<HTMLDivElement | null>) => {
    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const triggerElement = container.querySelector('#servicios');
        if (!triggerElement) return;

        const scene = setupServicesScene(container);
        if (!scene) return;

        const { bg, titleWords, subtitle, cards } = scene;

        const mm = gsap.matchMedia();

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

        return () => mm.revert();

    }, { scope: containerRef });
};
