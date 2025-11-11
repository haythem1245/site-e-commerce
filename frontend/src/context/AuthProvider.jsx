import { createContext, useState, useEffect, useContext } from "react";
import axios from "../service/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    const token = storedToken.replace(/^"|"$/g, ""); // retire les guillemets JSON
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      // 🔒 Vérifie si le token a expiré
      if (decoded.exp && decoded.exp < now) {
        console.warn("Token expiré — déconnexion automatique");
        logout();
        setLoading(false);
        return;
      }

      // 🔹 Précharge l'utilisateur
      axios
        .get("/api/v0/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser({ ...res.data, token }))
        .catch((err) => {
          console.warn("Erreur validation token :", err.message);
          logout();
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Erreur décodage token :", error);
      logout();
      setLoading(false);
    }
  }, []);

  // ✅ Connexion
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/v0/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      if (!token || !user) {
        throw new Error("Réponse du serveur invalide");
      }

      localStorage.setItem("token", token);
      setUser({ ...user, token });

      return user; // 🔹 utile pour rediriger selon le rôle
    } catch (err) {
      console.error("Erreur login :", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ✅ Profil utilisateur (utile pour Profile.jsx)
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const res = await axios.get("/api/v0/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser({ ...res.data, token });
      return res.data;
    } catch (err) {
      console.error("Erreur getProfile :", err.response?.data || err.message);
      return null;
    }
  };

  // ✅ Mise à jour du profil
  const updateProfile = async (updates) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Utilisateur non connecté");

      const res = await axios.put("/api/v0/me", updates, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser({ ...res.data, token });
      return res.data;
    } catch (err) {
      console.error("Erreur updateProfile :", err.response?.data || err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, getProfile, updateProfile }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Hook d’accès rapide
export const useAuth = () => useContext(AuthContext);
