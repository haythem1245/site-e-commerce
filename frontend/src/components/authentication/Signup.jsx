import React, { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Formulaire soumis :", form);
    // 👉 Ici tu pourras faire un fetch/axios vers ton backend
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
          Create your Free Account
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

         {/* Username */}
<div>
  <label className="block mb-1 text-sm font-semibold text-gray-700">
    Username
  </label>
  <input
    type="text"
    name="username"
    value={form.username}
    onChange={handleChange}
    placeholder="Votre nom d’utilisateur"
    required
    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  />
</div>

{/* Phone */}
<div>
  <label className="block mb-1 text-sm font-semibold text-gray-700">
    Téléphone
  </label>
  <div className="flex gap-2">
    <input
      type="tel"
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="+216 99 999 999"
      required
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    />
  </div>
</div>


          

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create an account
          </button>
        </form>

        {/* Lien Login */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup



