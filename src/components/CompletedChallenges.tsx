import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){
    const {challengesCompletes} = useContext(ChallengesContext)
    return(
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompletes}</span>
        </div>
    )
}