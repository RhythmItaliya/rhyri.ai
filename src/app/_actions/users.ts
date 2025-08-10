'use server';

import db from '@/server/db';
import bcrypt from 'bcryptjs';

export async function fetchUserWithEmail(email: string) {
    return await db.user.findUnique({
        where: { email },
    });
}

export async function createUser(data: {
    name: string;
    email: string;
    image?: string;
    password?: string;
}) {
    const hashedPassword = data.password ? await bcrypt.hash(data.password, 12) : null;

    return await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            image: data.image,
            password: hashedPassword,
        },
    });
}

export async function createUserWithPassword(data: {
    name: string;
    email: string;
    password: string;
}) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    return await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
}
