import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import axios from "@/axios"
import { IUser } from '@/types/user'

export const authConfig: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
		}),
		GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
		Credentials({
			credentials: {
				email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password){
                    throw new Error("An email address and password are required.")
                }

				const requestData = {
                    email: credentials.email,
                    password: credentials.password
                }

				const res = await axios.post('/login/auth', requestData);
				const user: IUser = res.data.userData;

				const newUser = {
					name: user.firstName + " " + user.lastName,
					email: user.email,
					image: user.avatarURL,
				}

				if (user) {
                    // return user
                    return newUser
                } else {
                    throw new Error(res.data.message)
                }
			}
		})
	],
	pages: {
		signIn: "/auth",
	}
}