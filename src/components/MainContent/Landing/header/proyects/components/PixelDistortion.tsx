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
    const bracketElements = useRef<Element[]>([]);
    const animateRef   = useRef<() => void>(() => {});
    const loopRunning  = useRef(false);
    const bracketPoints = useRef<CursorPoint[]>([]);
    const dotPoints     = useRef<CursorPoint[]>([]);
    const particlesRef  = useRef<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        const image = new Image();
        image.src = src;


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

                    // 2. EFECTO ASPAS (Brackets)
                    const bPoints = bracketPoints.current;
                    if (bPoints.length > 0) {
                        const BRACKET_ZONE = 8 * dynamicMultiplier;
                        const BRACKET_ZONE_SQ = BRACKET_ZONE * BRACKET_ZONE;
                        
                        for (const bp of bPoints) {
                            const bdx = this.x - bp.x;
                            const bdy = this.y - bp.y;
                            const bDistSq = bdx * bdx + bdy * bdy;

                            if (bDistSq < BRACKET_ZONE_SQ && bDistSq > 0) {
                                const distB = Math.sqrt(bDistSq);
                                const angle = Math.atan2(bdy, bdx);
                                let bForce = (BRACKET_ZONE - distB) / BRACKET_ZONE;

                                if (mouseSpeed > 0.5) {
                                    const dotB = (bdx * dirX + bdy * dirY) / distB;
                                    if (dotB < 0) {
                                        bForce = 0;
                                    } else {
                                        bForce *= (1 + dotB * 1.5);
                                    }
                                }
                                
                                this.vx += Math.cos(angle) * bForce * 14;
                                this.vy += Math.sin(angle) * bForce * 14;
                            }
                        }
                    }
                    // Los puntos (dots) y el centro no generan vacío, permitiendo que el agua se junte ahí
                }

                this.x += this.vx;
                this.y += this.vy;

                // Fricción líquida viscosa
                this.vx *= 0.94;
                this.vy *= 0.94;

                // Atracción al origen (Hard Snap: más fuerte si no hay mouse)
                const ease = mouse.current.active ? 0.06 : 0.15;
                this.x += (this.originX - this.x) * ease;
                this.y += (this.originY - this.y) * ease;

                // Optimización de descanso (Más permisiva al salir para apagar rápido)
                const threshold = mouse.current.active ? 0.1 : 0.5;
                if (Math.abs(this.x - this.originX) < threshold && Math.abs(this.y - this.originY) < threshold && Math.abs(this.vx) < 0.1 && Math.abs(this.vy) < 0.1) {
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

            particlesRef.current = [];
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
                        particlesRef.current.push(new Particle(x, y, color));
                    }
                }
            }
            
            // Dibujo inicial estático para cuando no hay interacción
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesRef.current.length; i++) {
                particlesRef.current[i].draw(ctx);
            }
        };

        const updateCursorPoints = () => {
            if (!mouse.current.active || bracketElements.current.length === 0) return;
            const canvasRect = canvas.getBoundingClientRect();
            
            const toCoord = (el: Element) => {
                const r = el.getBoundingClientRect();
                return { x: (r.left + r.width/2) - canvasRect.left, y: (r.top + r.height/2) - canvasRect.top };
            };

            bracketPoints.current = bracketElements.current.filter(el => el.classList.contains('is-bracket')).map(toCoord);
            dotPoints.current     = bracketElements.current.filter(el => el.classList.contains('is-dot')).map(toCoord);
        };

        image.onload = () => { init(); loopRunning.current = true; animate(); };

        let lastTime = 0;
        const fpsInterval = 1000 / 20;

        const animate = (time: number) => {
            if (!loopRunning.current) return;
            animationFrameId = requestAnimationFrame(animate);

            const now = time || performance.now();
            const deltaTime = now - lastTime;
            if (deltaTime < fpsInterval) return;
            lastTime = now - (deltaTime % fpsInterval);

            // Calcular velocidad real del ratón
            mouse.current.vx = mouse.current.x - mouse.current.lastX;
            mouse.current.vy = mouse.current.y - mouse.current.lastY;
            mouse.current.lastX = mouse.current.x;
            mouse.current.lastY = mouse.current.y;

            let anyMoving = mouse.current.active;
            
            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                p.update();
                p.draw(ctx);
                if (p.x !== p.originX || p.y !== p.originY) anyMoving = true;
            }

            if (!anyMoving) {
                loopRunning.current = false;
                cancelAnimationFrame(animationFrameId);
                return;
            }

            updateCursorPoints();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesRef.current.length; i++) {
                particlesRef.current[i].update();
                particlesRef.current[i].draw(ctx);
            }
        };
        animateRef.current = animate;

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
            onMouseEnter={() => { 
                bracketElements.current = Array.from(document.querySelectorAll('.is-bracket, .is-dot'));
                mouse.current.active = true;  
                setIsHovered(true);  
                if (!loopRunning.current) {
                    loopRunning.current = true;
                    animateRef.current();
                }
            }}
            onMouseLeave={() => { 
                mouse.current.active = false; 
                setIsHovered(false); 
                bracketElements.current = [];
                bracketPoints.current = [];
                dotPoints.current = [];
                
                // Reset instantáneo de todas las partículas para forzar el apagado del bucle
                for (let i = 0; i < particlesRef.current.length; i++) {
                    const p = particlesRef.current[i];
                    p.x = p.originX;
                    p.y = p.originY;
                    p.vx = 0;
                    p.vy = 0;
                }
            }}
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
