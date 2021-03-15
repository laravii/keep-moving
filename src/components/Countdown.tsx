import { useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export function Countdown(){
    const {
        minutes,
        seconds, 
        hasFinished, 
        isActive, 
        resetCountdown,
        startCountdown} = useContext(CountdownContext)
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
    
    return(
    <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
            </div>
        </div>
        {hasFinished 
        ? 
        <button 
        disabled
        className={styles.countdownButton}>Parabens otário</button> 
        :
        <button 
        type="button" 
        onClick={isActive ? resetCountdown : startCountdown} 
        className={`${styles.countdownButton} 
                    ${isActive && styles.countdownButtonActive}` }>
        {isActive ? "Abandonar ciclo" : "Iniciar ciclo"}</button>}
    </div>
    )
}