'use client';

import React, { useRef, useEffect } from 'react';

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

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    useEffect(() => {
        if (isMobile) return;
        const SPACING = 48; 
        const brandColors = ['#001720']; // Azul Oscuro Profundo

        const initParticles = (width: number, height: number) => {
            const newParticles: Particle[] = [];
            // Generamos un área mucho más grande que el canvas actual para que cuando el contenedor
            // se expanda (ej: al quitar los márgenes con GSAP), ya existan partículas en esos bordes.
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
                    
                    // Re-inicializamos partículas si el área creció o si no había
                    // para asegurar cobertura total tras animaciones de expansión (GSAP)
                    if (particles.current.length === 0 || newWidth > canvas.width || newHeight > canvas.height) {
                        initParticles(newWidth, newHeight);
                    }
                }
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        const fps = 30;
        const interval = 1000 / fps;
        let lastTime = 0;

        const animate = (currentTime: number) => {
            if (!canvas || !ctx) return;
            animationRef.current = requestAnimationFrame(animate);

            const deltaTime = currentTime - lastTime;
            if (deltaTime < interval) return;

            // Ajustamos lastTime restando el remanente para mantener la consistencia del timing
            lastTime = currentTime - (deltaTime % interval);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Localizamos TODOS los fragmentos del cursor (brackets) para encontrar el centro exacto
            const brackets = document.querySelectorAll('.is-bracket');
            let targetViewportX = mouse.current.x;
            let targetViewportY = mouse.current.y;
            let currentRotation = 0;

            if (brackets.length > 0) {
                // Promediamos la posición de todos los corchetes para hallar el centro geométrico del cursor
                let sumX = 0;
                let sumY = 0;
                brackets.forEach(b => {
                    const bRect = b.getBoundingClientRect();
                    sumX += bRect.left + bRect.width / 2;
                    sumY += bRect.top + bRect.height / 2;
                });
                targetViewportX = sumX / brackets.length;
                targetViewportY = sumY / brackets.length;
                
                // Usamos el primer corchete para la rotación (asumiendo que giran juntos)
                const bracket = brackets[0];
                let totalRotation = 0;
                const refLayer = bracket.parentElement;
                const wrapperLayer = refLayer?.parentElement;
                
                [refLayer, wrapperLayer].forEach(el => {
                    if (el) {
                        const style = window.getComputedStyle(el);
                        const transform = style.getPropertyValue('transform');
                        if (transform && transform !== 'none' && transform.includes('matrix')) {
                            const values = transform.split('(')[1].split(')')[0].split(',');
                            const a = parseFloat(values[0]);
                            const b = parseFloat(values[1]);
                            totalRotation += Math.atan2(b, a);
                        }
                    }
                });
                currentRotation = totalRotation;
            }

            let deltaRotation = currentRotation - cursorState.current.prevRotation;
            if (deltaRotation > Math.PI) deltaRotation -= Math.PI * 2;
            if (deltaRotation < -Math.PI) deltaRotation += Math.PI * 2;
            
            cursorState.current.velocity = deltaRotation;
            cursorState.current.rotation = currentRotation;
            cursorState.current.prevRotation = currentRotation;
            
            const rect = canvas.getBoundingClientRect();
            // Evitamos división por cero y aseguramos precisión en el escalado
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

        const handleMouseMove = (e: MouseEvent) => {
            // Guardamos las coordenadas físicas de la pantalla (viewport)
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
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
