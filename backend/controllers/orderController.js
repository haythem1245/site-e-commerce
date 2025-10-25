const order = require('../models/order');
const { findById } = require('../models/user');

const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;   
        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }
        const newOrder = new order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod
            
        });
        const createdOrder = await newOrder.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
const getMyOrder = async( req,res)=>{
    try {
        const orders = await order.find({user:req.user.id});
        res.status(200).json(orders)
        
    } catch (error) {
       res.status(500).json({ message: "Server Error", error: error.message });  
    }
}




module.exports = {createOrder,getMyOrder };


