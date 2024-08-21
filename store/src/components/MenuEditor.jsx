import Menu from '../components/Menu'
import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";

import { IsAdminContext } from '../context/IsAdminContext';

export default function MenuEditor(props) {
  const isAdmin = useContext(IsAdminContext)
  return (
    <main>
      {!isAdmin && <Navigate to="/"/>}
      <Menu dishes={props.dishes} addToCart={props.addToCart} isEdit={isAdmin}/>
    </main>
  )
}
