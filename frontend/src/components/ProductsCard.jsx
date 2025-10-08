import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Productscard = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');



    const searchProductsByTitle = async (searchTerm) => {
    try {
      if (!searchTerm.trim()) {
        // Si la recherche est vide, charger tous les produits
        const productsData = await fetchProductsByCategory('all');
        return productsData;
      }

      // Recherche dans l'API FakeStore (qui ne supporte pas la recherche native)
      // On charge d'abord tous les produits puis on filtre localement
      const response = await axios.get('https://fakestoreapi.com/products');
      
      const filteredProducts = response.data.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const transformedProducts = filteredProducts.map(product => ({
        id: product.id,
        name: product.title,
        price: `$${product.price}`,
        originalPrice: `$${(product.price * 1.5).toFixed(2)}`,
        discount: `$${(product.price * 0.5).toFixed(2)}B`,
        description: product.description,
        image: product.image,
        category: product.category,
        rating: product.rating.rate,
        colorOptions: getColorOptionsByCategory(product.category),
        sizeOptions: getSizeOptionsByCategory(product.category),
        delivery: getDeliveryOptions(),
        hasColors: true,
        hasSizes: true
      }));
      
      return transformedProducts;
    } catch (err) {
      console.error('Error searching products:', err);
      throw err;
    }
  };

      
      
 

  // Catégories disponibles dans FakeStore API
  const availableCategories = [
    "electronics",
    "jewelery", 
    "men's clothing",
    "women's clothing"
  ];

  // Mapping des catégories pour l'affichage
  const categoryMapping = {
    "electronics": "Électronique",
    "jewelery": "Bijoux",
    "men's clothing": "Homme",
    "women's clothing": "Femme",
    "all": "Tous les produits"
  };

  // Fonction pour récupérer toutes les catégories
  const fetchCategories = async () => {
    try {
      // FakeStore API ne fournit pas d'endpoint pour les catégories, on utilise nos catégories prédéfinies
      setCategories(availableCategories);
      return availableCategories;
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories(availableCategories);
      return availableCategories;
    }
  };

  // Fonction pour récupérer les produits par catégorie
  const fetchProductsByCategory = async (category) => {
    try {
      let url = 'https://fakestoreapi.com/products';
      
      if (category !== 'all') {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      
      const response = await axios.get(url);
      
      // Transformer les données de l'API pour correspondre à notre format
      const transformedProducts = response.data.map(product => ({
        id: product.id,
        name: product.title,
        price: `$${product.price}`,
        originalPrice: `$${(product.price * 1.5).toFixed(2)}`, // Prix original fictif
        discount: `$${(product.price * 0.5).toFixed(2)}B`, // Réduction fictive
        description: product.description,
        image: product.image,
        category: product.category,
        rating: product.rating.rate,
        colorOptions: getColorOptionsByCategory(product.category),
        sizeOptions: getSizeOptionsByCategory(product.category),
        hasColors: true,
        hasSizes: true
      }));
      
      return transformedProducts;
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    }
  };

  // Options de couleurs par catégorie
  const getColorOptionsByCategory = (category) => {
    const colorMap = {
      "electronics": ["Black", "Silver", "Space Gray", "White"],
      "jewelery": ["Gold", "Silver", "Rose Gold", "Platinum"],
      "men's clothing": ["Black", "Blue", "Gray", "Navy", "White"],
      "women's clothing": ["Pink", "Red", "Blue", "Black", "White", "Purple"]
    };
    return colorMap[category] || ["Black", "White", "Gray"];
  };

  // Options de tailles par catégorie
  const getSizeOptionsByCategory = (category) => {
    const sizeMap = {
      "men's clothing": ["S", "M", "L", "XL", "XXL"],
      "women's clothing": ["XS", "S", "M", "L", "XL"],
      "electronics": ["Standard", "Large", "XL"],
      "jewelery": ["Small", "Medium", "Large"]
    };
    return sizeMap[category] || ["One Size"];
  };


  // Fonction pour récupérer les filtres (données locales)
  const fetchFilters = async () => {
    const defaultFilters = [
      "Rating", "Price", "Shipping to Color", "Delivery Method", "Condition", "Weight"
    ];
    setFilters(defaultFilters);
    return defaultFilters;
  };

  // useEffect pour charger les données au montage du composant
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [categoriesData] = await Promise.all([
          fetchCategories(),
          fetchFilters()
        ]);
        
        // Charger les produits de la catégorie par défaut
        const productsData = await fetchProductsByCategory('all');
        setProducts(productsData);
        
      } catch (err) {
        setError('Erreur lors du chargement des données. Utilisation des données de démonstration.');
        console.error('Error loading data:', err);
        // Charger des données de démonstration en cas d'erreur
        loadDemoData();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // useEffect pour charger les produits quand la catégorie change
  useEffect(() => {
    if (selectedCategory) {
      const loadProductsForCategory = async () => {
        setLoading(true);
        try {
          const productsData = await fetchProductsByCategory(selectedCategory);
          setProducts(productsData);
        } catch (err) {
          setError('Erreur lors du chargement des produits pour cette catégorie.');
          console.error('Error loading category products:', err);
        } finally {
          setLoading(false);
        }
      };

      loadProductsForCategory();
    }
  }, [selectedCategory]);

  // Données de démonstration en cas d'échec de l'API
  const loadDemoData = () => {
    const demoProducts = [
      {
        id: 1,
        name: "Apple Watch SE - Gen 3",
        price: "$299",
        originalPrice: "$599",
        discount: "$120B",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        category: "electronics",
        colorOptions: ["Black", "Silver", "Gold"],
        sizeOptions: ["40mm", "44mm"],
      }
    ];
    setProducts(demoProducts);
    setCategories(availableCategories);
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleColorSelect = (productId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Fonction pour simuler l'ajout au panier
  const handleAddToCart = async (productId) => {
    try {
      // Simulation d'ajout au panier - en réalité, vous utiliseriez votre propre API
      const product = products.find(p => p.id === productId);
      console.log('Adding to cart:', product);
      alert(`${product.name} ajouté au panier avec succès!`);
    } catch (err) {
      alert('Erreur lors de l\'ajout au panier');
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="lg:w-1/4 space-y-6">
            {/* Categories Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <h2 className="font-semibold text-gray-700 mb-4">Categories</h2>
              {/* Categories List */}
              <div className="space-y-2">
                <div 
                  onClick={() => handleCategorySelect('all')}
                  className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer ${
                    selectedCategory === 'all' ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                >
                  <span className={`${
                    selectedCategory === 'all' ? 'text-blue-600 font-medium' : 'text-gray-600'
                  } hover:text-blue-600`}>
                    Tous les produits
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {products.length}
                  </span>
                </div>

                {categories.map((category, index) => (
                  <div 
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                    className={`flex items-center justify-between py-2 px-3 rounded cursor-pointer ${
                      selectedCategory === category ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                  >
                    <span className={`${
                      selectedCategory === category ? 'text-blue-600 font-medium' : 'text-gray-600'
                    } hover:text-blue-600 capitalize`}>
                      {categoryMapping[category] || category}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {category === "men's clothing" ? "4" : 
                       category === "women's clothing" ? "6" : 
                       category === "electronics" ? "6" : 
                       category === "jewelery" ? "4" : "0"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* En-tête de catégorie */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">
                {categoryMapping[selectedCategory] || selectedCategory}
              </h2>
              <p className="text-gray-600 mt-2">
                {products.length} produit(s) trouvé(s)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {/* Image du produit */}
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-32 object-contain"
                      onClick={()=>navigate(`/Products/${product.id}`)}
                    />
                  </div>

                  {/* Badge de catégorie */}
                  <div className="mb-2">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full capitalize">
                      {categoryMapping[product.category] || product.category}
                    </span>
                  </div>

                  {/* Product Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="block text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 mb-4">
                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating || "4.5"}
                      </span>
                    </div>

                    {/* Color Selection */}
                    {product.colorOptions && product.colorOptions.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-600">Color</span>
                        <div className="flex gap-2 mt-1">
                          {product.colorOptions.slice(0, 3).map((color) => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(product.id, color)}
                              className={`px-3 py-1 text-xs border rounded-full ${
                                selectedColors[product.id] === color
                                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                                  : 'border-gray-300 text-gray-600'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size Selection */}
                    {product.sizeOptions && product.sizeOptions.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-600">Choose a size</span>
                        <div className="flex gap-2 mt-1">
                          {product.sizeOptions.slice(0, 4).map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`px-3 py-1 text-xs border rounded ${
                                selectedSizes[product.id] === size
                                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                                  : 'border-gray-300 text-gray-600'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Discount */}
                    <div className="text-red-600 font-medium text-sm">
                      {product.discount}
                    </div>
                  </div>

                  {/* Add to Cart & Delivery */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto object-contain"
          />
          <h3 className="mt-2 font-bold text-lg">{product.title}</h3>
          <p className="text-gray-500">${product.price}</p>
        </div>
      ))}
    </div>
    </div>
    
  );
};

export default Productscard;