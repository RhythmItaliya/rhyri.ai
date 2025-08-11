import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Sidebar from '@/app/ui/Sidebar';
import { authOptions } from '@/config/auth.config';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-background">
                <h1 className="text-xl font-semibold mb-6 text-foreground">Settings</h1>
                <div className="space-y-4 text-foreground/80">
                    <p>Here you can manage your account and app preferences.</p>
                </div>
            </main>
        </div>
    );
}
