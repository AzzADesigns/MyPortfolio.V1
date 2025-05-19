export default function Home() {
    return (
        <div className="bg-background text-textColor min-h-screen p-6 font-[family-name:var(--font-geist-sans)]">
            <section className="bg-foreground p-4 rounded-lg shadow">
                <h1 className="text-2xl font-bold">Mi Portfolio</h1>
                <p>Bienvenido a mi sitio personal.</p>
                <button className="mt-4 bg-buttonColor text-white px-4 py-2 rounded">
                    Contáctame
                </button>
            </section>
        </div>
    );
}
