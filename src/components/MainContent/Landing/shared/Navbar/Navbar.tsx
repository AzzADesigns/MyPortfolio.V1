import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { HiMenu, HiX, HiOutlineLightningBolt, HiOutlineCog, HiOutlinePencil, HiOutlineStar } from 'react-icons/hi';
import { NAV_LINKS } from './constants/navLinks';
import { animateMobileMenu, initNavbarScroll } from './animation/navbarAnimation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        initNavbarScroll();
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
            <nav className="flex items-center justify-between fixed z-50 bottom-4 inset-x-4 lg:inset-x-auto lg:top-0 lg:bottom-auto lg:w-full px-4 md:px-8 lg:px-16 py-2 md:py-3 lg:py-5 bg-[#001720]/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none rounded-2xl lg:rounded-none border border-white/10 lg:border-transparent shadow-lg shadow-black/20 lg:shadow-none">
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4 gsap-nav">
                    <Image
                        src="/branding/AzzADesigns.svg"
                        alt="AzzADesigns Logo"
                        width={60}
                        height={60}
                        className="object-contain w-[40px] h-[40px] md:w-[48px] md:h-[48px] lg:w-[60px] lg:h-[60px]"
                    />
                    <p
                        className="text-white text-[1.6rem] md:text-[1.8rem] lg:text-[2.2rem]"
                        style={{
                            fontFamily: 'var(--font-momo)',
                            letterSpacing: '0',
                            fontVariantLigatures: 'no-common-ligatures'
                        }}
                    >
                        <span style={{ color: '#89EA2B' }}>A</span>zzA
                        <span style={{ color: '#89EA2B' }}>D</span>esigns
                    </p>
                </div>

                <div className="hidden lg:flex items-center gap-8 text-sm text-gray-400 font-medium gsap-nav">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`hover:text-white active:scale-90 transition-all duration-200 inline-block ${link.href.includes('destacados') || link.href.includes('firma') ? 'active:text-[#22d3ee]' : 'active:text-[#89EA2B]'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/portfolio"
                        className="text-white border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/10 active:scale-90 active:bg-white active:text-[#001720] transition-all duration-200 inline-block"
                    >
                        Portfolio
                    </Link>
                </div>

                <div className="lg:hidden flex items-center gsap-nav">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white hover:text-[#89EA2B] active:scale-75 active:rotate-180 transition-all duration-300 cursor-pointer z-[60] relative"
                    >
                        {isMenuOpen ? <HiX size={32} /> : <HiMenu size={32} />}
                    </button>
                </div>
            </nav>

            <div className="lg:hidden">
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] opacity-0 invisible"
                    onClick={() => setIsMenuOpen(false)}
                />

                <div
                    ref={menuContentRef}
                    className="fixed inset-x-4 bottom-[85px] md:bottom-[95px] z-50 opacity-0 invisible translate-y-[50px]"
                >
                    <div className="bg-[#001720]/80 backdrop-blur-md border border-white/10 p-4 rounded-[2rem] shadow-2xl flex flex-col gap-3">
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
                                        className={`mobile-link flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-2xl py-6 text-white transition-all duration-200 group ${isGreen ? 'hover:bg-[#89EA2B]/20 hover:border-[#89EA2B]/50 active:bg-[#89EA2B]/30' : 'hover:bg-[#22d3ee]/20 hover:border-[#22d3ee]/50 active:bg-[#22d3ee]/30'} active:scale-90`}
                                    >
                                        <Icon className={`${isGreen ? 'text-[#89EA2B]' : 'text-[#22d3ee]'} text-3xl mb-2 group-hover:scale-110 transition-transform ${link.label === "Metodología" ? 'group-active:rotate-90' : link.label === "Destacados" ? 'group-active:scale-150' : 'group-active:-rotate-12'}`} />
                                        <span className="text-sm font-bold">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                        <Link onClick={() => setIsMenuOpen(false)} href="/portfolio" className="mobile-link mobile-cta mt-2 w-full flex items-center justify-center bg-gradient-to-r from-[#4ade80] to-[#22d3ee] rounded-2xl py-4 text-[#001720] text-lg font-extrabold shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] active:scale-95 active:shadow-none active:opacity-20 transition-all duration-200">
                            Explorar Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
