import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateNavbar, animateNavbarMobile } from '../Navbar/animation/navbarAnimation';
import { animateHero, animateHeroMobile } from '../../header/hero/animation/heroAnimation';
import { animateProjects, animateProjectsMobile } from '../../header/proyects/animation/projectsAnimation';
import { animateValidation, animateValidationMobile } from '../../header/validation/animation/validationAnimation';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const setupGSAPDefaults = () => {
    gsap.defaults({
        ease: "power3.out",
        duration: 0.8
    });
};

export const createMainTimeline = () => {
    return gsap.timeline();
};

export const useLandingEntrance = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        setupGSAPDefaults();
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const tl = createMainTimeline();
            animateNavbar(tl);
            animateHero(tl);
            animateProjects(tl);
            animateValidation(tl);
        });

        mm.add("(max-width: 767px)", () => {
            animateNavbarMobile();
            animateHeroMobile();
            animateProjectsMobile();
            animateValidationMobile();
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return { containerRef };
};
