import React, { useEffect, useState } from "react";
import axios from "axiosinstance";
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

        const res = await axios.get("/api/v2/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(res.data.orders);
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

  if (loading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Mes Commandes</h2>

      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-medium">Commande #{order._id}</h3>
              <p>Date : {new Date(order.createdAt).toLocaleString()}</p>
              <p>Total : {order.totalPrice} TND</p>
              <p>Méthode de paiement : {order.paymentMethod}</p>

              <ul className="list-disc ml-6 mt-2">
                {order.orderItems?.length > 0 ? (
                  order.orderItems.map((item) => (
                    <li key={item._id || item.product}>
                      {item.name} × {item.quantity} — {item.price} TND
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 mt-2">
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
