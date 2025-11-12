import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    role:"",
  });
 
 

  // 🔹 Gère la saisie des champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // 🔹 Envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", form);

    try {
      const response = await axios.post("https://site-e-commerce-1backend.onrender.com/api/v0/signup",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Inscription réussie :", response.data);
      toast.success("Compte créé avec succès !");
      setForm({ email: "", password: "", name: "", phone: "",role:"" });
       // ✅ Rediriger vers la page de connexion après un court délai
      setTimeout(() => navigate("/signin"), 1500);
    
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error);
      toast.error("Erreur lors de l’inscription. Vérifiez les informations.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* 🌄 Image de fond */}
      <div className="absolute inset-0">
        <img
          src="https://png.pngtree.com/background/20230614/original/pngtree-ecommerce-website-with-shopping-cart-with-the-shopping-cart-on-a-picture-image_3515047.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* 📋 Formulaire */}
      <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md z-10">
        {/* 🛒 Logo */}
        <div className="flex justify-center mb-4">
          <Link to="/">
            <span className="text-2xl font-bold">
              <span className="text-black">Shop</span>
              <span className="text-red-600">Man</span>
            </span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Create your Free Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom d’utilisateur"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
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

        

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Téléphone
            </label>
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
            <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Votre role "
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create an account
          </button>
        </form>

        {/* Lien vers Login */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>

      </div>
      <ToastContainer position="top-right" autoClose={5000}  />
    </div>
  );
};

export default Signup;
