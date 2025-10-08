const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, 
    role: { type: String, default: 'user' },
    phone:String,
    address:String,
    city:String,
    country:String,
    postalCode:String,});

const User = mongoose.model('Product', userSchema);

module.exports = User;
