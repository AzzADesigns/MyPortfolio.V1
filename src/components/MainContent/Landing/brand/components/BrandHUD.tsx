'use client';

import { BrandHoverState } from '../hooks/useBrandState';

interface BrandHUDProps {
    hoveredWord: BrandHoverState;
}

export const BrandHUD = ({ hoveredWord }: BrandHUDProps) => {
    const getRingStyles = (type: 'outer' | 'inner') => {
        const base = "absolute transition-all duration-1000 ease-in-out will-change-[transform,opacity,border-radius,filter]";

        if (type === 'outer') {
            switch (hoveredWord) {
                case 'vivas': return `${base} inset-[-5%] border-[1px] border-[#89EA2B] blur-0 opacity-100 animate-wave`;
                case 'personalizados': return `${base} inset-[-10%] border-[2px] border-[#89EA2B]/60 blur-[5px] md:blur-[10px] animate-morph`;
                case 'fluidas': return `${base} inset-[-15%] rounded-full border-0 bg-[#07F8F2]/10 blur-[40px] md:blur-[120px] scale-125 opacity-60`;
                case 'marca': return `${base} inset-[-10%] border-[1px] border-[#89EA2B]/40 blur-0 opacity-100 animate-master [animation-duration:2s]`;
                default: return `${base} inset-0 border-[40px] md:border-[80px] border-[#89EA2B]/10 blur-[30px] md:blur-[90px] animate-pulse-slow`;
            }
        }

        if (type === 'inner') {
            switch (hoveredWord) {
                case 'vivas': return `${base} inset-[10%] border-[1px] border-[#07F8F2] blur-0 opacity-100 animate-wave [animation-delay:500ms]`;
                case 'personalizados': return `${base} inset-[15%] border-[1px] border-[#07F8F2]/50 blur-[2px] md:blur-[5px] animate-morph [animation-delay:1000ms]`;
                case 'fluidas': return `${base} inset-[20%] rounded-full border-[1px] border-[#07F8F2]/80 blur-[1px] md:blur-[2px] scale-90 opacity-90 shadow-[0_0_30px_rgba(7,248,242,0.5)]`;
                case 'marca': return `${base} inset-[5%] border-[1px] border-[#07F8F2]/60 blur-0 opacity-100 shadow-[0_0_15px_rgba(7,248,242,0.4)] animate-master [animation-duration:2s] [animation-delay:300ms]`;
                default: return `${base} inset-[15%] md:inset-[18%] border-[30px] md:border-[60px] border-[#07F8F2]/15 blur-[20px] md:blur-[70px] animate-pulse-medium`;
            }
        }
        return "";
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[650px] md:h-[650px] lg:w-[850px] lg:h-[850px] 3xl:w-[1100px] 3xl:h-[1100px] pointer-events-none">
            {/* Anillo Exterior Principal */}
            <div className={`${getRingStyles('outer')} rounded-full`}></div>

            {/* Anillo Decorativo 1 */}
            <div className={`absolute inset-0 rounded-full border border-[#89EA2B]/10 blur-[1px] transition-all duration-1000 opacity-20`}></div>

            {/* Anillo Interior Principal */}
            <div className={`${getRingStyles('inner')} rounded-full`}></div>

            {/* Capas de Resonancia (Efecto Único para webs de marca) */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${hoveredWord === 'marca' ? 'opacity-100' : 'opacity-0'}`}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border-[0.5px] border-[#89EA2B]/30 pointer-events-none"
                        style={{
                            animation: `resonance-ripple 4s cubic-bezier(0.2, 0, 0.2, 1) infinite`,
                            animationDelay: `${i * 0.8}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Brillo de ambiente sutil (Solo cuando no es marca) */}
            <div className={`absolute inset-[-20%] bg-[#07F8F2]/5 rounded-full blur-[40px] md:blur-[150px] transition-all duration-1000 scale-100 animate-pulse-slow ${hoveredWord === 'marca' ? 'opacity-0' : 'opacity-40'}`}></div>
        </div>
    );
};
