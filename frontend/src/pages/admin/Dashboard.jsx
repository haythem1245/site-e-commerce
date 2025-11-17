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

  if (!stats)
    return (
      <p className="text-center py-10 text-gray-500 animate-pulse">
        Chargement...
      </p>
    );

  const chartData = [
    { name: "Utilisateurs", value: stats.usersCount },
    { name: "Produits", value: stats.productsCount },
    { name: "Commandes", value: stats.ordersCount },
    { name: "Revenu", value: stats.totalRevenue },
  ];

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text">
            Tableau de bord Admin
          </h1>
          {user && (
            <p className="text-gray-600 text-sm mt-1">
              Connecté en tant que :{" "}
              <strong className="text-gray-900">{user.name}</strong>
            </p>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Se déconnecter</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 shadow hover:shadow-lg transition hover:-translate-y-1">
          <h2 className="text-gray-700 font-semibold mb-2">👥 Utilisateurs</h2>
          <p className="text-3xl font-extrabold text-indigo-600">
            {stats.usersCount}
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 shadow hover:shadow-lg transition hover:-translate-y-1">
          <h2 className="text-gray-700 font-semibold mb-2">🛍️ Produits</h2>
          <p className="text-3xl font-extrabold text-emerald-600">
            {stats.productsCount}
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 shadow hover:shadow-lg transition hover:-translate-y-1">
          <h2 className="text-gray-700 font-semibold mb-2">📦 Commandes</h2>
          <p className="text-3xl font-extrabold text-yellow-600">
            {stats.ordersCount}
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 shadow hover:shadow-lg transition hover:-translate-y-1">
          <h2 className="text-gray-700 font-semibold mb-2">💰 Revenu total</h2>
          <p className="text-3xl font-extrabold text-pink-600">
            {stats.totalRevenue} TND
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          📊 Statistiques globales
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                barSize={50}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
