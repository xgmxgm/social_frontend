import Image from 'next/image'
import { LinkButton } from '@/shared/ui/LinkButton'

import styles from './ProfileHeader.module.scss'

export const ProfileHeader = () => {
	return (
		<div className={styles.ProfileHeader}>
			<div className={styles.Links}>
				<LinkButton link='register'>
					Sign In
				</LinkButton>
				<LinkButton link='auth'>
					Log In
				</LinkButton>
			</div>
			<div className={styles.Profile}>
				<Image className={styles.Profile__Img} width={60} height={60} src='/img/empty-person.webp' alt='' />
			</div>
		</div>
	)
}