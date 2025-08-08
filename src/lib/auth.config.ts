import type { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/lib/db';
import { createUser, fetchUserWithEmail } from '@/app/_actions/users';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
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
          ;(token as any).id = res.id;
          return token;
        }
        ;(token as any).id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.picture = dbUser.image;
      }
      return token;
    },
    async session({ session, token }) {
      const anySession = session as any;
      if (token) {
        anySession.user = anySession.user || {};
        anySession.user.id = (token as any).id;
        anySession.user.name = token.name;
        anySession.user.email = token.email as string | undefined;
        anySession.user.image = token.picture as string | undefined;
      }
      return session;
    },
    redirect() {
      return '/login';
    },
  },
};
