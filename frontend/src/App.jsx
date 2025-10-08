
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Routes,Route, Navigate,} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Signin';
import Boutique from './pages/Boutique';
import SinglProduct from './pages/SinglProduct';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import { useCart } from './context/CartContext';
import { useEffect } from 'react';
function App() {
    const { cartItems, setCartItems } = useCart()
 useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItems(JSON.parse(storedCart))
    }
  }, []);

  //save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItems))
  }, [cartItems])
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}> </Route> 
      <Route path='/signin' element={<Login/>}> </Route>  
      <Route path="/" element={<Navigate to="/Products" />} />
        <Route path='/Products' element={<Boutique/>}> </Route>
        <Route path="/Products/:id" element={<SinglProduct />} /> 
         <Route path='/cart' element={<Cart/>}> </Route>
         <Route path='/contact' element={<Contact/>}></Route>

     </Routes>
     <Footer/>
    </>
  )
}

export default App
