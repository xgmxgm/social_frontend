import type { AuthOptions, User } from "next-auth";
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

			authorization: {

			}
		}),
		GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
		Credentials({
			name: "Credentials",

			credentials: {
				email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true }
			},
			async authorize(credentials): Promise<any> {
				const requestData = {
                    email: credentials!.email,
                    password: credentials!.password
                }

				const res = await axios.post('/login/auth', requestData);
				const user: IUser = res.data.userData;

				console.log("user backend: ", res.data)

				if (user) {
					// return res.data
					return {
						id: user.id,
						name: user.firstName + " " + user.lastName,
						email: user.email,
						image: user.avatarURL,
					}
                } else {
                    throw new Error(res.data.message)
                }
			}
		})
	],
	callbacks: {
		async session({session, user}) {
			session.user = {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				avatarURL: user.avatarURL,
			}
			return session;
		}
	},
	pages: {
		signIn: "/auth",
	},
}