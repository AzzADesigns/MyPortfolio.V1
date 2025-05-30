'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const codeLines = [
    [
        { text: 'type', className: 'text-purple-400' },
        { text: ' Dev', className: 'text-yellow-400' },
        { text: ' = ', className: 'text-white' },
        { text: '{', className: 'text-white' },
    ],
    [
        { text: '  name', className: 'text-cyan-400' },
        { text: ': ', className: 'text-white' },
        { text: 'string', className: 'text-pink-400' },
        { text: ';', className: 'text-white' },
    ],
    [
        { text: '  role', className: 'text-cyan-400' },
        { text: ': ', className: 'text-white' },
        { text: 'string', className: 'text-pink-400' },
        { text: ';', className: 'text-white' },
    ],
    [
        { text: '  OpenToWork', className: 'text-cyan-400' },
        { text: ': ', className: 'text-white' },
        { text: 'boolean', className: 'text-pink-400' },
        { text: ';', className: 'text-white' },
    ],
    [{ text: '};', className: 'text-white' }],
    [],
    [
        { text: 'export', className: 'text-purple-400' },
        { text: ' const', className: 'text-purple-400' },
        { text: ' Azariel', className: 'text-green-400' },
        { text: ': ', className: 'text-white' },
        { text: 'Dev', className: 'text-yellow-400' },
        { text: ' = {', className: 'text-white' },
    ],
    [
        { text: '  name', className: 'text-cyan-400' },
        { text: ': ', className: 'text-white' },
        { text: '"Azariel Moreno"', className: 'text-lime-300' },
        { text: ',', className: 'text-white' },
    ],
    [
        { text: '  role', className: 'text-cyan-400' },
        { text: ': ', className: 'text-white' },
        { text: '"Dev Full Stack"', className: 'text-lime-300' },
        { text: ',', className: 'text-white' },
    ],
    [
        { text: '  OpenToWork', className: 'text-cyan-400' },
        { text: ': ', className: 'text-white' },
        { text: 'true', className: 'text-orange-400' },
        { text: ',', className: 'text-white' },
    ],
    [{ text: '};', className: 'text-white' }],
];


const images = [
    { src: "/form1.svg", alt: "forma1", width: 200, height: 200, className: "absolute w-7 hidden 2xl:flex  bottom-3 lg:w-40  lg:left-[-1] lg:top-0" },
    { src: "/form2.svg", alt: "forma2", width: 120, height: 120, className: "absolute w-7 hidden 2xl:flex  bottom-3 lg:w-38 lg:bottom-[-1] lg:left-110" },
    { src: "/form2.svg", alt: "forma2", width: 150, height: 150, className: "absolute w-7 hidden 2xl:flex  bottom-3 lg:w-52 lg:bottom-[-1] lg:right-0" },
    { src: "/form2.svg", alt: "forma2", width: 150, height: 150, className: "absolute w-7 hidden 2xl:flex  bottom-3 lg:w-42 lg:top-[-1] lg:right-15 scale-y-[-1] scale-x-[-1]" },
];

export const Banner = () => {
    const [displayedLines, setDisplayedLines] = useState<string[][]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

    const flattenLine = (line: { text: string; className: string }[]) =>
        line.map(seg => seg.text).join('');

    useEffect(() => {
        if (currentLine < codeLines.length) {
            const flatLine = flattenLine(codeLines[currentLine]);
            if (currentChar <= flatLine.length) {
                const timeout = setTimeout(() => {
                    setDisplayedLines(prev => {
                        const newLines = [...prev];
                        const segments = codeLines[currentLine];
                        const colored: string[] = [];
                        
                        let count = 0;
                        for (const { text, className } of segments) {
                            if (currentChar > count + text.length) {
                                colored.push(`<span class="${className}">${text}</span>`);
                                count += text.length;
                            } else if (currentChar > count) {
                                const partial = text.slice(0, currentChar - count);
                                colored.push(`<span class="${className}">${partial}</span>`);
                                break;
                            }
                        }
                        newLines[currentLine] = colored;
                        return newLines;
                    });
                    setCurrentChar(prev => prev + 1);
                }, 20);
                return () => clearTimeout(timeout);
            }else {
                setCurrentLine(prev => prev + 1);
                setCurrentChar(0);
            }
        }
    }, [currentChar, currentLine]);

    return (
        <section className="bg-[#03091E] h-59 lg:h-52 rounded-t-3xl relative overflow-hidden">
            <div className="h-52 w-96 p-4 rounded ml-21 ml-narrow-range sm:ml-52 xl:ml-50 2xl:ml-70 text-xs text-white font-mono flex">
              {/* Números de línea */}
                <div className="text-gray-500 text-right pr-4 select-none">
                    {codeLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                {/* Código animado con colores */}
                <pre className="overflow-x-auto">
                    <code>
                        {displayedLines.map((line, i) => (
                            <div
                                key={i}
                                dangerouslySetInnerHTML={{ __html: line.length > 0 ? line.join('') : '&nbsp;' }}
                            />
                        ))}
                    </code>
                </pre>

              {/* Columna de íconos desplazándose hacia abajo */}
                <div className="absolute left-2 sm:left-10  2xl:left-40 top-0 h-full overflow-hidden">
                    <div className="scroll-down flex flex-col items-center gap-6 z-40">
                        <Image src="/react.svg" alt="React" width={45} height={45} className='w-8 2xl:w-10'/>
                        <Image src="/ts.svg" alt="TypeScript" width={40} height={40} className='w-7 2xl:w-8'/>
                        <Image src="/shadcn.svg" alt="Node.js" width={40} height={40} className='w-7 2xl:w-8'/>
                        <Image src="/tailwind.svg" alt="Node.js" width={40} height={40} className='w-7 2xl:w-8'/>
                        
                    </div>
                </div>

              {/* Columna de íconos desplazándose hacia arriba */}
                <div className="absolute left-15 sm:ml-20 xl:left-15 2xl:left-40 bottom-0 h-full overflow-hidden z-40">
                    <div className="scroll-up flex flex-col items-center gap-6">
                        <Image src="/nodejs.svg" alt="Node.js" width={40} height={40} className='w-7 2xl:w-8'/>
                        <Image src="/nextjs.svg" alt="Next.js" width={40} height={40} className='w-7 2xl:w-8'/>
                        <Image src="/express.svg" alt="Express" width={40} height={40} className='w-7 2xl:w-8'/>
                        <Image src="/postrgres.svg" alt="PostgreSQL" width={40} height={60} className='w-7 2xl:w-8'/>
                        
                    </div>
                </div>

                      {/* Formas decorativas */}
                {images.map((img, i) => (
                    <Image
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className={img.className}
                    />
                ))}

              {/* Enlaces a redes sociales */}
                <div className="xl:w-[16%] h-[80%] absolute bottom-2 xl:bottom-5 right-18  xl:right-5 2xl-right-0 flex xl:flex-col xl:justify-center items-end xl:items-start pl-6 gap-5">
                    <a
                        href="https://www.linkedin.com/in/azariel-moreno-4267ba254"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 xl:text-[15px] 2xl:text-lg hover:scale-105 transition-all"
                    >
                        Linkedin
                    </a>

                    <a
                        href="https://github.com/azariel-moreno"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="2xl:text-lg xl:text-[15px] hover:scale-105 transition-all"
                    >
                        Github
                    </a>
                </div>
            </div>
        </section>
    );
};