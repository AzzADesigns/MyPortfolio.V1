'use client';
import React, { useRef, useEffect, useState } from 'react';

interface PixelDistortionProps {
    src: string;
    alt: string;
    containerClass?: string;
}

// Tipo compartido para las posiciones de los elementos del cursor
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

        // Posiciones en tiempo real de los elementos del cursor (actualizadas cada frame)
        // Brackets (.is-bracket) → interacción FUERTE
        // Dots (.is-dot)         → interacción SUAVE
        let bracketPoints: CursorPoint[] = [];
        let dotPoints: CursorPoint[]     = [];

        class Particle {
            originX: number;
            originY: number;
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            currentSize: number;
            color: string;

            constructor(x: number, y: number, color: string) {
                this.originX = x;
                this.originY = y;
                this.x = x;
                this.y = y;
                this.vx = 0;
                this.vy = 0;
                this.size = 1.5;
                this.currentSize = 1.5;
                this.color = color;
            }

            draw() {
                ctx!.fillStyle = this.color;
                ctx!.fillRect(
                    this.x - this.currentSize / 2,
                    this.y - this.currentSize / 2,
                    this.currentSize,
                    this.currentSize
                );
            }

            update() {
                this.currentSize = this.size;

                if (mouse.current.active) {
                    // ── 1. Agujero central en la posición exacta del cursor ──────────
                    const dx        = this.x - mouse.current.x;
                    const dy        = this.y - mouse.current.y;
                    const distMouse = Math.sqrt(dx * dx + dy * dy);
                    const holeR     = 4;

                    if (distMouse < holeR) {
                        this.currentSize = 0;
                        const f = (holeR - distMouse) / holeR;
                        this.vx += Math.cos(Math.atan2(dy, dx)) * f * 10;
                        this.vy += Math.sin(Math.atan2(dy, dx)) * f * 10;
                    }

                    // ── 2. Corchetes (.is-bracket) → fuerza FUERTE ───────────────────
                    // Leemos la posición REAL en pantalla de cada corchete en tiempo real
                    const BRACKET_ZONE  = 14;
                    const BRACKET_FORCE = 18;

                    for (const bp of bracketPoints) {
                        const dbx  = this.x - bp.x;
                        const dby  = this.y - bp.y;
                        const dist = Math.sqrt(dbx * dbx + dby * dby);

                        if (dist < BRACKET_ZONE && dist > 0) {
                            const push  = (BRACKET_ZONE - dist) / BRACKET_ZONE;
                            const angle = Math.atan2(dby, dbx);
                            this.vx += Math.cos(angle) * push * BRACKET_FORCE;
                            this.vy += Math.sin(angle) * push * BRACKET_FORCE;
                            // Engrandar la partícula cerca del corchete
                            this.currentSize = Math.max(this.currentSize, this.size + push * 7);
                        }
                    }

                    // ── 3. Dots (.is-dot) → fuerza SUAVE ─────────────────────────────
                    const DOT_ZONE  = 9;
                    const DOT_FORCE = 6;

                    for (const dp of dotPoints) {
                        const ddx  = this.x - dp.x;
                        const ddy  = this.y - dp.y;
                        const dist = Math.sqrt(ddx * ddx + ddy * ddy);

                        if (dist < DOT_ZONE && dist > 0) {
                            const push  = (DOT_ZONE - dist) / DOT_ZONE;
                            const angle = Math.atan2(ddy, ddx);
                            this.vx += Math.cos(angle) * push * DOT_FORCE;
                            this.vy += Math.sin(angle) * push * DOT_FORCE;
                            this.currentSize = Math.max(this.currentSize, this.size + push * 3);
                        }
                    }
                }

                // Fricción → estela larga al moverse
                this.vx *= 0.88;
                this.vy *= 0.88;
                this.x  += this.vx;
                this.y  += this.vy;

                // Atracción suave al origen → cuadros que se reconstityen
                this.x += (this.originX - this.x) * 0.04;
                this.y += (this.originY - this.y) * 0.04;
            }
        }

        const init = () => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx    = tempCanvas.getContext('2d');
            const w = 400;
            const h = 225;
            tempCanvas.width  = w;
            tempCanvas.height = h;
            tempCtx?.drawImage(image, 0, 0, w, h);

            const imageData = tempCtx?.getImageData(0, 0, w, h).data;
            if (!imageData) return;

            particles = [];
            const step = 4;
            for (let y = 0; y < h; y += step) {
                for (let x = 0; x < w; x += step) {
                    const index = (y * w + x) * 4;
                    const a = imageData[index + 3];
                    if (a > 128) {
                        const color = `rgb(${imageData[index]},${imageData[index+1]},${imageData[index+2]})`;
                        particles.push(new Particle((x / w) * canvas.width, (y / h) * canvas.height, color));
                    }
                }
            }
        };

        // Lee en tiempo real la posición de los elementos del cursor en coordenadas del canvas
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
            // Leer posiciones reales de los elementos del cursor en cada frame
            updateCursorPoints();

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            animationFrameId = requestAnimationFrame(animate);
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
            {/* Imagen Original - Visible MIENTRAS NO HAYA HOVER */}
            <img
                src={src}
                alt={alt}
                className={`absolute inset-0 w-full h-full object-cover rounded-[23px] transition-opacity duration-500 pointer-events-none z-10 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Cuadrícula de Partículas - Solo visible en HOVER */}
            <canvas
                ref={canvasRef}
                className={`w-full h-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Efecto de Scanline Retro */}
            <div className={`absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-30 transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'}`} />
        </div>
    );
}
