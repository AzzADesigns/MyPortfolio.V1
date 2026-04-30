import gsap from 'gsap';

export const animateProjects = (tl: gsap.core.Timeline) => {
    tl.fromTo('.gsap-hero-image', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' }, "-=0.4");
    tl.fromTo('.gsap-hero-bg', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, "-=0.8");
};

export const animateProjectsMobile = () => {
    gsap.fromTo('.gsap-hero-bg', 
        { scale: 0.7, autoAlpha: 0 }, 
        { 
            scrollTrigger: { 
                trigger: '.gsap-hero-bg', 
                start: "top 90%" 
            }, 
            scale: 1, 
            autoAlpha: 1, 
            duration: 1.5, 
            ease: 'expo.out' 
        }
    );
    gsap.fromTo('.gsap-hero-image', 
        { scale: 0.9, autoAlpha: 0, y: 20 }, 
        { 
            scrollTrigger: { 
                trigger: '.gsap-hero-bg', 
                start: "top 90%" 
            }, 
            scale: 1, 
            autoAlpha: 1, 
            y: 0,
            duration: 1.2, 
            stagger: 0.15, 
            ease: 'power2.out', 
            delay: 0.3 
        }
    );
};
