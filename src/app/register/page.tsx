'use client'

import { Input } from '@/shared/ui/Input'
import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { GoogleButton } from '@/shared/ui/GoogleButton'

import styles from "./Register.module.scss"

export default function Register () {
	const [inputEmail, setInputEmail] = useState<string>('')
	const [inputName, setInputName] = useState<string>('')
	const [inputLastName, setInputLastName] = useState<string>('')
	const [inputPassword, setInputPassword] = useState<string>('')
	const [inputRepeatPassword, setInputRepeatPassword] = useState<string>('')

	return (
		<div className={styles.Register}>
			<div className={styles.Register__Title}>
				<h2>Sign In</h2>
			</div>
			<div className={styles.Register__Form}>
				<form>
					<Input  inputValue={inputEmail} setInputValue={setInputEmail} placeholder='Email' inputType='email' />
					<Input  inputValue={inputName} setInputValue={setInputName} placeholder='First name' inputType='text' />
					<Input  inputValue={inputLastName} setInputValue={setInputLastName} placeholder='Last name' inputType='text' />
					<Input  inputValue={inputPassword} setInputValue={setInputPassword} placeholder='Password' inputType='password' />
					<Input  inputValue={inputRepeatPassword} setInputValue={setInputRepeatPassword} placeholder='Repeat password' inputType='password' />
					<Button>Sign In</Button>
					<div className={styles.Border}>
						<div className={styles.Line}></div>
						<h3 className={styles.Text}>or</h3>
						<div className={styles.Line}></div>
					</div>
					<div className={styles.OtherSignIn}>
						<GoogleButton />
					</div>
				</form>
			</div>
		</div>
	)
}