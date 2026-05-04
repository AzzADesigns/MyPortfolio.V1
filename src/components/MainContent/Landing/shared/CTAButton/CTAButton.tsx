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
            data-hover="false"
            className={`
                relative group overflow-hidden cursor-pointer 
                ${fullWidth ? 'w-full' : 'w-fit'} 
                px-10 py-5 md:px-8 md:py-4 lg:px-2 xl:px-4 2xl:px-8 lg:py-3 xl:py-4 2xl:py-5
                text-base md:text-[14px] lg:text-[12px] xl:text-[14px] 2xl:text-[17px] 
                font-bold tracking-tight text-[#001720] 
                rounded-2xl bg-[#89EA2B] 
                hover:scale-[1.02] data-[hover=true]:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                shadow-[0_10px_20px_-10px_rgba(137,234,43,0.4)]
                hover:shadow-[0_20px_40px_-15px_rgba(7,248,242,0.3)]
                data-[hover=true]:shadow-[0_20px_40px_-15px_rgba(7,248,242,0.3)]
                ${className}
            `}
        >
            {/* Capa de Energía Aurora (Sincronizada con Imán) */}
            <div 
                className="
                    absolute inset-0 opacity-0 group-hover:opacity-100 
                    group-data-[hover=true]:opacity-100
                    transition-opacity duration-1000 ease-in-out
                    animate-aurora-flow pointer-events-none
                "
                style={{ 
                    backgroundImage: 'radial-gradient(circle at 20% 30%, #07F8F2 0%, transparent 50%), radial-gradient(circle at 80% 70%, #89EA2B 0%, transparent 50%), radial-gradient(circle at 50% 50%, #4ADE80 0%, transparent 100%)' 
                }}
            />
            
            {/* Efecto Cristal */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-data-[hover=true]:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Texto */}
            <span className="relative z-10 block transition-transform duration-500 group-hover:scale-105 group-data-[hover=true]:scale-105">
                {text}
            </span>

            {/* Borde de Luz */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 group-data-[hover=true]:border-white/30 rounded-2xl z-20 transition-colors duration-700 pointer-events-none" />
        </button>
    );
}
