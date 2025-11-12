import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthProvider"; // ✅ ton AuthContext

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔹 On appelle la fonction login de ton AuthProvider
      const userData = await login(form.email, form.password);

      if (userData && userData.role === "admin") {
        toast.success("Bienvenue, administrateur !");
        navigate("/admin/dashboard"); // ✅ redirection admin
      } else {
        toast.success("Connexion réussie !");
        navigate("/"); // ✅ redirection utilisateur normal
      }
    } catch (err) {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          src="https://png.pngtree.com/background/20230614/original/pngtree-ecommerce-website-with-shopping-cart-with-the-shopping-cart-on-a-picture-image_3515047.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Formulaire */}
      <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md z-10">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link to="/">
            <span className="text-2xl font-bold">
              <span className="text-black">Shop</span>
              <span className="text-red-600">Man</span>
            </span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Login To Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Your email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Lien Sign up */}
        <p className="text-center text-sm mt-4">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create one here
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
