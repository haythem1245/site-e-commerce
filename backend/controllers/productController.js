const Product = require('../models/product');
const FuturProduct = require('../models/futureProducts');
const fs = require("fs");
const path = require("path");

const ajoutProduct = async (req, res) => {
    try {
        // Récupérer les données envoyées dans le body
        const { name, price,  description,category,featured, stock ,new:isNew ,sold,newSold } = req.body;

        if (!req.file) {
      return res.status(400).json({ message: "Aucune image uploadée" });
    }

   
      const image = req.file.filename;
      let finalPrice = Number(price); // prix original

    // 1️⃣ Appliquer la première réduction (sold)
    if (sold && sold > 0) {
      finalPrice = finalPrice - (finalPrice * sold / 100);
    }

    // 2️⃣ Appliquer la deuxième réduction (newSold)
    if (newSold && newSold > 0) {
      finalPrice = finalPrice - (finalPrice * newSold / 100);
    }
        // Créer un nouveau produit
        const newProduct = new Product({
            name,
            price,
            finalPrice,
            description,
            images:image,
            category,
            stock,
            featured: featured || false,
      new: isNew || false,
           sold: sold || 0,
      newSold: newSold || 0,
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
        res.status(500).json({ message: "Erreur serveur", error: error.message });
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
    const { name, price, description, category, stock, new: isNew, sold, newSold } = req.body;
    const { id } = req.params;

    // 🔍 Vérifier si le produit existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé ❌" });
    }

    // 🔄 Si une nouvelle image est uploadée
    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", "uploads", product.images);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // 🗑️ Supprime l’ancienne image
      }
      product.images = req.file.filename; // Remplace l’image
    }

    // 📝 Mise à jour des autres champs si présents
    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (isNew !== undefined) product.new = isNew;
    if (sold !== undefined) product.sold = sold;
    if (newSold !== undefined) product.newSold = newSold;

    // 💾 Enregistrer les changements
    const updatedProduct = await product.save();

    res.status(200).json({
      message: "✅ Produit mis à jour avec succès",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    res.status(500).json({
      message: "Erreur serveur ❌",
      error: error.message,
    });
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


