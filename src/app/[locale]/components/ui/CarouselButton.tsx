"use client"

import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface CarouselButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    ariaLabel: string;
}

const CarouselButton: React.FC<CarouselButtonProps> = ({ direction, onClick, ariaLabel }) => {
    return (
        <button 
            onClick={onClick}
            className="bg-buttonColor hover:bg-buttonColor/80 text-white rounded-full w-8 h-8 flex items-center justify-center"
            aria-label={ariaLabel}
        >
            {direction === 'left' ? (
                <MdChevronLeft className="w-5 h-5" />
            ) : (
                <MdChevronRight className="w-5 h-5" />
            )}
        </button>
    );
};

export default CarouselButton;