'use client';

import { useDecryptionOverlay } from '../hooks/useDecryptionOverlay';
import { DECRYPTION_LABELS } from '../constants/signatureData';

export const DecryptionOverlay = () => {
    const { overlayRef, progress } = useDecryptionOverlay();

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden">
            <div className="decryption-bg absolute inset-0 bg-[#001720]/85"></div>
            <div className="decryption-hud relative z-10 flex flex-col items-center gap-12 p-12 md:p-20">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#07F8F2]/40"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#07F8F2]/40"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#07F8F2]/40"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#07F8F2]/40"></div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    <div className="absolute inset-0 border border-[#07F8F2]/20 rounded-full"></div>
                    <div className="absolute inset-2 border-2 border-dashed border-[#07F8F2]/40 rounded-full animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute inset-6 border border-[#89EA2B]/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                    <div className="flex flex-col items-center">
                        <span className="font-mono text-[#07F8F2] text-4xl md:text-6xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(7,248,242,0.5)]">
                            {progress}%
                        </span>
                        <span className="font-mono text-[#07F8F2]/40 text-[10px] tracking-[0.3em] uppercase mt-2">{DECRYPTION_LABELS.counter}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#89EA2B] rounded-full animate-pulse shadow-[0_0_10px_#89EA2B]"></span>
                        <h3 className="font-mono text-white text-xl md:text-3xl font-bold tracking-[0.4em] uppercase">{DECRYPTION_LABELS.title}</h3>
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-[9px] md:text-xs text-[#07F8F2]/60 tracking-widest">
                        <p>{DECRYPTION_LABELS.target}</p>
                        <p>{DECRYPTION_LABELS.encryption}</p>
                        <p className="text-[#89EA2B]/60">{DECRYPTION_LABELS.status}</p>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="w-full h-[1px] bg-[#07F8F2] absolute top-1/4 animate-[scan_3s_linear_infinite]"></div>
                <div className="w-full h-[1px] bg-[#07F8F2] absolute top-3/4 animate-[scan_3s_linear_infinite_reverse]"></div>
            </div>
        </div>
    );
};
