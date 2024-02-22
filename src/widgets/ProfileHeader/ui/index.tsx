import Image from 'next/image'
import { LinkButton } from '@/shared/ui/LinkButton'
import { useSession, signOut } from "next-auth/react"

import styles from './ProfileHeader.module.scss'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/configs/auth'

export const ProfileHeader = () => {
	const session = useSession();

	return (
		<div className={styles.ProfileHeader}>
			{ !session.data ? 
				<div className={styles.Links}>
					<LinkButton link='register'>
						Sign In
					</LinkButton>
					<LinkButton link='auth'>
						Log In
					</LinkButton>
				</div>
			: 
				<div className={styles.Profile}>
					<Link className={styles.SignOut} href='#' onClick={() => signOut({ callbackUrl: "/auth" })}>Sign out</Link>
					<Image className={styles.Profile__Img} width={50} height={50} src='/img/empty-person.webp' alt='' />
				</div>
			}
		</div>
	)
}