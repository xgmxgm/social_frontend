'use client'

import { GoogleButton } from '@/shared/ui/GoogleButton'
import { Input } from '@/shared/ui/Input'
import { FormEventHandler, useEffect, useState } from 'react'
import axios from '@/axios'
import { AnimatePresence, motion } from "framer-motion"

import styles from './Auth.module.scss'
import { Button } from '@/shared/ui/Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ShowButton } from '@/shared/ui/ShowButton'
import { Loading } from '@/shared/ui/Loading'
import Link from 'next/link'

export default function Auth () {
	const [inputEmail, setInputEmail] = useState<string>('');
	const [inputPassword, setInputPassword] = useState<string>('');
	const [showButton, setShowButton] = useState<boolean>(false);

	const [message, setMessage] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			setMessage('')
		}, 3000)
	}, [message])

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		setLoading(true)

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
			.finally(() => {
				setLoading(false)
			})

			if (responce && !responce.error) {
				router.push("/profile")
			}
		} else {
			setLoading(false)
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
        },
		exit: {
			y: -100,
			opacity: 0
		}
    }

	return (
		<div className={styles.Auth}>
			<Loading loading={loading} />
			<div className={styles.Auth__Title}>
				<h2>Auth</h2>
			</div>
			<AnimatePresence>
				{message && (
				<motion.div
					variants={pVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={{ duration: 0.3 }}
					className={styles.Message}
				>
					{message}
				</motion.div>
				)}
			</AnimatePresence>
			<div className={styles.Auth__Form}>
				<form onSubmit={handleSubmit}>
					<Input name='email' inputType='email' inputValue={inputEmail} setInputValue={setInputEmail} placeholder='Email' />
					<div className={styles.passwordInput}>
						<Input name='password' inputType={showButton ? "text" : "password"}inputValue={inputPassword} setInputValue={setInputPassword} placeholder='Password' />
						<ShowButton showPass={showButton} setShowPass={setShowButton} />
					</div>
					<Button>Log In</Button>
					<Link className={styles.Link} href='/register'>Don't have an account?</Link>
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