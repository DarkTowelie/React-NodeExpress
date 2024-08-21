import React from 'react'
import Menu from './Menu'
import '../css/Main.css'

export default function Main(props) {
  return (
    <main>
        <div className='description'></div>
        <Menu dishes={props.dishes} addToCart={props.addToCart} isEdit={false}/>
    </main>
  )
}
