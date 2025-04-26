/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

// @ts-expect-error - Ignore the TypeScript error for now
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({
      user: { name, email, image }, //constructed by next auth with profile
      // account, //from next auth
      profile: { id, login, bio }, // from oauth provider
    }: {
      user: { name: string; email: string; image: string };
      account: any;
      profile: { id: string; login: string; bio?: string };
    }) {
      const existinguser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      });
      if (!existinguser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login, //sketchy
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    async jwt({
      token,
      account,
      profile,
    }: {
      token: { id: string };
      account: any;
      profile: { id: string };
    }) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
        // console.log(user);
        token.id = user._id;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: { id: string } }) {
      // console.log(token);
      session.user.id = token.id;
      return session;
    },
  },
});
