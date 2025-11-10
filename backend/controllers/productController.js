const Product = require('../models/product');
const FuturProduct = require('../models/futureProducts');
const fs = require("fs");
const path = require("path");
const cloudinary = require('cloudinary').v2;

const ajoutProduct = async (req, res) => {
    
  try {
    const file = req.file;
    let imageUrl = null;
    let publicId = null;

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      imageUrl = result.secure_url;
      publicId = result.public_id;

      fs.unlinkSync(file.path);
    }

    const product = new Product({
      ...req.body,
      images: imageUrl,
      imagePublicId: publicId,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
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

    // Vérifier si le produit existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé ❌" });
    }

    // 🔄 Si une nouvelle image est uploadée
    if (req.file) {
      // Supprimer l’ancienne image sur Cloudinary si elle existe
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // Upload de la nouvelle image sur Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      product.images = result.secure_url;
      product.imagePublicId = result.public_id;

      // Supprimer le fichier temporaire local
      fs.unlinkSync(req.file.path);
    }

    // Mise à jour des autres champs si présents
    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (isNew !== undefined) product.new = isNew;
    if (sold !== undefined) product.sold = sold;
    if (newSold !== undefined) product.newSold = newSold;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "✅ Produit mis à jour avec succès",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Erreur mise à jour produit:", error);
    res.status(500).json({ message: error.message });
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


