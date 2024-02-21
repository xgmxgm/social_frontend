'use client'

import { FormEventHandler, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { GoogleButton } from '@/shared/ui/GoogleButton'
import axios from '@/axios'

import styles from "./Register.module.scss"

export default function Register () {
	const [inputEmail, setInputEmail] = useState<string>('')
	const [inputName, setInputName] = useState<string>('')
	const [inputLastName, setInputLastName] = useState<string>('')
	const [inputPassword, setInputPassword] = useState<string>('')
	const [inputRepeatPassword, setInputRepeatPassword] = useState<string>('')

	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (formData.get("password") != formData.get("repeatPassword")) {
			throw new Error("error")
		}

		const reqData = {
			email: formData.get("email"),
			firstName: formData.get("firstName"),
			lastName: formData.get("lastName"),
			password: formData.get("password"),
			repeatPassword: formData.get("repeatPassword"),
		};

		console.log("formData: ", reqData)

		const res = await axios.post("/register/create", reqData);

		const responce = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false,
		})

		if (responce && !responce.error) {
			router.push('/profile')
		} else {
			console.log(res)
		}
	}

	return (
		<div className={styles.Register}>
			<div className={styles.Register__Title}>
				<h2>Sign In</h2>
			</div>
			<div className={styles.Register__Form}>
				<form onSubmit={handleSubmit}>
					<Input name='email' inputValue={inputEmail} setInputValue={setInputEmail} placeholder='Email' inputType='email' />
					<Input name='firstName' inputValue={inputName} setInputValue={setInputName} placeholder='First name' inputType='text' />
					<Input name='lastName' inputValue={inputLastName} setInputValue={setInputLastName} placeholder='Last name' inputType='text' />
					<Input name='password' inputValue={inputPassword} setInputValue={setInputPassword} placeholder='Password' inputType='password' />
					<Input name='repeatPassword' inputValue={inputRepeatPassword} setInputValue={setInputRepeatPassword} placeholder='Repeat password' inputType='password' />
					<Button>Sign In</Button>
				</form>
				<div className={styles.Border}>
					<div className={styles.Line}></div>
					<h3 className={styles.Text}>or</h3>
					<div className={styles.Line}></div>
				</div>
				<div className={styles.OtherSignIn}>
					<GoogleButton />
				</div>
			</div>
		</div>
	)
}