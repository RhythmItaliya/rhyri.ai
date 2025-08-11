'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen border-r border-foreground/10 bg-background text-foreground p-4">
            <div className="text-lg font-semibold mb-6">Rhyri.ai</div>
            <nav className="space-y-2">
                <Link href="/" className="block px-3 py-2 rounded hover:bg-foreground/5">
                    Dashboard
                </Link>
                <Link href="/settings" className="block px-3 py-2 rounded hover:bg-foreground/5">
                    Settings
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/signin' })}
                    className="w-full text-left block px-3 py-2 rounded hover:bg-foreground/5"
                >
                    Log out
                </button>
            </nav>
        </aside>
    );
}
