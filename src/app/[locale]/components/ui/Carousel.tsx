'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface CarouselProps {
    slides: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const [current, setCurrent] = useState(0);

    const previousSlide = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    return (
        <div className="relative overflow-hidden w-full h-[360px] rounded-2xl">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((s, index) => (
                    <Image
                        key={index}
                        src={s}
                        alt={`slide-${index}`}
                        width={500}
                        height={300}
                        className="w-full h-[360px] object-cover flex-shrink-0"
                    />
                ))}
            </div>
            
            <div className="absolute top-0 left-0 h-full w-full flex justify-between items-center px-4 text-buttonColor text-4xl">
                <button onClick={previousSlide} className='bg-foreground hover:scale-110 transition-all cursor-pointer rounded-full'>
                    <FaArrowCircleLeft />
                </button>
                <button onClick={nextSlide} className='bg-foreground hover:scale-110 transition-all cursor-pointer rounded-full'>
                    <FaArrowCircleRight />
                </button>
            </div>
        </div>
    );
};
