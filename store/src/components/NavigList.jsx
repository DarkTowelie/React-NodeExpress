import React, { useState,  useContext} from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthContext';
import { IsAdminContext } from '../context/IsAdminContext';
import { useAuthState  } from "react-firebase-hooks/auth"

export default function NavigList(props) {
    const {auth}  = useContext(AuthContext)
    const [user]  = useAuthState(auth)
    const isAdmin = useContext(IsAdminContext)

    //Поменять значение isAdmin
    function showInfo(auth, user){
        return (
          <div className='userInfo'>
            <span>{user.displayName}</span>
            <span>{user.email}</span>
            <Link onClick={()=>{
                auth.signOut()
                localStorage.clear()
                }} to='/Login'>Выйти</Link>
            </div>
        )
    }

    let [infoOpen, setInfoOpen] = useState(false)

    return (
        <ul className='navigList'>
            <li><Link to='/'>Главная</Link></li>
            { isAdmin && <li><Link to='/Editor'>Редактор</Link></li> }
            {user ? 
            (<li>
                {
                    user.photoURL ? 
                        <img className='userIco' 
                    onClick={()=>setInfoOpen(!infoOpen)} src={user.photoURL}/> 
                    :
                    <p onClick={()=>setInfoOpen(!infoOpen)} className='userIco'>{user.email[0]}</p>
                }
                { infoOpen && showInfo(auth, user)}
            </li>) : 
            (<li><Link to='/Login'>Войти</Link></li>) }
        </ul>
    )
}