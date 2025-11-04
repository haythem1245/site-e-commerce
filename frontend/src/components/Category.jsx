import { useNavigate } from "react-router-dom";
import famme from "../img/famme.jpg";
import homme from "../img/homme.jpg";
import enfants from "../img/enfants.jpg";
import accessoires from "../img/accessoires.jpg";
const categories = [
  { name: "female", image: famme , description: "Mode femme" },
  { name: "men", image: homme , description: "Mode homme" },
  { name: "accessories", image: accessoires , description: "Accessoires" },
  { name: "kids", image: enfants , description: "Enfants" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`); 
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
