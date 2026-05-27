'use client';

import { useState, useEffect, useRef } from 'react';

export const ExploreHint = () => {
    const [visible, setVisible] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startedRef = useRef(false);
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const section = document.getElementById('destacados');
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || startedRef.current) return;
                startedRef.current = true;
                observer.disconnect();

                const hide = () => {
                    setVisible(false);
                    if (timerRef.current) clearTimeout(timerRef.current);
                };

                timerRef.current = setTimeout(hide, 10000);

                const handler = (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (target.closest('.exp-num-item') || target.closest('[class*="exp-num"]') || target.closest('.group')) {
                        hide();
                    }
                };

                document.addEventListener('mouseover', handler);
                document.addEventListener('click', handler, true);

                cleanupRef.current = () => {
                    document.removeEventListener('mouseover', handler);
                    document.removeEventListener('click', handler, true);
                    if (timerRef.current) clearTimeout(timerRef.current);
                };
            },
            { threshold: 0.3 }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
            cleanupRef.current?.();
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 25 }}>
            <style>{`
                @keyframes hint-cursor-x {
                    0%, 8% { left: 10%; }
                    20%, 28% { left: 37%; }
                    40%, 48% { left: 63%; }
                    60%, 68% { left: 90%; }
                    80%, 92% { left: 10%; }
                    100% { left: 10%; }
                }
                @keyframes hint-cursor-y {
                    0%, 8% { top: 10%; }
                    20%, 28% { top: 37%; }
                    40%, 48% { top: 63%; }
                    60%, 68% { top: 90%; }
                    80%, 92% { top: 10%; }
                    100% { top: 10%; }
                }
                .hint-cursor-desktop > div {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    animation: hint-cursor-x 7s ease-in-out infinite;
                }
                .hint-cursor-mobile > div {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: hint-cursor-y 7s ease-in-out infinite;
                }
            `}</style>

            <div className="hidden lg:block hint-cursor-desktop" style={{ position: 'absolute', inset: 0 }}>
                <div>
                    <HandPointerIcon />
                </div>
            </div>

            <div className="lg:hidden hint-cursor-mobile" style={{ position: 'absolute', inset: 0 }}>
                <div>
                    <HandPointerIcon />
                </div>
            </div>
        </div>
    );
};

function HandPointerIcon() {
    return (
        <svg
            width="32"
            height="32"
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
