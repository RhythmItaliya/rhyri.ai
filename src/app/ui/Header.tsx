'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export default function Header({ user }: { user: { name: string; image: string } }) {
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);
        startTransition(async () => {
            await signOut({ callbackUrl: '/signin' });
            setLoading(false);
        });
    }

    return (
        <header className="flex items-center gap-6 mb-8">
            <div className="rounded-full overflow-hidden w-16 h-16">
                <Image
                    src={user.image}
                    alt="profile picture"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex-1">
                <h1 className="text-xl font-bold m-0">Hello! {user.name}</h1>
            </div>
            <button
                onClick={handleLogout}
                disabled={loading || isPending}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            >
                Log Out
            </button>
        </header>
    );
}
