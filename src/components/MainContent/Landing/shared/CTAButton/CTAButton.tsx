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
            className={`
                relative group overflow-hidden cursor-pointer 
                ${fullWidth ? 'w-full' : 'w-fit'} 
                px-10 py-5 md:px-14 md:py-6
                text-base md:text-lg 
                font-black tracking-[0.2em] uppercase text-[#001720]
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                active:scale-[0.96]
                ${className}
            `}
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 65%, 88% 100%, 0 100%)',
            }}
        >
            {/* Fondo Base Táctico (Verde de Alta Atención) */}
            <div className="absolute inset-0 bg-[#89EA2B] group-hover:bg-[#07F8F2] transition-colors duration-700" />
            
            {/* Patrón de Rejilla Técnica (Grid) */}
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-700" 
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '6px 6px' }}>
            </div>

            {/* Borde Técnico HUD (Cian de contraste) */}
            <div className="absolute inset-0 border border-[#001720]/10 group-hover:border-white/20 transition-colors duration-700" />

            {/* Efecto de Escaneo de Alta Velocidad (HUD Beam) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-[scan_0.6s_ease-in-out_infinite] pointer-events-none" />

            {/* Micro-Labels Técnicos */}
            <div className="absolute top-1.5 left-8 text-[7px] font-mono opacity-30 group-hover:opacity-60 transition-opacity tracking-widest uppercase">
                CMD_EXECUTE_V1.0
            </div>
            <div className="absolute bottom-4 right-[18%] text-[7px] font-mono opacity-30 group-hover:opacity-60 transition-opacity tracking-widest uppercase">
                AUTH_VERIFIED
            </div>
            
            {/* Brackets Técnicos HUD (Complejos) */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#001720]/30 group-hover:border-[#001720]/50" />
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#001720]/20 rounded-sm" />
            
            <div className="absolute bottom-0 right-[12%] w-5 h-5 border-b-2 border-r-2 border-[#001720]/30 group-hover:border-[#001720]/50" />
            <div className="absolute bottom-2 right-[14%] w-1.5 h-1.5 bg-[#001720]/20 rounded-sm animate-pulse" />

            {/* Texto de Comando */}
            <span className="relative z-10 block transition-transform duration-500 group-hover:translate-x-1">
                {text}
            </span>

            {/* Marcador de Enfoque (Targeting Diamond) */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 w-2 h-2 bg-[#001720] rounded-sm rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:right-6 shadow-[0_0_10px_rgba(0,0,0,0.2)]" />

            {/* Glow Exterior HUD (Solo en hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_50px_rgba(7,248,242,0.5)] -z-10 pointer-events-none" />
        </button>
    );
}





