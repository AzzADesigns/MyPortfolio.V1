'use client';

import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { Sora } from 'next/font/google';

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
                backgroundColor: '#001720',
                backgroundImage: 'linear-gradient(to bottom right, rgba(3, 231, 245, 0.15) 0%, transparent 70%)',
                fontFamily: 'var(--font-sora), sans-serif'
            }}
        >
            {/* ─── NAVBAR ─────────────────────────────────────────────────────── */}
            <nav className="flex items-center justify-between mt-5 fixed px-8 md:px-16 py-5 w-full">
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
            <section className="flex-1 flex items-center mt-15 justify-between px-8 md:px-16 py-10 gap-8">

                {/* ── Columna Izquierda: Texto ──────────────────────────────────── */}
                <div className="flex flex-col gap-17 max-w-[580px] flex-shrink-0">
                    <h1 className="text-5xl xl:text-[70px]  leading-25 text-white">
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

                    <p className="text-[#D7D7D7] text-[18px] -tracking-tighter leading-10 xl:max-w-[540px]">
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
                <div className="relative flex-1 flex items-center justify-center ">
                    {/* Imagen izquierda — olab */}
                    <div className="absolute animate-float-sutil-1" style={{ zIndex: 2 }}>
                        <div style={{ transform: 'translate(-190px, -80px)' }}>
                            <Image
                                src="/header/olab.webp"
                                alt="OpenLabs project"
                                width={735}
                                height={400}
                                className="drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Imagen derecha — eve */}
                    <div className="absolute animate-float-sutil-2" style={{ zIndex: 1 }}>
                        <div >
                            <Image
                                src="/header/eve.webp"
                                alt="Evelazquez project"
                                width={735}
                                height={400}
                                className="drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]  transition-transform duration-500"
                                style={{ transform: 'translate(70px, -120px)' }}
                            />
                        </div>
                    </div>

                    {/* Imagen frontal central — cem */}
                    <div className="absolute animate-float-sutil-3" style={{ zIndex: 3 }}>
                        <div style={{ transform: 'translate(45px, 60px)' }}>
                            <Image
                                src="/header/cem.webp"
                                alt="CEM Elearning project"
                                width={735}
                                height={400}
                                className="drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)] transition-transform duration-500 "
                            />
                        </div>
                    </div>

                    {/* Gran arco decorativo de fondo y flecha */}
                    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                        {/* Círculo completo (Ajusta el translate para moverlo libremente) */}
                        <div
                            className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] border-[3px] rounded-full"
                            style={{ 
                                borderColor: '#89EA2B', 
                                opacity: 0.9,
                                top: '50%',
                                left: '56%',
                                transform: 'translate(-72%, -40%)' /* -65% lo mueve a la izquierda, -50% lo centra verticalmente */
                            }}
                        />
                        
                        {/* Flecha grande animada (Aumenta el número de píxeles en 'top' para bajarla más) */}
                        <svg 
                            className="absolute animate-bounce" 
                            style={{
                                top: 'calc(50% + 250px)', /* Aumenta el 250px a 300px, 400px, etc. para bajarla más */
                                left: '40%',
                                transform: 'translateX(-50%)'
                            }}
                            width="48" 
                            height="72" /* Altura un poco más chica */
                            viewBox="0 0 24 36" /* ViewBox ajustado a 1.5x */
                            fill="none" 
                            stroke="#D1D5DB" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            {/* Línea vertical que va desde arriba hasta la punta */}
                            <line x1="12" y1="0" x2="12" y2="32"></line>
                            {/* Punta de la flecha colocada abajo */}
                            <polyline points="5 25 12 32 19 25"></polyline>
                        </svg>
                    </div>
                </div>

                {/* ── Columna Derecha: Stats + Sociales ────────────────────────── */}
                <div className="flex flex-col gap-20 mt-8 items-end flex-shrink-0">
                    {/* Stat 1 */}
                    <div className="text-right">
                        <p
                            className="text-5xl xl:text-[55px] font-bold"
                        >
                           <span className='text-[#22d3ee]'>+3</span> Años
                        </p>
                        <p className="text-gray-400 text-base mt-1 text-[25px]">De especialización</p>
                    </div>

                    {/* Separador */}
                    <div className="w-20 h-px bg-white/10 self-end" />

                    {/* Stat 2 */}
                    <div className="text-right">
                        <p
                            className="text-5xl xl:text-[55px] font-extrabold"
                        >
                            <span className='text-[#22d3ee]'>+7</span> productos
                        </p>

                        <p className="text-gray-400 text-base mt-1  text-[25px]">lanzados</p>
                    </div>

                    {/* Redes sociales */}
                    <div className="flex items-center gap-10 mt-25">
                        <Link
                            href="https://www.linkedin.com/in/azariel-moreno/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 hover:opacity-80 transition-all duration-200"
                        >
                            <Image src="/branding/in.svg" alt="LinkedIn" width={80} height={80} />
                        </Link>
                        <Link
                            href="https://www.tiktok.com/@azzadesigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 hover:opacity-80 transition-all duration-200"
                        >
                            <Image src="/branding/ticktok.svg" alt="TikTok" width={70} height={80} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/azzadesigns"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 hover:opacity-80 transition-all duration-200"
                        >
                            <Image src="/branding/instagram.svg" alt="Instagram" width={80} height={80} />
                        </Link>
                    </div>
                </div>

            </section>
        </div>
    );
};
