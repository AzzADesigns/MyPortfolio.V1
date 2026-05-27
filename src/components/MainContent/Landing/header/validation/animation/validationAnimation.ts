/* eslint-disable @typescript-eslint/no-explicit-any */

export const animateValidation = (tl: any) => {
    tl.fromTo('.gsap-hero-stat', { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=1");
};

export const animateValidationMobile = (gsap: any) => {
    gsap.fromTo('.gsap-hero-stat', 
        { y: 20, autoAlpha: 0 }, 
        { 
            scrollTrigger: { 
                trigger: '.gsap-hero-stat', 
                start: "top 95%" 
            }, 
            y: 0, 
            autoAlpha: 1, 
            duration: 1, 
            stagger: 0.1, 
            ease: 'power2.out' 
        }
    );
};
