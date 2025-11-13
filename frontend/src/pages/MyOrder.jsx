import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const MyOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, orderId: null });

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
      console.error("Erreur récupération des commandes :", err.response?.data || err.message);
      toast.error("Impossible de récupérer vos commandes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://site-e-commerce-1backend.onrender.com/api/v2/orders/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) => prev.filter((order) => order._id !== id));
      setDeleteModal({ open: false, orderId: null });
      toast.success("Commande supprimée avec succès !");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err.response?.data || err.message);
      toast.error("Impossible de supprimer cette commande");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 text-lg mt-10">Chargement...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Mes Commandes</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">Aucune commande trouvée.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className="p-6 border rounded-2xl shadow-lg hover:shadow-2xl transition-shadow bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Commande #{order._id.slice(-6).toUpperCase()}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-600">
                      Total : <span className="font-medium">{order.totalPrice} TND</span>
                    </p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        statusColors[order.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status?.toUpperCase() || "EN ATTENTE"}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">
                    Méthode de paiement : <span className="font-medium">{order.paymentMethod}</span>
                  </p>

                  <h4 className="mt-2 font-semibold text-gray-700">Articles :</h4>
                  <ul className="mt-2 list-disc ml-5 text-gray-600 space-y-1">
                    {order.orderItems?.length > 0 ? (
                      order.orderItems.map((item) => (
                        <li key={item._id || item.product}>
                          <span className="font-medium">{item.name}</span> × {item.quantity} —{" "}
                          <span className="text-green-600">{item.price} TND</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 mt-2">Aucun article dans cette commande.</p>
                    )}
                  </ul>
                </div>

                <button
                  onClick={() => setDeleteModal({ open: true, orderId: order._id })}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 active:scale-95 transition-all font-semibold"
                >
                  Supprimer
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 md:w-96 shadow-lg flex flex-col gap-4 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 text-center">Confirmer la suppression</h3>
            <p className="text-gray-600 text-center">
              Êtes-vous sûr de vouloir supprimer cette commande ?
            </p>
            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={() => setDeleteModal({ open: false, orderId: null })}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteModal.orderId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-semibold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default MyOrder;
