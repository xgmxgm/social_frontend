import styles from './Input.module.scss'

interface IProps {
	inputValue: string,
    setInputValue: (InputValue: string) => void,
	placeholder?: string,
	inputType: string,
}

export const Input = ({ placeholder, inputValue, setInputValue, inputType }: IProps) => {
	return (
		<div>
			<input 
				onChange={(e) => setInputValue(e.target.value)}
				placeholder={placeholder}
				className={styles.Input}
				value={inputValue}
				type={inputType}
			/>
		</div>
	)
}