'use client';

import { Dispatch, SetStateAction } from 'react';
import { HoverWord } from './HoverWord';
import { MANIFESTO_HEADLINES, HOVER_WORDS, TOTAL_SCAN_WORDS } from '../constants/signatureData';

interface ManifestoContentProps {
    hoveredWord: string | null;
    setHoveredWord: Dispatch<SetStateAction<string | null>>;
    handleScan: (id: string) => void;
    scannedWords: Set<string>;
    handleAllScannedClose: () => void;
}

export const ManifestoContent = ({ hoveredWord, setHoveredWord, handleScan, scannedWords, handleAllScannedClose }: ManifestoContentProps) => {

    // Helper para renderizar los títulos basados en el array de la constante
    const renderHeadlineLine = (items: typeof MANIFESTO_HEADLINES[keyof typeof MANIFESTO_HEADLINES]) => {
        return items.map((item, idx) => {
            if (item.type === 'plain') {
                return <span key={idx} className={`text-white inline-block will-change-transform ${item.animClass}`}>{item.text}</span>;
            } else {
                return (
                    <div key={idx} className={`relative inline-block will-change-transform group ${item.animClass}`}>
                        <div className={`relative bg-[#001720]/80 border px-5 py-2.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-2xl overflow-hidden`}
                            style={{
                                borderColor: `${item.color}66`, // 40% opacity hex approximation
                                boxShadow: `0 0 40px ${item.color}26` // 15% opacity hex approximation
                            }}
                        >
                            <span className="relative z-10 font-bold tracking-tight" style={{ color: item.color }}>{item.text}</span>
                            {/* Mini Brackets HUD */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-2xl" style={{ borderColor: `${item.color}99` }}></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-2xl" style={{ borderColor: `${item.color}99` }}></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-2xl" style={{ borderColor: `${item.color}99` }}></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-2xl" style={{ borderColor: `${item.color}99` }}></div>
                            {/* Brillo interno sutil */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: `${item.color}0D` }}></div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div className="relative z-10 flex flex-col items-center max-w-6xl 3xl:max-w-screen-2xl mx-auto px-6 text-center pt-8 xs:pt-10 pb-8 md:pt-0 md:pb-0 -translate-y-2 md:translate-y-4 lg:translate-y-12 xl:-translate-y-6">

            <div className="flex flex-col gap-6 md:gap-10 xl:gap-8 items-center justify-center mb-10 xs:mb-14 md:mb-16 lg:mb-20 xl:mb-4 perspective-[1000px] w-full">
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-3 gap-y-4 md:gap-8 3xl:gap-12 text-[1.4rem] xs:text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-4xl 3xl:text-[5.5rem] leading-none font-medium tracking-tight whitespace-normal md:whitespace-nowrap">
                    {renderHeadlineLine(MANIFESTO_HEADLINES.line1)}
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-x-3 gap-y-4 md:gap-8 3xl:gap-12 text-[1.2rem] xs:text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-4xl 3xl:text-[5.5rem] leading-none font-medium tracking-tight whitespace-normal md:whitespace-nowrap">
                    {renderHeadlineLine(MANIFESTO_HEADLINES.line2)}
                </div>
            </div>

            {/* Texto secundario unificado con leading-relaxed para mejor espaciado vertical */}
            <div className="flex flex-col gap-10 xs:gap-12 lg:gap-10 xl:gap-10 3xl:gap-14 text-lg xs:text-[1.3rem] sm:text-2xl md:text-2xl lg:text-[1.6rem] 3xl:text-[2.1rem] text-gray-400 font-light max-w-5xl 3xl:max-w-7xl perspective-[1000px] leading-[2.2] xs:leading-[2.4] sm:leading-[2.4] md:leading-[2.2] xl:leading-[1.8] 3xl:leading-[2.1]">
                <p className="manifesto-text-line will-change-transform opacity-0">
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}>AzzADesigns busca </span>
                    <HoverWord id={HOVER_WORDS[0].id} baseText={HOVER_WORDS[0].baseText} completionText={HOVER_WORDS[0].completionText} hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}> la web moderna.</span>
                </p>

                <p className="manifesto-text-line will-change-transform opacity-0">
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}>Buscando </span>
                    <HoverWord id={HOVER_WORDS[1].id} baseText={HOVER_WORDS[1].baseText} completionText={HOVER_WORDS[1].completionText} hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}> de un internet genérico y repetitivo </span>
                    <HoverWord id={HOVER_WORDS[2].id} baseText={HOVER_WORDS[2].baseText} completionText={HOVER_WORDS[2].completionText} hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}> con un enfoque </span>
                    <HoverWord id={HOVER_WORDS[3].id} baseText={HOVER_WORDS[3].baseText} completionText={HOVER_WORDS[3].completionText} colorClass={HOVER_WORDS[3].colorClass} hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}> donde la </span>
                    <HoverWord id={HOVER_WORDS[4].id} baseText={HOVER_WORDS[4].baseText} completionText={HOVER_WORDS[4].completionText} hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}> en cada </span>
                    <HoverWord id={HOVER_WORDS[5].id} baseText={HOVER_WORDS[5].baseText} completionText={HOVER_WORDS[5].completionText} hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} />
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}> de tu producto sea la </span>
                    <HoverWord id={HOVER_WORDS[6].id} baseText={HOVER_WORDS[6].baseText} completionText={HOVER_WORDS[6].completionText} hoveredWord={hoveredWord} setHoveredWord={setHoveredWord} onScan={handleScan} isLastScan={scannedWords.size >= TOTAL_SCAN_WORDS - 1 && !scannedWords.has('excepcion')} onAllScannedClose={handleAllScannedClose} />
                    <span className={`transition-all duration-500 ${hoveredWord ? 'opacity-20' : ''}`}> a la norma general.</span>
                </p>
            </div>

        </div>
    );
};
