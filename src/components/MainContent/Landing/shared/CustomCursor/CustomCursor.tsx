'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const bracketsWrapperRef = useRef<HTMLDivElement>(null);
    const bracketsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const lastPos = useRef({ x: 0, y: 0 });
    const velocity = useRef(0);
    const rotationAnim = useRef<gsap.core.Tween | null>(null);
    const isMoving = useRef(false);
    const isConfiguring = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const bracketsWrapper = bracketsWrapperRef.current;
        const brackets = bracketsRef.current;
        const container = containerRef.current;
        if (!cursor || !follower || !bracketsWrapper || !brackets || !container) return;

        document.body.style.cursor = 'none';

        const xSetCursor = gsap.quickSetter(cursor, "x", "px");
        const ySetCursor = gsap.quickSetter(cursor, "y", "px");
        const xSetFollower = gsap.quickSetter(follower, "x", "px");
        const ySetFollower = gsap.quickSetter(follower, "y", "px");
        const xSetBrackets = gsap.quickSetter(bracketsWrapper, "x", "px");
        const ySetBrackets = gsap.quickSetter(bracketsWrapper, "y", "px");

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
        };

        const triggerLoadingEffect = () => {
            if (!isMoving.current || isConfiguring.current) return;
            isMoving.current = false;
            isConfiguring.current = true;

            // Pausar la rotación infinita base durante el efecto
            if (rotationAnim.current) rotationAnim.current.pause();

            const tl = gsap.timeline({
                onComplete: () => {
                    isConfiguring.current = false;
                    if (rotationAnim.current) rotationAnim.current.play();
                }
            });

            // 1. Agranda y da una vuelta completa a la IZQUIERDA
            tl.to(brackets, {
                scale: 1.5,
                rotation: -360,
                duration: 1.5,
                ease: "power2.inOut"
            })
            // 2. Cambia de dirección y da una vuelta completa a la DERECHA
            .to(brackets, {
                rotation: 0, // Volver a 0 es girar 360 grados a la derecha desde -360
                duration: 1.5,
                ease: "power2.inOut"
            })
            // 3. Vuelve a su tamaño normal (sincronizado con el final del giro)
            tl.to(brackets, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5");
        };

        const onMouseDown = () => {
            gsap.to([follower, brackets], { scale: 0.7, duration: 0.2 });
            gsap.to(cursor, { scale: 2.5, duration: 0.2 });
        };

        const onMouseUp = () => {
            gsap.to([follower, brackets], { scale: 1, duration: 0.4 });
            gsap.to(cursor, { scale: 1, duration: 0.4 });
        };

        const onHoverStart = () => {
            gsap.to(cursor, { scale: 2, backgroundColor: '#FFFFFF', backgroundImage: 'none', duration: 0.3 });
            gsap.to(follower, { 
                scale: 1.8, 
                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                borderColor: '#FFFFFF',
                borderRadius: '4px',
                duration: 0.4 
            });
            
            const cornerLines = brackets.querySelectorAll('.corner-line');
            gsap.to(cornerLines, { 
                borderColor: '#FFFFFF', 
                borderImageSource: 'none',
                scale: 1.4,
                duration: 0.3 
            });
        };

        const onHoverEnd = () => {
            gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)', duration: 0.3 });
            gsap.to(follower, { 
                scale: 1, 
                backgroundColor: 'transparent', 
                borderColor: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '50%',
                duration: 0.4 
            });
            
            const cornerLines = brackets.querySelectorAll('.corner-line');
            cornerLines.forEach((line, i) => {
                const isEven = i % 2 === 0;
                const grad = isEven ? 'linear-gradient(to right, #89EA2B, #07F8F2)' : 'linear-gradient(to right, #07F8F2, #89EA2B)';
                
                gsap.to(line, { 
                    borderColor: 'transparent',
                    borderImageSource: grad,
                    scale: 1,
                    duration: 0.3 
                });
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        const updateInteractiveElements = () => {
            const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, [role="button"]');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onHoverStart);
                el.removeEventListener('mouseleave', onHoverEnd);
                el.addEventListener('mouseenter', onHoverStart);
                el.addEventListener('mouseleave', onHoverEnd);
            });
        };

        const interval = setInterval(updateInteractiveElements, 1000);
        updateInteractiveElements();

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
            gsap.ticker.remove(ticker);
            clearInterval(interval);
            document.body.style.cursor = 'auto';
        };
    }, []);

    const gradientStyle = {
        backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)',
        backgroundSize: '200% 100%',
    };

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block opacity-0 mix-blend-difference">
            <div ref={bracketsWrapperRef} className="fixed top-0 left-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2">
                <div ref={bracketsRef} className="w-full h-full relative opacity-80">
                    <div className="corner-line absolute top-0 left-0 w-3 h-3 border-t-[2.5px] border-l-[2.5px] border-transparent" style={{ borderImage: 'linear-gradient(to right, #89EA2B, #07F8F2) 1' }} />
                    <div className="corner-line absolute top-0 right-0 w-3 h-3 border-t-[2.5px] border-r-[2.5px] border-transparent" style={{ borderImage: 'linear-gradient(to right, #07F8F2, #89EA2B) 1' }} />
                    <div className="corner-line absolute bottom-0 left-0 w-3 h-3 border-b-[2.5px] border-l-[2.5px] border-transparent" style={{ borderImage: 'linear-gradient(to right, #89EA2B, #07F8F2) 1' }} />
                    <div className="corner-line absolute bottom-0 right-0 w-3 h-3 border-b-[2.5px] border-r-[2.5px] border-transparent" style={{ borderImage: 'linear-gradient(to right, #07F8F2, #89EA2B) 1' }} />
                </div>
            </div>

            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
            />

            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-gradient-move"
                style={gradientStyle}
            />
        </div>
    );
}
