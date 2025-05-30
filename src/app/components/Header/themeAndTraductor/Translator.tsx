import React from 'react'
import Button from '../../ui/Button'
import { Title } from '../../ui/Title'

export const Translator = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Title>Idiomas</Title>
            <div className='flex items-center mt-4 w-full justify-between'>
                <Button>Ingles</Button>
                <Button>Español</Button>
            </div>
        </div>
    )
}
