import { useRef, useState, useEffect } from 'react';
import { TIMING } from '../constants/signatureData';

/**
 * Hook que maneja toda la lógica del RewardCard:
 * - Generación de sessionId
 * - Fases de reveal (tarjeta → contenido) con timing secuencial
 * - Transiciones CSS puras para máximo rendimiento en GPU
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

    const isMobileRender = typeof window !== 'undefined' && window.innerWidth < 1024;

    const exitStyle = isClosing ? {
        opacity: 0,
        transform: 'scale(0.93)',
        transition: 'opacity 0.3s ease-in, transform 0.3s ease-in',
    } : {};

    const cardStyle = {
        opacity: isClosing ? 0 : (isVisible ? 1 : 0),
        transform: isClosing ? 'scale(0.95)' : (isVisible ? 'scale(1)' : 'scale(0.95)'),
        transition: isClosing
            ? 'opacity 0.3s ease-in, transform 0.3s ease-in'
            : 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform' as const,
        transformOrigin: 'center'
    };

    const contentStyle = {
        opacity: isContentVisible ? 1 : 0,
        transform: isContentVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform' as const,
    };

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
