import eye_open from "../../../../../public/eye-open.svg";
import eye_closed from "../../../../../public/eye-closed.svg";
import Image from "next/image";

import styles from "./ShowButton.module.scss";

interface IProps {
    showPass: boolean,
    setShowPass: (showPass: boolean) => void,
}

export const ShowButton = ({ showPass, setShowPass }: IProps) => {
    return (
        <>
            <button className={styles.ShowButton} onClick={() => setShowPass(!showPass)} type="button"><Image src={!showPass ? "/img/eye-closed.svg" : "/img/eye-open.svg"} width={40} height={40} alt=""/></button>
        </>
    )
}