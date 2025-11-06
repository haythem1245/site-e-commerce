const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

// ✅ Stats globales (pour le Dashboard admin)
const getAdminStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const orders = await Order.find();

    // Calcul du chiffre d’affaires total
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        usersCount,
        productsCount,
        ordersCount: orders.length,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors du chargement des statistiques admin",
      error: error.message,
    });
  }
};

module.exports = { getAdminStats };
