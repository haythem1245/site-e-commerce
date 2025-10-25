// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// 1️⃣ Création du contexte
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // utilisateur connecté
  const [loading, setLoading] = useState(true); // chargement initial

  // 🔹 Vérifier si un token existe au démarrage
 useEffect(() => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    axios
      .get("http://localhost:5000/api/v0/me", {
        headers: { Authorization: `Bearer ${token}` },
      
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);


  // 🔹 Fonction login
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v0/login", {
        email,
        password,
      });
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("Erreur login :", err.response?.data || err.message);
      throw err;
    }
  };
  // 🔹 Fonction logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🔹 Fonction pour récupérer le profil
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const res = await axios.get("http://localhost:5000/api/v0/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("Erreur getProfile :", err.response?.data || err.message);
      return null;
    }
  };

  // 🔹 Fonction pour mettre à jour le profil
  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Utilisateur non connecté");

      const res = await axios.put(
        "http://localhost:5000/api/v0/me",
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error(
        "Erreur updateProfile :",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, getProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = ()=> useContext(AuthContext);
