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
            y: 40, 
            autoAlpha: 0,
            scale: 0.95,
            filter: 'blur(5px)'
        }, 
        { 
            scrollTrigger: { 
                trigger: '.gsap-hero-text', 
                start: "top 90%",
                toggleActions: "play none none none"
            }, 
            y: 0, 
            autoAlpha: 1, 
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2, 
            stagger: 0.15, 
            ease: 'power3.out' 
        }
    );
};
