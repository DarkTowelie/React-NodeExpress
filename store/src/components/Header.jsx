import React, { useContext, useState } from 'react'
import CartCard from './CartCard'
import '../css/Header.css'
import NavigList from './NavigList'
import BurgerMenu from "./BurgerMenu"

import { AiOutlineShoppingCart } from "react-icons/ai"


function showCart(props){
  const len = props.cart.length;
  if(len > 0)
  {
    let sum = 0
    props.cart.forEach(el => {
      sum += Number.parseFloat(el.price)
    });
    return (
      <div className='cartCont'>
          {
           props.cart.map(el =>(<CartCard key = {el.id} cardObj = {el} removeFromCart={props.removeFromCart}/>))
          }
          <p className='priceSum'>Сумма {sum}₽</p>
      </div>
    )
  }
  else
  {
    return (
      <div className='cartCont'>
        <span className='emptyMsg'>Корзина пуста!</span>
      </div>
    )
  }
}

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false)

  return (
    <header>
          <span className='title'>Столовая школы №7</span>
          <nav>
            <AiOutlineShoppingCart 
              className={`${cartOpen ? 'cartButtonActive' : 'cartButton'}`}
              onClick={()=>setCartOpen(!cartOpen)}
            />
            <NavigList/>
            <BurgerMenu/>
          </nav>
          {
            cartOpen && showCart(props)
          }
    </header>
  )
}
