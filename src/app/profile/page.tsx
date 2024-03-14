import { getServerSession } from 'next-auth';
import { authConfig } from '@/configs/auth';
import Image from 'next/image'

import styles from "./Profile.module.scss";

export default async function Profile () {
	const session = await getServerSession(authConfig);

	console.log("/profile: ",session)

	return (
		<div className={styles.Profile}>
			<div className={styles.Profile__Img}>
				<Image style={{borderRadius: "100%", border: "1px solid black"}} unoptimized width={100} height={100} src={session?.user?.image == 'defaultUser.png' ? '/img/empty-person.webp' : session?.user?.image as string} alt='' />
			</div>
			<div className={styles.Profile__Text}>
				<h2>Name: {session?.user?.name}</h2>
				<h2>Email: {session?.user?.email}</h2>
			</div>
		</div>
	)
}