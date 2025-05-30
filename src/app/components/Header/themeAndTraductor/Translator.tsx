import React from 'react';
import Button from '../../ui/Button';
import { Title } from '../../ui/Title';

export const Translator = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <Title extraClass="hidden md:flex mb-2">Idiomas</Title>
            <div className='flex w-full justify-center gap-3'>
                <Button>English</Button>
                <Button>Español</Button>
            </div>
        </div>
    );
};
