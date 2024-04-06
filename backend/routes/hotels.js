const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');
const multer = require('multer');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken'); // Importer le package jsonwebtoken


// Middleware d'authentification pour vérifier le jeton d'authentification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("here authHeader in hotels.js: ",authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log("token in hotels.js: ",token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log("here user in hotels.js 1: ",user);
        next();
    });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination pour les fichiers téléchargés
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Renommer le fichier si nécessaire
    }
  });
  
  const upload = multer({ storage: storage });
  




router.post('',authenticateToken, upload.single('image'), async (req, res) => {
    try {
        // Créer un nouvel objet Hotel en utilisant les données du corps de la requête
        const hotel = new Hotel({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            city: req.body.city,
            nbRooms: req.body.nbRooms,
            image: req.file.path, // Chemin vers le fichier téléchargé
            // type: "hotel"
        });

        // Enregistrer l'hôtel dans la base de données
        await hotel.save();
        console.log("hotel saved successfully ", hotel);

        // Mettre à jour l'administrateur associé en ajoutant l'ID de cet hôtel à son champ ownedHotels
        const adminId = req.user.id; // Supposons que vous avez un middleware d'authentification qui ajoute l'ID de l'utilisateur à req.user.id
        
        if (adminId) {
            console.log("here admin ID ", adminId);
        } else {
            console.log("adminId not found ");
        }

        await Admin.updateOwnedHotels(adminId, hotel._id);

        // Renvoyer l'objet hôtel créé en réponse
        res.status(201).json(hotel);
    } catch (error) {
        // Gérer les erreurs
        res.status(400).json(error);
    }
});


// Route pour obtenir tous les hôtels
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Route pour obtenir un hôtel spécifique par son ID
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).send();
        }
        res.send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route pour mettre à jour un hôtel
router.patch('/:id', upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body);
    console.log('here req.body in update router: ',req.body)
    const allowedUpdates = ['name', 'address', 'description', 'city', 'nbRooms', 'image'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    if (req.file) {
        req.body.image = req.file.path; // Remplacer l'ancien chemin de l'image par le nouveau chemin
    }

    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hotel) {
            return res.status(404).send();
        }
        res.send(hotel);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route pour supprimer un hôtel
router.delete('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).send();
        }
        res.send(hotel);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
