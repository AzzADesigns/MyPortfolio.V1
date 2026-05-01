'use client';
import React, { useRef, memo } from 'react';
import { FiCircle, FiSquare, FiTriangle, FiBell, FiShoppingCart, FiMessageCircle } from 'react-icons/fi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface FloatingShapesProps {
    type?: 'design' | 'product';
}

const FloatingShapesComponent = ({ type = 'design' }: FloatingShapesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const config = {
        design: {
            icons: [FiCircle, FiSquare, FiTriangle],
            colors: ['#89EA2B', '#22d3ee', '#4ade80'],
            sizes: [40, 36, 38]
        },
        product: {
            icons: [FiBell, FiShoppingCart, FiMessageCircle],
            colors: ['#22d3ee', '#89EA2B', '#4ade80'],
            sizes: [38, 40, 38]
        }
    }[type];

    useGSAP(() => {
        if (!containerRef.current) return;
        const shapes = containerRef.current.querySelectorAll('.floating-shape');

        shapes.forEach((shape) => {
            const moveRandomly = () => {
                gsap.to(shape, {
                    x: gsap.utils.random(-30, 30),
                    y: gsap.utils.random(-30, 30),
                    rotation: gsap.utils.random(-90, 90),
                    duration: gsap.utils.random(5, 8),
                    ease: "sine.inOut",
                    force3D: true,
                    onComplete: moveRandomly
                });
            };

            gsap.to(shape, {
                opacity: gsap.utils.random(0.3, 0.5),
                scale: gsap.utils.random(0.9, 1.1),
                duration: gsap.utils.random(3, 5),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                force3D: true
            });

            moveRandomly();
        });
    }, { scope: containerRef, dependencies: [type] });

    const Icon1 = config.icons[0];
    const Icon2 = config.icons[1];
    const Icon3 = config.icons[2];

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Icono 1 */}
            <div className="floating-shape absolute top-1/4 right-1/4 flex items-center justify-center will-change-transform">
                <div className="absolute w-32 h-32 blur-[50px] rounded-full" style={{ backgroundColor: `${config.colors[0]}4D` }} />
                <Icon1 size={config.sizes[0]} className="relative z-10" style={{ color: `${config.colors[0]}33` }} />
            </div>
            
            {/* Icono 2 */}
            <div className="floating-shape absolute top-1/2 right-10 flex items-center justify-center will-change-transform">
                <div className="absolute w-36 h-36 blur-[60px] rounded-full" style={{ backgroundColor: `${config.colors[1]}4D` }} />
                <Icon2 size={config.sizes[1]} className="relative z-10" style={{ color: `${config.colors[1]}33` }} />
            </div>

            {/* Icono 3 */}
            <div className="floating-shape absolute bottom-1/4 right-1/3 flex items-center justify-center will-change-transform">
                <div className="absolute w-32 h-32 blur-[55px] rounded-full" style={{ backgroundColor: `${config.colors[2]}4D` }} />
                <Icon3 size={config.sizes[2]} className="relative z-10" style={{ color: `${config.colors[2]}33` }} />
            </div>
        </div>
    );
};

export const FloatingShapes = memo(FloatingShapesComponent);
FloatingShapes.displayName = 'FloatingShapes';
