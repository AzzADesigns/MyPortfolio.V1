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
        <div className='mt-5 '>
            <div className='flex items-center  gap-2'>
                <h3 className='font-bold text-lg mb-2'>{title}</h3>
                <Button 
                    onClick={onToggle}
                    extraClass='text-xl w-20 justify-center flex cursor-pointer mb-2.5 font-bold hover:text-buttonColor transition-opacity'
                >
                    {isOpen ? '−' : '+'}
                </Button>
            </div>
            {isOpen && <div className='flex flex-col'><p className='max-w-160 mb-2'>{description}</p> <div className=''><a href={Href} className="text-buttonColor underline" >{t("textsPage.textbuttonviewMore")}</a></div> </div> }
        </div>
    )
}
