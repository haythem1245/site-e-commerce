import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
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
  const [preview, setPreview] = useState(null);
  const token = localStorage.getItem("token");

  // Charger produits
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://site-e-commerce-1backend.onrender.com/api/v1/products");
      setProducts(res.data);
      setNewProducts(res.data.filter(p => p.isNew));
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des produits");
    }
  };

  // Ouvrir modal
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
        isNew: product.isNew,
        sold: product.sold || 0,
        newSold: product.newSold || 0,
        images: null,
      });
      setPreview(product.images);
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
      setPreview(null);
      setEditId(null);
    }
    setShowModal(true);
  };

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
    setPreview(null);
    setEditId(null);
  };

  // Gérer changement champs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let updatedForm = { ...formData };

    if (type === "checkbox") {
      updatedForm[name] = checked;
    } else if (files) {
      updatedForm[name] = files[0];
      setPreview(URL.createObjectURL(files[0]));
    } else {
      updatedForm[name] = value;
    }

    // Calcul automatique prix final
    if (name === "price" || name === "sold" || name === "newSold") {
      const price = parseFloat(updatedForm.price) || 0;
      const reduction = parseFloat(updatedForm.newSold || updatedForm.sold) || 0;
      updatedForm.finalPrice = (price - (price * reduction) / 100).toFixed(2);
    }

    setFormData(updatedForm);
  };

  // Ajouter / Modifier produit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category || !formData.description) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    if (!editId && !formData.images) {
      toast.error("Veuillez ajouter une image !");
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) data.append(key, formData[key]);
      }

      if (editId) {
        await axios.put(
          `https://site-e-commerce-1backend.onrender.com/api/v1/product/${editId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Produit modifié avec succès !");
      } else {
        await axios.post(
          "https://site-e-commerce-1backend.onrender.com/api/v1/product",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Produit ajouté avec succès !");
      }

      closeModal();
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur d’enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await axios.delete(`https://site-e-commerce-1backend.onrender.com/api/v1/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Produit supprimé avec succès");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression");
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

      {/* Section Nouveaux produits */}
      {newProducts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">✨ Nouveaux Produits</h2>
          <div className="flex flex-wrap gap-4">
            {newProducts.map(p => (
              <div key={p._id} className="border p-2 rounded shadow w-40 text-center">
                <img src={p.images} alt={p.name} className="h-24 w-full object-cover rounded" />
                <p className="font-bold">{p.name}</p>
                <p className="text-green-600">{p.finalPrice} TND</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tableau produits */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Réduction</th>
              <th className="px-4 py-2">Prix Final</th>
              <th className="px-4 py-2">Catégorie</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Nouveau</th>
              <th className="px-4 py-2">Vedette</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id} className="border-t text-center hover:bg-gray-100 transition">
                  <td><img src={p.images} alt={p.name} className="h-12 w-12 object-cover rounded-md mx-auto" /></td>
                  <td>{p.name}</td>
                  <td>{p.price} TND</td>
                  <td>{p.newSold || p.sold}%</td>
                  <td className="font-bold text-green-600">{p.finalPrice} TND</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>{p.isNew ? "Oui" : "Non"}</td>
                  <td>{p.featured ? "Oui" : "Non"}</td>
                  <td className="space-x-2">
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
              <tr><td colSpan="10" className="py-4 text-gray-500">Aucun produit trouvé</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editId ? "Modifier le produit" : "Ajouter un produit"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom du produit" className="w-full border p-2 rounded" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Prix original" className="w-full border p-2 rounded" required />

              <input type="number" name="sold" value={formData.sold} onChange={handleChange} placeholder="Réduction actuelle (%)" className="w-full border p-2 rounded" />
              <input type="number" name="newSold" value={formData.newSold} onChange={handleChange} placeholder="Nouvelle réduction (%)" className="w-full border p-2 rounded" />
              <input type="text" name="finalPrice" value={formData.finalPrice} readOnly className="w-full border p-2 rounded bg-gray-100" placeholder="Prix final calculé" />

              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Catégorie" className="w-full border p-2 rounded" required />
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full border p-2 rounded" required />

              <div className="flex items-center space-x-2">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                <label>Produit vedette</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
                <label>Nouveau produit</label>
              </div>

              {preview && <img src={preview} alt="preview" className="h-32 w-full object-cover rounded mt-2" />}
              <input type="file" name="images" onChange={handleChange} className="w-full border p-2 rounded" accept="image/*" />

              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                  Annuler
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
