import React, {useState, useRef} from 'react'
import Cartcontext from './Cartcontext'
const Cartstate = (props) => {
  const cartRef = useRef()
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    let total;
    const saveCart = (cart) =>{
    total=0;
    for(let key in cart){
        total += cart[key].price * cart[key].quantity
    }
    setSubTotal(total)
      setCart(cart);
      localStorage.setItem('add2cart', JSON.stringify(cart));
    }
    const addToCart = (productCode, quantity, price, name, image)=>{
      const newCart = {...cart};
      if(newCart[productCode]){
        newCart[productCode].quantity += quantity;
      }else{
        newCart[productCode] = {productCode, quantity, price, name, image};
      }
      saveCart(newCart);
    }
    const removeFromCart = (productCode)=>{
      const newCart = {...cart};
      if(newCart[productCode]){
        newCart[productCode].quantity -= 1;
      }
      if(newCart[productCode].quantity <=0){
        delete newCart[productCode];
      }
      saveCart(newCart);
    }
    const clearCart = ()=>{
      setCart({});
      localStorage.removeItem('add2cart');
      localStorage.removeItem('a2c-subtotal');
    }
    const toggleCart = (ref)=>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }else{
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
 
  return (
    <Cartcontext.Provider value={{cart, addToCart, removeFromCart, clearCart, saveCart, subTotal, toggleCart, cartRef}}>
        {props.children}
    </Cartcontext.Provider>
  )
}

export default Cartstate