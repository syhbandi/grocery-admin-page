import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: { type: "email", name: "email" },
        password: { type: "password", name: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.API_URL}/user/login`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        console.log("user logged" + user);

        if (!user || user?.user?.role !== "admin") {
          return null;
        }

        return {
          id: user.user.id,
          username: user.user.username,
          email: user.user.email,
          full_name: user.user.full_name,
          role: user.user.role,
          token: user.token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id!;
        token.username = user.username;
        token.full_name = user.full_name!;
        token.email = user.email!;
        token.role = user.role;
        token.token = user.token!;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.full_name = token.full_name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.token = token.token;

      return session;
    },
    authorized: ({ request, auth }) => {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard") return !!auth;
      return true;
    },
  },
});

declare module "next-auth" {
  interface User {
    username: string;
    full_name: string;
    role: string;
    token: string;
  }

  interface Session {
    username: string;
    full_name: string;
    email: string;
    token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    username: string;
    full_name: string;
    email: string;
    role: string;
    token: string;
  }
}
