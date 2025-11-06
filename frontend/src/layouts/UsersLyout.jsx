
import { Link, Outlet } from "react-router-dom";
import { User, Package, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthProvider";

const UserLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">Mon compte</h1>
        <div className="flex items-center gap-3">
          <span className="font-medium">{user?.name}</span>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-4 space-y-2">
          <Link
            to="/user"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <User className="w-4 h-4" /> Profil
          </Link>
          <Link
            to="/user/orders"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <Package className="w-4 h-4" />  Commandes
          </Link>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
