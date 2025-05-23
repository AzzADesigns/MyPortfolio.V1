'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const codeLines = [
    [
        { text: 'type', className: 'text-purple-400' },
        { text: ' Developer', className: 'text-yellow-400' },
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
        { text: 'Developer', className: 'text-yellow-400' },
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
        { text: '"Desarrollador Full Stack"', className: 'text-lime-300' },
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
            } else {
                setCurrentLine(prev => prev + 1);
                setCurrentChar(0);
            }
        }
    }, [currentChar, currentLine]);

    return (
        <section className="bg-[#03091E] h-52 rounded-t-3xl relative overflow-hidden">
            <div className="h-52 w-96 p-4 rounded ml-56 text-xs text-white font-mono flex">
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

                {/* Formas decorativas */}
                <Image 
                    src={"/form1.svg"}
                    alt="forma1"
                    width={200}
                    height={200}
                    className="absolute left-[-1] top-0"
                />
                <Image
                    src={"/form2.svg"}
                    alt="forma2"
                    width={120}
                    height={120}
                    className="absolute bottom-[-1] left-[550px]"
                />
                <Image
                    src={"/form2.svg"}
                    alt="forma2"
                    width={150}
                    height={150}
                    className="absolute bottom-[-1] right-0"
                />
                <Image
                    src={"/form2.svg"}
                    alt="forma2"
                    width={150}
                    height={150}
                    className="absolute top-[-1] right-40 scale-y-[-1] scale-x-[-1]"
                />

                <Image
                    src={"/React.svg"}
                    alt="forma2"
                    width={40}
                    height={40}
                    className="absolute top-4 left-[480px] scale-y-[-1] scale-x-[-1]"
                />
            </div>
        </section>
    );
};






