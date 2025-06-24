import React from 'react'
import Button from './Button'
import { FaArrowUp } from "react-icons/fa";

export const Return = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Button onClick={scrollToTop}>
            <FaArrowUp className='h-5 w-15 '/>
        </Button>
    )
}
