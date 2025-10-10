const Product = require('../models/product');


const ajoutProduct = async (req, res) => {
    try {
        // Récupérer les données envoyées dans le body
        const { name, price,  description,images,category, stock } = req.body;

        // Créer un nouveau produit
        const newProduct = new Product({
            name,
            price,
            description,
            images,
            category,
            stock
        });

        // Sauvegarder dans la base
        const savedProduct = await newProduct.save();
console.log(savedProduct);
        res.status(201).json({
            message: "Produit ajouté avec succès",
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
     res.status(200).json(product);
         
    } catch (error) {
        res.status(200).status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

const getAllProducts= async (req, res) => {
    try {
    
    
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

const getProductByCategirie= async (req, res) => {
    try {
    
    const category = req.params.category;
        const products = await Product.find({ category: category });

        
        if (!products || products.length === 0) {
            return res.status(404).json({
                message: `Aucun produit trouvé pour la catégorie : ${category}`
            });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};




const updateProducts = async (req, res) => {
    try {
        const { name, price, description, images,category,stock} = req.body; 
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id,
            {name, price, description, images,category,stock},
            { new: true, runValidators: true } 
        ).select("name price description images category stock ");

        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.status(200).json({ message: "Produit mis à jour avec succès", product });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
const DeletProducts= async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
            if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }   
    res.status(200).json({ message: "Produit supprimé avec succès", product });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports = {ajoutProduct, getProductById, updateProducts,getProductByCategirie ,getAllProducts,DeletProducts};


