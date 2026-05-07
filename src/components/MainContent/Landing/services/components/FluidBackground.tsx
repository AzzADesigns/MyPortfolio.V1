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

    const getCompositeRotation = () => {
        const bracket = document.querySelector('.is-bracket');
        if (!bracket) return 0;
        
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
        
        return totalRotation;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const newWidth = parent.clientWidth;
                const newHeight = parent.clientHeight;
                
                // Solo reasignar si cambió de verdad para evitar lag
                if (canvas.width !== newWidth || canvas.height !== newHeight) {
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    // Solo iniciamos partículas si no hay, para no resetear el enjambre mientras cambia el padding
                    if (particles.current.length === 0) {
                        initParticles(newWidth, newHeight);
                    }
                }
            }
        };

        // ResizeObserver es crucial porque GSAP cambia el tamaño del contenedor al animar el padding,
        // y el evento 'resize' de window no se dispara, lo que causa que el canvas se estire y pierda la alineación.
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const currentRotation = getCompositeRotation();
            let deltaRotation = currentRotation - cursorState.current.prevRotation;
            
            if (deltaRotation > Math.PI) deltaRotation -= Math.PI * 2;
            if (deltaRotation < -Math.PI) deltaRotation += Math.PI * 2;
            
            cursorState.current.velocity = deltaRotation;
            cursorState.current.rotation = currentRotation;
            cursorState.current.prevRotation = currentRotation;
            
            // Calculamos la posición relativa en cada frame por si el canvas se mueve (ej. animaciones GSAP)
            const rect = canvas.getBoundingClientRect();
            const relativeMouseX = mouse.current.x - rect.left;
            const relativeMouseY = mouse.current.y - rect.top;

            particles.current.forEach(p => {
                p.update(relativeMouseX, relativeMouseY, cursorState.current.velocity);
                p.draw(ctx, cursorState.current.rotation);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

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

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <canvas 
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
};
