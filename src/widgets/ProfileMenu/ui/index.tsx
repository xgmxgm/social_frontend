import react from "react"

import styles from './ProfileMenu.module.scss'

interface IProps {
	modalActive: boolean,
	setModalActive: (modalActive: boolean) => void,
	children: react.ReactNode,
}

export const ProfileMenu = ({ modalActive, setModalActive, children }: IProps) => {
	return (
		<div onClick={() => setModalActive(false)} className={styles.ProfileMenu} style={{ display: modalActive ? "block" : "none" }}>
			{ children }
		</div>
	)
}