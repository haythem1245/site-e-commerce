const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription (signup)
const signup = async (req, res) => {
    try {
        const { name, email, password,role,address,phone,image } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const user = new User({ name, email, password: hashedPassword ,role,address,phone ,image});
        await user.save();

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Connexion (login)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: user._id,
            role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Connexion réussie",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role}
        });
 
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Exemple route protégée
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
         console.log(user);
                req.user = user;

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Récupérer le profil de l'utilisateur connecté
const getMyProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const updateMyProfile = async (req, res) => {
  try {
    //  Récupérer les nouvelles données envoyées par l'utilisateur
    const { name, email, password, phone, address,image} = req.body;

    //  Créer un objet avec les champs à mettre à jour
    const updatedData = {
      name,
      email,
      password,
      phone,
      address,
      image,
      
    };

    //  Si l'utilisateur veut changer son mot de passe
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    //  Récupérer l'utilisateur connecté (grâce au token)
    const userId = req.user._id; // injecté par ton middleware verifToken
    console.log(userId);
    
    //  Mettre à jour son profil
    const user = await User.findByIdAndUpdate(userId, { $set: updatedData }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    //  Retourner le nouveau profil
    res.json({
      message: "Profil mis à jour avec succès",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};





// Récupérer tous les profils (admin seulement)
const getAllProfile = async (req, res) => {
    try {
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Accès refusé. Seuls les admins peuvent voir la liste des profils." });
        // }
    
        const users = await User.find();
        res.json(users);
        console.log(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

// Mettre à jour le profil utilisateur

const updateProfile = async (req, res) => {
    try {
        const { name, email, password, phone, address, image,role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, password, phone, address, image,role },
            { new: true, runValidators: true } 
        ).select("name email phone address city country postalCode");

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json({ message: "Profil mis à jour avec succès", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports = { signup, login, getProfile, updateProfile ,getAllProfile,getMyProfile,updateMyProfile};


