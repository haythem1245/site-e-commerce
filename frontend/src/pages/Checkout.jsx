import { useState } from "react";
import axios from "axiosinstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart} = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "Credit Card", 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.warning("Veuillez vous connecter pour passer une commande.");
      return navigate("/signin");
    }

    if (cartItems.length === 0) {
      return toast.error("Votre panier est vide !");
    }

    try {
      const paymentMethodMap = {
        "Carte de Crédit": "Credit Card",
        PayPal: "PayPal",
        "Paiement à la livraison": "Cash on Delivery",
        "Virement Bancaire": "Cash on Delivery",
      };

      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image || item.images?.[0],
          price: item.price,
          product: item._id,
        })),
        shippingAddress: {
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        paymentMethod: paymentMethodMap[form.paymentMethod] || "Credit Card",
        taxPrice: (total * 0.05).toFixed(2), 
        shippingPrice: 10.0, 
        totalPrice: total + 10.0 + total * 0.05,
      };

      await axios.post("/api/v2/create", orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Commande enregistrée avec succès !");
      clearCart();

      setForm({
        address: "",
        city: "",
        postalCode: "",
        country: "",
        paymentMethod: "Credit Card",
      });

      setTimeout(() => navigate("/orders"), 1500);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        navigate("/signin");
      } else {
        toast.error(
          error.response?.data?.message ||
            " Erreur lors de l’enregistrement de la commande."
        );
      }
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

          <h3 className="text-lg font-semibold mb-2 mt-4">
            Options de Paiement
          </h3>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option>Carte de Crédit</option>
            <option>PayPal</option>
            <option>Paiement à la livraison</option>
            <option>Virement Bancaire</option>
          </select>

          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-gray-800">
              {total.toFixed(2)} TND
            </span>
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