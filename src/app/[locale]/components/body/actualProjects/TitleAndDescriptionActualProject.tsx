import React from 'react'
import { useTranslations } from 'next-intl'
import Button from '../../ui/Button';

interface TitleAndDescriptionActualProjectProps {
    title: string;
    description: string;
    isOpen: boolean;
    onToggle: () => void;
    Href: string
}

export const TitleAndDescriptionActualProject = ({ title, description, isOpen, onToggle, Href }: TitleAndDescriptionActualProjectProps) => {
    const t = useTranslations()
    return (
        <div className='mt-5'>
            <div className='flex items-center gap-2'>
                <h3 className='font-bold text-lg mb-2'>{title}</h3>
                <Button 
                    onClick={onToggle}
                    extraClass='text-xl w-20 justify-center flex cursor-pointer mb-2.5 font-bold hover:text-buttonColor transition-opacity'
                >
                {isOpen ? '−' : '+'}
                </Button>
            </div>

            <div 
                className={`
                    overflow-hidden transition-[max-height,opacity] duration-1000 ease-in-out
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <p className='max-w-160 mb-2'>{description}</p>
                <div>
                    <a href={Href} target="_blank" className="text-buttonColor underline">
                        {t("textsPage.textbuttonviewMore")}
                    </a>
                </div>
            </div>
        </div>
    )
}
