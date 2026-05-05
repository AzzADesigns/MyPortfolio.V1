'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function OceanAuroraBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const drawGlow = (
            ctx: CanvasRenderingContext2D, 
            t: number, 
            x: number, 
            y: number, 
            baseRadius: number, 
            primaryColor: string, 
            secondaryColor: string,
            baseOpacity: number,
            speed: number,
            phase: number
        ) => {
            ctx.save();
            
            // Movimiento mucho más amplio para que se vea el "baile" y la mezcla
            const dx = Math.sin(t * speed + phase) * 250;
            const dy = Math.cos(t * speed * 0.7 + phase) * 200;
            const pulse = Math.sin(t * 0.4 + phase) * (baseRadius * 0.1);
            const currentRadius = baseRadius + pulse;
            
            const gradient = ctx.createRadialGradient(
                x + dx, y + dy, 0,
                x + dx, y + dy, currentRadius
            );
            
            // Colores más definidos para que la mezcla sea obvia
            gradient.addColorStop(0, primaryColor + '77'); 
            gradient.addColorStop(0.5, secondaryColor + '33'); 
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = baseOpacity;
            
            ctx.beginPath();
            ctx.arc(x + dx, y + dy, currentRadius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        };

        const render = () => {
            time += 0.005; 
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Fondo base oscuro
            ctx.fillStyle = '#001720';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const w = canvas.width;
            
            // Capas movidas a la ESQUINA SUPERIOR IZQUIERDA
            // Capa 1: Cian
            drawGlow(ctx, time, w * 0.05, 0, w * 0.5, '#07F8F2', '#89EA2B', 0.35, 0.6, 0);
            
            // Capa 2: Verde
            drawGlow(ctx, time, 0, 100, w * 0.45, '#89EA2B', '#07F8F2', 0.3, 0.5, Math.PI);
            
            // Capa 3: Mezcla rápida central
            drawGlow(ctx, time * 1.5, w * 0.05, -50, w * 0.35, '#07F8F2', '#ffffff', 0.15, 0.8, 1);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full opacity-80"
                style={{ filter: 'blur(60px)' }}
            />
        </div>
    );
}
