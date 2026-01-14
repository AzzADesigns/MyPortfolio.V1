'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface CarouselProps {
    slides: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [gradientColors, setGradientColors] = useState<string>('');

    // Extraer los 3 colores principales de la primera imagen para crear un degradado
    useEffect(() => {
        const extractGradientColors = async () => {
            if (slides.length === 0) return;

            try {
                // Importación dinámica de node-vibrant para navegador
                const { Vibrant } = await import('node-vibrant/browser');

                // Extraer paleta de la primera imagen
                const palette = await Vibrant.from(slides[0]).getPalette();

                // Obtener los 3 colores más vibrantes disponibles
                const colors = [
                    palette.Vibrant?.hex,
                    palette.DarkVibrant?.hex,
                    palette.LightVibrant?.hex,
                    palette.Muted?.hex,
                    palette.DarkMuted?.hex,
                    palette.LightMuted?.hex
                ].filter(Boolean) as string[];

                // Tomar los primeros 3 colores disponibles
                const topColors = colors.slice(0, 3);

                // Crear degradado diagonal
                if (topColors.length >= 3) {
                    setGradientColors(
                        `linear-gradient(135deg, ${topColors[0]} 0%, ${topColors[1]} 50%, ${topColors[2]} 100%)`
                    );
                } else if (topColors.length === 2) {
                    setGradientColors(
                        `linear-gradient(135deg, ${topColors[0]} 0%, ${topColors[1]} 100%)`
                    );
                } else if (topColors.length === 1) {
                    setGradientColors(topColors[0]);
                } else {
                    setGradientColors('#1a1a1a');
                }
            } catch (error) {
                console.error('Error extracting gradient colors:', error);
                setGradientColors('#1a1a1a');
            }
        };

        extractGradientColors();
    }, [slides]);

    const previousSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        const distance = touchStartX - touchEndX;
        if (distance > 50) {
            nextSlide();
        } else if (distance < -50) {
            previousSlide();
        }
    };

    return (
        <div
            className="relative overflow-hidden w-full p-4 xl:p-6 transition-all duration-700"
            style={{ background: gradientColors || '#1a1a1a' }}
        >
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((s, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 px-2"
                    >
                        <Image
                            src={s}
                            alt={`slide-${index}`}
                            width={500}
                            height={300}
                            className="w-full h-auto object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                ))}
            </div>

            {/* Flechas solo desde lg en adelante */}
            <div className="hidden lg:flex absolute top-0 left-0 h-full w-full justify-between items-center px-4 text-buttonColor text-4xl">
                <button onClick={previousSlide} className="bg-white/90 hover:scale-110 transition-all cursor-pointer rounded-full">
                    <FaArrowCircleLeft />
                </button>
                <button onClick={nextSlide} className="bg-white/90 hover:scale-110 transition-all cursor-pointer rounded-full">
                    <FaArrowCircleRight />
                </button>
            </div>
        </div>
    );
};
