import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from '../styles/components/Profile.module.css'
import { ConfirmationModal } from './ConfirmationModal';
import { ProfileInfosModal } from './ProfileInfosModal';

export function Profile (){
    const userName = Cookies.get("userName")
    const photo = Cookies.get("photo")
    const {level,
        isConfirmModalResetOpen,
        resetAllProgress,
        toOpenConfirmationResetModal,
        doNotResetAllProgress} = useContext(ChallengesContext);
    const {
        isConfirmChangeUser,
        isProfileInfosModal,
        openChangeUserModal,
        changeUser,
        doNotChangeUser} = useContext(ProfileContext)
    return(
            <div className={styles.profileContainer}>
                <div className={styles.profileBox}>
                    <img src={photo} alt={`Foto de: ${userName}`}/>
                    <div>
                        <strong>{userName}</strong>
                        <p>
                            <img src="icons/level.svg" alt="Level"/>
                            Level {level}</p>
                    </div>
                </div>
                <div className={styles.buttonBox}>
                    <button type="button" onClick={toOpenConfirmationResetModal}>
                        <img src="/icons/restart-icon.png" alt="Botão reiniciar"/>
                    </button>
                    <button onClick={openChangeUserModal} type="button">
                        <img src="/icons/changeuser.png" alt="Trocar usuário"/>
                    </button>
                </div>
                {isProfileInfosModal && <ProfileInfosModal/>}
                    {isConfirmModalResetOpen && <ConfirmationModal
                    confirmation={resetAllProgress}
                    denied={doNotResetAllProgress}>
                        <strong>Certeza que deseja reiniciar todo o progresso conquistado?</strong>
                        </ConfirmationModal>}
                    {isConfirmChangeUser && <ConfirmationModal
                    confirmation={changeUser}
                    denied={doNotChangeUser}>
                        <strong>Certeza que deseja trocar de usuário?</strong>
                        <p>Essa ação ocasionará na perda de todo o progresso conquistado até o momento</p>
                        </ConfirmationModal>}
            </div>
    );
}