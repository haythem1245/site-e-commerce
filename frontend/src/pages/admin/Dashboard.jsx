import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get("https://site-e-commerce-1backend.onrender.com/api/v0/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data.stats))
      .catch((err) => {
        console.error("Erreur stats admin :", err);
        if (err.response?.status === 401) {
        }
      });
  }, [ navigate]);

 

  if (!stats)
    return <p className="text-center py-10 text-gray-500 animate-pulse">Chargement...</p>;

  const chartData = [
    { name: "Utilisateurs", value: stats.usersCount },
    { name: "Produits", value: stats.productsCount },
    { name: "Commandes", value: stats.ordersCount },
    { name: "Revenu", value: stats.totalRevenue },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord Admin</h1>
          {user && (
            <p className="text-gray-500 text-sm">
              Connecté en tant que : <span className="text-gray-700 font-semibold">{user.name}</span>
            </p>
          )}
        </div>

        {/* Logout button repositionné PROPREMENT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Users */}
        <div className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-md transition">
          <h2 className="text-gray-700 font-semibold mb-1">👥 Utilisateurs</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.usersCount}</p>
        </div>

        {/* Products */}
        <div className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-md transition">
          <h2 className="text-gray-700 font-semibold mb-1">🛍️ Produits</h2>
          <p className="text-3xl font-bold text-green-600">{stats.productsCount}</p>
        </div>

        {/* Orders */}
        <div className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-md transition">
          <h2 className="text-gray-700 font-semibold mb-1">📦 Commandes</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.ordersCount}</p>
        </div>

        {/* Revenue */}
        <div className="p-5 rounded-xl bg-white border shadow-sm hover:shadow-md transition">
          <h2 className="text-gray-700 font-semibold mb-1">💰 Revenu total</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.totalRevenue} TND</p>
        </div>

      </div>

      {/* CHART */}
      <div className="p-6 bg-white rounded-xl border shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📊 Statistiques globales</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#444" />
              <YAxis stroke="#444" />
              <Tooltip />
              <Bar dataKey="value" fill="#6478f0" barSize={50} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
