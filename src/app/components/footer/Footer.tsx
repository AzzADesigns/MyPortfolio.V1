import Link from "next/link"

export default function Footer()  {

    const links = [
        {
            label: "Mi Linkedin",
            href: "https://linkedin.com/in/azariel-moreno-4267ba254/",
        },
        {
            label: "Mi Github",
            href: "https://github.com/AzzADesigns",
        },
        {
            label: "Repositorio de Mi-Portfolio",
            href: "https://github.com/AzzADesigns/MyPortfolio.V1",
        }
    ];

    const email = "walter.azariel.moreno@gmail.com";

    return (
        <section className='flex pn-p justify-between'>
            <div className="text-sm xl:text-2xl flex flex-col gap-3 p-np text-textColor/50">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-textColor transition-colors duration-200 underline"
                    >
                        {link.label}
                    </Link>
                ))}
                <p className="hover:text-textColor transition-colors duration-200">
                    {email}
                </p>
            </div>
            <div className='w-[40%] flex justify-center md:mb-3 items-center'>
                <div className="text-xs p-2 bg-background rounded-2xl flex justify-center items-center h-[50%] md:w-50 xl:text-2xl text-textColor/50 mt-5">
                    AzzAD
                </div>
            </div>
        </section>
    );
}
