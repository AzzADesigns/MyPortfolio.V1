'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

interface CarouselProps {
    slides: string[];
    priority?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({ slides, priority = false }) => {
    const [current, setCurrent] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [gradientColors, setGradientColors] = useState<string>('');
    const dynamicBgRef = useRef<HTMLDivElement>(null);

    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px',
    });

    useEffect(() => {
        if (!inView || slides.length === 0) return;

        const extractGradientColors = async () => {
            try {
                // ColorThief needs an actual Image element to work in the browser
                const img = new window.Image();
                img.crossOrigin = 'Anonymous';
                img.src = slides[0];

                img.onload = async () => {
                    const ColorThief = (await import('colorthief')).default;
                    const colorThief = new ColorThief();

                    // Get a palette of 5 dominant colors
                    const palette = colorThief.getPalette(img, 5);

                    if (!palette || palette.length === 0) return;

                    // Convert RGB arrays to rgb strings
                    const colors = palette.map((rgb: number[]) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);

                    const topColors = colors.slice(0, 3);
                    let newGradient = '#1a1a1a';

                    if (topColors.length >= 3) {
                        newGradient = `linear-gradient(135deg, ${topColors[0]} 0%, ${topColors[1]} 50%, ${topColors[2]} 100%)`;
                    } else if (topColors.length === 2) {
                        newGradient = `linear-gradient(135deg, ${topColors[0]} 0%, ${topColors[1]} 100%)`;
                    } else if (topColors.length === 1) {
                        newGradient = topColors[0];
                    }

                    setGradientColors(newGradient);
                };

                img.onerror = () => {
                    setGradientColors('#1a1a1a');
                };
            } catch (error) {
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
            className="relative overflow-hidden w-full p-4 xl:p-6 min-h-[250px] xl:min-h-[450px] flex items-center justify-center bg-[#1a1a1a]"
        >
            {/* Fondo Base */}
            <div className="absolute inset-0 bg-[#242424]"></div>

            {/* Fondo Dinámico Instantáneo */}
            <div
                className="absolute inset-0"
                style={{
                    background: gradientColors,
                    opacity: gradientColors ? 1 : 0
                }}
            />

            <div
                className="relative z-10 flex transition-transform ease-out duration-500 w-full"
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

            {/* Flechas */}
            <div className="hidden lg:flex absolute top-0 left-0 h-full w-full justify-between items-center px-4 text-buttonColor text-4xl pointer-events-none z-20">
                <button
                    onClick={previousSlide}
                    className="bg-white/90 hover:scale-110 transition-all cursor-pointer rounded-full p-1 pointer-events-auto shadow-lg"
                >
                    <FaArrowCircleLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white/90 hover:scale-110 transition-all cursor-pointer rounded-full p-1 pointer-events-auto shadow-lg"
                >
                    <FaArrowCircleRight />
                </button>
            </div>
        </div>
    );
};
