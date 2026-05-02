import React from 'react';

interface CTAButtonProps {
    text?: string;
    className?: string;
    onClick?: () => void;
    fullWidth?: boolean;
}

export default function CTAButton({ text = "Empezar mi proyecto hoy", className = "", onClick, fullWidth = false }: CTAButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`relative group overflow-hidden cursor-pointer ${fullWidth ? 'w-full' : 'w-fit'} px-6 py-4 md:px-4 md:py-3 lg:px-5 lg:py-3 2xl:px-7 2xl:py-5 text-base md:text-[12px] lg:text-sm 2xl:text-[18px] font-extrabold tracking-normal lg:-tracking-tighter text-[#001720] rounded-[16px] bg-[#89EA2B] hover:scale-105 data-[hover=true]:scale-105 hover:shadow-[0_0_40px_rgba(74,222,128,0.6)] data-[hover=true]:shadow-[0_0_40px_rgba(74,222,128,0.6)] active:scale-90 active:-rotate-2 active:shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300 ${className}`}
        >
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-data-[hover=true]:opacity-100 transition-opacity duration-300 animate-gradient-move"
                style={{ backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)' }}
            />
            <span className="relative z-10">{text}</span>
        </button>
    );
}
