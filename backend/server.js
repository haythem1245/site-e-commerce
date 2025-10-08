const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async() =>{console.log('Connected to MongoDB');
    const p = new Product({
        name: 'Produit Test',
        price: 19.99,
        description: 'Ceci est un produit de test',
        inStock: true
    });
    await p.save();
    console.log('Product saved:', p);
    mongoose.connection.close();
} )
.catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));
