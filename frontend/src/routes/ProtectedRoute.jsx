import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Affiche un loader si l'authentification est en cours
  if (loading) {
    return <div>Loading...</div>; // Tu peux remplacer par un spinner
  }

  // Redirige vers /signin si pas connecté
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Redirige vers / si l'utilisateur n'a pas le rôle requis
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // Tout est ok, on rend l'enfant
  return children;
};

export default ProtectedRoute;
