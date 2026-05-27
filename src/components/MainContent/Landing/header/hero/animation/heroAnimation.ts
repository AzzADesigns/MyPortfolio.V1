/* eslint-disable @typescript-eslint/no-explicit-any */

export const animateHero = (tl: any) => {
    if (!tl) return;
    tl.fromTo('.gsap-hero-text', 
        { 
            y: 60, 
            autoAlpha: 0,
            scale: 0.95,
            rotationX: -20,
            filter: 'blur(8px)'
        }, 
        { 
            y: 0, 
            autoAlpha: 1, 
            scale: 1,
            rotationX: 0,
            filter: 'blur(0px)',
            duration: 1.5, 
            stagger: 0.2, 
            ease: 'power4.out',
            transformOrigin: "bottom center"
        }, 
        "-=0.4"
    );
};

export const animateHeroMobile = (gsap: any) => {
    gsap.fromTo('.gsap-hero-text', 
        { 
            y: 20, 
            autoAlpha: 0,
            filter: 'blur(6px)'
        }, 
        { 
            y: 0, 
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1, 
            stagger: 0.15,
            ease: 'power3.out'
        }
    );
};
