import { useState, useEffect } from 'react';
import { TOTAL_SCAN_WORDS, TIMING } from '../constants/signatureData';

/**
 * Hook que maneja todo el estado de la sección Signature:
 * - Tracking de palabras escaneadas (hoveredWord, scannedWords)
 * - Estado del reward card (showRewardCard, isOpeningReward, etc.)
 * - Lógica de fallback para disparar la recompensa automáticamente
 * - Handlers: handleScan, handleRewardClose, handleAllScannedClose
 */
export const useSignatureState = () => {
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);
    const [scannedWords, setScannedWords] = useState<Set<string>>(new Set());
    const [showRewardCard, setShowRewardCard] = useState(false);
    const [isOpeningReward, setIsOpeningReward] = useState(false);
    const [hasSeenReward, setHasSeenReward] = useState(false);
    const [isClosingReward, setIsClosingReward] = useState(false);

    const allScanned = scannedWords.size === TOTAL_SCAN_WORDS;

    const handleRewardClose = () => {
        setIsClosingReward(true);
        setTimeout(() => {
            setShowRewardCard(false);
            setIsClosingReward(false);
        }, TIMING.rewardCloseTransition);
    };

    const handleScan = (id: string) => {
        setScannedWords(prev => new Set(prev).add(id));
    };

    const handleAllScannedClose = () => {
        // Disparado desde el último tooltip en móvil al cerrarse
        if (!hasSeenReward) {
            setIsOpeningReward(true);
            setTimeout(() => {
                setIsOpeningReward(false);
                setShowRewardCard(true);
                setHasSeenReward(true);
            }, TIMING.rewardOpenDelay);
        }
    };

    // Fallback: disparar recompensa automáticamente si se escanearon todas
    useEffect(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
        if (allScanned && !hasSeenReward) {
            const delay = isMobile ? TIMING.rewardMobileTriggerDelay : TIMING.rewardDesktopTriggerDelay;
            const delayTimer = setTimeout(() => {
                setIsOpeningReward(true);
                const finalTimer = setTimeout(() => {
                    setIsOpeningReward(false);
                    setShowRewardCard(true);
                    setHasSeenReward(true);
                }, TIMING.rewardOpenDelay);
                return () => clearTimeout(finalTimer);
            }, delay);
            return () => clearTimeout(delayTimer);
        }
    }, [allScanned, hasSeenReward]);

    return {
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
    };
};
