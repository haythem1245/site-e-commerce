import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://site-e-commerce-1backend.onrender.com/api/v2/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
      } catch (err) {
        console.error(err);
        toast.error("Impossible de récupérer les commandes !");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://site-e-commerce-1backend.onrender.com/api/v2/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Statut mis à jour !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour !");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Livrée":
        return "bg-green-100 text-green-700 border border-green-300";
      case "En cours":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Annulée":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-600 animate-pulse">
          Chargement des commandes...
        </p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        📦 Gestion des Commandes
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-10">
          Aucune commande trouvée.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl bg-white">
          <table className="min-w-[700px] text-sm text-gray-700 w-full">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="py-4 px-6 text-left">ID Commande</th>
                <th className="py-4 px-6 text-left">Client</th>
                <th className="py-4 px-6 text-center">Montant Total</th>
                <th className="py-4 px-6 text-center">Paiement</th>
                <th className="py-4 px-6 text-center">Statut</th>
                <th className="py-4 px-6 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={order._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}
                >
                  <td className="py-4 px-6 font-medium text-gray-800">
                    {order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-4 px-6">{order.user?.name || "Inconnu"}</td>
                  <td className="py-4 px-6 text-center font-semibold text-green-600">
                    {order.totalPrice?.toFixed(2)} TND
                  </td>
                  <td className="py-4 px-6 text-center">
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
                  <td className="py-4 px-6 text-center">
                    <select
                      value={["En attente","En cours","Livrée","Annulée"].includes(order.status) ? order.status : "En attente"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`px-3 py-1 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${getStatusStyle(order.status)}`}
                    >
                      <option value="En attente">🕓 En attente</option>
                      <option value="En cours">🚚 En cours</option>
                      <option value="Livrée">✅ Livrée</option>
                      <option value="Annulée">❌ Annulée</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
