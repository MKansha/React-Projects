import React from 'react';
import './Product.css';
import { useContext } from 'react';
import { cartContext } from '../App';
export const Product = ({ product}) => {

const{cart,setCart}=useContext(cartContext);

  let pname = product.productName;
  const name = pname.length > 21 ? pname.substring(0, 20) + ".." : pname;
  const addCart=()=>
  {
    setCart([...cart,product])
  }
  const removeCart=()=>
  {
    setCart(cart.filter((c)=> c.id!==product.id))
  }
  return (
    <div className='product'>
      <div className="img">
        <img src={product.image} alt={product.productName} />
      </div>
      <div className="product-details">
        <h3>{name}</h3>
        <p>Price Rs: {product.price}</p>
        {
          cart.includes(product)?<button onClick={removeCart} className='btn-remove'>Remove from Cart</button>: <button  onClick={addCart}>Add to Cart</button>
        }
      </div>
    </div>
  );
};
