const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
connectDB();

app.use(cors({origine : 'http://localhost:5173/', credentials:true}));
app.use(express.json());
app.use('/api/v0', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v2', orderRoutes);
const PORT = 5000;
app.listen(PORT, () => {
console.log('Server is running on port ' + PORT);
});