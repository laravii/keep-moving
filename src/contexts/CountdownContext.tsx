import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: ()=> void;
    resetCountdown: () => void;
}
type CountdownProviderProps = {
    children: ReactNode;
}
let countdouwnTimeout: NodeJS.Timeout;
export const CountdownContext = createContext({} as CountdownContextData);
export const CountdownProvider = ({children} : CountdownProviderProps) => {
    const {startNewChallenge} = useContext(ChallengesContext)
    const timeStart = 25 * 60
    const [time, setTime] = useState(timeStart);
    const [isActive, setIsActive] = useState(false);
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    const [hasFinished, setHasFinished] = useState(false)

    const startCountdown = () =>{
        setIsActive(true);
    }
    const resetCountdown = () => {
        clearTimeout(countdouwnTimeout)
        setIsActive(false)
        setTime(timeStart)
        setHasFinished(false)
    }
    useEffect(() => {
        if(isActive && time > 0){
           countdouwnTimeout = setTimeout(() => {
                setTime(time-1)
            }, 1000)
        } else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge()
        }
    },[isActive, time])
    
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
