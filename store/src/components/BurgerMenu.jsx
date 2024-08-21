import { RxHamburgerMenu } from "react-icons/rx"
import React, { useState, useContext } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"

import AuthContext  from '../context/AuthContext';

export default function BurgerMenu() {
    let [mmShown, setMMShown] = useState(false)
    const {auth} = useContext(AuthContext)
    const [user] = useAuthState(auth)

    return (
    <div className='burgerCont'>
        <RxHamburgerMenu className='burger' onClick={()=>{setMMShown(!mmShown)}}/>
        {
            mmShown && 
            <div className='mobileInfo'>
                <div className='mobileNavig'>
                    <ul>
                        <li><a href='/'>Главная</a></li>
                        { !user && <li><a href='/Login'>Войти</a></li> }
                        { !user && <li><a href='/Reg'>Регистрация</a></li> }
                    </ul>
                </div>
                {
                    user && <div className='mobileUser'>
                        <span>{user.displayName}</span>
                        <span>{user.email}</span>
                        <a onClick={()=>{
                                    auth.signOut()
                                    localStorage.clear()
                                    }}
                            href='/Login'>
                                Выйти
                        </a>
                    </div>
                }
                {
                    user ? user.photoURL ? 
                        <img className='mobileUserIco' src={user.photoURL}/>:
                        <p className='mobileUserIco'>{user.email[0]}</p> :
                        <p></p>
                }
            </div>
        }
    </div>
  )
}
