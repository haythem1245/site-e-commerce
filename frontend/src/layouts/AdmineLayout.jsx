import { Outlet, NavLink,useNavigate } from "react-router-dom";
import { Home, ShoppingCart, Users, Package, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { use } from "react";

const AdminLayout = () => {
  const { logout, user } = useAuth();
const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "dashboard", icon: <Home size={18} /> },
    { name: "Orders", path: "order", icon: <ShoppingCart size={18} /> },
    { name: "Users", path: "users", icon: <Users size={18} /> },
    { name: "Products", path: "products", icon: <Package size={18} /> },
    { name: "Profile", path: "profile", icon: <User size={18} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white p-6 flex flex-col shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          {user && (
            <p className="text-indigo-200 text-sm mt-1">{user.name}</p>
          )}
        </div>

        {/* Menu */}
        <ul className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-indigo-700 ${
                    isActive ? "bg-indigo-700 font-semibold" : "font-medium"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-semibold"
        >
          <LogOut size={18} />
          Déconnexion
          
        </button>

        {/* Footer */}
        <div className="mt-auto text-center text-sm text-indigo-200">
          © 2025 ShopMan Admin
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
