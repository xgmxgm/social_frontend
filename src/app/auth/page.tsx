'use client'

import { GoogleButton } from '@/shared/ui/GoogleButton'
import { Input } from '@/shared/ui/Input'
import { FormEventHandler, useState } from 'react'
import axios from '@/axios'

import styles from './Auth.module.scss'
import { Button } from '@/shared/ui/Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Auth () {
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');

	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const reqData = {
			email: formData.get("email"),
			password: formData.get("password"),
		}

		const res = await axios.post('/login/auth', reqData)

		const responce = await signIn('credentials', {
			email: formData.get("email"),
			password: formData.get("password"),
			redirect: false,
		})

		if (responce && !responce.error) {
			router.push("/profile")
		} else {
			console.log(res)
		}
	}

	return (
		<div className={styles.Auth}>
			<div className={styles.Auth__Title}>
				<h2>Auth</h2>
			</div>
			<div className={styles.Auth__Form}>
				<form onSubmit={handleSubmit}>
					<Input name='email' inputType='email' inputValue={inputEmail} setInputValue={setInputEmail} placeholder='Email' />
					<Input name='password' inputType='password' inputValue={inputPassword} setInputValue={setInputPassword} placeholder='Password' />
					<Button>Log In</Button>
				</form>
				<div className={styles.Border}>
					<div className={styles.Line}></div>
					<h3 className={styles.Text}>or</h3>
					<div className={styles.Line}></div>
				</div>
				<div className={styles.OtherAuth}>
					<GoogleButton />
				</div>
			</div>
		</div>
	)
}