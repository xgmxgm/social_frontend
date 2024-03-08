import { useSession, signOut } from "next-auth/react"
import { LinkButton } from '@/shared/ui/LinkButton'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './ProfileHeader.module.scss'
import { ProfileMenu } from '@/widgets/ProfileMenu'
import { Data } from '../Datas'

export const ProfileHeader = () => {
	const [modalActive, setModalActive] = useState<boolean>(false);

	const session = useSession();

	console.log(session)

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
				<div
					onClick={() => setModalActive(!modalActive)}
					className={styles.Profile}>
					<h3>{session.data.user?.name}</h3>
						<Image
							onClick={() => setModalActive(!modalActive)} unoptimized
							className={styles.Profile__Img}
							width={50}
							height={50}
							src={session.data.user?.image == 'defaultUser.png' ? '/img/empty-person.webp' : session.data.user?.image as string}
							alt='' />
						<ProfileMenu
							modalActive={modalActive}
							setModalActive={setModalActive}>
							<ul className={styles.ul}>
								{Data.map((data) => 
									<li className={styles.li}>
										<Image src={data.icon} width={20} height={20} alt='' />
										<Link className={styles.Link} href={data.href}>{data.text}</Link>
									</li>
								)}
								<li className={styles.li}><Image src='/img/sign_out2_icon.svg' width={20} height={20} alt='' /><Link className={styles.Link} href='#' onClick={() => signOut({ callbackUrl: "/auth" })}>Sign out</Link></li>
							</ul> 
						</ProfileMenu>
				</div>
			}
		</div>
	)
}