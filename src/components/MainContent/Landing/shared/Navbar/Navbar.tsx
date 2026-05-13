import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { HiMenu, HiX, HiOutlineLightningBolt, HiOutlineCog, HiOutlinePencil, HiOutlineStar } from 'react-icons/hi';
import { NAV_LINKS } from './constants/navLinks';
import { animateMobileMenu, initNavbarScroll, initBackgroundDetection } from './animation/navbarAnimation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLight, setIsLight] = useState(false);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        initNavbarScroll();
        const cleanupDetection = initBackgroundDetection(navRef.current, setIsLight);
        return cleanupDetection;
    }, []);

    useGSAP(() => {
        animateMobileMenu(isMenuOpen, overlayRef.current, menuContentRef.current);
    }, { dependencies: [isMenuOpen] });

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav 
                ref={navRef}
                className="flex items-center justify-between fixed z-50 bottom-4 inset-x-4 lg:inset-x-0 lg:top-0 lg:bottom-auto lg:w-full px-4 md:px-8 lg:px-16 py-2 md:py-3 lg:py-6 transition-all duration-500 rounded-2xl lg:rounded-none border border-white/10 lg:border-none shadow-lg shadow-black/20 lg:shadow-none pointer-events-none backdrop-blur-md bg-black/10 lg:backdrop-blur-none lg:bg-transparent"
            >
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4 gsap-nav pointer-events-auto">
                    <Image
                        src="/branding/AzzADesigns.svg"
                        alt="AzzADesigns Logo"
                        width={60}
                        height={60}
                        className="object-contain w-[40px] h-[40px] md:w-[48px] md:h-[48px] lg:w-[60px] lg:h-[60px]  2xl:w-[40px]  3xl:w-[60px] 2xl:h-[40px]  3xl:h-[60px] "
                    />
                    <p
                        className={`text-[1.6rem] md:text-[1.8rem] lg:text-[2.2rem] transition-colors duration-300 ${isLight ? 'text-[#001720]' : 'text-white'}`}
                        style={{
                            fontFamily: 'var(--font-momo)',
                            letterSpacing: '0',
                            fontVariantLigatures: 'no-common-ligatures'
                        }}
                    >
                        <span style={{ 
                            color: '#89EA2B',
                            WebkitTextStroke: isLight ? '1px #001720' : '0px transparent',
                            WebkitTextFillColor: '#89EA2B'
                        }}>A</span>zzA
                        <span style={{ 
                            color: '#89EA2B',
                            WebkitTextStroke: isLight ? '1px #001720' : '0px transparent',
                            WebkitTextFillColor: '#89EA2B'
                        }}>D</span>esigns
                    </p>
                </div>

                <div className={`hidden lg:flex items-center gap-8 text-sm font-medium transition-colors duration-300 gsap-nav pointer-events-auto ${isLight ? 'text-[#001720]/70' : 'text-gray-400'}`}>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                active:scale-90 transition-all duration-300 inline-block
                                hover:bg-gradient-to-r hover:from-brand-green hover:to-brand-cyan hover:bg-clip-text hover:text-transparent hover:animate-gradient-move
                                data-[hover=true]:bg-gradient-to-r data-[hover=true]:from-brand-green data-[hover=true]:to-brand-cyan data-[hover=true]:bg-clip-text data-[hover=true]:text-transparent data-[hover=true]:animate-gradient-move
                            `}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/portfolio"
                        className={`
                            border px-4 py-1.5 rounded-full active:scale-90 transition-all duration-300 inline-block
                            border-white/20 
                            ${isLight ? 'text-[#001720] border-[#001720]/20' : 'text-white border-white/20'}
                            hover:border-transparent hover:bg-gradient-to-r hover:from-brand-green hover:to-brand-cyan hover:text-brand-dark hover:animate-gradient-move
                            data-[hover=true]:border-transparent data-[hover=true]:bg-gradient-to-r data-[hover=true]:from-brand-green data-[hover=true]:to-brand-cyan data-[hover=true]:text-brand-dark data-[hover=true]:animate-gradient-move
                        `}
                    >
                        Portfolio
                    </Link>
                </div>

                <div className="lg:hidden flex items-center gsap-nav pointer-events-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`transition-all duration-300 cursor-pointer z-[60] relative active:scale-75 active:rotate-180 ${isLight ? 'text-[#001720]' : 'text-white'} hover:text-[#89EA2B]`}
                    >
                        {isMenuOpen ? <HiX size={32} /> : <HiMenu size={32} />}
                    </button>
                </div>
            </nav>

            <div className="lg:hidden">
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-40 bg-black/60 opacity-0 invisible"
                    onClick={() => setIsMenuOpen(false)}
                />

                <div
                    ref={menuContentRef}
                    className="fixed inset-x-4 bottom-[85px] md:bottom-[95px] z-50 opacity-0 invisible translate-y-[50px]"
                >
                    <div className="bg-[#001720]/95 border border-white/10 p-4 rounded-[2rem] shadow-2xl flex flex-col gap-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {NAV_LINKS.map((link) => {
                                const isGreen = link.label === "Servicios" || link.label === "Metodología";
                                const Icon = link.label === "Servicios" ? HiOutlineLightningBolt :
                                    link.label === "Metodología" ? HiOutlineCog :
                                        link.label === "La firma" ? HiOutlinePencil :
                                            HiOutlineStar;

                                return (
                                    <Link
                                        key={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        href={link.href}
                                        className={`mobile-link flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-2xl py-6 text-white transition-all duration-200 group ${isGreen ? 'hover:bg-brand-green/20 hover:border-brand-green/50 active:bg-brand-green/30' : 'hover:bg-brand-cyan/20 hover:border-brand-cyan/50 active:bg-brand-cyan/30'} active:scale-90`}
                                    >
                                        <Icon className={`${isGreen ? 'text-brand-green' : 'text-brand-cyan'} text-3xl mb-2 group-hover:scale-110 transition-transform ${link.label === "Metodología" ? 'group-active:rotate-90' : link.label === "Destacados" ? 'group-active:scale-150' : 'group-active:-rotate-12'}`} />
                                        <span className="text-sm font-bold">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                        <Link onClick={() => setIsMenuOpen(false)} href="/portfolio" className="mobile-link mobile-cta mt-2 w-full flex items-center justify-center bg-gradient-to-r from-brand-green to-brand-cyan rounded-2xl py-4 text-brand-dark text-lg font-extrabold shadow-[0_0_20px_rgba(137,234,43,0.2)] hover:shadow-[0_0_30px_rgba(137,234,43,0.5)] active:scale-95 active:shadow-none active:opacity-20 transition-all duration-200">
                            Explorar Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
