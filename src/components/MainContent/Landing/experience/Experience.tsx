'use client';

import { useState, useEffect, RefObject, useRef } from 'react';
import { ExperienceGrid } from './components/ExperienceGrid';
import { ProjectDetail } from './components/ProjectDetail';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

export const Experience = ({ containerRef }: ExperienceProps) => {
    const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const el = sectionRef.current;
        const container = containerRef.current;
        if (!el || !container) return;

        const q = gsap.utils.selector(el);

        const mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 1024px)",
            isMobile: "(max-width: 1023px)"
        }, (context) => {
            const { isDesktop } = context.conditions as { isDesktop: boolean };
            const scroller = isDesktop ? container : undefined;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    scroller: scroller,
                    start: isDesktop ? "top 75%" : "top 90%",
                    toggleActions: 'play reverse play reverse',
                }
            });

            // Título de fondo: Solo opacidad
            tl.fromTo(q(".exp-bg-text"), 
                { opacity: 0 }, 
                { opacity: 1, duration: 1.2, ease: "power3.out" }
            )
            // Números: Aparecen en secuencia
            .fromTo(q(".exp-num-item"), 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
                "-=0.8"
            );
        });

    }, { scope: sectionRef });

    // Bloquear scroll principal cuando hay un proyecto seleccionado
    useEffect(() => {
        const container = containerRef.current;
        if (selectedProject !== null) {
            if (container) container.style.setProperty('overflow', 'hidden', 'important');
            document.documentElement.style.setProperty('overflow', 'hidden', 'important');
            document.body.style.setProperty('overflow', 'hidden', 'important');
        } else {
            if (container) container.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            if (container) container.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [selectedProject, containerRef]);

    return (
        <section ref={sectionRef} id="destacados" className="flex-none flex flex-col items-center justify-center relative w-full min-h-screen bg-[#001720] lg:snap-start overflow-hidden px-6 md:px-12 py-20 lg:py-0">
            <ExperienceGrid 
                hoveredNumber={hoveredNumber}
                setHoveredNumber={setHoveredNumber}
                setSelectedProject={setSelectedProject}
            />

            <ProjectDetail 
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
            />
        </section>
    );
};
