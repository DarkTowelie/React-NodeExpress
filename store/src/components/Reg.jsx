import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/LogReg.css'

import AuthContext  from '../context/AuthContext';
import { emailFetch } from './Login'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Reg() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [copyPassword, setCopyPassword] = useState("")
  const [regError, setRegError] = useState("")

  const {auth} = useContext(AuthContext)
  const navigate = useNavigate()

  async function register(e){
    e.preventDefault()
    if(password.length == 0){
      setRegError("Укажите пароль!")
      return
    }

    if(password != copyPassword){
      setRegError("Пароли не совпадают!")
      return
    }

    await createUserWithEmailAndPassword(auth, email, password).
      then((user)=>{
        setEmail("")
        setPassword("")
        setCopyPassword("")
        emailFetch(email, AuthContext)
        alert("Регистрация успешно выполнена!")
        navigate("/")
      }).catch((error)=>{setRegError(error.toString())})
  }

  return (
    <div className='formWrapper'>
      <form className='log-reg' onSubmit={register}>
        <input type='email'    placeholder='Почтовый адрес' name='email'
               value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

        <input type='password' placeholder='Пароль'
               value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

        <input type='password' placeholder='Повторите пароль'
              value={copyPassword} onChange={(e)=>{setCopyPassword(e.target.value)}}/>

        <input type='submit' value='Регистрация' />
        {regError && <p style={{color:"red"}}>{regError}</p>}
      </form>
      <Link to='/login'>Уже есть аккаунт?</Link>
    </div>
  )
}
