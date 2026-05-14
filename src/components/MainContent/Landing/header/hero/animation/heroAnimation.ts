import gsap from 'gsap';

export const animateHero = (tl: gsap.core.Timeline) => {
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

export const animateHeroMobile = () => {
    gsap.fromTo('.gsap-hero-text', 
        { 
            y: 20, 
            autoAlpha: 0
        }, 
        { 
            scrollTrigger: { 
                trigger: '.gsap-hero-text', 
                start: "top 95%",
                toggleActions: "play none none none"
            }, 
            y: 0, 
            autoAlpha: 1, 
            duration: 1, 
            stagger: 0.1, 
            ease: 'power2.out',
            force3D: true
        }
    );
};
