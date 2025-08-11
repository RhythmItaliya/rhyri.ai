'use server';

import db from '@/server/db';
import bcrypt from 'bcryptjs';

export async function fetchAdminWithEmail(email: string) {
    return await db.admin.findUnique({
        where: { email },
    });
}

export async function getSidebarItems() {
    return db.sidebarItem.findMany({
        orderBy: { order: 'asc' },
    });
}

export async function createSidebarItem(data: {
    label: string;
    href: string;
    order?: number;
    enabled?: boolean;
    icon?: string;
}) {
    return db.sidebarItem.create({ data });
}

export async function updateSidebarItem(
    id: string,
    data: Partial<{ label: string; href: string; order: number; enabled: boolean; icon: string }>,
) {
    return db.sidebarItem.update({ where: { id }, data });
}

export async function deleteSidebarItem(id: string) {
    return db.sidebarItem.delete({ where: { id } });
}

export async function createAdmin(data: {
    name: string;
    email: string;
    image?: string;
    password?: string;
    role?: string;
    accessUrl?: string;
}) {
    const hashedPassword = data.password ? await bcrypt.hash(data.password, 12) : null;

    return await db.admin.create({
        data: {
            name: data.name,
            email: data.email,
            image: data.image,
            password: hashedPassword,
            role: data.role,
            accessUrl: data.accessUrl,
        },
    });
}

export async function createAdminWithPassword(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
    accessUrl?: string;
}) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    return await db.admin.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            accessUrl: data.accessUrl,
        },
    });
}
