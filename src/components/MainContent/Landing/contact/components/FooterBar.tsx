'use client';

import Image from 'next/image';

export const FooterBar = () => {
    return (
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-24 lg:pt-0 mt-auto">
            {/* Redes Sociales Mobile/Tablet */}
            <div className="flex xl:hidden items-center gap-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <Image src="/branding/in.svg" alt="LinkedIn" width={32} height={32} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <Image src="/branding/ticktok.svg" alt="TikTok" width={32} height={32} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <Image src="/branding/instagram.svg" alt="Instagram" width={32} height={32} />
                </a>
            </div>

            {/* Powered By */}
            <div className="flex items-center gap-3 opacity-60 xl:ml-auto">
                <span className="text-white/50 text-sm tracking-widest uppercase font-light">Powered By</span>
                <Image src="/branding/AzzADesigns.svg" alt="AzzADesigns" width={140} height={40} className="opacity-80" />
            </div>
        </div>
    );
};
