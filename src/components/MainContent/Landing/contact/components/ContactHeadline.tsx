'use client';

import Image from 'next/image';
import { sora } from '../../shared';

export const ContactHeadline = () => {
    return (
        <div className="w-full lg:w-[50%] xl:w-[55%] flex flex-col items-center xl:items-center lg:justify-end order-1 lg:order-2 gap-10 lg:gap-14">
            <h2 className={`text-center text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight ${sora.className}`}>
                Trabajemos juntos<br />
                para lograr que tu<br />
                producto tenga una<br />
                <span className="text-[#89EA2B]">web de marca</span>
            </h2>

            {/* Redes Sociales Desktop (xl+) */}
            <div className="hidden xl:flex items-center justify-center gap-12 w-full pt-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 hover:scale-110 transition-all duration-300 contact-social-reveal">
                    <Image src="/branding/in.svg" alt="LinkedIn" width={64} height={64} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 hover:scale-110 transition-all duration-300 contact-social-reveal">
                    <Image src="/branding/ticktok.svg" alt="TikTok" width={64} height={64} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 hover:scale-110 transition-all duration-300 contact-social-reveal">
                    <Image src="/branding/instagram.svg" alt="Instagram" width={64} height={64} />
                </a>
            </div>
        </div>
    );
};
