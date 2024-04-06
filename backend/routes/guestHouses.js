const express = require('express');
const router = express.Router();
const GuestHouse = require('../models/guestHouse');
const multer = require('multer');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken'); // Importer le package jsonwebtoken


// Middleware d'authentification pour vérifier le jeton d'authentification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("*** here authHeader in guestHouses.js: ",authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log("*** token in guestHouses.js: ",token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log("*** here user in guestHouses.js 1: ",user);
        next();
    });
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Dossier de destination pour les fichiers téléchargés
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Renommer le fichier si nécessaire
    }
  });
  
  const upload = multer({ storage: storage });
  

// router.post('/', upload.single('image'), async (req, res) => {
//     try {
//         // Créer un nouvel objet guestHouse en utilisant les données du corps de la requête
//         const guestHouse = new GuestHouse({
//             name: req.body.name,
//             address: req.body.address,
//             description: req.body.description,
//             city: req.body.city,
//             nbRooms: req.body.nbRooms,
//             image: req.file.path, // Chemin vers le fichier téléchargé
//             type: "guestHouse"
//         });

//         // Enregistrer l'hôtel dans la base de données
//         await guestHouse.save();

//         // Renvoyer l'objet hôtel créé en réponse
//         res.status(201).json(guestHouse);
//     } catch (error) {
//         // Gérer les erreurs
//         res.status(400).json(error);
//     }
// });


router.post('',authenticateToken, upload.single('image'), async (req, res) => {
    try {
        // Créer un nouvel objet guestHouse en utilisant les données du corps de la requête
        const guestHouse = new GuestHouse({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            city: req.body.city,
            nbRooms: req.body.nbRooms,
            image: req.file.path, // Chemin vers le fichier téléchargé
            // type: "guestHouse"
        });

        // Enregistrer l'hôtel dans la base de données
        await guestHouse.save();
        console.log("guestHouse saved successfully ", guestHouse);

        // Mettre à jour l'administrateur associé en ajoutant l'ID de cet hôtel à son champ ownedGuestHouses
        const adminId = req.user.id; // Supposons que vous avez un middleware d'authentification qui ajoute l'ID de l'utilisateur à req.user.id
        
        if (adminId) {
            console.log("here admin ID ", adminId);
        } else {
            console.log("adminId not found ");
        }

        await Admin.updateOwnedGuestHouses(adminId, guestHouse._id);

        // Renvoyer l'objet hôtel créé en réponse
        res.status(201).json(guestHouse);
    } catch (error) {
        // Gérer les erreurs
        res.status(400).json(error);
    }
});



// Route pour obtenir tous les guestHouses
router.get('/', async (req, res) => {
    try {
        const guestHouses = await GuestHouse.find();
        res.json(guestHouses);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Route pour obtenir une maison d'hote spécifique par son ID
router.get('/:id', async (req, res) => {
    try {
        const guestHouse = await GuestHouse.findById(req.params.id);
        if (!guestHouse) {
            return res.status(404).send();
        }
        res.send(guestHouse);
    } catch (error) {
        res.status(500).send(error);
    }
});




// Route pour mettre à jour une maison d'hote
router.patch('/:id', upload.single('image'), async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address', 'description', 'city', 'nbRooms', 'image'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    if (req.file) {
        req.body.image = req.file.path; // Remplacer l'ancien chemin de l'image par le nouveau chemin
    }

    try {
        const guestHouse = await GuestHouse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!guestHouse) {
            return res.status(404).send();
        }
        res.send(guestHouse);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route pour supprimer un hôtel
router.delete('/:id', async (req, res) => {
    try {
        const guestHouse = await GuestHouse.findByIdAndDelete(req.params.id);
        if (!guestHouse) {
            return res.status(404).send();
        }
        res.send(guestHouse);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
