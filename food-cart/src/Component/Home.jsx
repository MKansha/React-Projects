import React, { useState } from 'react'
import data from '../assets/data.json'
import { Product } from './Product';
import './Home.css'

export const Home = () => {
  const [products]=useState(data);
  return (
    <div className='product-conatiner'>
      {
        products.map((product)=>
        (
          <Product key={product.id} product={product}  />
        ))
      }
    </div>
  )
}
