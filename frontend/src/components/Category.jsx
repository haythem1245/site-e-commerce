import { useNavigate } from "react-router-dom";

const categories = [
  { name: "female", image: "https://readdy.ai/api/search-image?query=elegant%20womens%20clothing...", description: "Mode femme" },
  { name: "men", image: "https://readdy.ai/api/search-image?query=stylish%20mens%20clothing...", description: "Mode homme" },
  { name: "accessories", image: "https://readdy.ai/api/search-image?query=premium%20accessories...", description: "Accessoires" },
  { name: "kids", image: "https://readdy.ai/api/search-image?query=luxury%20footwear...", description: "Enfants" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`); // ✅ corrigé
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1 capitalize">
                      {cat.name}
                    </h3>
                    <p className="text-white/80 text-sm">{cat.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
