import  { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getData } from "../context/DataContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const Productscard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, fetchAllProducts, categoryOnlyData } = getData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  // Charger les produits
  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  // Gérer la catégorie sélectionnée depuis l’URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [location.search]);

  // Filtrer selon la catégorie
  const filteredProducts =
    selectedCategory === "All"
      ? data
      : data?.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Chargement des produits...
      </div>
    );
  }

  // ✅ Calcul du prix final avec double remise
  const getDisplayedPrices = (product) => {
    const originalPrice = Number(product.price);
    const sold = Number(product.sold) || 0;
    const newSold = Number(product.newSold) || 0;

    let finalPrice = originalPrice;
    if (sold > 0) finalPrice -= (originalPrice * sold) / 100;
    if (newSold > 0) finalPrice -= (finalPrice * newSold) / 100;

    return { originalPrice, finalPrice, sold, newSold };
  };

  // ✅ Fonction d’ajout au panier avec toast
  const handleAddToCart = (product) => {
    addToCart({ ...product, id: product._id });
    toast.success(`${product.name} ajouté au panier 🛒`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 🧭 Barre latérale */}
          <aside className="lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Catégories
            </h2>
            <div
              onClick={() => setSelectedCategory("All")}
              className={`py-2 px-3 rounded cursor-pointer mb-2 ${
                selectedCategory === "All"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Tous les produits
            </div>
            {categoryOnlyData?.map((category, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-3 rounded cursor-pointer capitalize ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </div>
            ))}
          </aside>

          {/* 💳 Liste des produits */}
          <main className="lg:w-3/4">
            <h2 className="text-2xl font-bold mb-6 capitalize text-gray-800 dark:text-gray-100">
              {selectedCategory} ({filteredProducts?.length || 0})
            </h2>

            {filteredProducts?.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">
                Aucun produit trouvé.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts?.map((product) => {
                  const { originalPrice, finalPrice, sold, newSold } =
                    getDisplayedPrices(product);
                  const totalDiscount = sold + newSold;
                  const hasDiscount = totalDiscount > 0 && finalPrice < originalPrice;

                  return (
                    <div
                      key={product._id}
                      className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300"
                    >
                      {/* 🏷️ Badge promo */}
                      {hasDiscount && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                          -{totalDiscount}%
                        </div>
                      )}

                      {/* 🖼️ Image produit */}
                      <div
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="cursor-pointer h-44 flex items-center justify-center overflow-hidden mb-4"
                      >
                        <img
                          src={
                            product.images
                              ? `https://localhost:5000/uploads/${product.images}`
                              : "/no-image.png"
                          }
                          alt={product.name}
                          className="object-contain max-h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* 🧾 Détails */}
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2 truncate">
                        {product.name}
                      </h3>

                      {/* 💰 Prix */}
                      <div className="mb-2">
                        {hasDiscount ? (
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 line-through mr-2 text-sm">
                              {originalPrice.toFixed(2)} TND
                            </span>
                            <span className="text-red-600 font-bold text-lg">
                              {finalPrice.toFixed(2)} TND
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                            {originalPrice.toFixed(2)} TND
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {product.description || "Aucune description disponible"}
                      </p>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Productscard;
