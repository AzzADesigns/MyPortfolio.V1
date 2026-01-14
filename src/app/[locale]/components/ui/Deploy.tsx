import Link from "next/link";

interface DeployProps {
    url: string;
    type: string;
    extraClass?: string;
}

export default function Deploy({ url, type }: DeployProps) {
    const label = type === "deploy" ? "Demo" : "Repo";

    return (
        <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-1  justify-center w-20 lg:w-30 py-1 font-semibold `}
        >
            <span>{label}</span>
        </Link>
    );
}

