"use client"

import Image from 'next/image'
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'

import styles from './GoogleButton.module.scss'

export const GoogleButton = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';

	return (
		<button className={styles.GoogleButton} onClick={() => signIn('google', {callbackUrl})}>
			<Image src='img/google_icon.svg' alt='google img' width={30} height={30} />
			<p>Sign in with Google</p>
		</button>
	)
}