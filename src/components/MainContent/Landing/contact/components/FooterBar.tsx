'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_LINKS } from '../../header/validation/constants/validationData';

export const FooterBar = () => {
    return (
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-24 lg:pt-0 mt-auto">
            {/* Redes Sociales Mobile/Tablet — mismo estilo que el header */}
            <div className="flex xl:hidden items-center gap-6">
                {SOCIAL_LINKS.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative group hover:scale-110 active:scale-75 ${link.activeClass} transition-all duration-300 block w-[32px] h-[32px]`}
                    >
                        <Image src={link.icon} alt={link.name} fill sizes="32px" className="object-contain group-hover:opacity-0 transition-opacity duration-300" />
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-move"
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)',
                                WebkitMaskImage: `url('${link.icon}')`,
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                                maskImage: `url('${link.icon}')`,
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center'
                            }}
                        />
                    </Link>
                ))}
            </div>

            {/* Powered By */}
            <div className="flex items-center gap-3 opacity-60 xl:ml-auto">
                <span className="text-white/50 text-sm tracking-widest uppercase font-light">Powered By</span>
                <Image src="/branding/AzzADesigns_logo.png" alt="AzzADesigns" width={140} height={40} className="opacity-80" />
            </div>
        </div>
    );
};
