'use client'

import { GoogleButton } from '@/shared/ui/GoogleButton'
import { Input } from '@/shared/ui/Input'
import { FormEventHandler, useEffect, useState } from 'react'
import axios from '@/axios'
import { motion } from "framer-motion"

import styles from './Auth.module.scss'
import { Button } from '@/shared/ui/Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ShowButton } from '@/shared/ui/ShowButton'

export default function Auth () {
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');
	const [showButton, setShowButton] = useState<boolean>(false);

	const [message, setMessage] = useState('');

	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			setMessage('')
		}, 3000)
	}, [message])

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const reqData = {
			email: formData.get("email"),
			password: formData.get("password"),
		}

		const res = await axios.post('/login/auth', reqData)

		if (res.data.userData) {
			const responce = await signIn('credentials', {
				email: formData.get("email"),
				password: formData.get("password"),
				redirect: false,
			})

			if (responce && !responce.error) {
				router.push("/profile")
			}
		} else {
			console.log(res)
			setMessage(res.data.message)
		}
	}

	const pVariants = {
        hidden: {
            y: -100,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1
        }
    }

	return (
		<div className={styles.Auth}>
			<div className={styles.Auth__Title}>
				<h2>Auth</h2>
			</div>
			{ message ? 
				<motion.div
					initial='hidden'
					whileInView='visible'
					variants={pVariants}
					transition={{duration: 0.3}}
					className={styles.Message}>
					{message}
				</motion.div>
			: <></>}
			<div className={styles.Auth__Form}>
				<form onSubmit={handleSubmit}>
					<Input name='email' inputType='email' inputValue={inputEmail} setInputValue={setInputEmail} placeholder='Email' />
					<div className={styles.passwordInput}>
						<Input name='password' inputType={showButton ? "text" : "password"}inputValue={inputPassword} setInputValue={setInputPassword} placeholder='Password' />
						<ShowButton showPass={showButton} setShowPass={setShowButton} />
					</div>
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