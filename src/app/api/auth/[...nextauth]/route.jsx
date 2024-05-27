import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;

          const loginData = { email, password };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            loginData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const userdata = response.data;

          return userdata;
        } catch (error) {
          if (error.response.data.message === "Passoword Incorrect")
            console.log("Contraseña incorrecta");

          if (error.response.data.message === "Email is wrogn")
            console.log("Error email no valido");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
