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
    const hoverAnim = useRef<gsap.core.Timeline | null>(null);
    const isMoving = useRef(false);
    const isConfiguring = useRef(false);
    const isHovering = useRef(false);

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

            // Delegación de eventos para hover consistente
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
                scale: 1.5,
                rotation: -360,
                duration: 1.5,
                ease: "power2.inOut"
            })
            .to(brackets, {
                rotation: 0,
                duration: 1.5,
                ease: "power2.inOut"
            })
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

            const bracketEls = brackets.querySelectorAll('.is-bracket');
            const dotEls = brackets.querySelectorAll('.is-dot');
            
            if (hoverAnim.current) hoverAnim.current.kill();
            
            const tl = gsap.timeline({ repeat: -1 });
            hoverAnim.current = tl;

            tl.to(bracketEls, {
                scale: 1.4,
                borderColor: '#FFFFFF',
                borderImageSource: 'none',
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to(dotEls, {
                scale: 0.8,
                backgroundColor: '#FFFFFF',
                duration: 0.5,
                ease: "power2.inOut"
            }, 0)
            .to(bracketEls, {
                scale: 1.1,
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to(dotEls, {
                scale: 1.3,
                duration: 0.5,
                ease: "power2.inOut"
            }, 0.5);
        };

        const onHoverEnd = () => {
            isHovering.current = false;
            if (hoverAnim.current) hoverAnim.current.kill();
            
            gsap.to(cursor, { 
                scale: 1, 
                backgroundColor: 'transparent', 
                backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)', 
                boxShadow: '0 0 8px rgba(255,255,255,0.4)',
                duration: 0.4,
                overwrite: true
            });
            gsap.to(follower, { 
                scale: 1, 
                backgroundColor: 'transparent', 
                borderColor: 'rgba(255, 255, 255, 0.4)',
                duration: 0.4,
                overwrite: true
            });

            if (rotationAnim.current) {
                gsap.to(rotationAnim.current, { timeScale: 1, duration: 0.6, overwrite: true });
            }
            
            const bracketEls = brackets.querySelectorAll('.is-bracket');
            const dotEls = brackets.querySelectorAll('.is-dot');

            gsap.to(bracketEls, {
                scale: 1,
                borderColor: 'transparent',
                borderImageSource: (i: number) => i % 2 === 0 ? 'linear-gradient(to right, #89EA2B, #07F8F2)' : 'linear-gradient(to right, #07F8F2, #89EA2B)',
                duration: 0.4,
                overwrite: true
            });

            gsap.to(dotEls, {
                scale: 1,
                backgroundColor: 'white',
                duration: 0.4,
                overwrite: true
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

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
                    <div className="is-bracket absolute top-0 left-0 w-3.5 h-3.5 border-t-[2.5px] border-l-[2.5px] border-transparent" style={{ borderImage: 'linear-gradient(to right, #89EA2B, #07F8F2) 1' }} />
                    <div className="is-bracket absolute bottom-0 right-0 w-3.5 h-3.5 border-b-[2.5px] border-r-[2.5px] border-transparent" style={{ borderImage: 'linear-gradient(to right, #07F8F2, #89EA2B) 1' }} />
                    <div className="is-dot absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" />
                    <div className="is-dot absolute bottom-1 left-1 w-1.5 h-1.5 bg-white rounded-full" />
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
