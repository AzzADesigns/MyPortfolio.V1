import { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import gsap from 'gsap';
import { TIMING, TOOLTIP_LABELS } from '../constants/signatureData';

interface UseHoverWordProps {
    id: string;
    completionText: string;
    hoveredWord: string | null;
    setHoveredWord: Dispatch<SetStateAction<string | null>>;
    onScan: (id: string) => void;
    isLastScan: boolean;
    onAllScannedClose?: () => void;
}

/**
 * Hook que encapsula toda la lógica interactiva del HoverWord:
 * - Typewriter effect para el tooltip
 * - Posicionamiento responsive del tooltip (mobile/desktop/ultrawide)
 * - Animación del láser de escaneo
 * - Handlers de mouse (enter, move, leave, click)
 * - SVG laser connector updates
 */
export const useHoverWord = ({
    id,
    completionText,
    hoveredWord,
    setHoveredWord,
    onScan,
    isLastScan,
    onAllScannedClose,
}: UseHoverWordProps) => {
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const scanRef = useRef<HTMLSpanElement>(null);
    const wordContentRef = useRef<HTMLSpanElement>(null);
    const [mounted, setMounted] = useState(false);
    const [isScanned, setIsScanned] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const isHovered = hoveredWord === id;
    const isOtherHovered = hoveredWord !== null && hoveredWord !== id;

    // Efecto de Typewriter para el texto del HUD
    useEffect(() => {
        if (isScanned) {
            let i = 0;
            setDisplayedText("");
            const interval = setInterval(() => {
                setDisplayedText(completionText.slice(0, i + 1));
                i++;
                if (i >= completionText.length) clearInterval(interval);
            }, TIMING.typewriterInterval);
            return () => clearInterval(interval);
        } else {
            setDisplayedText("");
        }
    }, [isScanned, completionText]);

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- Helpers de posicionamiento ---
    const calculateDesktopPosition = (clientX: number, clientY: number, realWidth: number, realHeight: number, ww: number) => {
        if (ww >= 1536) {
            return {
                targetX: clientX + 40, targetY: clientY + 40,
                lx1: -40, ly1: -40, lx2: 0, ly2: 0,
            };
        }
        const targetX = ww / 2 - realWidth / 2;
        const targetY = clientY - realHeight - 80;
        return {
            targetX, targetY,
            lx1: clientX - targetX, ly1: clientY - targetY,
            lx2: clientX - targetX, ly2: realHeight,
        };
    };

    const updateLaserSvg = (tooltipEl: HTMLElement, pos: { lx1: number; ly1: number; lx2: number; ly2: number }, ww: number) => {
        const svgLine = tooltipEl.querySelector('svg');
        if (!svgLine) return;
        if (ww >= 1536) {
            gsap.set(svgLine, { opacity: 1 });
            const line = svgLine.querySelector('line');
            const circles = svgLine.querySelectorAll('circle');
            if (line && circles.length >= 2) {
                gsap.set(line, { attr: { x1: pos.lx1, y1: pos.ly1, x2: pos.lx2, y2: pos.ly2 } });
                gsap.set(circles[0], { attr: { cx: pos.lx1, cy: pos.ly1 } });
                gsap.set(circles[1], { attr: { cx: pos.lx2, cy: pos.ly2 } });
            }
        } else {
            gsap.set(svgLine, { opacity: 0 });
        }
    };

    // --- Event Handlers ---
    const handleMouseEnter = (e?: React.MouseEvent) => {
        setHoveredWord(id);
        setIsScanned(false);
        setTooltipVisible(false);

        const ww = window.innerWidth;
        const wh = window.innerHeight;
        const isMobile = ww < 1024;

        // Efecto Láser + resplandor solo en desktop
        if (!isMobile && scanRef.current && wordContentRef.current) {
            gsap.killTweensOf([scanRef.current, wordContentRef.current]);
            gsap.fromTo(scanRef.current,
                { left: '0%', opacity: 0 },
                { left: '100%', opacity: 1, duration: 0.45, ease: "power2.inOut",
                    onComplete: () => { setIsScanned(true); onScan(id); }
                }
            );
            gsap.to(scanRef.current, { opacity: 0, duration: 0.2, delay: 0.45 });
            gsap.fromTo(wordContentRef.current,
                { color: '#07F8F2', filter: 'brightness(1.5) blur(1px)' },
                { color: '', filter: 'brightness(1) blur(0px)', duration: 0.4, delay: 0.15, clearProps: "color,filter" }
            );
        } else if (isMobile) {
            setIsScanned(true);
            onScan(id);
        }

        // Posicionamiento y reveal del tooltip
        if (tooltipRef.current) {
            gsap.killTweensOf(tooltipRef.current);
            const rect = tooltipRef.current.getBoundingClientRect();
            const realWidth = rect.width || (ww < 768 ? 280 : 380);
            const realHeight = rect.height || 140;
            const clientX = e ? e.clientX : ww / 2;
            const clientY = e ? e.clientY : wh / 2;

            if (isMobile) {
                setTooltipPos({
                    x: (ww - realWidth) / 2,
                    y: Math.max(20, clientY - realHeight - 40),
                });
                setTimeout(() => setTooltipVisible(true), TIMING.tooltipRevealDelay);
            } else {
                const pos = calculateDesktopPosition(clientX, clientY, realWidth, realHeight, ww);
                gsap.set(tooltipRef.current, {
                    x: pos.targetX, y: pos.targetY, scaleX: 0,
                    transformOrigin: "left center", opacity: 0
                });
                updateLaserSvg(tooltipRef.current, pos, ww);
                gsap.to(tooltipRef.current, {
                    scaleX: 1, opacity: 1, duration: 0.5, delay: 0.45, ease: "power3.out"
                });
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (tooltipRef.current && hoveredWord === id) {
            const ww = window.innerWidth;
            if (ww < 1024) return;

            const rect = tooltipRef.current.getBoundingClientRect();
            const pos = calculateDesktopPosition(e.clientX, e.clientY, rect.width, rect.height, ww);

            gsap.to(tooltipRef.current, {
                x: pos.targetX, y: pos.targetY, duration: 0.15, ease: "power2.out"
            });
            updateLaserSvg(tooltipRef.current, pos, ww);
        }
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);

        if (scanRef.current && wordContentRef.current) {
            gsap.killTweensOf([scanRef.current, wordContentRef.current]);
            gsap.to(scanRef.current, { opacity: 0, duration: 0.1 });
            gsap.set(wordContentRef.current, { clearProps: "all" });
        }

        if (tooltipRef.current) {
            gsap.killTweensOf(tooltipRef.current);
            const ww = window.innerWidth;
            if (ww >= 1024) {
                gsap.to(tooltipRef.current, {
                    scale: 0.9, opacity: 0, duration: 0.2, ease: "power2.in",
                    onComplete: () => { setHoveredWord(prev => prev === id ? null : prev); }
                });
            } else {
                setTimeout(() => {
                    setHoveredWord(prev => prev === id ? null : prev);
                }, TIMING.mobileLeaveTransition);
            }
        } else {
            setHoveredWord(prev => prev === id ? null : prev);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (window.innerWidth < 1024) {
            e.stopPropagation();
            if (isHovered) return;
            handleMouseEnter(e);

            if (isLastScan) {
                setTimeout(() => {
                    setTooltipVisible(false);
                    if (scanRef.current) gsap.to(scanRef.current, { opacity: 0, duration: 0.1 });
                    setTimeout(() => {
                        setHoveredWord(prev => prev === id ? null : prev);
                        onAllScannedClose?.();
                    }, TIMING.mobileLeaveTransition);
                }, TIMING.lastScanAutoCloseDelay);
            } else {
                setTimeout(() => {
                    setTooltipVisible(false);
                    if (scanRef.current) {
                        gsap.killTweensOf(scanRef.current);
                        gsap.to(scanRef.current, { opacity: 0, duration: 0.1 });
                    }
                    setTimeout(() => { setHoveredWord(prev => prev === id ? null : prev); }, TIMING.mobileLeaveTransition);
                }, TIMING.mobileAutoCloseDelay);
            }
        }
    };

    return {
        // Refs
        tooltipRef,
        scanRef,
        wordContentRef,
        // State
        mounted,
        isHovered,
        isOtherHovered,
        isScanned,
        displayedText,
        tooltipVisible,
        tooltipPos,
        // Labels
        tooltipLabels: TOOLTIP_LABELS,
        // Handlers
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
        handleClick,
    };
};
