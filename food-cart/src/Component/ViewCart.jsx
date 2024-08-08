import React, { useEffect, useState } from 'react'
import "./Viewcart.css"
import { useContext } from 'react';
import { cartContext } from '../App';

export const ViewCart = () => {
  const{cart}=useContext(cartContext);
  const[total,setTotal]=useState(0);
  useEffect(()=>
  {
    setTotal(cart.reduce((acc,cart)=>acc+parseInt(cart.price),0))
  },[cart])
  return (
    <>
    <h1 className='cart-heading'>Cart Product</h1>
    <div className='cart-conatiner'>
      {
        cart.map((product)=>
        (
          <div className="cart-product" key={product.id}>
        <div className="img">
          <img src={product.image} alt="image" />
        </div>
        <div className="cart-product-details">
          <h3>{product.productName}</h3>
          <p>Price Rs:{product.price}</p>

        </div>
      </div>
        ))
      }
    </div>
    <h2 className='amount'>Total Amount Rs:{total}</h2>
    </>
  )
}
