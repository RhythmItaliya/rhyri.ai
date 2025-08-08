'use server';

import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function fetchAdminWithEmail(email: string) {
    return await db.admin.findUnique({
        where: { email },
    });
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
