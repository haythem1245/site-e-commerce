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
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-niip.onrender.com"
];

app.use(cors({
  origin: function(origin, callback){
    // Autoriser les requêtes sans origine (ex: Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'CORS policy: This origin is not allowed.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/api/v0/admin", adminRoutes);
app.use('/api/v0', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v2', orderRoutes);
app.use('/uploads', express.static('uploads'));
const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
console.log('Server is running on port ' + PORT);
});