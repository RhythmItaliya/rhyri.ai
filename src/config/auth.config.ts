import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { createUser, fetchUserWithEmail } from '@/app/_actions/users';
import bcrypt from 'bcryptjs';
import db from '@/server/db';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    pages: { signIn: '/signin' },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await fetchUserWithEmail(credentials.email);

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await fetchUserWithEmail(user?.email || '');
                if (!dbUser) {
                    const res = await createUser({
                        name: user.name!,
                        email: user.email!,
                        image: user.image!,
                    });
                    token.id = res.id;
                    return token;
                }
                token.id = dbUser.id;
                token.name = dbUser.name;
                token.email = dbUser.email;
                token.picture = dbUser.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email!;
                session.user.image = token.picture;
            }
            return session;
        },
        redirect({ url, baseUrl }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
};
