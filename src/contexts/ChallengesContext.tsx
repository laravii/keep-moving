import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    isConfirmModalResetOpen: boolean;
    level : number;
    currentExperience: number;
    challengesCompletes: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: ()=> void;
    toOpenConfirmationResetModal: () => void;
    resetAllProgress: () => void;
    doNotResetAllProgress: () => void;
}

type ChallengesProviderProps = {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompletes: number;
}
export const ChallengesContext = createContext({} as ChallengesContextData)

export const ChallengesProvider = ({children, ...rest} : ChallengesProviderProps) =>{
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompletes, setChallengesCompletes] = useState(rest.challengesCompletes ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen]= useState(false)
    const [isConfirmModalResetOpen, setIsConfirmModalResetOpen] = useState(false)
    const experienceToNextLevel = Math.pow((level +1)*4,2)
    const levelUp = () => {
      setLevel(level + 1)
      setIsLevelUpModalOpen(true)
    }
    
    const startNewChallenge = () =>{
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()
        if(Notification.permission === 'granted'){
            new Notification('Novo desafio liberado',{
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }
    const resetChallenge = () =>{
        setActiveChallenge(null)
    }
    const completeChallenge = () =>{
        if (!activeChallenge) {
            return
        }
        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompletes(challengesCompletes + 1);
    }
    const closeLevelUpModal = () =>{
        if(!isLevelUpModalOpen){
            return
        }
        setIsLevelUpModalOpen(false)
    }
    const toOpenConfirmationResetModal = ()=>{
        setIsConfirmModalResetOpen(true)
    }
    const resetAllProgress = ()=>{
        setLevel(1)
        setCurrentExperience(0)
        setChallengesCompletes(0)
        setIsConfirmModalResetOpen(false)
    }
    const doNotResetAllProgress = () =>{
        setIsConfirmModalResetOpen(false)
    }
    useEffect(() =>{
        Notification.requestPermission()
    }, [])
    useEffect(()=>{
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompletes', String(challengesCompletes))
    }, [levelUp, currentExperience, challengesCompletes])

    return(
        <ChallengesContext.Provider value={{
         isConfirmModalResetOpen,
         level,
         currentExperience,
         challengesCompletes,
         activeChallenge,
         experienceToNextLevel,
          levelUp,
          startNewChallenge,
          resetChallenge,
          completeChallenge,
          closeLevelUpModal,
          resetAllProgress,
          toOpenConfirmationResetModal,
          doNotResetAllProgress}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}