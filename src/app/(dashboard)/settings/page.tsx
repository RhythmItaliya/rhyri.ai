'use client';

import dynamic from 'next/dynamic';
const SettingsTabs = dynamic(() => import('@/app/settings/SettingsTabs'), { ssr: false });

export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-xl font-semibold mb-6 text-foreground">Settings</h1>
            <SettingsTabs />
        </div>
    );
}
