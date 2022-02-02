import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: "ea3072ab7b34047b647c",
      clientSecret: "2cf38604e5b32503e540a5715a2ceedc38d16910",
    }),
  ],
  session : {
    jwt: true
  },
  jwt: {
    secret : "kjaddahkjh"
  }
});
