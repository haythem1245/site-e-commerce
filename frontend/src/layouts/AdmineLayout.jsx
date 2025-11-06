import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul className="space-y-2">
          <li><Link to="dashboard">Dashboard</Link></li>
          <li><Link to="order">Orders</Link></li>
          <li><Link to="users">Users</Link></li>
          <li><Link to="products">Products</Link></li>
          <li><Link to="profile">Profile</Link></li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Ici s’affichent les sous-pages */}
      </main>
    </div>
  );
};

export default AdminLayout;
