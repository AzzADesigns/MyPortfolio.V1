'use client';
import React, { useRef, useEffect, useState } from 'react';

interface PixelDistortionProps {
    src: string;
    alt: string;
    containerClass?: string;
}

interface CursorPoint { x: number; y: number; }

export default function PixelDistortion({ src, alt, containerClass }: PixelDistortionProps) {
    const canvasRef    = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouse        = useRef({ x: 0, y: 0, active: false });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const image = new Image();
        image.src = src;

        let bracketPoints: CursorPoint[] = [];
        let dotPoints: CursorPoint[]     = [];

        class Particle {
            originX: number;
            originY: number;
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;

            constructor(x: number, y: number, color: string) {
                this.originX = x;
                this.originY = y;
                this.x = x;
                this.y = y;
                this.vx = 0;
                this.vy = 0;
                // Variación aleatoria de radio (diámetros entre 2 y 6) para dar ese efecto artístico de puntillismo
                this.radius = 1 + Math.random() * 2; 
                this.color = color;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = this.color;
                // OPTIMIZACIÓN EXTREMA: fillRect es 100x más rápido que dibujar círculos (arc) en Canvas.
                // A este tamaño minúsculo, un cuadrado se percibe igual que un punto.
                ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            }

            update() {
                if (mouse.current.active) {
                    const dx = this.x - mouse.current.x;
                    const dy = this.y - mouse.current.y;
                    const distMouse = Math.sqrt(dx * dx + dy * dy);

                    // Agujero central
                    if (distMouse < 20) {
                        const angle = Math.atan2(dy, dx);
                        const force = (20 - distMouse) / 20;
                        this.vx += Math.cos(angle) * force * 8;
                        this.vy += Math.sin(angle) * force * 8;
                    }

                    // Corchetes (Fuerza principal de barrido)
                    const BRACKET_ZONE = 35;
                    const BRACKET_FORCE = 15;
                    for (const bp of bracketPoints) {
                        const dbx = this.x - bp.x;
                        const dby = this.y - bp.y;
                        const dist = Math.sqrt(dbx * dbx + dby * dby);
                        if (dist < BRACKET_ZONE) {
                            const angle = Math.atan2(dby, dbx);
                            const force = (BRACKET_ZONE - dist) / BRACKET_ZONE;
                            this.vx += Math.cos(angle) * force * BRACKET_FORCE;
                            this.vy += Math.sin(angle) * force * BRACKET_FORCE;
                        }
                    }

                    // Dots
                    const DOT_ZONE = 20;
                    for (const dp of dotPoints) {
                        const ddx = this.x - dp.x;
                        const ddy = this.y - dp.y;
                        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                        if (dist < DOT_ZONE) {
                            const angle = Math.atan2(ddy, ddx);
                            const force = (DOT_ZONE - dist) / DOT_ZONE;
                            this.vx += Math.cos(angle) * force * 10;
                            this.vy += Math.sin(angle) * force * 10;
                        }
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                // Fricción baja para que los puntos viajen más lejos creando estelas y nubes
                this.vx *= 0.88;
                this.vy *= 0.88;

                // Atracción suave al origen
                this.x += (this.originX - this.x) * 0.04;
                this.y += (this.originY - this.y) * 0.04;

                // Optimización de descanso (Snapping)
                if (Math.abs(this.x - this.originX) < 0.1 && Math.abs(this.y - this.originY) < 0.1 && Math.abs(this.vx) < 0.1 && Math.abs(this.vy) < 0.1) {
                    this.x = this.originX;
                    this.y = this.originY;
                    this.vx = 0;
                    this.vy = 0;
                }
            }
        }

        const init = () => {
            const w = canvas.width;
            const h = canvas.height;
            if (w === 0 || h === 0) return;

            const tempCanvas = document.createElement('canvas');
            const tempCtx    = tempCanvas.getContext('2d');
            tempCanvas.width  = w;
            tempCanvas.height = h;

            const imgAspect = image.width / image.height;
            const canvasAspect = w / h;
            let drawW = w;
            let drawH = h;
            let offsetX = 0;
            let offsetY = 0;

            if (imgAspect > canvasAspect) {
                drawH = h;
                drawW = image.width * (h / image.height);
                offsetX = (w - drawW) / 2;
            } else {
                drawW = w;
                drawH = image.height * (w / image.width);
                offsetY = (h - drawH) / 2;
            }
            
            tempCtx?.drawImage(image, offsetX, offsetY, drawW, drawH);

            const imageData = tempCtx?.getImageData(0, 0, w, h).data;
            if (!imageData) return;

            particles = [];
            // Step de 3.5 para reducir drásticamente la cantidad de partículas sin perder densidad visual
            const step = 3.5; 
            for (let y = 0; y < h; y += step) {
                for (let x = 0; x < w; x += step) {
                    const px = Math.floor(x);
                    const py = Math.floor(y);
                    const index = (py * w + px) * 4;
                    const a = imageData[index + 3];
                    
                    if (a > 128) {
                        // Aumentamos ligeramente el brillo para que los puntos destaquen
                        const r = Math.min(255, imageData[index] * 1.15);
                        const g = Math.min(255, imageData[index+1] * 1.15);
                        const b = Math.min(255, imageData[index+2] * 1.15);
                        const color = `rgb(${r},${g},${b})`;
                        particles.push(new Particle(x, y, color));
                    }
                }
            }

            // Dibujo inicial estático para cuando no hay interacción
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw(ctx);
            }
        };

        const updateCursorPoints = () => {
            if (!mouse.current.active) return;
            const canvasRect = canvas.getBoundingClientRect();
            const toCanvasCoord = (el: Element): CursorPoint => {
                const r = el.getBoundingClientRect();
                return {
                    x: (r.left + r.width  / 2) - canvasRect.left,
                    y: (r.top  + r.height / 2) - canvasRect.top,
                };
            };
            bracketPoints = Array.from(document.querySelectorAll('.is-bracket')).map(toCanvasCoord);
            dotPoints     = Array.from(document.querySelectorAll('.is-dot')).map(toCanvasCoord);
        };

        image.onload = () => { init(); animate(); };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Optimización: si no hay mouse y todas las partículas están en su origen, pausamos el canvas.
            // Como ya dibujamos el estado estático al terminar de moverse, se queda la imagen perfectamente formada.
            let isMoving = mouse.current.active;
            if (!isMoving) {
                isMoving = particles.some(p => p.x !== p.originX || p.y !== p.originY);
            }
            if (!isMoving) return; // Sleep

            updateCursorPoints();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw(ctx);
            }
        };

        const handleResize = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                canvas.width  = rect.width;
                canvas.height = rect.height;
                init();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [src]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-[23px] group bg-black/5 transition-all duration-500 ${containerClass}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => { mouse.current.active = true;  setIsHovered(true);  }}
            onMouseLeave={() => { mouse.current.active = false; setIsHovered(false); }}
        >
            <img
                src={src}
                alt={alt}
                // La imagen original se oculta por completo al hacer hover, dejando ver solo el arte de puntillismo
                className={`absolute inset-0 w-full h-full object-cover rounded-[23px] pointer-events-none z-10 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />

            <canvas
                ref={canvasRef}
                className={`relative w-full h-full z-20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />

            <div className={`absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-30 transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'}`} />
        </div>
    );
}
