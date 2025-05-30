import React from 'react'
import Card from '../../ui/Card'
import { Theme } from './Theme'
import { Translator } from './Translator'

export const Them_Trans = () => {
    return (
        <Card extraClass={"lg:w-[14%] h-53 fixed p-np flex transition-all duration-300 flex-col justify-between"}>
            <Translator/>
            <Theme/>
        </Card>
    )
}
