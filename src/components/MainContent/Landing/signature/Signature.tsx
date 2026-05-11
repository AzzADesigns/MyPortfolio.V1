'use client';

import { useRef, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { AuroraBackground } from '../header';
import { ScanProgressHUD } from './components/ScanProgressHUD';
import { DecryptionOverlay } from './components/DecryptionOverlay';
import { ManifestoContent } from './components/ManifestoContent';
import { RewardCard } from './components/RewardCard';
import { useManifestoEntrance } from './animation/useManifestoEntrance';
import { useSignatureState } from './lib/useSignatureState';

interface SignatureProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

export const Signature = ({ containerRef }: SignatureProps) => {
    const manifestoRef = useRef<HTMLElement>(null);
    useManifestoEntrance(manifestoRef, containerRef);

    const {
        hoveredWord,
        setHoveredWord,
        scannedWords,
        allScanned,
        showRewardCard,
        setShowRewardCard,
        isOpeningReward,
        isClosingReward,
        handleRewardClose,
        handleScan,
        handleAllScannedClose,
    } = useSignatureState();

    return (
        <section ref={manifestoRef} id="lafirma" className="flex-none flex flex-col items-center justify-center relative w-full min-h-screen lg:h-screen lg:snap-start overflow-hidden bg-[#001720] py-20 lg:py-0">
            {/* Fondo animado reutilizado del header */}
            <AuroraBackground />
            
            {/* HUD: Barra de progreso de escaneo global */}
            <ScanProgressHUD 
                scannedWords={scannedWords}
                allScanned={allScanned}
                showRewardCard={showRewardCard}
                isOpeningReward={isOpeningReward}
                onShowReward={() => setShowRewardCard(true)}
            />

            {/* Indicador Cinematico de Expectativa (Decryption Overlay) */}
            {isOpeningReward && (
                <DecryptionOverlay />
            )}

            <ManifestoContent 
                hoveredWord={hoveredWord}
                setHoveredWord={setHoveredWord}
                handleScan={handleScan}
                scannedWords={scannedWords}
                handleAllScannedClose={handleAllScannedClose}
            />

            {/* Recompensa Final: Modal Card con Blur */}
            {showRewardCard && typeof window !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    style={{
                        opacity: isClosingReward ? 0 : 1,
                        transition: 'opacity 0.35s ease-in',
                    }}
                >
                    {/* Backdrop con blur profundo */}
                    <div 
                        className="absolute inset-0 bg-[#001720]/80 backdrop-blur-xl"
                        onClick={handleRewardClose}
                    ></div>
                    <RewardCard onClose={handleRewardClose} isClosing={isClosingReward} />
                </div>,
                document.body
            )}
        </section>
    );
};
