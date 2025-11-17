import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
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
  const { logout, user } = useAuth();
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
          logout();
          navigate("/login");
        }
      });
  }, [logout, navigate]);

  if (!stats) return <p className="text-center py-10">Chargement...</p>;

  const chartData = [
    { name: "Utilisateurs", value: stats.usersCount },
    { name: "Produits", value: stats.productsCount },
    { name: "Commandes", value: stats.ordersCount },
    { name: "Revenu", value: stats.totalRevenue },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
        {user && (
          <p className="text-gray-500 text-sm mt-1">
            Connecté en tant que :{" "}
            <strong className="text-gray-700">{user.name}</strong>
          </p>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-1">👥 Utilisateurs</h2>
          <p className="text-3xl font-bold">{stats.usersCount}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-1">🛍️ Produits</h2>
          <p className="text-3xl font-bold">{stats.productsCount}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-1">📦 Commandes</h2>
          <p className="text-3xl font-bold">{stats.ordersCount}</p>
        </div>

        <div className="bg-purple-100 p-5 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-1">💰 Revenu total</h2>
          <p className="text-3xl font-bold">{stats.totalRevenue} TND</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          📊 Statistiques globales
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" barSize={55} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
