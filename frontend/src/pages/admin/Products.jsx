import  { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    finalPrice: "",
    description: "",
    category: "",
    stock: "",
    featured: false,
    isNew: false,
    sold: 0,
    newSold: 0,
    images: null,
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Charger tous les produits
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://site-e-commerce-1backend.onrender.com/api/v1/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits :", err);
      toast.error("Erreur lors du chargement des produits");
    }
  };

  // ✅ Ouvrir le modal (ajout ou édition)
  const openModal = (product = null) => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        finalPrice: product.finalPrice || "",
        description: product.description,
        category: product.category,
        stock: product.stock,
        featured: product.featured,
        isNew: product.new,
        sold: product.sold,
        newSold: product.newSold,
        images: null,
      });
      setEditId(product._id);
    } else {
      setFormData({
        name: "",
        price: "",
        finalPrice: "",
        description: "",
        category: "",
        stock: "",
        featured: false,
        isNew: false,
        sold: 0,
        newSold: 0,
        images: null,
      });
      setEditId(null);
    }
    setShowModal(true);
  };

  // ✅ Fermer le modal
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      price: "",
      finalPrice: "",
      description: "",
      category: "",
      stock: "",
      featured: false,
      isNew: false,
      sold: 0,
      newSold: 0,
      images: null,
    });
    setEditId(null);
  };

  // ✅ Gérer le changement des champs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Créer ou modifier un produit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.description) {
      toast.error("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    if (!editId && !formData.images) {
      toast.error("Veuillez ajouter une image !");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("finalPrice", formData.finalPrice || formData.price);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("featured", formData.featured);
      data.append("isNew", formData.isNew);
      data.append("sold", formData.sold);
      data.append("newSold", formData.newSold);
      if (formData.images) data.append("images", formData.images);

      if (editId) {
        await axios.put(`https://site-e-commerce-1backend.onrender.com/api/v1/product/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Produit modifié avec succès !");
      } else {
        await axios.post("https://site-e-commerce-1backend.onrender.com/api/v1/product", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Produit ajouté avec succès !");
      }

      closeModal();
      fetchProducts();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
      toast.error(err.response?.data?.message || "Erreur lors de l'enregistrement du produit");
    }
  };

  // ❌ Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await axios.delete(`https://site-e-commerce-1backend.onrender.com/api/v1/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Produit supprimé avec succès");
      fetchProducts();
    } catch (err) {
      console.error("Erreur suppression produit :", err);
      toast.error("Erreur lors de la suppression du produit");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🛍️ Gestion des produits</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Catégorie</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id} className="border-t text-center hover:bg-gray-100 transition">
                  <td className="px-4 py-2">
                    <img
                      src={p.images}
                      alt={p.name}
                      className="h-12 w-12 object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium">{p.name}</td>
                  <td className="px-4 py-2">{p.finalPrice || p.price} TND</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openModal(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-gray-500">
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal d’ajout/modif produit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editId ? "Modifier le produit" : "Ajouter un produit"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom du produit"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Prix"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="finalPrice"
                value={formData.finalPrice}
                onChange={handleChange}
                placeholder="Prix final (optionnel)"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Catégorie"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex items-center space-x-2">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                <label>Produit vedette</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
                <label>Nouveau produit</label>
              </div>
              <input
                type="file"
                name="images"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                accept="image/*"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editId ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
