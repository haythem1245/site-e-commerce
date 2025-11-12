import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://site-e-commerce-1backend.onrender.com/api/v0/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data.stats))
      .catch((err) => console.error("Erreur stats admin :", err));
  }, []);

  if (!stats) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Admin</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2>👥 Utilisateurs</h2>
          <p className="text-xl font-bold">{stats.usersCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2>🛍️ Produits</h2>
          <p className="text-xl font-bold">{stats.productsCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2>📦 Commandes</h2>
          <p className="text-xl font-bold">{stats.ordersCount}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h2>💰 Revenu total</h2>
          <p className="text-xl font-bold">{stats.totalRevenue} TND</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
