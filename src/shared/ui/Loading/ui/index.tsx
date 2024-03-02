import 'animate.css';

import styles from './Loading.module.scss'

interface IProps {
	loading: boolean,
}

export const Loading = ({ loading }: IProps) => {
	return (
		loading ? 
			<div className={`${styles.Main} animate__animated animate__bounceIn`}>
				<div className={styles.Loading}>
					<div className={styles.loadingio_spinner_ripple_zxcd2sekpvm}><div className={styles.ldio_3bqirzko8qr}>
					<div></div><div></div>
					</div></div>
				</div>
				<div className={`${styles.Text} animate__animated animate__bounce animate__infinite animate__slow`}>
					<p>LOADING</p>
				</div>
			</div> 
		: <></>
	)
}