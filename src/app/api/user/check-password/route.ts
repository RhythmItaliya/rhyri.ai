import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { fetchUserWithEmail } from '@/app/_actions/users';
import { authOptions } from '@/config/auth.config';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await fetchUserWithEmail(session.user.email);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ hasPassword: !!user.password });
    } catch (error) {
        console.error('Error checking password status:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
