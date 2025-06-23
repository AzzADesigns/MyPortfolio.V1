"use client";
import React from "react";
import Button from "../../ui/Button";
import { Title } from "../../ui/Title";
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
            <div className="flex w-full justify-center gap-3">
                <Button onClick={() => changeLanguage('en')}>English</Button>
                <Button onClick={() => changeLanguage('es')}>Español</Button>
            </div>
        </div>
    );
};
