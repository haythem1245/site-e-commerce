
import { useNavigate } from "react-router-dom";
import homme from "../img/homme.jpg";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-12">
          
          {/* TEXTE */}
          <div className="flex flex-col justify-center items-start gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
                ShopMan — Le style au service de votre quotidien
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Chez <span className="font-semibold text-blue-600">ShopMan</span>, 
                nous croyons que la mode et la qualité doivent être accessibles à tous.  
                Notre boutique en ligne réunit les meilleures tendances pour 
                <strong>hommes</strong>, <strong>femmes</strong> et <strong>enfants</strong>, 
                alliant élégance, confort et durabilité.  
                <br />
                Chaque produit est soigneusement sélectionné pour vous offrir 
                une expérience d’achat unique et inspirante, que ce soit pour 
                un look casual, professionnel ou chic.
              </p>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Découvrir nos produits
            </button>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-3xl"></div>
           

<img src={homme} alt="ShopMan" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
