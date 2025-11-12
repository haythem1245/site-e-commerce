// src/components/ChercheProduit.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getData } from "../context/DataContext";

const ChercheProduit = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data, fetchAllProducts } = getData(); // 🔹 Récupération des produits du contexte

  const [searchTerm, setSearchTerm] = useState(""); // Texte saisi
  const [products, setProducts] = useState([]); // Produits filtrés
  const [loading, setLoading] = useState(false);

  // 🔹 Charger les produits si pas encore faits
  useEffect(() => {
    if (!data || data.length === 0) {
      fetchAllProducts();
    }
  }, [data, fetchAllProducts]);

  // 🔹 Filtrer les produits selon la recherche
  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]); // Si la barre est vide → aucun résultat
      return;
    }

    setLoading(true);

    // Simuler un léger délai (effet debounce 300ms)
    const delay = setTimeout(() => {
      const filtered = data.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, data]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-96 px-4 py-2 border rounded-lg mb-6"
      />

      {/* État de chargement */}
      {loading && <p className="text-gray-500 mb-2">Chargement...</p>}

      {/* Aucun résultat */}
      {!loading && products.length === 0 && searchTerm && (
        <p className="text-gray-500">Aucun produit trouvé.</p>
      )}

      {/* Résultats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={`http://localhost:5000/uploads/${product.images}`}
              alt={product.name}
             className="w-10 h-10 object-cover mx-auto mb-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => navigate(`/products/${product._id}`)}
            />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {product.name}
            </h3>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChercheProduit;
