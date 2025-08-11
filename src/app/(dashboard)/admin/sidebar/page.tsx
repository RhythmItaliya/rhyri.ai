'use client';

import { useEffect, useState } from 'react';
import {
    createSidebarItem,
    deleteSidebarItem,
    getSidebarItems,
    updateSidebarItem,
} from '@/app/_actions/admins';
import Input from '@/app/ui/Input';
import Button from '@/app/ui/Button';

type Item = {
    id: string;
    label: string;
    href: string;
    order: number;
    enabled: boolean;
};

export default function AdminSidebarConfigPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ label: '', href: '' });

    useEffect(() => {
        (async () => {
            const data = await getSidebarItems();
            setItems(data as any);
        })();
    }, []);

    const onCreate = async () => {
        setLoading(true);
        const created = (await createSidebarItem({ label: form.label, href: form.href })) as any;
        setItems((prev) => [...prev, created]);
        setForm({ label: '', href: '' });
        setLoading(false);
    };

    const onToggle = async (id: string, enabled: boolean) => {
        await updateSidebarItem(id, { enabled });
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, enabled } : it)));
    };

    const onDelete = async (id: string) => {
        await deleteSidebarItem(id);
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold text-foreground">Sidebar configuration</h1>
            <div className="max-w-xl space-y-3">
                <Input
                    label="Label"
                    placeholder="e.g. Dashboard"
                    value={form.label}
                    onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                />
                <Input
                    label="Href"
                    placeholder="e.g. / or /settings"
                    value={form.href}
                    onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
                />
                <Button disabled={loading || !form.label || !form.href} onClick={onCreate}>
                    Add item
                </Button>
            </div>

            <div className="divide-y divide-foreground/10 rounded border border-foreground/10">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 gap-3">
                        <div className="flex-1">
                            <div className="font-medium text-foreground">{item.label}</div>
                            <div className="text-sm text-foreground/60">{item.href}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={item.enabled ? 'secondary' : 'primary'}
                                onClick={() => onToggle(item.id, !item.enabled)}
                            >
                                {item.enabled ? 'Disable' : 'Enable'}
                            </Button>
                            <Button variant="danger" onClick={() => onDelete(item.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
