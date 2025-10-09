const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoute');

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/v0', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
console.log('Server is running on port ' + PORT);
});