import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { FailedLogin, SuccessLogin } from "@/Interfaces/AuthInterfaces";

export const authOptions: NextAuthOptions = {
  pages: { signIn: '/signin' },
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-type': 'application/json' }
        });

        const payload: FailedLogin | SuccessLogin = await response.json();

        if (response.ok && 'token' in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token
          } as any;
        }
        throw new Error('Incorrect email or password');
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = (user as any).user;
        token.token = (user as any).token;
      }
      if (trigger === "update" && session?.user) {
        token.user = { ...token.user as any, ...session.user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any;
        session.token = token.token;
      }
      return session;
    }
  }
};