import { ReactNode } from "react";
import { clsx } from 'clsx';

interface ButtonProps{
    children: ReactNode;
    extraClass?:string;
    onClick?: () => void;
}



export default function Button({ children, extraClass, onClick  }: ButtonProps) {
    return (
        <button onClick={onClick} className={clsx(
            'border-2 border-foreground hover:border-buttonColor px-4 py-1 rounded-full text-xs xl:text-base font-bold bg-buttonColor text-buttonText hover:bg-foreground hover:text-buttonColor transition-all cursor-pointer tracking-wider ',
            extraClass
        )}>
            {children}
        </button>
    )
}
