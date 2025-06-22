// hooks/useFooterAnimation.ts
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useFooterAnimation(footerRef: RefObject<HTMLDivElement | null>) {
    useGSAP(() => {
        if (!footerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(
            footerRef.current,
            {
                opacity: 0,
                y: 40,
                filter: "blur(6px)",
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.out",
            }
        );
    }, [footerRef]);
}
