import React, { ReactNode } from "react";

interface TitleProps {
    extraClass?: string;
    children: ReactNode;
}

export const Title: React.FC<TitleProps> = ({ extraClass = "", children }) => {
    return <h2 className={`text-2xl ${extraClass} font-semibold`}>{children}</h2>;
};
