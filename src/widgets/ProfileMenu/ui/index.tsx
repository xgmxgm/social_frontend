import react from "react"

import styles from './ProfileMenu.module.scss'

interface IProps {
	modalActive: boolean,
	setModalActive: (modalActive: boolean) => void,
	children: react.ReactNode,
}

export const ProfileMenu = ({ modalActive, setModalActive, children }: IProps) => {
	const modalhandler = (e: react.FormEvent<HTMLInputElement>) => {
		setModalActive(false) 
		e.preventDefault()
	}

	return (
		// <div onClick={() => setModalActive(false)} className={styles.ProfileMenu} style={{ display: modalActive ? "block" : "none" }}>
		<div onClick={() => modalhandler} className={styles.ProfileMenu} style={{ display: modalActive ? "block" : "none" }}>
			{ children }
		</div>
	)
}