import React, { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthContext  from './context/AuthContext';
import IsAdminContext from './context/IsAdminContext'

import Reg from './components/Reg';
import Main from './components/Main'
import Login from './components/Login'
import Footer from './components/Footer'
import Header from './components/Header'
import MenuEditor from './components/MenuEditor'
                                       
export class App extends React.Component {
  static contextType = AuthContext

  constructor(props){
    super(props)

    let cartFromStorage = JSON.parse(localStorage.getItem('cart'))
    if(cartFromStorage === null || cartFromStorage.constructor !== Array){
      cartFromStorage = []
    }

    this.state = {
      isAdmin : false,
      cart : cartFromStorage,
      dishes: []
    }

    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  async checkIsAdmin()
  {
    setTimeout(()=>{
      const {auth} = this.context
      const user = auth.currentUser
      user && 
      fetch("http://localhost:4444/isAdmin", {
        method : "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: `{ "email": "${user.email}" }`
      })
      .then(response => response.json())
      .then(bIsAdmin => { 
        if(this.state.isAdmin != bIsAdmin){
          this.setState({isAdmin : bIsAdmin})
        }
      });
    }, 1000)
  }

  render() {
    {this.checkIsAdmin()}
    return(
      <div className="wrapper">
          <IsAdminContext.Provider value={this.state.isAdmin}>
            <BrowserRouter>
              <Header cart={this.state.cart} removeFromCart={this.removeFromCart}/>
              <Routes>
                <Route path="/" element={<Main dishes={this.state.dishes} addToCart={this.addToCart}/>}/>
                <Route path="/Reg" element={<Reg />}/>
                <Route path="/Login"  element={<Login />}/>
                <Route path="/Editor" element={<MenuEditor dishes={this.state.dishes} addToCart={this.addToCart}/>}/>
                <Route path="/*" element={<Main dishes={this.state.dishes} addToCart={this.addToCart}/>}/>
              </Routes>
            </BrowserRouter>
          </IsAdminContext.Provider>
          <Footer/>
      </div>)
  }

  async addToCart(dish){
    let hasInCart = false
    this.state.cart.forEach(el =>{
        if(el.id == dish.id){
          hasInCart = true
        }
    })

    if(!hasInCart){
      await this.setState({cart:[...this.state.cart, dish]})
      localStorage.setItem('cart', JSON.stringify(this.state.cart))
    }
  }

  async removeFromCart(id){
    await this.setState({cart: this.state.cart.filter(el=>el.id !== id)})
    localStorage.setItem('cart', JSON.stringify(this.state.cart))
  }
}

export default App