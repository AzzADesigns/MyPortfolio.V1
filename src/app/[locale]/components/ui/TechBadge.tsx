import { ReactNode } from "react";

interface TechBadgeProps {
    name: string;
    icon?: ReactNode;
    extraClass?: string;
}

export default function TechBadge({ name, icon, extraClass = "" }: TechBadgeProps) {
    return (
        <div className={`flex items-center   py-1 p-2 text-sm bg-background  rounded-md ${extraClass}`}>
            {icon && <span className="text-buttonColor">{icon}</span>}
            <span>{name}</span>
        </div>
    );
}