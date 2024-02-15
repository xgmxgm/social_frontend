import Link from 'next/link'

import styles from './LinkButton.module.scss'

interface IProps {
	children: React.ReactNode,
	link: string,
}

export const LinkButton = ({ children, link }: IProps) => {
	return (
		<Link className={styles.LinkButton} href={link}>
			{children}
		</Link>
	)
}