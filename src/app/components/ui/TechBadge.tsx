import { ReactNode } from "react";

interface TechBadgeProps {
    name: string;
    icon?: ReactNode;
    extraClass?: string;
}

export default function TechBadge({ name, icon, extraClass = "" }: TechBadgeProps) {
    return (
        <div className={`flex items-center gap-1 px-2 py-1 text-sm bg-foreground rounded-md ${extraClass}`}>
            {icon && <span className="text-buttonColor">{icon}</span>}
            <span>{name}</span>
        </div>
    );
}