const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Importer le package jsonwebtoken
const User = require('../models/user'); // Importer le modèle d'utilisateur
const Admin = require('../models/admin'); // Importer le modèle d'administrateur

// Middleware d'authentification pour vérifier le jeton d'authentification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token in profile.js: ",token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log("here user in profile.js 1: ",user);
        next();
    });
};

// Route pour obtenir les détails du profil de l'utilisateur ou de l'administrateur
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        // Vérifier le rôle de l'utilisateur dans le jeton
        const userId = req.user.id;
        console.log("here userID in profile.js: ",userId);
        let user;

        // Vérifier si l'utilisateur est un utilisateur normal ou un administrateur
        if (req.user.role === 'user') {
            user = await User.findById(userId);
            console.log( "he is simple user: ",user);
        } else if (req.user.role === 'admin') {
            user = await Admin.findById(userId);
            console.log( "he is admin: ",user);

        } else {
            return res.status(403).send({ error: 'Forbidden' });
        }

        // Envoyer les détails du profil de l'utilisateur ou de l'administrateur
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;