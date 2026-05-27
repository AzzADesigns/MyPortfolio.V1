'use client';

import { useState, useEffect, useRef } from 'react';

export const BrandExploreHint = () => {
    const [visible, setVisible] = useState(true);
    const cursorRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<Animation | null>(null);
    const startedRef = useRef(false);
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const section = document.getElementById('brand-identity');
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || startedRef.current) return;
                startedRef.current = true;
                observer.disconnect();

                const wordEls = section.querySelectorAll<HTMLElement>('[data-word]');
                if (wordEls.length < 4) return;

                const sectionRect = section.getBoundingClientRect();
                const positions: { x: number; y: number }[] = [];

                wordEls.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    positions.push({
                        x: rect.left + rect.width / 2 - sectionRect.left,
                        y: rect.top + rect.height / 2 - sectionRect.top,
                    });
                });

                const [p0, p1, p2, p3] = positions;

                if (cursorRef.current) {
                    const keyframes = [
                        { left: `${p0.x}px`, top: `${p0.y}px`, offset: 0 },
                        { left: `${p0.x}px`, top: `${p0.y}px`, offset: 0.05 },
                        { left: `${p1.x}px`, top: `${p1.y}px`, offset: 0.25 },
                        { left: `${p1.x}px`, top: `${p1.y}px`, offset: 0.30 },
                        { left: `${p2.x}px`, top: `${p2.y}px`, offset: 0.50 },
                        { left: `${p2.x}px`, top: `${p2.y}px`, offset: 0.55 },
                        { left: `${p3.x}px`, top: `${p3.y}px`, offset: 0.75 },
                        { left: `${p3.x}px`, top: `${p3.y}px`, offset: 0.80 },
                        { left: `${p0.x}px`, top: `${p0.y}px`, offset: 1 },
                    ];

                    animRef.current = cursorRef.current.animate(keyframes, {
                        duration: 10000,
                        iterations: Infinity,
                        easing: 'ease-in-out',
                    });
                }

                const hide = () => {
                    setVisible(false);
                    animRef.current?.cancel();
                };

                const handler = (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (target.closest('[data-word]')) hide();
                };

                document.addEventListener('mouseover', handler);
                document.addEventListener('click', handler, true);
                const timer = setTimeout(hide, 10000);

                cleanupRef.current = () => {
                    document.removeEventListener('mouseover', handler);
                    document.removeEventListener('click', handler, true);
                    clearTimeout(timer);
                };
            },
            { threshold: 0.3 }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
            animRef.current?.cancel();
            cleanupRef.current?.();
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 25 }}>
            <div ref={cursorRef} className="absolute" style={{ transform: 'translate(-50%, -50%)' }}>
                <HandPointerIcon />
            </div>
        </div>
    );
};

function HandPointerIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}
        >
            <path d="M18 11V6a2 2 0 0 0-4 0v1" />
            <path d="M14 10V4a2 2 0 0 0-4 0v6" />
            <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
            <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.21 0-4.21-.9-5.66-2.34L3.5 15.5a1 1 0 0 1 .17-1.52 1 1 0 0 1 1.17.08L6 15" />
        </svg>
    );
}
