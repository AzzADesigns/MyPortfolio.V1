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
    const mouse        = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, vx: 0, vy: 0, active: false });
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
                    // Multiplicador dinámico basado en la velocidad
                    const mouseSpeed = Math.hypot(mouse.current.vx, mouse.current.vy);
                    const dynamicMultiplier = 1 + Math.min(mouseSpeed * 0.15, 2.5);

                    // Dirección del ratón normalizada
                    let dirX = 0; let dirY = 0;
                    if (mouseSpeed > 0.1) {
                        dirX = mouse.current.vx / mouseSpeed;
                        dirY = mouse.current.vy / mouseSpeed;
                    }

                    const rdx = this.x - mouse.current.x;
                    const rdy = this.y - mouse.current.y;
                    const distCenter = Math.sqrt(rdx * rdx + rdy * rdy);

                    // 1. EFECTO REMOLINO (Vortex) - Más ceñido al centro
                    const VORTEX_ZONE = 25 * dynamicMultiplier;
                    if (distCenter < VORTEX_ZONE && distCenter > 0) {
                        const tvx = -rdy / distCenter; 
                        const tvy = rdx / distCenter;
                        
                        const dotV = tvx * dirX + tvy * dirY;
                        // Fuerza de remolino más sutil para no dispersar tanto los píxeles
                        let vForce = (8 / (distCenter + 5)) * (mouseSpeed * 0.3);
                        vForce *= (dotV > 0 ? 1.3 : 0.2); 
                        
                        this.vx += tvx * vForce;
                        this.vy += tvy * vForce;
                    }

                    // 2. EFECTO ASPAS (Brackets) - Ahora mucho más localizado y tenso
                    for (const bp of bracketPoints) {
                        const bdx = this.x - bp.x;
                        const bdy = this.y - bp.y;
                        const distB = Math.sqrt(bdx * bdx + bdy * bdy);
                        const BRACKET_ZONE = 8 * dynamicMultiplier; // Radio reducido para evitar manchas grandes

                        if (distB < BRACKET_ZONE && distB > 0) {
                            const angle = Math.atan2(bdy, bdx);
                            let bForce = (BRACKET_ZONE - distB) / BRACKET_ZONE;

                            if (mouseSpeed > 0.5) {
                                const dotB = (bdx * dirX + bdy * dirY) / distB;
                                if (dotB < 0) {
                                    bForce = 0; // Se cierra inmediatamente al pasar
                                } else {
                                    bForce *= (1 + dotB * 1.5); // Empuje frontal fuerte
                                }
                            }
                            
                            this.vx += Math.cos(angle) * bForce * 14;
                            this.vy += Math.sin(angle) * bForce * 14;
                        }
                    }
                    // Los puntos (dots) y el centro no generan vacío, permitiendo que el agua se junte ahí
                }

                this.x += this.vx;
                this.y += this.vy;

                // Fricción líquida viscosa
                this.vx *= 0.94;
                this.vy *= 0.94;

                // Curación suave
                this.x += (this.originX - this.x) * 0.06;
                this.y += (this.originY - this.y) * 0.06;

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

            // Calcular velocidad real del ratón
            mouse.current.vx = mouse.current.x - mouse.current.lastX;
            mouse.current.vy = mouse.current.y - mouse.current.lastY;
            mouse.current.lastX = mouse.current.x;
            mouse.current.lastY = mouse.current.y;

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
