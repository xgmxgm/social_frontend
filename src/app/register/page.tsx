'use client'

import { FormEventHandler, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { GoogleButton } from '@/shared/ui/GoogleButton'
import axios from '@/axios'

import styles from "./Register.module.scss"
import { ShowButton } from '@/shared/ui/ShowButton'

export default function Register () {
	const [inputEmail, setInputEmail] = useState<string>('')
	const [inputName, setInputName] = useState<string>('')
	const [inputLastName, setInputLastName] = useState<string>('')
	const [inputPassword, setInputPassword] = useState<string>('')
	const [inputRepeatPassword, setInputRepeatPassword] = useState<string>('')

	const [showButton, setShowButton] = useState<boolean>(false);
	const [showButtonRepeat, setShowButtonRepeat] = useState<boolean>(false);

	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		if (formData.get("password") != formData.get("repeatPassword")) {
			alert("password not repeat")
		} else {
			const reqData = {
				email: formData.get("email"),
				firstName: formData.get("firstName"),
				lastName: formData.get("lastName"),
				password: formData.get("password"),
				repeatPassword: formData.get("repeatPassword"),
			};
	
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
					<div className={styles.passwordInput}>
						<Input name='password' inputValue={inputPassword} setInputValue={setInputPassword} placeholder='Password' inputType={showButton ? "text" : "password"} />
						<ShowButton showPass={showButton} setShowPass={setShowButton} />
					</div>
					<div className={styles.passwordInput}>
						<Input name='repeatPassword' inputValue={inputRepeatPassword} setInputValue={setInputRepeatPassword} placeholder='Repeat password' inputType={showButtonRepeat ? "text" : "password"} />
						<ShowButton showPass={showButtonRepeat} setShowPass={setShowButtonRepeat} />
					</div>
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