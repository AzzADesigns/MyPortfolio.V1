'use client';

import React, { useRef, useEffect } from 'react';

// Tipo auxiliar para los datos cacheados del cursor
interface BracketCache {
    centerX: number;
    centerY: number;
    rotation: number;
}

class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    vx: number;
    vy: number;
    friction: number;
    ease: number;
    active: boolean = false;
    distanceToMouse: number = 2000;

    constructor(x: number, y: number, color: string) {
        this.x = x; 
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.88; 
        this.ease = 0.07;
    }

    draw(ctx: CanvasRenderingContext2D, globalRotation: number) {
        // Rango de visibilidad (Spotlight)
        const visibilityRadius = 250;
        if (this.distanceToMouse > visibilityRadius) return;

        // Calculamos la opacidad basada en la distancia (1 en el centro, 0 en el borde del radio)
        const visibility = 1 - (this.distanceToMouse / visibilityRadius);
        const opacity = (this.active ? 0.95 : 0.6) * visibility;

        ctx.save();
        
        ctx.translate(this.x, this.y);
        ctx.rotate(globalRotation);

        if (this.active) {
            ctx.shadowBlur = 12 * visibility;
            ctx.shadowColor = this.color;
        }

        ctx.globalAlpha = opacity;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1.2;
        
        // --- DIBUJO DEL MINI-DRON ---
        ctx.beginPath();
        ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
        ctx.fill();

        const size = 3.5; 
        const offset = 5.5; 
        
        ctx.beginPath();
        // Superior Izquierdo
        ctx.moveTo(-offset, -offset + size);
        ctx.lineTo(-offset, -offset);
        ctx.lineTo(-offset + size, -offset);
        // Inferior Derecho
        ctx.moveTo(offset, offset - size);
        ctx.lineTo(offset, offset);
        ctx.lineTo(offset - size, offset);
        ctx.stroke();
        
        ctx.restore();
    }

    update(mouseX: number, mouseY: number, angularVelocity: number) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distanceSq = dx * dx + dy * dy;
        this.distanceToMouse = Math.sqrt(distanceSq) || 1;

        const radius = 130; 
        const radiusSq = radius * radius;

        let targetX = this.originX;
        let targetY = this.originY;
        this.active = false;

        if (distanceSq < radiusSq) {
            const zoomAmount = 1.5; 
            targetX = this.originX - (dx / this.distanceToMouse) * (radius - this.distanceToMouse) * zoomAmount;
            targetY = this.originY - (dy / this.distanceToMouse) * (radius - this.distanceToMouse) * zoomAmount;

            const swirlStrength = 4.0; 
            this.vx -= (dy / this.distanceToMouse) * angularVelocity * swirlStrength;
            this.vy += (dx / this.distanceToMouse) * angularVelocity * swirlStrength;

            this.active = true;
        }

        this.vx += (targetX - this.x) * this.ease;
        this.vy += (targetY - this.y) * this.ease;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }
}

export const FluidBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: -2000, y: -2000 });
    const cursorState = useRef({ rotation: 0, prevRotation: 0, velocity: 0 });
    const animationRef = useRef<number>(0);
    // Cache de los datos del cursor actualizado en mousemove (fuera del rAF loop)
    const bracketCache = useRef<BracketCache>({ centerX: -2000, centerY: -2000, rotation: 0 });
    const isIdleRef = useRef(false);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    useEffect(() => {
        if (isMobile) return;
        const SPACING = 48;
        const brandColors = ['#001720'];

        const initParticles = (width: number, height: number) => {
            const newParticles: Particle[] = [];
            const margin = 300;
            for (let y = -margin; y < height + margin; y += SPACING) {
                for (let x = -margin; x < width + margin; x += SPACING) {
                    const color = brandColors[Math.floor(Math.random() * brandColors.length)];
                    newParticles.push(new Particle(x, y, color));
                }
            }
            particles.current = newParticles;
        };

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const newWidth = parent.clientWidth;
                const newHeight = parent.clientHeight;
                if (canvas.width !== newWidth || canvas.height !== newHeight) {
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    if (particles.current.length === 0 || newWidth > canvas.width || newHeight > canvas.height) {
                        initParticles(newWidth, newHeight);
                    }
                }
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

        const fps = 30;
        const interval = 1000 / fps;
        let lastTime = 0;

        const animate = (currentTime: number) => {
            if (!canvas || !ctx) return;
            animationRef.current = requestAnimationFrame(animate);

            // Cuando está idle, solo limpiamos y salimos (muy barato)
            if (isIdleRef.current) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }

            const deltaTime = currentTime - lastTime;
            if (deltaTime < interval) return;
            lastTime = currentTime - (deltaTime % interval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Usamos el cache calculado en el mousemove (sin DOM queries en el loop)
            const { centerX, centerY, rotation: cachedRotation } = bracketCache.current;
            const targetViewportX = centerX > -1000 ? centerX : mouse.current.x;
            const targetViewportY = centerY > -1000 ? centerY : mouse.current.y;
            const currentRotation = cachedRotation;

            let deltaRotation = currentRotation - cursorState.current.prevRotation;
            if (deltaRotation > Math.PI) deltaRotation -= Math.PI * 2;
            if (deltaRotation < -Math.PI) deltaRotation += Math.PI * 2;

            cursorState.current.velocity = deltaRotation;
            cursorState.current.rotation = currentRotation;
            cursorState.current.prevRotation = currentRotation;

            const rect = canvas.getBoundingClientRect();
            const scaleX = rect.width > 0 ? canvas.width / rect.width : 1;
            const scaleY = rect.height > 0 ? canvas.height / rect.height : 1;

            const relativeMouseX = (targetViewportX - rect.left) * scaleX;
            const relativeMouseY = (targetViewportY - rect.top) * scaleY;

            particles.current.forEach(p => {
                p.update(relativeMouseX, relativeMouseY, cursorState.current.velocity);
                p.draw(ctx, cursorState.current.rotation);
            });
        };

        animationRef.current = requestAnimationFrame(animate);

        // Actualizar el cache de brackets en mousemove (una sola vez por evento, no por frame)
        const updateBracketCache = () => {
            const brackets = document.querySelectorAll('.is-bracket');
            if (brackets.length === 0) return;

            let sumX = 0;
            let sumY = 0;
            brackets.forEach(b => {
                const bRect = b.getBoundingClientRect();
                sumX += bRect.left + bRect.width / 2;
                sumY += bRect.top + bRect.height / 2;
            });

            // Leer la rotación de la transform matrix (solo en mousemove, no en rAF)
            const bracket = brackets[0];
            let totalRotation = 0;
            const refLayer = bracket.parentElement;
            const wrapperLayer = refLayer?.parentElement;
            [refLayer, wrapperLayer].forEach(el => {
                if (!el) return;
                const matrix = new DOMMatrix(el.style.transform || '');
                if (matrix.a !== 0 || matrix.b !== 0) {
                    totalRotation += Math.atan2(matrix.b, matrix.a);
                }
            });

            bracketCache.current = {
                centerX: sumX / brackets.length,
                centerY: sumY / brackets.length,
                rotation: totalRotation,
            };
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Salir del estado idle
            if (isIdleRef.current) isIdleRef.current = false;

            // Resetear el timer de idle (2s sin movimiento = pausa)
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                isIdleRef.current = true;
            }, 2000);

            updateBracketCache();
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    if (isMobile) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <canvas 
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
};
