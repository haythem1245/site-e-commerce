const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const adminRoutes = require("./routes/adminRouter");
const app = express();
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const path =require ("path");
const cloudinary = require('cloudinary').v2;
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/api/v0/admin", adminRoutes);
app.use('/api/v0', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v2', orderRoutes);
app.use('/uploads', express.static('uploads'));
const PORT = 5000;
app.listen(PORT, () => {
console.log('Server is running on port ' + PORT);
});