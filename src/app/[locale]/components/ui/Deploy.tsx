import Link from "next/link";

interface DeployProps {
    url: string;
    type: string;
    extraClass?: string;
}

export default function Deploy({ url, type, extraClass = "" }: DeployProps) {
    const label = type === "deploy" ? "Demo" : "Repo";

    return (
        <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-1 border-2 justify-center border-buttonColor rounded-3xl w-30 py-2 transition-all duration-300 hover:font-semibold text-buttonColor hover:bg-textColor hover:text-background ${extraClass}`}
        >
            <span>{label}</span>
        </Link>
    );
}

