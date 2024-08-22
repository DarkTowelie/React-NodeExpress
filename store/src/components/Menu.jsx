import React, { useState, useContext } from 'react'
import Card from './Card'
import Calendar from 'react-calendar'
import '../css/Menu.css'
import CardEditor from './CardCreator'
import 'react-calendar/dist/Calendar.css'
import NumericInput from 'react-numeric-input'

export default function Menu(props) {
  let [categ, setCateg] = useState([])
  let [currentCateg, setCurrentCateg] = useState("")

  let [date, setDate] = useState(new Date())
  let [price, setPrice] = useState(1000);
  let [dishes, setDishes] = useState(props.dishes)
  let [popupActive, setPopupActive] = useState(false)

  async function updateDishes(){
    fetch("http://localhost:4444/dishes")
    .then(response => response.json())
    .then(res => {res.length > 0 ? setDishes(res) : dishes.length === 0 && setDishes([
      {
        "id": "f29b3b2c-9d0a-44f7-bc81-d71aeecd5a64",
        "title": "Неизвестный товар",
        "img": "",
        "desc": "???",
        "price": 0,
        "category": "???",
        "days": [1,2,3,4,5,6,0]
       }
    ])});
  }

  //--------------------------------------------
  function removeDish(dish){
    let dishId = {"id" : dish.id}
    dishes.filter((d) => d.id !== dish.id)
    fetch(`http://localhost:4444/removeDish`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(dishId)
    }).then(()=>{
      updateDishes()})
  }

  function showPopup()
  {
    return(
      <div className='calendarPopup'>
        <Calendar onChange={setDate} value={date}/>
        <div onClick={()=>{setPopupActive(false)}} className='closeBtn'>&#10799;</div>
      </div>
    )
  }

  if(dishes.length === 0)
  {
    updateDishes()
  }

  fetch("http://localhost:4444/categories").
  then(res => res.json()).
  then(obj => {
    let categs = obj["categories"]
    categ.length === 0 && setCateg(categs) || setCurrentCateg(categs[0]) 
  })

  return (
    <div className='menu'>
      <div className='filter'>
        <div className='priceFilter'>
          <span>Категория:</span>
          <select name="select" onChange={e=>{console.log(e.target.value)}}>
            {categ.map(el => (<option key={el} value={el}>{el}</option>))}
          </select>
          <span>Максимальная цена:</span>
          <NumericInput className='numInp' min={0} max={1000} value={price} onChange={setPrice}/>
        </div>
        <div onClick={()=>{setPopupActive(true)}} className='calendarBtn'></div>
      </div>
      {popupActive && showPopup()}
      <div className='cardsCont'>
          {
            dishes.map(el=>(
              <Card key={el.id} cardObj={el} isEdit={props.isEdit} 
              addToCart={props.addToCart} removeDish={removeDish} 
              date={date} price={price}/>
            ))
          }
          {props.isEdit && <CardEditor updateDishes={updateDishes} categ={categ}/>}
      </div>
    </div>
  )
}