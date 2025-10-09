const jwt = require('jsonwebtoken'); 


const verifToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }   
};
module.exports = verifToken;