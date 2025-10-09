const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [5, "Product price cannot exceed 5 digits"],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },

    images: {
        type: [String],
        required: [true, "Please enter product images"],
    },
    category: {
        type: String,
        required: [true, "Please select category for this product"],
        enum: {
            values: [
                "Eid Collection",
                "New Collection",
                "Featured",
                "Footwear",
                "Accessories",
                "Clothing",
                "Beauty/Health",
                "Sports",
                "Outdoor",
                "Other",
            ],
            message: "Please select correct category for product",
        },
    },
  
  
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Stock cannot exceed 5 digits"],
        default: 0,
    },
    Featured :{
        type : Boolean,
        default : false
    },
   
   
   Timesnamp: true,
});

module.exports = mongoose.model("Product", productSchema);
