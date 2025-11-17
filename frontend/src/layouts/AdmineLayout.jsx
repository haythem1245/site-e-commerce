import { Outlet, NavLink } from "react-router-dom";
import { Home, ShoppingCart, Users, Package, User } from "lucide-react";

const AdminLayout = () => {
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
      <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
        <ul className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 font-semibold" : "font-medium"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Footer / Branding */}
        <div className="mt-auto text-center text-sm text-gray-400">
          © 2025 ShopMan Admin
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Les sous-pages s’affichent ici */}
      </main>
    </div>
  );
};

export default AdminLayout;

