import { ReactNode, CSSProperties, forwardRef } from "react";

interface CardProps {
    children: ReactNode;
    extraClass?: string;
    style?: CSSProperties;
}

const Card = forwardRef<HTMLElement, CardProps>(({ children, extraClass, style }, ref) => {
    return (
        <section
            ref={ref}
            style={style}
            className={`relative min-w-[100px] max-w-[805px] break-words box-border transition-all duration-300 border-none bg-foreground rounded-3xl border-2 border-gray-200 shadow-xs flex flex-col ${extraClass}`}
        >
            {children}
        </section>
    );
});

Card.displayName = "Card";
export default Card;
