'use client';
import React from 'react'
import Card from '../../ui/Card'
import { Theme } from './Theme'
import { Translator } from './Translator'

export const Them_Trans = () => {
    return (
        <div className='fixed top-0 left-0 right-0 z-50 md:relative md:top-auto md:left-auto md:right-0 md:w-auto lg:w-[18%] w-full'>
            <Card extraClass={"w-full h-14 md:h-60 px-5 md:px-0 justify-center flex transition-all duration-300 flex-row md:flex-col items-center md:gap-5"}>
                <Translator/>
                <Theme/>
            </Card>
        </div>
    )
}
