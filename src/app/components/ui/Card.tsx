import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    extraClass?: string;
}

export default function Card({ children, extraClass }: CardProps) {
    return (
        <section
            className={`relative  min-w-[100px] max-w-[805px] break-words box-border transition-all duration-300  border-none bg-foreground rounded-3xl border-2 border-gray-200 shadow-xs flex flex-col ${extraClass}`}
        >
            {children}
        </section>
    );
}
