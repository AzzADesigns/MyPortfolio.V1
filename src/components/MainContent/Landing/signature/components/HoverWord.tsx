'use client';

import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { useHoverWord } from '../hooks/useHoverWord';

export const HoverWord = ({
    id,
    baseText,
    completionText,
    colorClass = "text-white",
    hoveredWord,
    setHoveredWord,
    onScan,
    isLastScan = false,
    onAllScannedClose,
}: {
    id: string,
    baseText: string,
    completionText: string,
    colorClass?: string,
    hoveredWord: string | null,
    setHoveredWord: Dispatch<SetStateAction<string | null>>,
    onScan: (id: string) => void,
    isLastScan?: boolean,
    onAllScannedClose?: () => void,
}) => {
    const {
        tooltipRef,
        scanRef,
        wordContentRef,
        mounted,
        isHovered,
        isOtherHovered,
        isScanned,
        displayedText,
        tooltipVisible,
        tooltipPos,
        tooltipLabels,
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
        handleClick,
    } = useHoverWord({
        id,
        completionText,
        hoveredWord,
        setHoveredWord,
        onScan,
        isLastScan,
        onAllScannedClose,
    });

    return (
        <strong
            role="button"
            className={`manifesto-highlight inline-block font-medium relative z-20 transition-all duration-500 cursor-pointer
                ${colorClass} 
                ${isHovered ? 'scale-110 -translate-y-1' : ''} 
                ${isOtherHovered ? 'blur-[4px] opacity-40' : ''}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <span
                ref={wordContentRef}
                className={`inline-block relative z-10 transition-all duration-500 ${!isScanned ? 'hover-word-hint' : ''
                    } ${isScanned
                        ? (id === 'premium'
                            ? 'bg-gradient-to-r from-[#07F8F2] to-[#89EA2B] bg-clip-text text-transparent font-bold'
                            : 'text-[#07F8F2]')
                        : ''
                    }`}
            >
                {baseText}
            </span>

            {/* Láser de Escaneo Holo-óptico */}
            <span
                ref={scanRef}
                className="absolute top-0 left-0 w-1 md:w-[6px] h-full bg-[#07F8F2] opacity-0 pointer-events-none z-30"
                style={{
                    boxShadow: '0 0 15px 3px rgba(7,248,242,0.8), 0 0 30px 8px rgba(137,234,43,0.4)',
                    borderRadius: '4px'
                }}
            ></span>

            {/* Panel HUD proyectado al Root */}
            {mounted && createPortal(
                <>
                    {/* Backdrop para cerrar al tocar fuera en Mobile */}
                    {isHovered && window.innerWidth < 1024 && (
                        <div
                            className="fixed inset-0 z-[9998]"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMouseLeave();
                            }}
                        />
                    )}

                    <span
                        ref={tooltipRef}
                        className={`fixed w-max max-w-[260px] md:max-w-[480px] 3xl:max-w-[500px] whitespace-normal text-left px-4 md:px-8 py-3 md:py-6 bg-[#001720]/95 backdrop-blur-2xl border border-[#07F8F2]/30 text-[#07F8F2] font-mono pointer-events-none z-[9999] uppercase rounded-md
                        shadow-[0_0_50px_rgba(7,248,242,0.2),inset_0_0_20px_rgba(7,248,242,0.05)]
                        ${window.innerWidth >= 1024 ? 'top-0 left-0 opacity-0' : ''}
                    `}
                        style={window.innerWidth < 1024 ? {
                            left: `${tooltipPos.x}px`,
                            top: `${tooltipPos.y}px`,
                            opacity: tooltipVisible ? 1 : 0,
                            transform: tooltipVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
                            transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                            willChange: 'opacity, transform',
                            transformOrigin: 'center bottom',
                        } : { transformOrigin: '0 0' }}
                    >
                        {/* Láser conector - Solo en 3XL */}
                        <svg className="absolute top-0 left-0 w-full h-full overflow-visible transition-opacity duration-300 opacity-0 3xl:opacity-100">
                            <line x1="-40" y1="-40" x2="0" y2="0" stroke="#07F8F2" strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
                            <circle cx="-40" cy="-40" r="3" fill="#07F8F2" className="animate-pulse" />
                            <circle cx="0" cy="0" r="2" fill="#89EA2B" />
                        </svg>

                        {/* Header HUD */}
                        <span className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-xs mb-2 md:mb-3 opacity-90 tracking-[0.15em] md:tracking-[0.2em] font-sans font-bold"
                            style={{ color: isLastScan ? '#07F8F2' : '#89EA2B' }}
                        >
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-sm animate-pulse"
                                style={{ backgroundColor: isLastScan ? '#07F8F2' : '#89EA2B' }}
                            ></span>
                            {isLastScan ? tooltipLabels.lastScanHeader : tooltipLabels.normalHeader}
                        </span>

                        {/* Barra de progreso solo en el último escaneo en móvil */}
                        {isLastScan && window.innerWidth < 1024 && (
                            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-2">
                                <div
                                    className="h-full bg-[#07F8F2] rounded-full"
                                    style={{ animation: 'fillBar 2.3s linear forwards' }}
                                />
                            </div>
                        )}

                        {/* Texto Typewriter */}
                        <span className="block text-xs md:text-xl lg:text-base xl:text-base 3xl:text-[1.2rem] font-semibold leading-snug tracking-tight min-h-[1.2em] md:min-h-[1.5em]">
                            {displayedText}
                            <span className="animate-pulse inline-block ml-1 md:ml-2 bg-[#07F8F2] w-1.5 md:w-2.5 h-3 md:h-6 translate-y-0.5 md:translate-y-1.5"></span>
                        </span>

                        {/* Esquinas HUD */}
                        <span className="absolute top-0 right-0 w-4 md:w-6 h-4 md:h-6 border-t-2 border-r-2 border-[#89EA2B]/50"></span>
                        <span className="absolute bottom-0 left-0 w-4 md:w-6 h-4 md:h-6 border-b-2 border-l-2 border-[#89EA2B]/50"></span>
                        <span className="absolute bottom-0 right-0 w-4 md:w-6 h-4 md:h-6 border-b-2 border-r-2 border-[#89EA2B]/50"></span>
                    </span>
                </>,
                document.body
            )}
        </strong>
    );
};
