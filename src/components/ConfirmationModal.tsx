import { ReactNode } from "react"
import styles from "../styles/components/ConfirmationModal.module.css"

interface ConfirmationModalProps{
    children: ReactNode;
    confirmation : () => void
    denied: () => void
}

export const ConfirmationModal = ({children, ...rest}: ConfirmationModalProps) => {
    return(
        <div className="overlay">
            <div className={`container ${styles.confirmationModalContainer}`}>
                {children}
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.confirmationButton} onClick={rest.confirmation}>Sim</button>
                    <button type="button" className={styles.deniedButton} onClick={rest.denied}>Não</button>
                </div>
            </div>
        </div>
    )
}