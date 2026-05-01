'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Tamaño del wrapper en px (w-10 = 40px)
const BRACKET_SIZE = 40;
const HALF = BRACKET_SIZE / 2;

// Devuelve true si el punto (x, y) está sobre una superficie blanca/clara
function isPointOverWhite(x: number, y: number): boolean {
    const el = document.elementFromPoint(x, y);
    if (!el) return false;
    return !!el.closest('.services-bg');
}

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const bracketsWrapperRef = useRef<HTMLDivElement>(null);
    const bracketsRef = useRef<HTMLDivElement>(null);
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
    const isHovering = useRef(false);

    // Estado de color por elemento (para no re-aplicar innecesariamente)
    const elementWhiteState = useRef({ tl: false, br: false, tr: false, bl: false, center: false, follower: false });

    const DARK_BLUE = '#001720';
    const BRAND_GRAD = 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)';
    const BORDER_GRAD_TL = 'linear-gradient(to right, #89EA2B, #07F8F2) 1';
    const BORDER_GRAD_BR = 'linear-gradient(to right, #07F8F2, #89EA2B) 1';

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const bracketsWrapper = bracketsWrapperRef.current;
        const brackets = bracketsRef.current;
        const container = containerRef.current;
        const bracketTL = bracketTLRef.current;
        const bracketBR = bracketBRRef.current;
        const dotTR = dotTRRef.current;
        const dotBL = dotBLRef.current;

        if (!cursor || !follower || !bracketsWrapper || !brackets || !container) return;
        if (!bracketTL || !bracketBR || !dotTR || !dotBL) return;

        document.body.style.cursor = 'none';

        const xSetCursor = gsap.quickSetter(cursor, "x", "px");
        const ySetCursor = gsap.quickSetter(cursor, "y", "px");

        // Aplica el color correcto a cada elemento según si está sobre blanco o no
        // Pasar forceUpdate=true para saltarse el cache (e.g., al salir del hover)
        const applyElementColors = (cx: number, cy: number, forceUpdate = false) => {
            if (isHovering.current) return; // Hover tiene sus propios colores

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
                    overwrite: true
                });
            }

            // Bracket Bottom-Right
            if (forceUpdate || brWhite !== state.br) {
                state.br = brWhite;
                bracketBR.style.borderImage = brWhite ? 'none' : BORDER_GRAD_BR;
                gsap.to(bracketBR, {
                    borderColor: brWhite ? DARK_BLUE : 'transparent',
                    duration: 0.15,
                    overwrite: true
                });
            }

            // Dot Top-Right
            if (forceUpdate || trWhite !== state.tr) {
                state.tr = trWhite;
                gsap.to(dotTR, {
                    backgroundColor: trWhite ? DARK_BLUE : 'white',
                    duration: 0.15,
                    overwrite: true
                });
            }

            // Dot Bottom-Left
            if (forceUpdate || blWhite !== state.bl) {
                state.bl = blWhite;
                gsap.to(dotBL, {
                    backgroundColor: blWhite ? DARK_BLUE : 'white',
                    duration: 0.15,
                    overwrite: true
                });
            }

            // Punto central
            if (forceUpdate || centerWhite !== state.center) {
                state.center = centerWhite;
                if (centerWhite) {
                    gsap.set(cursor, { backgroundImage: 'none' });
                    gsap.to(cursor, { backgroundColor: DARK_BLUE, duration: 0.15, overwrite: true });
                } else {
                    gsap.set(cursor, { backgroundColor: 'transparent' });
                    gsap.to(cursor, { backgroundImage: BRAND_GRAD, duration: 0.15, overwrite: true });
                }
            }

            // Seguidor
            if (forceUpdate || followerWhite !== state.follower) {
                state.follower = followerWhite;
                gsap.to(follower, {
                    borderColor: followerWhite ? 'rgba(0,23,32,0.5)' : 'rgba(255,255,255,0.4)',
                    duration: 0.15,
                    overwrite: true
                });
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            velocity.current = Math.min(dist, 100);
            
            if (velocity.current > 5) isMoving.current = true;
            
            lastPos.current = { x: e.clientX, y: e.clientY };

            xSetCursor(e.clientX);
            ySetCursor(e.clientY);

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto'
            });

            gsap.to(bracketsWrapper, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: 'auto'
            });

            // Aplicar colores por elemento
            applyElementColors(e.clientX, e.clientY);

            // Hover en elementos interactivos
            const target = e.target as HTMLElement;
            const interactive = target.closest('a, button, .cursor-pointer, [role="button"], .service-card');
            
            if (interactive && !isHovering.current) {
                onHoverStart();
            } else if (!interactive && isHovering.current) {
                onHoverEnd();
            }
        };

        const triggerLoadingEffect = () => {
            if (!isMoving.current || isConfiguring.current || isHovering.current) return;
            isMoving.current = false;
            isConfiguring.current = true;

            if (rotationAnim.current) rotationAnim.current.pause();

            const tl = gsap.timeline({
                onComplete: () => {
                    isConfiguring.current = false;
                    if (rotationAnim.current) rotationAnim.current.play();
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

        const onHoverStart = () => {
            isHovering.current = true;
            gsap.to(cursor, { 
                scale: 3.5, 
                backgroundColor: '#FFFFFF', 
                backgroundImage: 'none', 
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
                duration: 0.4,
                overwrite: true
            });
            gsap.to(follower, { 
                scale: 1.6, 
                backgroundColor: 'rgba(255, 255, 255, 0.25)', 
                borderColor: '#FFFFFF',
                duration: 0.4,
                overwrite: true
            });
            
            if (rotationAnim.current) {
                gsap.to(rotationAnim.current, { timeScale: 6, duration: 0.5, overwrite: true });
            }

            if (hoverAnim.current) hoverAnim.current.kill();
            
            const tl = gsap.timeline({ repeat: -1 });
            hoverAnim.current = tl;

            tl.to([bracketTL, bracketBR], {
                scale: 1.4,
                borderColor: '#FFFFFF',
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to([dotTR, dotBL], {
                scale: 0.8,
                backgroundColor: '#FFFFFF',
                duration: 0.5,
                ease: "power2.inOut"
            }, 0)
            .to([bracketTL, bracketBR], {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to([dotTR, dotBL], {
                scale: 1.3,
                duration: 0.5,
                ease: "power2.inOut"
            }, 0.5);
        };

        const onHoverEnd = () => {
            isHovering.current = false;
            if (hoverAnim.current) hoverAnim.current.kill();
            
            if (rotationAnim.current) {
                gsap.to(rotationAnim.current, { timeScale: 1, duration: 0.6, overwrite: true });
            }

            gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: true });
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.3, overwrite: true });
            gsap.to([bracketTL, bracketBR], { scale: 1, duration: 0.3, overwrite: true });
            gsap.to([dotTR, dotBL], { scale: 1, duration: 0.3, overwrite: true });

            // Forzar re-evaluación completa ignorando el cache
            // para que los colores del hover (blanco) sean reemplazados inmediatamente
            gsap.delayedCall(0.05, () => {
                applyElementColors(lastPos.current.x, lastPos.current.y, true);
            });
        };

        const updateStateFromPoint = () => {
            if (lastPos.current.x === 0 && lastPos.current.y === 0) return;
            
            applyElementColors(lastPos.current.x, lastPos.current.y);
            const target = document.elementFromPoint(lastPos.current.x, lastPos.current.y) as HTMLElement | null;
            if (target) {
                const interactive = target.closest('a, button, .cursor-pointer, [role="button"], .service-card');
                if (interactive && !isHovering.current) {
                    onHoverStart();
                } else if (!interactive && isHovering.current) {
                    onHoverEnd();
                }
            }
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
            duration: 15,
            repeat: -1,
            ease: "none"
        });

        const ticker = () => {
            const prevVelocity = velocity.current;
            velocity.current *= 0.9;
            
            if (prevVelocity > 2 && velocity.current <= 2) {
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
            <div ref={bracketsWrapperRef} className="fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2">
                <div ref={bracketsRef} className="w-full h-full relative opacity-90">
                    {/* Bracket Top-Left — ref individual para muestreo */}
                    <div 
                        ref={bracketTLRef}
                        className="is-bracket absolute top-0 left-0 w-3.5 h-3.5 border-t-[2.5px] border-l-[2.5px] border-transparent" 
                        style={{ borderImage: 'linear-gradient(to right, #89EA2B, #07F8F2) 1' }} 
                    />
                    {/* Bracket Bottom-Right — ref individual */}
                    <div 
                        ref={bracketBRRef}
                        className="is-bracket absolute bottom-0 right-0 w-3.5 h-3.5 border-b-[2.5px] border-r-[2.5px] border-transparent" 
                        style={{ borderImage: 'linear-gradient(to right, #07F8F2, #89EA2B) 1' }} 
                    />
                    
                    {/* Dot Top-Right — ref individual */}
                    <div 
                        ref={dotTRRef}
                        className="is-dot absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" 
                    />
                    {/* Dot Bottom-Left — ref individual */}
                    <div 
                        ref={dotBLRef}
                        className="is-dot absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full" 
                    />
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
