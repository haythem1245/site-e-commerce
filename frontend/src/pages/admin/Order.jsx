import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v2/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Réponse API :", res.data);

        if (Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        } else if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des commandes :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600 animate-pulse">
          Chargement des commandes...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        📦 Gestion des Commandes
      </h2>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">ID Commande</th>
                <th className="py-3 px-6 text-left">Client</th>
                <th className="py-3 px-6 text-center">Montant Total</th>
                <th className="py-3 px-6 text-center">Méthode Paiement</th>
                <th className="py-3 px-6 text-center">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-6 text-gray-700">{order._id}</td>
                  <td className="py-3 px-6">{order.user?.name || "Inconnu"}</td>
                  <td className="py-3 px-6 text-center font-semibold text-green-600">
                    {order.totalPrice?.toFixed(2)} TND
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentMethod === "Card"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-10 text-gray-500 italic">
          Aucune commande trouvée.
        </div>
      )}
    </div>
  );
};

export default Order;
