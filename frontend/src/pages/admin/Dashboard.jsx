import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!stats) return <p className="text-center py-10">Chargement...</p>;

  const chartData = [
    { name: "Utilisateurs", value: stats.usersCount },
    { name: "Produits", value: stats.productsCount },
    { name: "Commandes", value: stats.ordersCount },
    { name: "Revenu", value: stats.totalRevenue },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tableau de bord Admin</h1>
          {user && (
            <p className="text-gray-500 text-sm mt-1">
              Connecté en tant que : <strong className="text-gray-700">{user.name}</strong>
            </p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Se déconnecter</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">👥 Utilisateurs</h2>
          <p className="text-2xl font-bold">{stats.usersCount}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">🛍️ Produits</h2>
          <p className="text-2xl font-bold">{stats.productsCount}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">📦 Commandes</h2>
          <p className="text-2xl font-bold">{stats.ordersCount}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">💰 Revenu total</h2>
          <p className="text-2xl font-bold">{stats.totalRevenue} TND</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">📊 Statistiques globales</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}