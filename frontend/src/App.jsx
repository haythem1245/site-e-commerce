
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
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import About from './pages/About';
import Checkout from './pages/Checkout';
import MyOrder from './pages/MyOrder';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from "./pages/admin/Dashboard";

import AdminLayout from './layouts/AdmineLayout';
import Order from './pages/admin/Order';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';
import LayoutUser from './layouts/UsersLyout';

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
   
    <Routes>
      <Route element={<LayoutUser/>}>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}> </Route> 
      <Route path='/signin' element={<Login/>}> </Route>  
      <Route path="/" element={<Navigate to="/Products" />} />
        <Route path='/Products' element={<Boutique/>}> </Route>
        <Route path="/products/:id" element={<SinglProduct/>} /> 
         <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}> </Route>
         <Route path='/contact' element={<Contact/>}></Route>
         <Route path="/*" element={<NotFound/>} />
         <Route path="/profile" element={<Profile/>} />
       <Route path='/about' element={<About/>}></Route> 
      <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>}></Route>
      <Route path='/orders' element={<ProtectedRoute><MyOrder/></ProtectedRoute>}></Route>
      </Route>
      {/* Admin routes */}
       <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout/>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="order" element={<Order/>} />
          <Route path="users" element={<Users/>} />
          <Route path="products" element={<Products/>} />
          <Route path="profile" element={<Profile/>} />
        </Route>
     </Routes>
     
    </>
  )
}

export default App
