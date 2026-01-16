'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

interface CarouselProps {
    slides: string[];
    priority?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({ slides, priority = false }) => {
    const [current, setCurrent] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [gradientColors, setGradientColors] = useState<string>('');

    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px',
    });

    useEffect(() => {
        if (!inView || slides.length === 0) return;

        const extractGradientColors = async () => {
            try {
                const { Vibrant } = await import('node-vibrant/browser');

                const palette = await Vibrant.from(slides[0]).getPalette();

                const colors = [
                    palette.Vibrant?.hex,
                    palette.DarkVibrant?.hex,
                    palette.LightVibrant?.hex,
                    palette.Muted?.hex,
                    palette.DarkMuted?.hex,
                    palette.LightMuted?.hex
                ].filter(Boolean) as string[];

                const topColors = colors.slice(0, 3);

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
    }, [slides, inView]);

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
            ref={ref}
            className="relative overflow-hidden w-full p-4 xl:p-6 transition-all duration-700 min-h-[250px] xl:min-h-[450px] flex items-center justify-center"
            style={{ background: gradientColors || '#1a1a1a' }}
        >
            <div
                className="flex transition-transform ease-out duration-500 w-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((s, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0 px-2 flex justify-center items-center"
                    >
                        <Image
                            src={s}
                            alt={`slide-${index}`}
                            width={800}
                            height={600}
                            priority={priority && index === 0}
                            loading={priority && index === 0 ? undefined : 'lazy'}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                            className="w-auto h-auto max-w-full max-h-[300px] xl:max-h-[450px] object-contain rounded-lg shadow-2xl mx-auto"
                        />
                    </div>
                ))}
            </div>

            <div className="hidden lg:flex absolute top-0 left-0 h-full w-full justify-between items-center px-4 text-buttonColor text-4xl pointer-events-none">
                <button
                    onClick={previousSlide}
                    className="bg-white/90 hover:scale-110 transition-all cursor-pointer rounded-full p-1 pointer-events-auto"
                >
                    <FaArrowCircleLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white/90 hover:scale-110 transition-all cursor-pointer rounded-full p-1 pointer-events-auto"
                >
                    <FaArrowCircleRight />
                </button>
            </div>
        </div>
    );
};
