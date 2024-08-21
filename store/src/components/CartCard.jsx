import React from 'react'
import '../css/CartCard.css'

export default function CartCard(props) {
  return (
    <div className='cartCard'>
      <img src={props.cardObj.img} alt={props.cardObj.desc}/>
      <p>{props.cardObj.title}</p>
      <span>Цена: {props.cardObj.price}₽</span>
      <div className='removeFromCard' onClick={()=>{
        props.removeFromCart(props.cardObj.id)
      }}>-</div>
    </div>
  )
}
