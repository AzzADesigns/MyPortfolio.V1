'use client';

import { useState, useEffect, RefObject, useRef } from 'react';
import { ExperienceGrid } from './components/ExperienceGrid';
import { ProjectDetail } from './components/ProjectDetail';

interface ExperienceProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

export const Experience = ({ containerRef }: ExperienceProps) => {
    const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAnimated(true);
                } else {
                    setIsAnimated(false);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Bloquear scroll cuando hay un proyecto seleccionado
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
        <section ref={sectionRef} id="destacados" className="flex-none flex flex-col items-center justify-start lg:justify-center relative w-full min-h-screen bg-[#001720] lg:snap-start overflow-hidden px-6 md:px-12 pt-6 pb-12 md:pt-12 md:pb-16 lg:py-0">
            <ExperienceGrid
                hoveredNumber={hoveredNumber}
                setHoveredNumber={setHoveredNumber}
                setSelectedProject={setSelectedProject}
                isAnimated={isAnimated}
            />
            <ProjectDetail
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
            />
        </section>
    );
};
