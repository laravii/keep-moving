import { useContext, useState } from 'react'
import { ProfileContext } from '../contexts/ProfileContext'
import styles from '../styles/components/ProfileInfosModal.module.css'

export const ProfileInfosModal = () => {
    const {handleChangeInput, handleSubmit} = useContext(ProfileContext)
    return(
        <div className="overlay">
            <div className={`container ${styles.profileInfosModalContainer}`}>
                <header>
                    <strong>Keep Moving </strong>
                </header>
                <form action="">
                    <fieldset>
                        <legend>Escolha um nome de usuário</legend>
                        <input 
                        type="text" 
                        required
                        onChange={handleChangeInput}/>
                    </fieldset>
                    <fieldset>
                        <legend>Você pode usar sua foto do Github</legend>
                        <label>
                            Insira a URL do seu perfil ou deixe em branco para um avatar aleattório
                            <input 
                            type="text" 
                            onChange={handleChangeInput}

                            /> 
                        </label>
                    </fieldset>
                    <button type="button" onClick={handleSubmit}>Salvar</button>
                </form>
            </div>
        </div>      
    )
}