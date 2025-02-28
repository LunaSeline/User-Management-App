import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });

                if (!user || user.password !== credentials.password) {
                    throw new Error("Invalid credentials");
                }
                return { id: user._id, email: user.email };
            },
        }),
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async session({ session, user }) {
            session.userId = user.id;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
