const express = require('express');

const verifRole = (...requiredRole) => {
    return (req, res, next) => {
        if (!req.user || !requiredRole.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès refusé. Rôle insuffisant.' });
        }   
        next();
    };
}   
module.exports = verifRole;

