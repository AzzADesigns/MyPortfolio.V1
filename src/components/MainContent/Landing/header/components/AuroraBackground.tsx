'use client';
import React from 'react';

export default function OceanAuroraBackground() {
    return (
        <div className="absolute inset-0 bg-[#001720] overflow-hidden pointer-events-none z-0">
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float-1 {
                    0%, 100% { transform: translate(-15%, -15%) scale(1.1); }
                    33% { transform: translate(10%, 10%) scale(1); }
                    66% { transform: translate(-5%, 15%) scale(1.05); }
                }
                @keyframes float-2 {
                    0%, 100% { transform: translate(10%, 10%) scale(1); }
                    33% { transform: translate(-15%, -5%) scale(1.1); }
                    66% { transform: translate(5%, -10%) scale(0.95); }
                }
                @keyframes float-3 {
                    0%, 100% { transform: translate(0%, 0%) scale(1.05); }
                    50% { transform: translate(-10%, 10%) scale(1); }
                }
                .aurora-blob {
                    position: absolute;
                    width: 100vw;
                    height: 100vw;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.12;
                    mix-blend-mode: screen;
                    will-change: transform;
                }
                
                /* OPTIMIZACIÓN CRÍTICA PARA MÓVILES */
                @media (max-width: 1024px) {
                    .aurora-blob {
                        display: none !important; /* Eliminamos las capas pesadas */
                    }
                    .mobile-optimized-bg {
                        display: block !important;
                        background: radial-gradient(circle at 20% 20%, #00605a 0%, transparent 70%),
                                    radial-gradient(circle at 80% 10%, #244005 0%, transparent 60%);
                        opacity: 0.15;
                        filter: blur(60px); /* Desenfoque mucho más ligero para una sola capa */
                    }
                }
            `}} />

            {/* Capa estática súper ligera para móviles */}
            <div className="mobile-optimized-bg absolute inset-0 hidden" />

            {/* Capas animadas solo para Desktop */}
            <div className="aurora-blob bg-[#00605a]" 
                style={{ 
                    top: '-30%', 
                    left: '-20%', 
                    animation: 'float-1 40s ease-in-out infinite' 
                }} 
            />

            <div className="aurora-blob bg-[#244005]" 
                style={{ 
                    top: '-20%', 
                    left: '20%', 
                    animation: 'float-2 50s ease-in-out infinite',
                    animationDelay: '-7s'
                }} 
            />

        </div>
    );
}





