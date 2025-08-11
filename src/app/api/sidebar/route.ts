import db from '@/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const items = await db.sidebarItem.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(items);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { label, href, order, enabled, icon } = body || {};
    if (!label || !href) {
        return NextResponse.json({ error: 'label and href are required' }, { status: 400 });
    }
    const created = await db.sidebarItem.create({
        data: { label, href, order: order ?? 0, enabled: enabled ?? true, icon },
    });
    return NextResponse.json(created, { status: 201 });
}
