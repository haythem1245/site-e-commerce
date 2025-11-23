import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les commandes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://site-e-commerce-1backend.onrender.com/api/v2/",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Erreur récupération commandes :", err);
        toast.error("Impossible de récupérer vos commandes.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  // Supprimer une commande
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette commande ?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://site-e-commerce-1backend.onrender.com/api/v2/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setOrders((prev) => prev.filter((order) => order._id !== id));
      toast.success("Commande supprimée avec succès !");
    } catch (err) {
      console.error("Erreur suppression commande :", err);
      toast.error("Impossible de supprimer cette commande.");
    }
  };

  if (loading) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-6">Mes Commandes</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande trouvée.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="p-4 border rounded mb-4 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">
                Commande #{order._id.slice(-6).toUpperCase()}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p>Total : {order.totalPrice} TND</p>
            <p>Méthode de paiement : {order.paymentMethod}</p>

            <h4 className="mt-2 font-medium">Articles :</h4>
            <ul className="ml-5 list-disc">
              {order.orderItems?.map((item) => (
                <li key={item._id || item.product}>
                  {item.name} × {item.quantity} — {item.price} TND
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleDelete(order._id)}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrder;
