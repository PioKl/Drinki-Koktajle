/* import Link from 'next/link';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const router = useRouter()

useEffect(() => {
    const timer = setTimeout(() => {
        router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
}, []);
//, [] - włącza się raz, gdy komponent się renderuje

export default function SiteNotFound() {
    return (
        <div>
            <h1>Nie ma takiej strony</h1>
            <Link href="">Strona główna</Link>
        </div>
    )
} */

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const SiteNotFound = () => {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    //, [] - włącza się raz, gdy komponent się renderuje

    return (
        <div>
            <h1>Nie ma takiej strony</h1>
            <Link href="/">Strona główna</Link>
        </div>
    );
}

export default SiteNotFound;