import Cookies from 'js-cookie';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { ChallengesContext } from './ChallengesContext';

interface ProfileContextData {
    isProfileInfosModal: boolean;
    isConfirmChangeUser: boolean
    handleChangeInput: (e:any) => void;
    handleSubmit: (e:any) => void;
    openChangeUserModal: ()=> void,
    changeUser: ()=>void,
    doNotChangeUser: ()=>void
}
type ProfileProviderProps = {
    children: ReactNode;
}
export const ProfileContext = createContext({} as ProfileContextData)

export const ProfileProvider = ({children}:ProfileProviderProps) =>{
    const user = Cookies.get("userName")
    const {resetAllProgress} = useContext(ChallengesContext)
    const [isProfileInfosModal, setIsProfileInfosModal] = useState(user === "" || user === undefined || user === null ? true : false)
    const [isConfirmChangeUser, setIsConfirmChangeUser] = useState(false)
    const [userName, setUserName] = useState('')
    const [githubUser,setGithubUser] = useState('')
    const [photo, setPhoto] = useState('')
    const handleChangeInput = (e) => {
        const target =  e.target
        target.required ? setUserName(target.value): setGithubUser(target.value) 
    }
    const gettingPhoto = () => {
        if(githubUser !== ""){
            setPhoto(`${githubUser}.png`)
        }else{
            setPhoto("https://source.unsplash.com/random")
        }
        Cookies.set("photo",photo)
    }
    const handleSubmit = () => {
        if (userName === "") {     
            return
        }
        gettingPhoto()
        setIsProfileInfosModal(false)
        Cookies.set("userName",userName)
    }
    const openChangeUserModal = () =>{
        setIsConfirmChangeUser(true)
    }
    const changeUser = () =>{
        resetAllProgress()
        setGithubUser("")
        Cookies.remove("userName")
        Cookies.remove("photo")
        setIsConfirmChangeUser(false)
        setIsProfileInfosModal(true)
    }
    const doNotChangeUser = () =>{
        setIsConfirmChangeUser(false)
    }
    return(
        <ProfileContext.Provider value={{
            isProfileInfosModal,
            isConfirmChangeUser,
            handleChangeInput,
            handleSubmit,
            openChangeUserModal,
            changeUser,
            doNotChangeUser
        }}>
            {children}
        </ProfileContext.Provider>
    )
}