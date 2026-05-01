'use client';
import React, { useRef, memo } from 'react';
import { FiFolder, FiFileText, FiChevronRight } from 'react-icons/fi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CodeExplorerComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({ repeat: -1 });
        const wrapper = containerRef.current.querySelector('.explorer-wrapper');
        const levels = containerRef.current.querySelectorAll('.tree-level');
        const contents = containerRef.current.querySelectorAll('.level-content');
        const lines = containerRef.current.querySelectorAll('.tree-line');
        const chevrons = containerRef.current.querySelectorAll('.chevron-icon');

        gsap.set([levels, contents, lines], { opacity: 0 });
        gsap.set(lines, { height: 0 });
        gsap.set(chevrons, { rotation: 0 });
        gsap.set(wrapper, { y: 250, x: 180 }); 

        levels.forEach((level, i) => {
            tl.to(level, { opacity: 1, duration: 0.3 });
            
            if (chevrons[i]) {
                tl.to(chevrons[i], { rotation: 90, duration: 0.2 });
            }

            if (contents[i]) {
                tl.to(lines[i], { height: 52, opacity: 0.5, duration: 0.4 }, "-=0.1");
                tl.to(contents[i], { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
            }

            tl.to(wrapper, { 
                y: `-=${42}`, 
                x: `-=${12}`, 
                duration: 0.6, 
                ease: "power2.out" 
            }, "-=0.4");
        });

        tl.to(wrapper, { opacity: 0, duration: 0.8, delay: 1.5 });

    }, { scope: containerRef });

    const renderLevels = (depth: number): React.ReactNode => {
        if (depth > 6) return null;

        const colors = ['#4ade80', '#22d3ee', '#89EA2B'];
        const color = colors[depth % colors.length];

        return (
            <div className="relative">
                <div className="tree-level flex items-center gap-2" style={{ color }}>
                    <FiChevronRight size={14} className="chevron-icon transition-transform" />
                    <FiFolder size={22} />
                </div>
                
                <div className="level-content relative ml-5 mt-2 opacity-0 translate-y-2">

                    <div className="tree-line absolute -left-3 top-[-10px] w-[1px]" style={{ backgroundColor: color }} />
                    

                    <div className="absolute -left-3 top-2 w-3 h-[1px]" style={{ backgroundColor: `${color}4D` }} />
                    
                    <div className="flex items-center gap-2 mb-3 text-white/30">
                        <FiFileText size={16} />
                    </div>


                    <div className="relative">
                        <div className="absolute -left-3 top-3 w-3 h-[1px]" style={{ backgroundColor: `${color}4D` }} />
                        {renderLevels(depth + 1)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
            <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-[#4ade80]/20 blur-[100px] rounded-full" />
            
            <div className="explorer-wrapper absolute bottom-12 right-12">
                {renderLevels(0)}
            </div>
        </div>
    );
};

export const CodeExplorer = memo(CodeExplorerComponent);
CodeExplorer.displayName = 'CodeExplorer';
