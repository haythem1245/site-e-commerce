
import { useNavigate } from "react-router-dom";


const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page introuvable
      </h2>
      <p className="text-gray-500 mb-8">
        Oups 😅 La page que vous recherchez n’existe pas ou a été déplacée.
      </p>

      {/* Bouton pour revenir à l’accueil */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retour à l’accueil
      </button>

      {/* Image décorative (facultative) */}
      <img
        src="https://illustrations.popsy.co/gray/404-error.svg"
        alt="Not Found Illustration"
        className="w-80 mt-8 opacity-90"
      />
    </div>
  );
};

export default NotFound;
