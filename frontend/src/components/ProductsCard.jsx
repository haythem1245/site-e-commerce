import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ ajouter useLocation
import { getData } from "../context/DataContext";
import cart from "../pages/Cart";
const Productscard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ pour lire l’URL
  const { data, fetchAllProducts, categoryOnlyData } = getData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Charger les produits une seule fois
  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);


  // ✅ Lire le paramètre "category" depuis l’URL au montage ou quand elle change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // ✅ Filtrer les produits selon la catégorie
  const filteredProducts =
    selectedCategory === "All"
      ? data
      : data?.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleAddToCart = (product) => {
    alert(`${product.name} ajouté au panier !`);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Chargement des produits...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barre latérale des catégories */}
          <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-4">Catégories</h2>

            {categoryOnlyData?.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-3 rounded cursor-pointer capitalize ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Liste des produits */}
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {selectedCategory} ({filteredProducts?.length || 0})
            </h2>

            {filteredProducts?.length === 0 ? (
              <p className="text-gray-600">Aucun produit trouvé.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts?.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-40 object-contain mx-auto mb-4 cursor-pointer"
                      onClick={() => navigate(`/products/${product._id}`)}
                    />
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {product.description?.slice(0, 60)}...
                    </p>
                    <p className="font-bold text-blue-600 mb-3">
                      ${product.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productscard;
