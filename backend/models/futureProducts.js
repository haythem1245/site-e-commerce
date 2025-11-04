
const mongoose = require("mongoose");

const FutureProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: Number,
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  tag: String,
});

module.exports = mongoose.model("FutureProduct", FutureProductSchema);
