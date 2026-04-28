'use client';

import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Sora } from 'next/font/google';
import { FaLinkedin, FaTiktok, FaInstagram } from 'react-icons/fa';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    display: 'swap',
});

const momoSignature = localFont({
    src: '../../../../public/fonts/MomoSignature-Regular.ttf',
    variable: '--font-momo',
    display: 'swap',
});

export const Landing = () => {
    return (
        <div
            className={`min-h-screen w-full flex flex-col overflow-x-hidden ${momoSignature.variable} ${sora.variable}`}
            style={{
                background: 'linear-gradient(160deg, #061828 0%, #071e35 55%, #081528 100%)',
                fontFamily: 'var(--font-sora), sans-serif'
            }}
        >
            {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
            <nav className="flex items-center justify-between px-8 md:px-16 py-5 w-full">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <Image
                        src="/branding/AzzADesigns.svg"
                        alt="AzzADesigns Logo"
                        width={60}
                        height={60}
                        className="object-contain"
                    />
                    <p
                        className="text-white"
                        style={{
                            fontFamily: 'var(--font-momo)',
                            fontSize: '2.2rem',
                            letterSpacing: '0',
                            fontVariantLigatures: 'no-common-ligatures'
                        }}
                    >
                        <span style={{ color: '#89EA2B' }}>A</span>zzA
                        <span style={{ color: '#89EA2B' }}>D</span>esigns
                    </p>
                </div>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
                    <Link href="#servicios" className="hover:text-white transition-colors duration-200">Servicios</Link>
                    <Link href="#metodologia" className="hover:text-white transition-colors duration-200">Metodología</Link>
                    <Link href="#firma" className="hover:text-white transition-colors duration-200">La firma</Link>
                    <Link href="#destacados" className="hover:text-white transition-colors duration-200">Destacados</Link>
                    <Link
                        href="/portfolio"
                        className="text-white border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
                    >
                        Portfolio
                    </Link>
                </div>
            </nav>

            {/* ─── HERO ───────────────────────────────────────────────────────── */}
            <section className="flex-1 flex items-center justify-between px-8 md:px-16 py-10 gap-8">

                {/* ── Columna Izquierda: Texto ──────────────────────────────────── */}
                <div className="flex flex-col gap-20 max-w-[580px] flex-shrink-0">
                    <h1 className="text-5xl xl:text-[64px]  leading-20 text-white">
                        El puente entre<br />
                        la{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee)' }}
                        >
                            idea
                        </span>{' '}
                        y<br />
                        el{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #4ade80, #22d3ee)' }}
                        >
                            producto
                        </span>
                    </h1>

                    <p className="text-[#D7D7D7] text-[15px] -tracking-tighter leading-10 xl:max-w-[438px]">
                        Construyo productos digitales de alto rendimiento.
                        Desde la optimización inicial y el diseño UX/UI, hasta
                        la escalabilidad y el mantenimiento constante
                        para que tu idea nunca deje de avanzar
                    </p>

                    <button
                        className="w-fit px-7 py-5 text-[18px] font-extrabold -tracking-tighter text-[#001720] rounded-[16px] bg-[#89EA2B]">
                        Empezar mi proyecto hoy
                    </button>
                </div>

                {/* ── Columna Central: Imágenes flotantes ───────────────────────── */}
                <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: '460px' }}>

                    {/* Imagen izquierda — olab1 */}
                    <div
                        className="absolute shadow-2xl rounded-xl overflow-hidden transition-transform duration-500 hover:scale-105"
                        style={{
                            transform: 'rotate(2deg) translate(-250px, -60px)',
                            zIndex: 2,
                            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
                            width: '450px',
                        }}
                    >
                        <Image
                            src="/olab1.jpg"
                            alt="OpenLabs project"
                            width={300}
                            height={185}
                            className="rounded-xl object-cover w-full h-auto"
                        />
                    </div>

                    {/* Imagen derecha — eve1 */}
                    <div
                        className="absolute shadow-2xl rounded-xl overflow-hidden transition-transform duration-500 hover:scale-105"
                        style={{
                            transform: 'rotate(14deg) translate(-10px, -110px)',
                            zIndex: 1,
                            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
                            width: '450px',
                        }}
                    >
                        <Image
                            src="/eve1.webp"
                            alt="Evelazquez project"
                            width={270}
                            height={168}
                            className="rounded-xl object-cover w-full h-auto"
                        />
                    </div>

                    {/* Imagen frontal central — cem29 */}
                    <div
                        className="absolute shadow-2xl rounded-xl overflow-hidden transition-transform duration-500 hover:scale-105"
                        style={{
                            transform: 'rotate(-3deg) translate(0px, 110px)',
                            zIndex: 3,
                            boxShadow: '0 35px 80px rgba(0,0,0,0.8)',
                            width: '450px',
                        }}
                    >
                        <Image
                            src="/cem29.webp"
                            alt="CEM Elearning project"
                            width={310}
                            height={193}
                            className="rounded-xl object-cover w-full h-auto"
                        />
                    </div>

                    {/* Scroll indicator */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                        style={{ zIndex: 10 }}
                    >
                        {/* Semicírculo decorativo */}
                        <div
                            className="w-20 h-10 border-b-2 border-l-2 border-r-2 rounded-b-full"
                            style={{ borderColor: '#4ade80' }}
                        />
                        <span
                            className="text-2xl font-light animate-bounce"
                            style={{ color: '#4ade80', marginTop: '-4px' }}
                        >
                            ↓
                        </span>
                    </div>
                </div>

                {/* ── Columna Derecha: Stats + Sociales ────────────────────────── */}
                <div className="flex flex-col gap-10 items-end flex-shrink-0">
                    {/* Stat 1 */}
                    <div className="text-right">
                        <p
                            className="text-5xl xl:text-6xl font-extrabold"
                            style={{ color: '#22d3ee' }}
                        >
                            +3 Años
                        </p>
                        <p className="text-gray-400 text-base mt-1">De especialización</p>
                    </div>

                    {/* Separador */}
                    <div className="w-20 h-px bg-white/10 self-end" />

                    {/* Stat 2 */}
                    <div className="text-right">
                        <p
                            className="text-5xl xl:text-6xl font-extrabold"
                            style={{ color: '#22d3ee' }}
                        >
                            +7
                        </p>
                        <p
                            className="text-3xl xl:text-4xl font-bold"
                            style={{ color: '#22d3ee' }}
                        >
                            productos
                        </p>
                        <p className="text-gray-400 text-base mt-1">lanzados</p>
                    </div>

                    {/* Redes sociales */}
                    <div className="flex items-center gap-5 mt-2">
                        <Link
                            href="https://www.linkedin.com/in/azariel-moreno/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-cyan-400 transition-colors duration-200"
                        >
                            <FaLinkedin size={36} />
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@azzadesigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-cyan-400 transition-colors duration-200"
                        >
                            <FaTiktok size={32} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/azzadesigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200"
                            style={{ color: '#4ade80' }}
                        >
                            <FaInstagram size={36} />
                        </Link>
                    </div>
                </div>

            </section>
        </div>
    );
};
