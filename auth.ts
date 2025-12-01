import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {authenticate} from "@/app/(service)/auth-service"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials:{
      email:{},
      password:{},
    },
    authorize: async (credentials) => {
      const user = await authenticate(
        credentials.email as string, credentials.password as string
      );
      
      if (!user) return null;

      // Retorna o id do banco diretamente
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    }
    ,
    async session({session, token}) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
})