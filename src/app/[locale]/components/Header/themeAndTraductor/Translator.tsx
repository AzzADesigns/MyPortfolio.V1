"use client";
import React from "react";
import Button from "../../ui/Button";
import { Title } from "../../ui/Title";
import { HiOutlineTranslate } from "react-icons/hi";
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export const Translator = () => {
    const t = useTranslations('textsPage');
    const router = useRouter();

    const changeLanguage = (locale: string) => {
        document.cookie = `locale=${locale}; path=/; max-age=31536000`;
        router.refresh();
    };

    return (
        <div className="flex flex-col  xl:items-center  xl:justify-center xl:w-full">
            <Title extraClass="hidden xl:flex mb-2">{t('textIdiom')}</Title>
            <div className="hidden xl:flex w-full justify-center gap-3">
                <Button onClick={() => changeLanguage('en')}>English</Button>
                <Button onClick={() => changeLanguage('es')}>Español</Button>
            </div>
            <Button extraClass="   p-0.5 px-2 flex xl:hidden " onClick={() => changeLanguage('en')}>
                <HiOutlineTranslate className="text-background text-xl" />
                <p className="text-background ml-2">traducir</p>
            </Button>
        </div>
    );
};
