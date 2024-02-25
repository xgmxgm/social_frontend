import { getServerSession } from 'next-auth';
import styles from "./Profile.module.scss";
import { authConfig } from '@/configs/auth';

export default async function Profile () {
	const session = await getServerSession(authConfig);

	return (
		<div className={styles.Profile}>
			<h2>Profile: {session?.user?.name}</h2>
			<h2>Profile: {session?.user?.email}</h2>
		</div>
	)
}