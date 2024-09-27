import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const fetchUser = async ({
  email,
  password,
}: {
  email: string | any;
  password: string | any;
}): Promise<{ user: User; token: string }> => {
  try {
    const res = await fetch(`${process.env.API_URL}/user/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Invalid Credentials");
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      authorize: async (credentials) => {
        const user = await fetchUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user || user?.user?.role !== "admin") {
          console.log("error");
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
      if (pathname.startsWith("/dashboard") || pathname === "/signout")
        return !!auth;

      return true;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
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
