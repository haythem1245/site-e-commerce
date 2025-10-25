const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Accès refusé : token manquant" });
    }

    try {
        // enlever "Bearer " si présent
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // contient { id, role, iat, exp }
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = auth;
