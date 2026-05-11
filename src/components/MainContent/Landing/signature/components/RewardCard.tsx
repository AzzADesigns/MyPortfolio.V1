'use client';

import { createPortal } from 'react-dom';
import { FiChevronDown } from 'react-icons/fi';
import { BinaryMatrix } from './BinaryMatrix';
import { CTAButton } from '../../shared';
import { useRewardCard } from '../hooks/useRewardCard';
import { REWARD_CARD_LABELS, REWARD_CARD_META } from '../constants/signatureData';

// --- Sub-componente RewardCard para manejo de animaciones complejas ---
export const RewardCard = ({ onClose, isClosing = false }: { onClose: () => void, isClosing?: boolean }) => {
    const {
        cardRef,
        contentRef,
        sessionId,
        mounted,
        isMobileRender,
        cardStyle,
        contentStyle,
    } = useRewardCard(isClosing);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            {/* Backdrop mejorado con blur animado en CSS para móvil */}
            <div
                className="absolute inset-0 bg-[#001720]/80 transition-all duration-300 pointer-events-auto"
                style={{
                    opacity: isClosing ? 0 : 1,
                }}
                onClick={onClose}
            ></div>

            <div
                ref={cardRef}
                style={cardStyle}
                className={`relative z-10 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl bg-[#001720]/95 border border-[#07F8F2]/30 p-5 md:p-16 lg:p-20 2xl:p-24 rounded-xl shadow-[0_0_120px_rgba(7,248,242,0.15)] overflow-hidden pointer-events-auto`}
            >
                {/* Decoraciones de Esquina HUD */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#07F8F2]/60 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#07F8F2]/60 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#07F8F2]/60 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#07F8F2]/60 rounded-br-xl"></div>

                {/* Botón de Cierre */}
                <button onClick={onClose} className="absolute top-6 right-6 text-[#07F8F2]/40 hover:text-[#07F8F2] transition-colors z-50 p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Metadatos Técnicos */}
                <div className="absolute top-8 left-8 hidden md:flex flex-col gap-1 font-outfit text-[10px] text-[#07F8F2]/40 tracking-widest">
                    {REWARD_CARD_META.topLeft.map((text, i) => <span key={i}>{text}</span>)}
                </div>

                <div className="absolute bottom-8 right-8 hidden md:flex flex-col gap-1 font-outfit text-[10px] text-[#07F8F2]/40 tracking-widest text-right">
                    <span>Timestamp: {new Date().toISOString().split('T')[0]}</span>
                    <span>Session_id: {sessionId}</span>
                    {REWARD_CARD_META.bottomRight.map((text, i) => <span key={i}>{text}</span>)}
                </div>

                <div
                    ref={contentRef}
                    className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-20 pt-10 md:pt-0"
                    style={contentStyle}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-1.5 md:gap-3 text-[#89EA2B] font-syne text-[9px] xs:text-xs md:text-base 2xl:text-xl tracking-widest md:tracking-[0.4em] animate-pulse font-bold uppercase">
                            <span className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#89EA2B] shadow-[0_0_15px_#89EA2B]"></span>
                            {REWARD_CARD_LABELS.tagline}
                        </div>
                        <div className="h-[1px] w-48 md:w-64 bg-gradient-to-r from-transparent via-[#07F8F2]/40 to-transparent"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-12 xl:gap-24 2xl:gap-32 w-full">
                        {/* Bloque de Matriz Binaria Cibernética (Estática) */}
                        <div className="flex flex-col items-center lg:items-end order-2 lg:order-1 relative group w-full lg:w-auto h-[150px] md:h-[300px] 2xl:h-[400px]">
                            <div className="absolute -top-8 lg:-right-4 text-[#07F8F2]/30 font-outfit text-[10px] tracking-[0.5em] z-20">{REWARD_CARD_LABELS.dataStreamLabel}</div>

                            <div className="relative w-full lg:w-[320px] xl:w-[450px] 2xl:w-[600px] h-full overflow-hidden">
                                <BinaryMatrix />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#001720] via-transparent to-[#001720] z-10 pointer-events-none opacity-90"></div>
                            </div>

                            <div className="mt-4 lg:mt-6 h-[2px] w-full bg-gradient-to-l from-[#07F8F2]/60 to-transparent"></div>
                        </div>

                        <div className="flex flex-col items-center gap-6 order-1 lg:order-2">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-[#07F8F2]/50 font-syne text-[10px] xl:text-xs 2xl:text-base tracking-[0.15em] xl:tracking-[0.2em] mb-1 text-center">{REWARD_CARD_LABELS.subtitle}</p>
                                <div className="w-12 h-[2px] bg-[#89EA2B]/40"></div>
                            </div>
                            <CTAButton
                                text={REWARD_CARD_LABELS.ctaText}
                                className="!px-14 md:!px-20 !py-6 md:!py-8 shadow-[0_0_50px_rgba(137,234,43,0.2)] hover:shadow-[0_0_80px_rgba(7,248,242,0.4)]"
                            />
                        </div>
                    </div>

                    {/* Botón de Scroll Automático Maqueteado */}
                    <div onClick={onClose} className="mt-12 flex flex-col items-center gap-3 group/scroll cursor-pointer">
                        <span className="text-[#07F8F2]/40 text-[10px] tracking-[0.4em] group-hover/scroll:text-[#07F8F2] transition-colors">{REWARD_CARD_LABELS.scrollLabel}</span>
                        <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#07F8F2]/20 bg-[#07F8F2]/5 backdrop-blur-sm group-hover/scroll:border-[#07F8F2]/60 group-hover/scroll:bg-[#07F8F2]/10 transition-all duration-500">
                            <FiChevronDown size={24} className="text-[#07F8F2] animate-bounce" />
                            <div className="absolute inset-0 rounded-full bg-[#07F8F2]/20 blur-xl opacity-0 group-hover/scroll:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
