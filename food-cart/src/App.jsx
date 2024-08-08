
import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import { Header } from './Component/Header';
import { Home } from './Component/Home';
import { ViewCart } from './Component/ViewCart';
import { createContext, useState } from 'react';


export const cartContext=createContext();
function App() {
  const[cart,setCart]=useState([]);


  return (
   <cartContext.Provider value={{cart,setCart}}>
    <BrowserRouter>
   <Header cart={cart}/>
   <div className="container">
   <Routes>
    
    <Route path="/" element={<Home />}/>
    <Route path="/Cart" element={<ViewCart  />}/>
    

   </Routes>
   </div>
    </BrowserRouter>
   </cartContext.Provider>
  );
}

export default App;
