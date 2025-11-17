import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Receipt,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/order", icon: Receipt },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Products", path: "/admin/products", icon: ShoppingBag },
    { name: "Profile", path: "/admin/profile", icon: UserCircle },
  ];

  const handleLogout = () => {
    logout();              // Supprime token + user du contexte
    localStorage.clear();  // Sécurisé
    navigate("/login");    // Redirection
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r min-h-screen p-5">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h2>

        <ul className="space-y-3">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-10 px-4 py-3 rounded-xl w-full bg-red-500 text-white hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
