import { useRef, useEffect } from 'react';

export const useLandingEntrance = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mm: ReturnType<typeof import('gsap').default['matchMedia']> | null = null;
        let cancelled = false;

        async function init() {
            const [{ default: gsap }, { ScrollTrigger }, navbarAnim, heroAnim, projectsAnim, validationAnim] = await Promise.all([
                import('gsap'),
                import('gsap/ScrollTrigger'),
                import('../Navbar/animation/navbarAnimation'),
                import('../../header/hero/animation/heroAnimation'),
                import('../../header/proyects/animation/projectsAnimation'),
                import('../../header/validation/animation/validationAnimation'),
            ]);

            if (cancelled) return;

            gsap.registerPlugin(ScrollTrigger);
            gsap.defaults({ ease: "power3.out", duration: 0.8 });

            mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const navTl = gsap.timeline({ delay: 0.2 });
                navbarAnim.animateNavbar(navTl);

                const container = containerRef.current;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container ? container.querySelector("section:first-of-type") : null,
                        scroller: container,
                        start: "top 50%",
                        toggleActions: "play reset play reset",
                    },
                });
                heroAnim.animateHero(tl);
                projectsAnim.animateProjects(tl);
                validationAnim.animateValidation(tl);
            });

            mm.add("(max-width: 767px)", () => {
                navbarAnim.animateNavbarMobile(gsap);
                heroAnim.animateHeroMobile(gsap);
                projectsAnim.animateProjectsMobile(gsap);
                validationAnim.animateValidationMobile(gsap);
            });
        }

        init();

        return () => {
            cancelled = true;
            if (mm) mm.revert();
        };
    }, []);

    return { containerRef };
};
