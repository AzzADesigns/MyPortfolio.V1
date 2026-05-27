'use client';

import { Landing } from '../components/MainContent/Landing/Landing';

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-textColor flex flex-col items-center">
            <Landing />
        </main>
    );
}
