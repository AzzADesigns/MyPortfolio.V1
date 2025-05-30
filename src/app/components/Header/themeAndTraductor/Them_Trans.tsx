import React from 'react'
import Card from '../../ui/Card'
import { Theme } from './Theme'
import { Translator } from './Translator'

export const Them_Trans = () => {
    return (
        <Card extraClass={"lg:w-[16%] h-53 fixed p-np flex flex-col justify-between"}>
            <Translator/>
            <Theme/>
        </Card>
    )
}
