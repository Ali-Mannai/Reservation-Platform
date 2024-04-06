const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const session = require('express-session');


// Route pour créer un nouvel administrateur (inscription)
router.post('/signup', async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route pour connecter un administrateur (connexion)
router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email, password: req.body.password });
        if (!admin) {
            return res.status(404).send({ error: 'Administrateur non trouvé' });
        }

                // Initialiser une session une fois l'utilisateur authentifié avec succès
                req.session.admin = admin;

        // Ici, vous pouvez générer un token JWT pour l'authentification
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route pour afficher le tableau de bord (dashboard) uniquement accessible pour les administrateurs
router.get('/dashboard', async (req, res) => {
    // Vérifier si l'utilisateur est un administrateur, sinon retourner une erreur
    // Ici, vous pouvez utiliser les informations de l'utilisateur authentifié (par exemple, en utilisant un middleware d'authentification)
    // Si l'utilisateur n'est pas un administrateur, vous pouvez retourner un message d'erreur ou rediriger vers une page d'erreur.
    res.send("Tableau de bord de l'administrateur");
});

// Route pour déconnecter l'utilisateur
router.post('/logout', (req, res) => {
    // Effacer les données de session de l'utilisateur
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }
        // Retourner une réponse de déconnexion réussie
        res.clearCookie('connect.sid');
        res.json({ message: 'Déconnexion réussie' });
    });
});

module.exports = router;
