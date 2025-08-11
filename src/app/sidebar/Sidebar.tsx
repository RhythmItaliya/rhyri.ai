'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export type SidebarItem = {
    id: string;
    label: string;
    href: string;
    enabled: boolean;
};

export default function Sidebar({ items }: { items: SidebarItem[] }) {
    const visibleItems = items.filter((i) => i.enabled);

    return (
        <aside className="w-64 min-h-screen border-r border-foreground/10 bg-background text-foreground p-4">
            <div className="text-lg font-semibold mb-6">Rhyri.ai</div>
            <nav className="space-y-2">
                {visibleItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="block px-3 py-2 rounded hover:bg-foreground/5"
                    >
                        {item.label}
                    </Link>
                ))}
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
