import  { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
        setProduct(res.data);
        setError(null);
      } catch (err) {
        console.error("Erreur de chargement du produit :", err);
        setError("Produit introuvable ou erreur serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Chargement...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center mt-10 text-gray-500">Aucun produit trouvé</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Retour
        </button>

        <div className="flex flex-col md:flex-row -mx-4">
          {/* Image */}
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 flex items-center justify-center">
              <img
                className="max-h-full object-contain"
                src={product.images && product.images.length > 0 ? product.images[0] : "/no-image.png"}
                alt={product.name}
              />
            </div>

            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button
                  onClick={() => addToCart({...product,id:product._id})}
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

          {/* Détails */}
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {product.description}
            </p>

            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Prix :{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  ${product.price}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Catégorie :{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300 capitalize">
                  {product.category}
                </span>
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Description du produit :
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
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
