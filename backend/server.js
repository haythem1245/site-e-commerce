const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const adminRoutes = require("./routes/adminRouter");
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const path = require("path");
const cloudinary = require('cloudinary').v2;

const app = express();

// 🔹 Connexion à la base de données
connectDB();

// 🔹 Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Configuration CORS
app.use(cors({
  origin: [
    "http://localhost:5000",               // pour le développement local
    "https://frontend-niip.onrender.com"   // pour la version déployée sur Render
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Routes
app.use("/api/v0/admin", adminRoutes);
app.use("/api/v0", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v2", orderRoutes);

// 🔹 Fichiers statiques
app.use('/uploads', express.static('uploads'));
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "/frontend/build", "index.html"));
});

// 🔹 Démarrage du serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
