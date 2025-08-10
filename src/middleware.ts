import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

import { API_AUTH_PREFIX, AUTH_ROUTES, PROTECTED_ROUTES } from '@/constants/routes';

export default withAuth(
    (req) => {
        const pathname = req.nextUrl.pathname;

        const isAuth = Boolean(req.nextauth?.token);
        const isAccessingApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
        const isAccessingAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
        const isAccessingProtectedRoute = PROTECTED_ROUTES.some((route) =>
            pathname.startsWith(route),
        );

        if (isAccessingApiAuthRoute) {
            return NextResponse.next();
        }

        if (isAccessingAuthRoute) {
            if (isAuth) {
                const url = req.nextUrl.clone();
                url.pathname = PROTECTED_ROUTES[0];
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        }

        if (!isAuth && isAccessingProtectedRoute) {
            const url = req.nextUrl.clone();
            url.pathname = AUTH_ROUTES[0];
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true,
        },
    },
);

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
