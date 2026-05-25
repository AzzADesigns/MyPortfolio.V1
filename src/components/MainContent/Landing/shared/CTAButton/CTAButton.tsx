import React from 'react';

interface CTAButtonProps {
    text?: string;
    className?: string;
    onClick?: () => void;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function CTAButton({ 
    text = "Empezar mi proyecto hoy", 
    className = "", 
    onClick, 
    fullWidth = false,
    type = 'button',
    disabled = false
}: CTAButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                relative group/btn overflow-hidden cursor-pointer 
                ${fullWidth ? 'w-full' : 'w-fit'} 
                px-8 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 2xl:px-14 3xl:py-6
                text-[10px] md:text-[12px] lg:text-base 2xl:text-sm 3xl:text-xl 
                font-bold tracking-tight text-[#001720]
                rounded-lg md:rounded-xl 2xl:rounded-[1rem]
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                active:scale-[0.96]
                ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                ${className}
            `}
        >
            {/* Fondo Base Táctico (Verde de Alta Atención) */}
            <div className="absolute inset-0 bg-[#89EA2B] group-hover/btn:bg-[#07F8F2] transition-colors duration-700" />
            
            {/* Patrón de Rejilla Técnica (Micro-Grid) */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none group-hover/btn:opacity-[0.15] transition-opacity duration-700" 
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '6px 6px' }}>
            </div>

            {/* Borde Técnico HUD (Translucido) */}
            <div className="absolute inset-0 border border-[#001720]/10 group-hover/btn:border-white/20 rounded-2xl md:rounded-[1.5rem] transition-colors duration-700" />

            {/* Efecto de Escaneo HUD (Beam) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:animate-[scan_0.8s_ease-in-out_infinite] pointer-events-none" />
            
            {/* Brackets Técnicos HUD (Adaptados a bordes redondeados) */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#001720]/30 group-hover/btn:border-[#001720]/50 rounded-tl-lg" />
            <div className="absolute top-3 left-3 w-1 h-1 bg-[#001720]/20 rounded-full" />
            
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#001720]/30 group-hover/btn:border-[#001720]/50 rounded-br-lg" />
            <div className="absolute bottom-3 right-3 w-1 h-1 bg-[#001720]/20 rounded-full animate-pulse" />

            {/* Texto de Comando */}
            <span className="relative z-10 block transition-transform duration-500 group-hover/btn:translate-x-1">
                {text}
            </span>

            {/* Marcador de Enfoque (Targeting Diamond) */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 w-2 h-2 bg-[#001720] rounded-sm rotate-45 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 group-hover/btn:right-6 shadow-[0_0_10px_rgba(0,0,0,0.2)]" />

            {/* Glow Exterior HUD (Solo en hover) */}
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 shadow-[0_0_50px_rgba(7,248,242,0.5)] rounded-2xl md:rounded-[1.5rem] -z-10 pointer-events-none" />
        </button>
    );
}







