import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import SidebarPage from '@/app/sidebar/page';
import { authOptions } from '@/config/auth.config';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    return (
        <div className="flex min-h-screen">
            <SidebarPage />
            <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
    );
}
