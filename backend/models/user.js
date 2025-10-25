const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        maxLength: [200, "Your phone number cannot exceed 200 characters"],
    },
    address: {
        type: String,
        required: [false, "Please enter your address"],
        maxLength: [200, "Your address cannot exceed 200 characters"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Your password must be longer than 6 characters"],
    },
    image:{
        type: String,
        default : "https://img.freepik.com/vecteurs-premium/creation-logo-homme-affaires-moderne-logo-masculin-icone-pour-profil-avatar_115973-4648.jpg?w=2000"

    },
     role: { type: String,
         enum: ["user", "admin"],
          default: "user" }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
