import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { useContext } from "react";
import { AuthProvider } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const user= useContext(AuthProvider);
  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "Carte de Crédit",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//if(!user)return navigate('/signin')
    try {
      const orderData = {
        orderItems: cartItems,
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        paymentMethod: form.paymentMethod,
        totalPrice: total,
      };

      await axios.post("http://localhost:5000/api/v2/create", orderData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Commande enregistrée !");
      setForm({
        address: "",
        city: "",
        postalCode: "",
        country: "",
        paymentMethod: "Carte de Crédit",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l’enregistrement de la commande.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <h3 className="text-lg font-semibold mb-2">Détails de Facturation</h3>

         
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Adresse"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Ville"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <input
            type="text"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            placeholder="Code postal"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Pays"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />

          <h3 className="text-lg font-semibold mb-2 mt-4">Options de Paiement</h3>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option>Carte de Crédit</option>
            <option>PayPal</option>
            <option>Virement Bancaire</option>
          </select>

          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-gray-800">{total.toFixed(2)} TND</span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Passer la Commande
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Checkout;
