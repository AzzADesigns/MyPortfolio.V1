import { ReactNode } from "react";
import { clsx } from 'clsx';

interface ButtonProps{
    children: ReactNode;
    extraClass?:string;
}



export default function Button({ children, extraClass }: ButtonProps) {
    return (
        <button className={clsx(
            'border-2 px-4 py-1 rounded-full text-xs xl:text-base font-bold bg-buttonColor text-background hover:bg-foreground hover:text-buttonColor transition-all hover:border-buttonColor cursor-pointer tracking-wider ',
            extraClass
        )}>
            {children}
        </button>
    )
}
