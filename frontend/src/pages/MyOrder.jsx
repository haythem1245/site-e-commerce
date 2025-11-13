import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const MyOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://site-e-commerce-1backend.onrender.com/api/v2/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(
          "Erreur récupération des commandes :",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">Chargement...</p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Mes Commandes</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          Aucune commande trouvée.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Commande #{order._id.slice(-6).toUpperCase()}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-600">
                Total : <span className="font-medium">{order.totalPrice} TND</span>
              </p>
              <p className="text-gray-600">
                Méthode de paiement :{" "}
                <span className="font-medium">{order.paymentMethod}</span>
              </p>

              <h4 className="mt-4 font-semibold text-gray-700">Articles :</h4>
              <ul className="mt-2 list-disc ml-5 text-gray-600 space-y-1">
                {order.orderItems?.length > 0 ? (
                  order.orderItems.map((item) => (
                    <li key={item._id || item.product}>
                      <span className="font-medium">{item.name}</span> × {item.quantity} —{" "}
                      <span className="text-green-600">{item.price} TND</span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 mt-2">
                    Aucun article dans cette commande.
                  </p>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
