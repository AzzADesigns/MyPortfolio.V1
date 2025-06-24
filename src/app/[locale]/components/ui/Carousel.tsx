'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface CarouselProps {
    slides: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

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
        <div className="relative overflow-hidden w-full h-[300px] xl:h-[460px]">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {slides.map((s, index) => (
                    <Image
                        key={index}
                        src={s}
                        alt={`slide-${index}`}
                        width={500}
                        height={300}
                        className="w-full h-[300px] xl:h-[460px] object-cover flex-shrink-0"
                    />
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
