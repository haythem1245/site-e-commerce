import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider"; // ✅ adapte le chemin selon ton projet
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // ✅ icône moderne

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

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

  if (!stats) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord Admin</h1>
          {user && (
            <p className="text-gray-500">
              Connecté en tant que : <strong className="text-gray-700">{user.name}</strong>
            </p>
          )}
        </div>

        {/* 🔹 Bouton déconnexion stylisé */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-md hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Se déconnecter</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2>👥 Utilisateurs</h2>
          <p className="text-xl font-bold">{stats.usersCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2>🛍️ Produits</h2>
          <p className="text-xl font-bold">{stats.productsCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2>📦 Commandes</h2>
          <p className="text-xl font-bold">{stats.ordersCount}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl shadow hover:shadow-lg transition">
          <h2>💰 Revenu total</h2>
          <p className="text-xl font-bold">{stats.totalRevenue} TND</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
