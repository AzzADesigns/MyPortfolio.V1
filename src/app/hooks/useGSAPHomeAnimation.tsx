// hooks/useGSAPHomeAnimation.ts
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPHomeAnimation(
    cardRef: RefObject<HTMLDivElement | null>,
    profileRef: RefObject<HTMLDivElement | null>,
    aboutRef: RefObject<HTMLDivElement | null>,
    featuredRef: RefObject<HTMLDivElement | null>
) {
    useGSAP(() => {
        const tl = gsap.timeline();
        
        if (cardRef.current) {
            tl.fromTo(
                cardRef.current,
                { opacity: 0, y: 30, scale: 0.92, filter: "blur(6px)" },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.12,
                    ease: "power3.out",
                    delay: 0.1,
                }
            );
        }
      
        if (profileRef.current) {
            tl.fromTo(
                profileRef.current,
                { opacity: 0, y: -20, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "expo.out",
                },
                "-=0.6"
            );
        }
      
        if (aboutRef.current) {
            tl.fromTo(
                aboutRef.current,
                {
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                    filter: "blur(8px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.1"
            );
        }
      
        if (featuredRef.current) {
            gsap.fromTo(
                featuredRef.current,
                {
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                    filter: "blur(6px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: featuredRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);
}
