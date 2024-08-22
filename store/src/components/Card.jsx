import React from 'react'
import '../css/Card.css'
import emptyLogo from '../img/notimages.png';

export default function Card(props) {
  let dayNum = props.date.getDay()
  if(props.cardObj.days.includes(dayNum) && props.cardObj.price <= props.price){
    return (
       <div className='card'>
          {
            props.cardObj.img === "" ? 
              <img src={emptyLogo} alt={props.cardObj.desc}/> :
              <img src={props.cardObj.img} alt={props.cardObj.desc}/>
          }

         <p>{props.cardObj.title}</p>
         <span>{props.cardObj.desc}</span>
         <span>Цена: {props.cardObj.price}₽</span>
         {
          props.isEdit ?
            <div className='removeDish' onClick={()=>props.removeDish(props.cardObj)}>-</div> : 
            <div className='addToCard'  onClick={()=>props.addToCart(props.cardObj)}>+</div>
         }
       </div>
    )
  } 
  else{
    return null;
  }
}
