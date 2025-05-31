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
            "border-2 border-foreground hover:border-buttonColor px-2.5 py-1 rounded-full text-sm  bg-buttonColor text-buttonText hover:bg-foreground hover:text-buttonColor transition-all cursor-pointer tracking-wider",
            extraClass
        )}>
            {children}
        </button>
    )
}
