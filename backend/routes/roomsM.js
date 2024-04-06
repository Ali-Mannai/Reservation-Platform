const express = require('express');
const router = express.Router();
const RoomM = require('../models/roomM');
const GuestHouse = require('../models/guestHouse');
const multer = require('multer');
const BookingM = require('../models/bookingM');
const jwt = require('jsonwebtoken'); // Importer le package jsonwebtoken


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Dossier de destination pour les fichiers téléchargés
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Renommer le fichier si nécessaire
    }
});

const upload = multer({ storage: storage });


    // Middleware d'authentification pour vérifier le jeton d'authentification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token in roomsH router: ",token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log("here user in roomsH router 1: ",user);
        next();
    });
};



router.post('/:guestHouseId/roomsM', upload.single('image'), async (req, res) => {
    try {
        // Créer la chambre
        const room = new RoomM({
            name: req.body.name,
            capacity: req.body.capacity,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path // Chemin vers le fichier téléchargé
        });

        // Enregistrer la chambre dans la base de données
        await room.save();

        // Mettre à jour la maison d'hote avec la nouvelle chambre
        const guestHouse = await GuestHouse.findById(req.params.guestHouseId);
        await guestHouse.addRoom(room._id);

        res.status(201).json(room);
    } catch (error) {
        res.status(400).send(error);
    }
});



// Route pour obtenir toutes les chambres d'une maison d'hote spécifique
router.get('/:guestHouseId/roomsM', async (req, res) => {
    const guestHouseId = req.params.guestHouseId;
    console.log("here guestHouse ID: ", guestHouseId);

    try {
        // Trouver la maison d'hote par son ID et peupler les chambres
        const guestHouse = await GuestHouse.findById(guestHouseId).populate('rooms').exec();

        // Renvoyer les chambres de la maison d'hote
        res.json(guestHouse.rooms);
    } catch (err) {
        console.error("Erreur lors de la récupération de la maison d'hote :", err);
        res.status(500).json({ error: "Erreur lors de la récupération de la maison d'hote" });
    }
});


// Route pour obtenir une chambre spécifique par son ID
router.get('/:guestHouseId/roomsM/:idRoom', async (req, res) => {
    try {
        console.log("hello from get router ")
        const room = await RoomM.findById(req.params.idRoom);
        console.log("here room from router get roomsM: ", room);

        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route pour modifier une chambre
router.patch('/:guestHouseId/roomsM/:id', upload.single('image'), async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        console.log("🚀 ~ router.patch ~ req.body:", req.body)
        const allowedUpdates = ['name', 'capacity', 'description', 'price', 'image'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        if (req.file) {
            req.body.image = req.file.path; // Remplacer l'ancien chemin de l'image par le nouveau chemin
        }

        const room = await RoomM.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!room) {
            return res.status(404).send({ error: 'Room not found' });
        }
        
        res.send(room);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Route pour supprimer une chambre spécifique
router.delete('/:guestHouseId/roomsM/:id', async (req, res) => {
    try {
        const room = await RoomM.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route pour la réservation d'une chambre de la maison d'hote
router.post('/roomsM/:roomId/reservation',authenticateToken, async (req, res) => {
    const { startDate, endDate } = req.body;
    const roomId = req.params.roomId;
    // const userId = req.session.user._id; // Obtenir l'ID de l'utilisateur depuis la session
    
    // console.log("Here user ID ", userId);
    const userId = req.user.id;
    console.log("here userID in roomsM router for booking: ",userId);

    try {
        // Récupérer la chambre de la maison d'hote depuis la base de données
        const room = await RoomM.findById(roomId);
        console.log("🚀 ~ router.post ~ room:", room)
        
        if (!room) {
            return res.status(404).json({ message: 'guestHouse room not found' });
        }

        // Vérifier si la chambre de maison d'hote est disponible pour la période de réservation
        const isAvailable = await room.isAvailable(startDate, endDate);
        console.log("🚀 ~ router.post ~ roomsM ~ isAvailable:", isAvailable)
        if (!isAvailable) {
            return res.status(400).json({ message: 'The guestHouse room is not available for this period' });
        }

        // Calculer le prix total de la réservation
        const totalPrice = room.calculateTotalPrice(startDate, endDate);
        console.log("🚀 ~ router.post ~ totalPrice:", totalPrice)

        // Vérifier si le prix total est null
        if (totalPrice == null) {
            // Afficher le message d'erreur à l'utilisateur
            return res.status(400).json({ message: 'Dates are not valid' });
        }

        // Mettre à jour l'état de la chambre pour la réserver
        room.status = 'réservée';
        await room.save();
        console.log("🚀 ~ router.post ~ room:", room)

         // Créer une nouvelle réservation avec l'ID de l'utilisateur
         const bookingM = new BookingM({
            room: roomId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId: userId // Ajouter l'ID de l'utilisateur à la réservation
        });
        console.log("🚀 ~ router.post ~ bookingM:", bookingM);

        // Sauvegarder la réservation dans la base de données
        await bookingM.save();

        // Répondre avec les détails de la réservation
        res.status(200).json({ message: 'guestHouse room booked successfully', totalPrice });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while booking the guestHouse room' });
    }
});

module.exports = router;
