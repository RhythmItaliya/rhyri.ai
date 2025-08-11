'use client';

import { useState } from 'react';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/Button';

type TabKey = 'profile' | 'about';

export default function SettingsTabs() {
    const [activeTab, setActiveTab] = useState<TabKey>('profile');

    const tabButtonBase =
        'px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500';

    const getTabClasses = (tab: TabKey) =>
        `${tabButtonBase} ${
            activeTab === tab
                ? 'bg-primary-600 text-white'
                : 'text-foreground hover:bg-foreground/10'
        }`;

    return (
        <div className="space-y-6">
            <div className="flex gap-2 border-b border-foreground/10 pb-3">
                <button
                    className={getTabClasses('profile')}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button className={getTabClasses('about')} onClick={() => setActiveTab('about')}>
                    About
                </button>
            </div>

            <div>
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
                            <p className="text-sm text-foreground/70">
                                Update your personal information.
                            </p>
                        </div>
                        <form className="max-w-lg space-y-4">
                            <Input label="Full Name" type="text" placeholder="Your name" />
                            <Input label="Email" type="email" placeholder="you@example.com" />
                            <div className="pt-2">
                                <Button type="button" className="min-w-28">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-foreground">About</h2>
                        <p className="text-foreground/80">
                            Rhyri.ai settings module. More sections coming soon.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
