'use client'

import { ProfileHeader } from '@/widgets/ProfileHeader'
import Link from 'next/link'

import styles from "./Header.module.scss"

export const DesktopHeader = () => {
    return (
        <>
            <div className={styles.Header}>
                <div className={styles.Header__Content}>
                    <div className={styles.Left__Content}>
                        <div className={styles.TitleContent}>
                            <Link className={styles.Title} href="/"><h2>Social</h2></Link>
                        </div>
                    </div>
                    <div className={styles.Right__Content}>
                        <ProfileHeader />
                    </div>
                </div>
            </div>
		</>
    )
}