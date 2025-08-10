import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/auth.config';
import { fetchUserWithEmail } from '@/app/_actions/users';
import db from '@/server/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { password } = await request.json();

        if (!password || password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 },
            );
        }

        const user = await fetchUserWithEmail(session.user.email);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = await db.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
            },
        });

        if (!updatedUser) {
            return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
