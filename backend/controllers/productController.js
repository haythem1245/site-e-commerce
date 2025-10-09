const Product = require('../models/product');



const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.user.id).select("-password");
        res.json(product);
         console.log(product);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

const getAllProducts= async (req, res) => {
    try {
    
    
        const products = await Product.find();
        res.json(products);
        console.log(products);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};



const updateProducts = async (req, res) => {
    try {
        const { name, price, description, images,category,stock, Featured } = req.body; 
        const product = await Product.findByIdAndUpdate(
            req.product.id,
            {name, price, description, images,category,stock, Featured},
            { new: true, runValidators: true } 
        ).select("name price description images category stock Featured");

        if (!user) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.json({ message: "Produit mis à jour avec succès", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports = { getProductById, updateProducts ,getAllProducts};


