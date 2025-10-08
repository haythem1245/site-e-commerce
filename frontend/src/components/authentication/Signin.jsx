import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login= () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux gérer la soumission, par exemple appeler ton API
    console.log("Login data:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Background image */}
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
          <span className="text-blue-600 font-bold text-2xl"><div className="flex justify-center mb-4">
            <Link to="/">
  <span className="text-2xl font-bold">
    <span className="text-black">Shop</span>
    <span className="text-red-600">Man</span>
  </span>
  </Link>
</div>
</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          login To your Account
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

        {/* Lien Login */}
        <p className="text-center text-sm mt-4">
          Don't have an account yet ?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
