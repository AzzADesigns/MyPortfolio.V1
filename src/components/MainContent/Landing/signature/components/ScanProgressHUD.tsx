'use client';

import { FiLinkedin, FiGithub, FiInstagram, FiEye } from 'react-icons/fi';
import { HUD_LABELS, SOCIAL_LINKS, TOTAL_SCAN_WORDS } from '../constants/signatureData';

interface ScanProgressHUDProps {
    scannedWords: Set<string>;
    allScanned: boolean;
    showRewardCard: boolean;
    isOpeningReward: boolean;
    onShowReward: () => void;
}

export const ScanProgressHUD = ({ scannedWords, allScanned, showRewardCard, isOpeningReward, onShowReward }: ScanProgressHUDProps) => {
    return (
        <div 
            onClick={allScanned ? onShowReward : undefined}
            className={`absolute top-24 left-1/2 -translate-x-1/2 md:top-36 md:left-12 md:translate-x-0 xl:top-auto xl:bottom-12 xl:left-1/2 xl:-translate-x-1/2 z-20 flex flex-col xl:flex-col-reverse gap-3 xl:gap-0.5 font-outfit text-[#07F8F2] text-[8px] md:text-xs tracking-[0.2em] w-[85%] md:w-auto xl:w-[420px] xl:bg-[#001720]/40 xl:backdrop-blur-md xl:px-5 xl:py-2 xl:rounded-2xl xl:border xl:border-[#07F8F2]/20 xl:shadow-[0_0_50px_rgba(7,248,242,0.05)] transition-all duration-700 
            ${allScanned ? 'cursor-pointer hover:border-[#07F8F2]/50 hover:bg-[#001720]/60 active:scale-95 group/hud' : ''}`}
        >
            <div className="flex justify-between items-center w-full">
                <span className="flex items-center gap-1.5 md:gap-3">
                    <span className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full ${allScanned ? 'bg-[#89EA2B] shadow-[0_0_15px_#89EA2B]' : 'bg-[#07F8F2] animate-pulse shadow-[0_0_10px_#07F8F2]'}`}></span>
                    <span className="text-[6px] md:text-[10px] xl:text-sm xl:font-bold">
                        {showRewardCard || allScanned ? HUD_LABELS.missionComplete : HUD_LABELS.cursorExperience}
                    </span>
                </span>
                <span className={`text-xs md:text-base xl:text-xl font-bold tracking-tight ${allScanned ? 'text-[#89EA2B]' : 'text-[#07F8F2] text-shadow-[0_0_10px_rgba(7,248,242,0.5)]'}`}>
                    {Math.round((scannedWords.size / TOTAL_SCAN_WORDS) * 100)}%
                </span>
            </div>
            <div className="w-full h-[2px] md:h-[4px] xl:h-[6px] bg-white/10 rounded-full overflow-hidden">
                <div 
                    className={`h-full bg-gradient-to-r from-[#07F8F2] via-[#07F8F2] to-[#89EA2B] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(7,248,242,0.8)]`}
                    style={{ width: `${(scannedWords.size / TOTAL_SCAN_WORDS) * 100}%` }}
                ></div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#07F8F2]/40 font-bold mt-1 xl:mt-0 xl:mb-0">
                <div className="flex flex-col gap-1">
                    <span>
                        {allScanned 
                            ? HUD_LABELS.manifestoUnlocked 
                            : isOpeningReward 
                                ? HUD_LABELS.decrypting 
                                : HUD_LABELS.waitingExploration}
                    </span>
                    <div className="flex items-center gap-5 mt-3 xl:mt-1 opacity-60 group-hover/hud:opacity-100 transition-opacity">
                        {SOCIAL_LINKS.map(link => (
                            <a key={link.icon} href={link.href} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full hover:text-[#07F8F2] transition-all">
                                {link.icon === 'linkedin' && <FiLinkedin size={14} />}
                                {link.icon === 'github' && <FiGithub size={14} />}
                                {link.icon === 'instagram' && <FiInstagram size={14} />}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                    <span>{isOpeningReward ? HUD_LABELS.statusInProgress : HUD_LABELS.versionStable}</span>
                    {allScanned && (
                        <div className="mt-2 text-[#89EA2B] animate-pulse">
                            <FiEye size={18} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
