import  { useEffect, useState } from "react";
import axios from "../service/axiosInstance";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/v1/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur de chargement :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔎 Filtrage des produits selon ton schéma
  const filteredProducts =
    filter === "All"
      ? products
      : filter === "New Arrivals"
      ? products.filter((p) => p.new === true)
      : products.filter((p) => p.featured === true);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        <i className="ri-loader-4-line animate-spin text-2xl mr-2"></i>
        Chargement des produits...
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Products
          </h2>
          <div className="flex space-x-2 bg-white shadow-sm rounded-full px-2 py-1">
            {["All", "New Arrivals", "Best Sellers"].map((btn) => (
              <button
                key={btn}
                onClick={() => setFilter(btn)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  filter === btn
                    ? "bg-primary text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUITS */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Aucun produit trouvé.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="relative">
                  {(product.new || product.featured) && (
                    <span
                      className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded ${
                        product.new
                          ? "bg-green-500"
                          : product.featured
                          ? "bg-yellow-500"
                          : "bg-rose-500"
                      }`}
                    >
                      {product.new
                        ? "New"
                        : product.featured
                        ? "Best Seller"
                        : ""}
                    </span>
                  )}

                  <img
                    src={`https://site-e-commerce-ifpq.onrender.com/uploads/${product.images}`}
                    alt={product.name}
                    className="w-full h-72 object-cover object-center group-hover:opacity-90 transition"
                  />

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2">
                    <button
                      className="bg-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 shadow"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button className="bg-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 shadow">
                      <i className="ri-heart-line"></i>
                    </button>
                    <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/90 shadow">
                      <i className="ri-shopping-bag-line"></i>
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                    {product.name}
                  </h3>

                  {/* Pas de rating dans le schéma actuel → on peut le retirer ou mettre un placeholder */}
                  <div className="flex items-center mb-2 text-sm text-gray-500">
                    Stock : {product.stock}
                  </div>

                  <div className="flex items-center">
                    <p className="text-lg font-medium text-gray-800">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="inline-block py-3 px-8 border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-100 transition"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
