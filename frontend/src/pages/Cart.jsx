import React, { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthProvider';

const Cart = () => {
  const { cartItems, deleteItem, updateQuantity} = useContext(CartContext);
  const {user} = useAuth();
  const [voucherCode, setVoucherCode] = useState('');
  const navigate =useNavigate();

  // Calcul des prix
  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateSavings = () => cartItems.reduce((savings, item) => savings + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0), 0);
  const calculateTax = () => (calculateSubtotal() - calculateSavings())* 0.00;
  const calculateTotal = () => calculateSubtotal() - calculateSavings() + calculateTax()+ 0 ;

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(price);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <h1 className="text-red-500 text-3xl font-bold mb-5">Votre panier est vide 😢</h1>
            <Link to="/Products">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Continuer vos achats
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img src={item.images} alt={item.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                      {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}

                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, "decrease")}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                            disabled={item.quantity <= 1}
                          >-</button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                            className="w-16 px-2 py-2 text-center border-x border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, "increase")}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                          >+</button>
                        </div>
                        <span className="text-gray-600 ml-4">{formatPrice(item.price)} each</span>
                      </div>

                      <div className="text-xl font-semibold text-gray-900">
                        Total: {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-{formatPrice(calculateSavings())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Store Pickup</span>
                    <span>{formatPrice(99)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatPrice(calculateTax())}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <button  
                  onClick={()=> {
                    if(!user){
                     navigate('/signin')
                    }else {
                      navigate('/checkout')
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-semibold">
                    Proceed to Checkout
                  </button>
                  <Link to="/Products">
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium mt-2">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
