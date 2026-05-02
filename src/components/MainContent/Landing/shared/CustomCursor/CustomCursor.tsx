'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Tamaño del wrapper en px (w-10 = 40px)
const BRACKET_SIZE = 40;
const HALF = BRACKET_SIZE / 2;

// Devuelve true si el punto (x, y) está sobre una superficie blanca/clara
function isPointOverWhite(x: number, y: number): boolean {
    let el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!el) return false;

    // Excepción crítica: Las cards se vuelven oscuras al hacer hover, el cursor debe mantenerse brillante
    if (el.closest('.service-card, .project-card, [data-card]')) return false;

    // Fast path: si el elemento o sus padres tienen clases obvias de fondo claro
    if (el.closest('.services-bg, .bg-white, .bg-gray-50, .bg-gray-100, .bg-slate-100')) return true;

    // Búsqueda profunda de color de fondo real
    while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;

        // Extraer valores rgba
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const a = match[4] ? parseFloat(match[4]) : 1;

            // Si el fondo no es transparente
            if (a > 0.1) {
                // Si los 3 canales son altos, es un color claro
                if (r > 200 && g > 200 && b > 200) {
                    return true;
                } else {
                    // Es un color oscuro sólido, dejamos de buscar hacia arriba
                    return false;
                }
            }
        }
        el = el.parentElement;
    }

    return false;
}

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
    const activeStates = useRef({ isCard: false, isButton: false });
    const lastMagneticButton = useRef<HTMLElement | null>(null);

    // Estado de color por elemento (para no re-aplicar innecesariamente)
    const elementWhiteState = useRef({ tl: false, br: false, tr: false, bl: false, center: false, follower: false });

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

        document.body.style.cursor = 'none';

        const xSetCursor = gsap.quickSetter(cursor, "x", "px");
        const ySetCursor = gsap.quickSetter(cursor, "y", "px");

        // Aplica el color correcto a cada elemento según si está sobre blanco o no
        const applyElementColors = (cx: number, cy: number, forceUpdate = false) => {
            if (activeStates.current.isButton || activeStates.current.isCard) return; // Si es botón o card, los colores son forzados en applyStates

            const tlWhite = isPointOverWhite(cx - HALF + 4, cy - HALF + 4);
            const brWhite = isPointOverWhite(cx + HALF - 4, cy + HALF - 4);
            const trWhite = isPointOverWhite(cx + HALF - 4, cy - HALF + 4);
            const blWhite = isPointOverWhite(cx - HALF + 4, cy + HALF - 4);
            const centerWhite = isPointOverWhite(cx, cy);
            const followerWhite = isPointOverWhite(cx, cy);

            const state = elementWhiteState.current;

            // Bracket Top-Left
            if (forceUpdate || tlWhite !== state.tl) {
                state.tl = tlWhite;
                // borderImage debe setearse directamente - GSAP no la anima
                bracketTL.style.borderImage = tlWhite ? 'none' : BORDER_GRAD_TL;
                gsap.to(bracketTL, {
                    borderColor: tlWhite ? DARK_BLUE : 'transparent',
                    duration: 0.15,
                    overwrite: 'auto'
                });
            }

            // Bracket Bottom-Right
            if (forceUpdate || brWhite !== state.br) {
                state.br = brWhite;
                bracketBR.style.borderImage = brWhite ? 'none' : BORDER_GRAD_BR;
                gsap.to(bracketBR, {
                    borderColor: brWhite ? DARK_BLUE : 'transparent',
                    duration: 0.15,
                    overwrite: 'auto'
                });
            }

            // Dot Top-Right
            if (forceUpdate || trWhite !== state.tr) {
                state.tr = trWhite;
                gsap.to(dotTR, {
                    backgroundColor: trWhite ? DARK_BLUE : 'white',
                    duration: 0.15,
                    overwrite: 'auto'
                });
            }

            // Dot Bottom-Left
            if (forceUpdate || blWhite !== state.bl) {
                state.bl = blWhite;
                gsap.to(dotBL, {
                    backgroundColor: blWhite ? DARK_BLUE : 'white',
                    duration: 0.15,
                    overwrite: 'auto'
                });
            }

            // Punto central
            if (forceUpdate || centerWhite !== state.center) {
                state.center = centerWhite;
                if (centerWhite) {
                    gsap.set(cursor, { backgroundImage: 'none' });
                    gsap.to(cursor, { backgroundColor: DARK_BLUE, boxShadow: '0 0 8px rgba(0,23,32,0.4)', duration: 0.15, overwrite: 'auto' });
                } else {
                    gsap.set(cursor, { backgroundColor: 'transparent' });
                    gsap.to(cursor, { backgroundImage: BRAND_GRAD, boxShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 0 1px rgba(0,23,32,0.6)', duration: 0.15, overwrite: 'auto' });
                }
            }

            // Seguidor
            if (forceUpdate || followerWhite !== state.follower) {
                state.follower = followerWhite;
                gsap.to(follower, {
                    borderColor: followerWhite ? 'rgba(0,23,32,0.5)' : 'rgba(255,255,255,0.4)',
                    boxShadow: followerWhite ? 'none' : '0 0 0 1px rgba(0,23,32,0.4)',
                    duration: 0.15,
                    overwrite: 'auto'
                });
            }
        };

        // Función auxiliar para encontrar botones en un radio
        const getButtonInRadius = (x: number, y: number, radius: number, target: HTMLElement | null): HTMLElement | null => {
            // 1. Intento rápido: el elemento bajo el cursor
            const btn = target?.closest('a, button, .cursor-pointer, [role="button"]') as HTMLElement | null;
            if (btn) return btn;

            // 2. Búsqueda radial
            const interactives = document.querySelectorAll('a, button, .cursor-pointer, [role="button"]');
            for (let i = 0; i < interactives.length; i++) {
                const el = interactives[i] as HTMLElement;
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;

                if (
                    x >= rect.left - radius &&
                    x <= rect.right + radius &&
                    y >= rect.top - radius &&
                    y <= rect.bottom + radius
                ) {
                    return el;
                }
            }
            return null;
        };

        const onMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            velocity.current = Math.min(dist, 100);

            if (velocity.current > 1) isMoving.current = true;

            lastPos.current = { x: e.clientX, y: e.clientY };

            // Evaluar Estados
            const target = e.target as HTMLElement;
            const isCard = !!target.closest('.service-card, .project-card, [data-card]');
            
            const attractRadius = 40;
            const button = getButtonInRadius(e.clientX, e.clientY, attractRadius, target);
            const isButton = !!button;

            if (isCard !== activeStates.current.isCard || isButton !== activeStates.current.isButton) {
                activeStates.current = { isCard, isButton };
                applyStates(isCard, isButton);
                
                // Sincronizar el efecto visual del botón físico con el imán virtual
                if (isButton && button) {
                    button.setAttribute('data-hover', 'true');
                    lastMagneticButton.current = button;
                } else if (!isButton && lastMagneticButton.current) {
                    lastMagneticButton.current.removeAttribute('data-hover');
                    lastMagneticButton.current = null;
                }
            }

            // Efecto Imán con Físicas
            let cursorX = e.clientX;
            let cursorY = e.clientY;

            if (isButton && button) {
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;
                
                // Factor constante para el cursor (fuerte chasquido táctil)
                const pullFactor = 0.5; 

                cursorX = e.clientX - (distanceX * pullFactor);
                cursorY = e.clientY - (distanceY * pullFactor);
            }

            // Mover el punto real inmediatamente
            xSetCursor(cursorX);
            ySetCursor(cursorY);

            // Animación del seguidor y corchetes (persigue al punto magnetizado)
            gsap.to(follower, {
                x: cursorX,
                y: cursorY,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto'
            });

            gsap.to(bracketsPos, {
                x: cursorX,
                y: cursorY,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: 'auto'
            });

            applyElementColors(e.clientX, e.clientY);
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
            gsap.to([follower, brackets], { scale: 0.6, duration: 0.1, overwrite: true, ease: "power2.out" });
            gsap.to(cursor, { scale: 2.5, duration: 0.1, overwrite: true, ease: "power2.out" });
        };

        const onMouseUp = () => {
            gsap.to([follower, brackets], { scale: 1, duration: 0.3, overwrite: true, ease: "back.out(3)" });
            gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: true, ease: "back.out(3)" });
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

            // Forzar colores correctos inmediatamente si salimos de interactivos
            if (!isButton && !isCard) {
                gsap.delayedCall(0.05, () => {
                    applyElementColors(lastPos.current.x, lastPos.current.y, true);
                });
            }
        };

        const updateStateFromPoint = () => {
            if (lastPos.current.x === 0 && lastPos.current.y === 0) return;

            const target = document.elementFromPoint(lastPos.current.x, lastPos.current.y) as HTMLElement | null;
            const attractRadius = 40;
            const { isCard, isButton, button } = {
                isCard: !!target?.closest('.service-card, .project-card, [data-card]'),
                button: getButtonInRadius(lastPos.current.x, lastPos.current.y, attractRadius, target),
                get isButton() { return !!this.button; }
            };

            if (isCard !== activeStates.current.isCard || isButton !== activeStates.current.isButton) {
                activeStates.current = { isCard, isButton };
                applyStates(isCard, isButton);

                // IMPORTANTE: También gestionar data-hover aquí para evitar desincronización
                if (isButton && button) {
                    button.setAttribute('data-hover', 'true');
                    lastMagneticButton.current = button;
                } else if (!isButton && lastMagneticButton.current) {
                    lastMagneticButton.current.removeAttribute('data-hover');
                    lastMagneticButton.current = null;
                }
            }
            applyElementColors(lastPos.current.x, lastPos.current.y);
        };

        const pollInterval = setInterval(updateStateFromPoint, 50);

        const onScroll = () => {
            updateStateFromPoint();
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('scroll', onScroll, true);

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
            clearInterval(pollInterval);
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
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block opacity-0">
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
