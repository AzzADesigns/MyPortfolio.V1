import { ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps {
    children: ReactNode;
    extraClass?: string;
    onClick?: () => void;
    isActive?: boolean;
}

export default function Button({ children, extraClass, onClick, isActive }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "border-2 border-foreground px-2.5 py-1 rounded-full text-sm  transition-all cursor-pointer tracking-wider",
                "hover:border-buttonColor hover:bg-foreground hover:text-buttonColor",
                "active:border-buttonColor active:bg-foreground active:text-buttonColor",
                isActive
                    ? " bg-textColor border-buttonColor bg-foreground text-buttonColor"
                    : "bg-buttonColor  text-buttonText ",
                extraClass
            )}
        >
            {children}
        </button>
    );
}
