import { ReactNode } from "react";
import TechBadge from "./TechBadge";

interface TechStackProps {
    technologies: {
        name: string;
        icon?: ReactNode;
    }[];
    extraClass?: string;
}

export default function TechStack({ technologies, extraClass = "" }: TechStackProps) {
    return (
        <div className={`flex flex-wrap gap-2 ${extraClass}`}>
            {technologies.map((tech, index) => (
                <TechBadge 
                    key={index} 
                    name={tech.name} 
                    icon={tech.icon} 
                />
            ))}
        </div>
    );
}