'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function HexagonWave3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Controlamos el centro de la "burbuja" de distorsión
    const wave = useRef({ x: -500, y: -500, progress: 0 }); 

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); // Optimización: fondo opaco
        if (!ctx) return;

        let animationFrameId: number;

        // Configuración de la rejilla
        const hexSize = 34;
        const hexWidth = Math.sqrt(3) * hexSize;
        const hexHeight = hexSize * 2;
        const horizDist = hexWidth;
        const vertDist = hexHeight * 0.75;

        const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, shimmer: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i + (Math.PI / 6);
                ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
            }
            ctx.closePath();
            
            // 1. Relleno base oscuro
            ctx.fillStyle = `rgba(137, 234, 43, ${opacity * 0.1})`;
            ctx.fill();

            // 2. Brillo especular (Efecto cristal de la imagen)
            if (shimmer > 0) {
                const grad = ctx.createRadialGradient(x, y - size*0.5, 0, x, y, size);
                grad.addColorStop(0, `rgba(255, 255, 255, ${shimmer * 0.4})`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.fill();
            }

            // 3. Trazo (Wireframe)
            ctx.strokeStyle = `rgba(137, 234, 43, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
        };

        const render = () => {
            const w = canvas.width;
            const h = canvas.height;
            
            // Fondo sólido para evitar ghosting
            ctx.fillStyle = '#001720';
            ctx.fillRect(0, 0, w, h);

            const cols = Math.ceil(w / horizDist) + 2;
            const rows = Math.ceil(h / vertDist) + 2;

            // Posición de la burbuja basada en el progreso diagonal
            const waveX = w * wave.current.progress;
            const waveY = h * wave.current.progress;
            const waveRadius = Math.max(w, h) * 0.35;

            for (let r = 0; r < rows; r++) {
                const offset = (r % 2) * (hexWidth / 2);
                for (let q = 0; q < cols; q++) {
                    const bx = q * horizDist + offset;
                    const by = r * vertDist;

                    const dx = bx - waveX;
                    const dy = by - waveY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    let rx = bx;
                    let ry = by;
                    let opacity = 0.12;
                    let shimmer = 0;
                    let size = hexSize - 1;

                    // Efecto de abombamiento (Bulge)
                    if (dist < waveRadius) {
                        const strength = Math.pow(1 - dist / waveRadius, 2);
                        
                        // Empujamos los hexágonos hacia afuera del centro para crear el "bulto"
                        rx = bx + dx * strength * 0.35;
                        ry = by + dy * strength * 0.35;
                        
                        opacity = 0.12 + strength * 0.6;
                        shimmer = strength;
                        size = (hexSize - 1) * (1 + strength * 0.1);
                    }

                    drawHexagon(ctx, rx, ry, size, opacity, shimmer);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        render();

        // Animación de barrido diagonal
        const tl = gsap.to(wave.current, {
            progress: 1.5,
            duration: 8,
            repeat: -1,
            ease: "none",
            delay: 1,
            onRepeat: () => { wave.current.progress = -0.5; }
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            tl.kill();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[0]"
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
}
