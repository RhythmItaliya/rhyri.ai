'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import SettingsModal from './SettingsModal';
import Button from './Button';

export default function Header({
    user,
}: {
    user: { name: string; image: string; email?: string };
}) {
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { data: session } = useSession();

    async function handleLogout() {
        setLoading(true);
        startTransition(async () => {
            await signOut({ callbackUrl: '/signin' });
            setLoading(false);
        });
    }

    return (
        <>
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
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                        title="Settings"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </button>
                    <Button onClick={handleLogout} variant="danger" disabled={loading || isPending}>
                        Log Out
                    </Button>
                </div>
            </header>

            <SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                user={user}
            />
        </>
    );
}
