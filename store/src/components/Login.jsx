import React, { useState, useContext } from 'react'
import googleIco from "../img/google.png"

import AuthContext  from '../context/AuthContext';

import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { signInWithEmailAndPassword } from 'firebase/auth'

export function emailFetch(email){
  fetch("http://localhost:4444/addUser", {
    method : "POST",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    body: `{ "email": "${email}" }`
  });
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [regError, setRegError] = useState("")

  const {auth} = useContext(AuthContext)
  const navigate = useNavigate()

  const googleLogin = async ()=>{
    try {
      const provider = new GoogleAuthProvider()
      const {user} = await signInWithPopup(auth, provider)
      emailFetch(user.email);
      user && navigate("/")
    }
    catch
    {
      console.log("Ошибка окна логина через google")
    }
  }

  const emailLogin = async(e)=>{
    e.preventDefault()
    
    await signInWithEmailAndPassword(auth, email, password).
      then(()=>{
        setEmail("")
        setPassword("")
        emailFetch(email);
        alert("Добро пожаловать!")
        navigate("/")
      }).catch((error)=>{setRegError(error.toString())})
  }

  const [user] = useAuthState(auth)
  user && navigate("/")

  return (
    <div className='formWrapper' onSubmit={emailLogin}>
        <form className='log-reg'>
            <input type='email' placeholder='Почтовый адрес' name='email'
                   value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

            <input type='password' placeholder='Пароль'
                value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

            <input type='submit' value='Войти' />

            {regError ? <p style={{color:"red"}}>{regError}</p> : ""}
            <span>Или войдите через Google</span>
            <div onClick={googleLogin} className='googleLogin'>
                <img src={googleIco} alt={'google logo'}/>
                <span>Войти</span>
            </div>
            {regError && <p style={{color:"red"}}>{regError}</p>}
        </form>
        <a href='/reg'>Нет аккаунта? Зарегестрируйтесь!</a>
    </div>
  )
}

