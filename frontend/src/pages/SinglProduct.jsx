import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Charger le produit depuis le backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://site-e-commerce-1backend.onrender.com/api/v1/product/${id}`);
        const productData = res.data.product ? res.data.product : res.data;
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error("Erreur de chargement du produit :", err);
        setError("❌ Produit introuvable ou erreur serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // États de chargement / erreur
  if (loading)
    return <p className="text-center mt-10 text-gray-600">Chargement...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center mt-10 text-gray-500">Aucun produit trouvé</p>;

  // ✅ Calcul des prix (comme dans Productscard)
  const getDisplayedPrices = (product) => {
    const originalPrice = Number(product.price);
    const sold = Number(product.sold) || 0;
    const newSold = Number(product.newSold) || 0;

    // première remise
    let finalPrice = originalPrice;
    if (sold > 0) finalPrice = originalPrice - (originalPrice * sold) / 100;

    // deuxième remise
    if (newSold > 0)
      finalPrice = finalPrice - (finalPrice * newSold) / 100;

    return { originalPrice, finalPrice, sold, newSold };
  };

  const { originalPrice, finalPrice, sold, newSold } = getDisplayedPrices(product);
  const totalDiscount = sold + newSold;
  const hasDiscount = totalDiscount > 0 && finalPrice < originalPrice;

  // 🛒 Fonction pour ajouter au panier
  const handleAddToCart = () => {
    addToCart({ ...product, id: product._id });
    alert(`${product.name} a été ajouté au panier 🛒`);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Retour
        </button>

        <div className="flex flex-col md:flex-row -mx-4">
          {/* 🖼️ Image du produit */}
          <div className="md:flex-1 px-4 relative">
            {hasDiscount && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded-full shadow">
                -{totalDiscount}%
              </div>
            )}

            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 flex items-center justify-center overflow-hidden">
              <img
                className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
                src={
                  product.images
                    ? product.images
                    : "/no-image.png"
                }
                alt={product.name}
              />
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Ajouter au panier
                </button>
              </div>
              <div className="w-1/2 px-2">
                <Link to="/cart">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Voir le panier
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* 📦 Détails du produit */}
          <div className="md:flex-1 px-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {product.name}
            </h2>

            {/* 💰 Prix avec double remise */}
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                💰 Prix :
              </span>

              {hasDiscount ? (
                <div className="mt-1">
                  <span className="text-gray-500 line-through mr-2 text-sm">
                    {originalPrice.toFixed(2)} TND
                  </span>
                  <span className="text-red-600 font-bold text-xl">
                    {finalPrice.toFixed(2)} TND
                  </span>
                  <span className="ml-2 text-green-600 font-semibold">
                    -{totalDiscount}%
                  </span>
                </div>
              ) : (
                <span className="text-gray-900 dark:text-white font-bold text-xl ml-2">
                  {originalPrice.toFixed(2)} TND
                </span>
              )}
            </div>

            <div className="flex flex-wrap mb-4 gap-6">
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  🏷️ Catégorie :
                </span>
                <span className="capitalize text-gray-600 dark:text-gray-300 ml-1">
                  {product.category}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300 block mb-2">
                📝 Description :
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
