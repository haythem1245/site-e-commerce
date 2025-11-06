const Order = require("../models/order");


const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;

    if (!orderItems  || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    const newOrder = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while creating order",
      error: error.message,
    });
  }
};


const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while fetching orders",
      error: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // Afficher les infos de l’utilisateur
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des commandes",
      error: error.message,
    });
  }
};

module.exports = { createOrder, getMyOrders,getAllOrders };
