import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TIMING } from '../constants/signatureData';

/**
 * Hook que maneja toda la lógica del RewardCard:
 * - Generación de sessionId
 * - Fases de reveal (tarjeta → contenido) con timing secuencial
 * - Animación GSAP en desktop (escala mecánica por fases)
 * - CSS transitions en mobile (GPU puro)
 * - Estilos de salida (closing)
 */
export const useRewardCard = (isClosing: boolean) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [sessionId, setSessionId] = useState("");
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        setSessionId(`AZZA_${Math.random().toString(36).substring(7).toUpperCase()}`);
        const t1 = setTimeout(() => setIsVisible(true), TIMING.cardRevealDelay);
        const t2 = setTimeout(() => setIsContentVisible(true), TIMING.cardContentRevealDelay);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useGSAP(() => {
        if (!cardRef.current || !contentRef.current || !mounted) return;

        const isMobile = window.innerWidth < 1024;

        if (!isMobile) {
            gsap.set(cardRef.current, {
                visibility: "visible", opacity: 0, scaleX: 0, scaleY: 0.002,
                transformOrigin: "center"
            });
            gsap.set(contentRef.current.children, { opacity: 0, y: 20 });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.to(cardRef.current, { opacity: 1, scaleX: 1, duration: 0.6, ease: "expo.inOut" })
              .to(cardRef.current, { scaleY: 1, duration: 0.5, ease: "expo.out" })
              .to(contentRef.current.children, {
                  y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out"
              }, "-=0.2");
        }
    }, { scope: cardRef, dependencies: [mounted] });

    const isMobileRender = typeof window !== 'undefined' && window.innerWidth < 1024;

    const exitStyle = isClosing ? {
        opacity: 0,
        transform: 'scale(0.93)',
        transition: 'opacity 0.3s ease-in, transform 0.3s ease-in',
    } : {};

    const cardStyle = isMobileRender ? {
        opacity: isClosing ? 0 : (isVisible ? 1 : 0),
        transform: isClosing ? 'scale(0.93)' : (isVisible ? 'scale(1)' : 'scale(0.92)'),
        transition: isClosing
            ? 'opacity 0.3s ease-in, transform 0.3s ease-in'
            : 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        willChange: 'opacity, transform' as const,
    } : { ...exitStyle };

    const contentStyle = isMobileRender ? {
        opacity: isContentVisible ? 1 : 0,
        transform: isContentVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        willChange: 'opacity, transform' as const,
    } : {};

    return {
        cardRef,
        contentRef,
        sessionId,
        mounted,
        isMobileRender,
        cardStyle,
        contentStyle,
    };
};
