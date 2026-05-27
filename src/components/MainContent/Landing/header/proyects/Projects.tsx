import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PROJECT_IMAGES } from './constants/projectData';

export default function Projects() {
    const [isMobile, setIsMobile] = useState(false);
    const [deferSecondary, setDeferSecondary] = useState(true);
    const criticalImageIndex = isMobile ? 1 : 2;

    useEffect(() => {
        const compute = () => setIsMobile(window.innerWidth < 768);
        compute();
        window.addEventListener('resize', compute, { passive: true });
        return () => window.removeEventListener('resize', compute);
    }, []);

    // En mobile, diferimos 2 imágenes no-críticas para mejorar LCP/TBT.
    useEffect(() => {
        if (!isMobile) {
            setDeferSecondary(false);
            return;
        }

        const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number; cancelIdleCallback?: (id: number) => void; };
        let idleId: number | null = null;
        const timeoutId = window.setTimeout(() => setDeferSecondary(false), 1600);

        if (typeof w.requestIdleCallback === 'function') {
            idleId = w.requestIdleCallback(() => setDeferSecondary(false), { timeout: 2000 });
        }

        return () => {
            window.clearTimeout(timeoutId);
            if (idleId !== null && typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
        };
    }, [isMobile]);

    return (
        <div className="relative w-full lg:flex-1 h-[600px] md:h-[500px] lg:h-[400px] xl:h-auto flex items-center justify-center mt-[-120px] md:mt-0 2xl:mt-20 xl:ml-15 2xl:-ml-10 3xl:ml-15 mb-10 lg:my-0 z-10 gsap-projects-container">
            {PROJECT_IMAGES.map((img, index) => (
                // Mantener 1 imagen crítica para LCP; diferir las otras 2 solo en mobile.
                (index === criticalImageIndex || !isMobile || !deferSecondary) ? (
                <div key={index} className={`absolute ${img.animateClass} gsap-hero-image`} style={{ zIndex: img.zIndex }}>
                    <div className={img.containerClass}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={735}
                            height={400}
                            className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 will-change-transform"
                            fetchPriority={index === criticalImageIndex ? 'high' : 'auto'}
                            loading={index === criticalImageIndex ? "eager" : "lazy"}
                            sizes="(max-width: 768px) 320px, (max-width: 1024px) 450px, 735px"
                            quality={60}
                        />
                    </div>
                </div>
                ) : null
            ))}

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
                <div
                    className="absolute border-[3px] border-[#89EA2B]/90 rounded-full gsap-hero-bg w-[240px] h-[240px] translate-y-12 md:translate-y-0 md:w-[450px] md:h-[450px] lg:w-[320px] lg:h-[320px] xl:w-[450px] xl:h-[450px] 2xl:w-[500px] 3xl:w-[550px] 2xl:h-[500px] 3xl:h-[550px] lg:top-1/2 lg:left-[56%] lg:-translate-x-[72%] lg:-translate-y-[40%] 3xl:-translate-x-[72%] 3xl:-translate-y-[40%] 2xl:-translate-x-[70%] 2xl:-translate-y-[45%]"
                >
                    <svg
                        className="absolute -bottom-[5px] md:-bottom-[5px] left-1/2 -translate-x-1/2 animate-bounce"
                        width="48"
                        height="72"
                        viewBox="0 0 24 36"
                        fill="none"
                        stroke="#D1D5DB"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="0" x2="12" y2="32"></line>
                        <polyline points="5 25 12 32 19 25"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
}
