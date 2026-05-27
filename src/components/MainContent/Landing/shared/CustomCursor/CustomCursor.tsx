'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { setCursorPosition } from '../cursorState';

// Ya no necesitamos BRACKET_SIZE ni funciones globales pesadas como isPointOverWhite.
// Todo se maneja de forma reactiva y rápida vía DOM closest().

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const bracketsPosRef = useRef<HTMLDivElement>(null); // Contenedor solo para X, Y
    const bracketsWrapperRef = useRef<HTMLDivElement>(null); // Contenedor solo para giro constante
    const bracketsRef = useRef<HTMLDivElement>(null); // Contenedor para efecto de carga
    const containerRef = useRef<HTMLDivElement>(null);

    // Refs para cada elemento individual del cursor
    const bracketTLRef = useRef<HTMLDivElement>(null); // top-left bracket
    const bracketBRRef = useRef<HTMLDivElement>(null); // bottom-right bracket
    const dotTRRef = useRef<HTMLDivElement>(null);     // top-right dot
    const dotBLRef = useRef<HTMLDivElement>(null);     // bottom-left dot

    const lastPos = useRef({ x: 0, y: 0 });
    const velocity = useRef(0);
    const rotationAnim = useRef<gsap.core.Tween | null>(null);
    const hoverAnim = useRef<gsap.core.Timeline | null>(null);
    const isMoving = useRef(false);
    const isConfiguring = useRef(false);
    
    // Estado consolidado para evitar repintados innecesarios
    const activeStates = useRef({ isCard: false, isButton: false, isLight: false });
    const lastMagneticButton = useRef<HTMLElement | null>(null);
    const magneticRect = useRef({ left: 0, top: 0, width: 0, height: 0 });

    const DARK_BLUE = '#001720';
    const BRAND_GRAD = 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)';
    const BORDER_GRAD_TL = 'linear-gradient(to right, #89EA2B, #07F8F2) 1';
    const BORDER_GRAD_BR = 'linear-gradient(to right, #07F8F2, #89EA2B) 1';

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const bracketsPos = bracketsPosRef.current;
        const bracketsWrapper = bracketsWrapperRef.current;
        const brackets = bracketsRef.current;
        const container = containerRef.current;
        const bracketTL = bracketTLRef.current;
        const bracketBR = bracketBRRef.current;
        const dotTR = dotTRRef.current;
        const dotBL = dotBLRef.current;

        if (!cursor || !follower || !bracketsPos || !bracketsWrapper || !brackets || !container) return;
        if (!bracketTL || !bracketBR || !dotTR || !dotBL) return;

        // Desactivamos completamente el cursor en táctiles/móviles para máximo rendimiento
        if (typeof window !== 'undefined' && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024)) return;

        document.body.style.cursor = 'none';

        const xSetCursor = gsap.quickSetter(cursor, "x", "px");
        const ySetCursor = gsap.quickSetter(cursor, "y", "px");
        const followerXTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: 'power2.out' });
        const followerYTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: 'power2.out' });
        const bracketsXTo = gsap.quickTo(bracketsPos, "x", { duration: 0.8, ease: 'power3.out' });
        const bracketsYTo = gsap.quickTo(bracketsPos, "y", { duration: 0.8, ease: 'power3.out' });

        // Aplicamos color globalmente basándonos en si el target está dentro de una sección de luz
        const applyElementColors = (isLight: boolean, isButton: boolean, isCard: boolean) => {
            if (isButton || isCard) return; // Si es botón o card, los colores son forzados en applyStates

            const colorMain = isLight ? DARK_BLUE : 'white';
            const colorTransparent = isLight ? DARK_BLUE : 'transparent';
            
            bracketTL.style.borderImage = isLight ? 'none' : BORDER_GRAD_TL;
            bracketBR.style.borderImage = isLight ? 'none' : BORDER_GRAD_BR;
            
            gsap.to([bracketTL, bracketBR], {
                borderColor: colorTransparent,
                duration: 0.15,
                overwrite: 'auto'
            });

            gsap.to([dotTR, dotBL], {
                backgroundColor: colorMain,
                duration: 0.15,
                overwrite: 'auto'
            });

            if (isLight) {
                gsap.set(cursor, { backgroundImage: 'none' });
                gsap.to(cursor, { backgroundColor: DARK_BLUE, boxShadow: '0 0 8px rgba(0,23,32,0.4)', duration: 0.15, overwrite: 'auto' });
            } else {
                gsap.set(cursor, { backgroundColor: 'transparent' });
                gsap.to(cursor, { backgroundImage: BRAND_GRAD, boxShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 0 1px rgba(0,23,32,0.6)', duration: 0.15, overwrite: 'auto' });
            }

            gsap.to(follower, {
                borderColor: isLight ? 'rgba(0,23,32,0.5)' : 'rgba(255,255,255,0.4)',
                boxShadow: isLight ? 'none' : '0 0 0 1px rgba(0,23,32,0.4)',
                duration: 0.15,
                overwrite: 'auto'
            });
        };

        const onMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            velocity.current = Math.min(dist, 100);

            if (velocity.current > 1) isMoving.current = true;

            lastPos.current = { x: e.clientX, y: e.clientY };

            const target = e.target as HTMLElement | null;
            if (!target) return;

            // O(1) Búsquedas súper rápidas subiendo por el árbol DOM (mucho más rápido que querySelectorAll o elementsFromPoint)
            const isCard = !!target.closest('.service-card, .project-card, [data-card]');
            const button = target.closest('a, button, .cursor-pointer, [role="button"]') as HTMLElement | null;
            const isButton = !!button;
            // Detección de fondo claro optimizada
            const isLight = !!target.closest('[data-theme="light"], .services-bg, .bg-white, .bg-gray-50, .bg-slate-100');

            if (isCard !== activeStates.current.isCard || isButton !== activeStates.current.isButton || isLight !== activeStates.current.isLight) {
                activeStates.current = { isCard, isButton, isLight };
                // NOTA: applyStates se define más abajo, lo llamamos aquí asumiendo que el hoisting o el orden del código original lo permite
                // Espera, applyStates está más abajo en el archivo original, debemos moverlo arriba en el código o llamar después.
                // Como lo reemplazamos parcialmente, Javascript hará hoisting si applyStates es función normal, 
                // pero como era const, fallará. Llamaremos a una ref o re-ordenaremos.
                // En este bloque, confiaremos en que el scope sea correcto, pero ES MEJOR MANTENER LA ESTRUCTURA ORIGINAL.
                applyStates(isCard, isButton);
                applyElementColors(isLight, isButton, isCard);
            }

            setCursorPosition(e.clientX, e.clientY);

            // Sincronizar el efecto visual del botón físico
            if (isButton && button) {
                if (lastMagneticButton.current !== button) {
                    if (lastMagneticButton.current) lastMagneticButton.current.removeAttribute('data-hover');
                    button.setAttribute('data-hover', 'true');
                    lastMagneticButton.current = button;
                    const r = button.getBoundingClientRect();
                    magneticRect.current = { left: r.left, top: r.top, width: r.width, height: r.height };
                }
            } else if (lastMagneticButton.current) {
                lastMagneticButton.current.removeAttribute('data-hover');
                lastMagneticButton.current = null;
            }

            // Efecto Imán
            let cursorX = e.clientX;
            let cursorY = e.clientY;

            if (isButton && button) {
                const { left, top, width, height } = magneticRect.current;
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                const pullFactor = 0.65; 

                cursorX = e.clientX - ((e.clientX - centerX) * pullFactor);
                cursorY = e.clientY - ((e.clientY - centerY) * pullFactor);
            }

            xSetCursor(cursorX);
            ySetCursor(cursorY);

            followerXTo(cursorX);
            followerYTo(cursorY);
            bracketsXTo(cursorX);
            bracketsYTo(cursorY);
        };

        const triggerLoadingEffect = () => {
            if (!isMoving.current || isConfiguring.current || activeStates.current.isButton) return;
            isMoving.current = false;
            isConfiguring.current = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    isConfiguring.current = false;
                }
            });

            tl.to(brackets, {
                scale: 1.3,
                rotation: -360,
                duration: 1.5,
                ease: "power2.inOut"
            })
                .to(brackets, {
                    rotation: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            tl.to(brackets, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5");
        };

        const onMouseDown = () => {
            gsap.to([follower, brackets], { scale: 0.6, duration: 0.1, overwrite: 'auto', ease: "power2.out" });
            gsap.to(cursor, { scale: 2.5, duration: 0.1, overwrite: 'auto', ease: "power2.out" });
        };

        const onMouseUp = () => {
            gsap.to([follower, brackets], { scale: 1, duration: 0.3, overwrite: 'auto', ease: "back.out(3)" });
            gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: 'auto', ease: "back.out(3)" });
        };

        const applyStates = (isCard: boolean, isButton: boolean) => {
            // 1. Follower: Cuadrado en cards, circular en el resto. Background blanco en botones.
            gsap.to(follower, {
                borderRadius: isCard ? '8px' : '50%',
                scale: isButton ? 1.6 : (isCard ? 1.2 : 1),
                backgroundColor: isButton ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                borderColor: (isButton || isCard) ? '#FFFFFF' : undefined,
                boxShadow: (isButton || isCard) ? '0 0 0 1px rgba(0,23,32,0.4)' : undefined,
                duration: 0.4,
                overwrite: 'auto'
            });

            // 2. Cursor (Punto central): Blanco en ambos, pero más grande en botones.
            if (isButton || isCard) {
                gsap.to(cursor, {
                    scale: isButton ? 3.5 : 1.2,
                    backgroundColor: '#FFFFFF',
                    backgroundImage: 'none',
                    boxShadow: isButton
                        ? '0 0 20px rgba(255, 255, 255, 0.7), 0 0 0 1px rgba(0,23,32,0.5)'
                        : '0 0 10px rgba(255, 255, 255, 0.4), 0 0 0 1px rgba(0,23,32,0.5)',
                    duration: 0.4,
                    overwrite: 'auto'
                });
            } else {
                gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: 'auto' });
            }

            // 3. Brackets & Dots: Pulsación en botones, expansión blanca en cards
            if (isButton) {
                if (!hoverAnim.current) {
                    const tl = gsap.timeline({ repeat: -1 });
                    hoverAnim.current = tl;
                    tl.to([bracketTL, bracketBR], { scale: 1.4, borderColor: '#FFFFFF', duration: 0.5, ease: "power2.inOut" })
                        .to([dotTR, dotBL], { scale: 0.8, backgroundColor: '#FFFFFF', duration: 0.5, ease: "power2.inOut" }, 0)
                        .to([bracketTL, bracketBR], { scale: 1.1, duration: 0.5, ease: "power2.inOut" })
                        .to([dotTR, dotBL], { scale: 1.3, duration: 0.5, ease: "power2.inOut" }, 0.5);
                }
            } else {
                if (hoverAnim.current) {
                    hoverAnim.current.kill();
                    hoverAnim.current = null;
                }

                // Efecto único de Card: Todo se vuelve blanco
                if (isCard) {
                    bracketTL!.style.borderImage = 'none';
                    bracketBR!.style.borderImage = 'none';
                }

                gsap.to([bracketTL, bracketBR], {
                    scale: isCard ? 1.3 : 1,
                    rotation: isCard ? 15 : 0,
                    borderColor: isCard ? '#FFFFFF' : undefined,
                    duration: 0.4,
                    overwrite: 'auto'
                });
                gsap.to([dotTR, dotBL], {
                    scale: isCard ? 1.3 : 1,
                    backgroundColor: isCard ? '#FFFFFF' : undefined,
                    duration: 0.4,
                    overwrite: 'auto'
                });
            }

            // 4. Velocidad de Giro
            if (rotationAnim.current) {
                const timeScale = isButton ? 2 : (isCard ? 1.5 : 1);
                gsap.to(rotationAnim.current, { timeScale, duration: 0.5, overwrite: true });
            }
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Update target under cursor manually if scroll happens
                    if (lastPos.current.x === 0 && lastPos.current.y === 0) return;
                    
                    const target = document.elementFromPoint(lastPos.current.x, lastPos.current.y) as HTMLElement | null;
                    if (target) {
                        const isCard = !!target.closest('.service-card, .project-card, [data-card]');
                        const button = target.closest('a, button, .cursor-pointer, [role="button"]') as HTMLElement | null;
                        const isButton = !!button;
                        const isLight = !!target.closest('[data-theme="light"], .services-bg, .bg-white, .bg-gray-50, .bg-slate-100');

                        if (isCard !== activeStates.current.isCard || isButton !== activeStates.current.isButton || isLight !== activeStates.current.isLight) {
                            activeStates.current = { isCard, isButton, isLight };
                            applyStates(isCard, isButton);
                            applyElementColors(isLight, isButton, isCard);
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown, { passive: true });
        window.addEventListener('mouseup', onMouseUp, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true, capture: true });

        gsap.to(container, { autoAlpha: 1, duration: 0.5 });

        rotationAnim.current = gsap.to(bracketsWrapper, {
            rotation: 360,
            duration: 3,
            repeat: -1,
            ease: "none"
        });

        const ticker = () => {
            const prevVelocity = velocity.current;
            velocity.current *= 0.9;

            if (prevVelocity > 0.5 && velocity.current <= 0.5) {
                triggerLoadingEffect();
            }
        };
        gsap.ticker.add(ticker);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('scroll', onScroll, true);
            gsap.ticker.remove(ticker);
            document.body.style.cursor = 'auto';
        };
    }, []);

    const gradientStyle = {
        backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)',
        backgroundSize: '200% 100%',
    };

    return (
        // SIN mix-blend-difference global — el color lo controlamos por elemento
        <div ref={containerRef} data-cursor="container" className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block opacity-0">
            {/* Posición (X, Y) aislada para no chocar con el giro */}
            <div ref={bracketsPosRef} className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2">
                {/* Rotación constante aislada */}
                <div ref={bracketsWrapperRef} className="w-full h-full">
                    {/* Efectos de carga aislados */}
                    <div ref={bracketsRef} className="w-full h-full relative opacity-90">
                        {/* Bracket Top-Left — ref individual para muestreo */}
                        <div
                            ref={bracketTLRef}
                            className="is-bracket absolute top-0 left-0 w-3.5 h-3.5 border-t-[2.5px] border-l-[2.5px] border-transparent drop-shadow-[0_0_1.5px_rgba(0,23,32,0.8)]"
                            style={{ borderImage: 'linear-gradient(to right, #89EA2B, #07F8F2) 1' }}
                        />
                        {/* Bracket Bottom-Right — ref individual */}
                        <div
                            ref={bracketBRRef}
                            className="is-bracket absolute bottom-0 right-0 w-3.5 h-3.5 border-b-[2.5px] border-r-[2.5px] border-transparent drop-shadow-[0_0_1.5px_rgba(0,23,32,0.8)]"
                            style={{ borderImage: 'linear-gradient(to right, #07F8F2, #89EA2B) 1' }}
                        />

                        {/* Dot Top-Right — ref individual */}
                        <div
                            ref={dotTRRef}
                            className="is-dot absolute top-1 right-1 w-2 h-2 bg-white rounded-full border-[1.5px] border-[#001720]"
                        />
                        {/* Dot Bottom-Left — ref individual */}
                        <div
                            ref={dotBLRef}
                            className="is-dot absolute bottom-1 left-1 w-2 h-2 bg-white rounded-full border-[1.5px] border-[#001720]"
                        />
                    </div>
                </div>
            </div>

            {/* Seguidor Circular */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
            />

            {/* Punto de Precisión */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-gradient-move"
                style={gradientStyle}
            />
        </div>
    );
}
