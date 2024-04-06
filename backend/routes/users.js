const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const RoomH = require('../models/roomH');
const RoomM = require('../models/roomM');
const BookingH = require('../models/bookingH');
const BookingM = require('../models/bookingM');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const GuestHouse = require('../models/guestHouse');
const Hotel = require('../models/hotel');


router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, pwd, role } = req.body;
        
        // Utiliser bcrypt pour hasher le mot de passe
        const hashedPassword = await bcrypt.hash(pwd, 10); // 10 est le coût du hash, plus il est élevé, plus le hash est sécurisé

        let newUser;
        
        if (role === 'admin') {
            // Créer un nouvel administrateur
            newUser = new Admin({ firstName, lastName, email, pwd: hashedPassword, role });
        } else {
            // Créer un nouvel utilisateur
            newUser = new User({ firstName, lastName, email, pwd: hashedPassword, role });
        }
        console.log(newUser);

        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, pwd } = req.body;
        console.log("*****************************************************************************");

        console.log(email, pwd);

        // Recherche dans le modèle User
        let user = await User.findOne({ email });
        let role = 'user'; // Par défaut, le rôle est défini sur 'user'
        console.log("here user in User: ",user);


        // Si aucun utilisateur n'est trouvé dans le modèle User, recherche dans le modèle Admin
        if (!user) {
            user = await Admin.findOne({ email });
            role = 'admin';
            console.log("here user in Admin: ",user);
        }

        if (!user) {
            return res.status(404).send({ error: 'Identifiants incorrects' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(pwd, user.pwd);
        console.log("Password is Valid: ",isPasswordValid);
        if (!isPasswordValid) {
            // Ne pas spécifier si le problème est le nom d'utilisateur ou le mot de passe
            return res.status(404).send({ error: 'Identifiants incorrects' });
        }

        // Générer un jeton d'authentification
        const token = jwt.sign({ id: user._id, email: user.email, role }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });

        // Envoyer le jeton dans les en-têtes de réponse
        res.header('Authorization', `Bearer ${token}`);

        // Envoyer la réponse avec les données de l'utilisateur et le jeton d'authentification
        res.status(200).send({ user, token });

        console.log(user, token);

    } catch (error) {
        res.status(500).send(error);
    }
});


// Route pour déconnecter l'utilisateur
router.post('/logout', (req, res) => {
    // Vérifier si l'utilisateur est authentifié
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Vous n\'êtes pas authentifié' });
    }

    // Récupérer le jeton d'authentification de l'en-tête Authorization
    const authToken = req.headers.authorization.split(' ')[1];

    // Logique de déconnexion : invalider le jeton d'authentification
    invalidateAuthToken(authToken, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }
        // Retourner une réponse de déconnexion réussie
        res.json({ message: 'Déconnexion réussie' });
    });
});

// Fonction pour invalider le jeton d'authentification (exemple fictif)
function invalidateAuthToken(authToken, callback) {
    
    // Exemple fictif : supprimer le jeton de la base de données ou marquer comme invalide
    // Dans cet exemple fictif, nous supposons simplement que la suppression du jeton est réussie
    // Vous devez remplacer cette logique par celle qui correspond à votre système d'authentification
    // Par exemple, si vous utilisez une base de données, vous devriez faire une requête pour supprimer le jeton
    // Ici, nous simulons une suppression réussie après un délai de 1 seconde (pour montrer l'asynchronisme)
    setTimeout(() => {
        // Suppression réussie (simulation)
        callback(null);
    }, 100);
}


// Route pour obtenir tous les hôtels et maisons d'hôtes associés à un admin spécifique
// router.get('/admin/:adminId/inns', async (req, res) => {
//     try {
//         // Récupérer l'admin par son ID
//         const admin = await Admin.findById(req.params.adminId).populate('ownedHotels ownedGuestHouses');
//         if (!admin) {
//             return res.status(404).send("Admin not found");
//         }
        
//         // Récupérer tous les hôtels et les maisons d'hôtes associés à cet admin
//         const hotels = admin.ownedHotels;
//         const guestHouses = admin.ownedGuestHouses;

//         res.send({ hotels, guestHouses });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// Route pour obtenir tous les hôtels et maisons d'hôtes associés à un admin spécifique
router.get('/admin/:adminId/inns', async (req, res) => {
    try {
        console.log("******************************** get hotels and guestHouses router ************************************");
        // Récupérer l'admin par son ID
        const admin = await Admin.findById(req.params.adminId).populate('ownedHotels ownedGuestHouses');
        console.log("here admin: ",admin);

        if (!admin) {
            return res.status(404).send("Admin not found");
        }
        
        // Récupérer tous les hôtels et les maisons d'hôtes associés à cet admin
        const hotels = await Hotel.find({ _id: { $in: admin.ownedHotels }});
        const guestHouses = await GuestHouse.find({ _id: { $in: admin.ownedGuestHouses }});
        console.log(hotels, guestHouses,"envoyés avec succès");

        res.send({ hotels, guestHouses });
        console.log(hotels, guestHouses,"envoyés avec succès");
    } catch (error) {
        res.status(500).send(error);
    }
});





// // Route pour la réservation d'une chambre d'hôtel
// router.post('/roomsH/:roomId/reservation', async (req, res) => {
//     const { startDate, endDate } = req.body;
//     const roomId = req.params.roomId;
//     // const userId = req.session.user._id; // Obtenir l'ID de l'utilisateur depuis la session
    
//     // console.log("Here user ID ", userId);
//     const userId = req.user.id;
//     console.log("here userID in users router for booking: ",userId);

//     try {
//         // Récupérer la chambre d'hôtel depuis la base de données
//         const room = await RoomH.findById(roomId);
//         if (!room) {
//             return res.status(404).json({ message: 'Hotel room not found' });
//         }

//         // Vérifier si la chambre d'hôtel est disponible pour la période de réservation
//         const isAvailable = await room.isAvailable(startDate, endDate);
//         if (!isAvailable) {
//             return res.status(400).json({ message: 'The hotel room is not available for this period' });
//         }

//         // Calculer le prix total de la réservation
//         const totalPrice = room.calculateTotalPrice(startDate, endDate);

//         // Vérifier si le prix total est null
//         if (totalPrice == null) {
//             // Afficher le message d'erreur à l'utilisateur
//             return res.status(400).json({ error: 'Dates are not valid' });
//         }

//         // Mettre à jour l'état de la chambre pour la réserver
//         room.status = 'réservée';
//         await room.save();

//          // Créer une nouvelle réservation avec l'ID de l'utilisateur
//          const bookingH = new BookingH({
//             room: room._id,
//             startDate: new Date(startDate),
//             endDate: new Date(endDate),
//             userId: userId // Ajouter l'ID de l'utilisateur à la réservation
//         });

//         // Sauvegarder la réservation dans la base de données
//         await bookingH.save();

//         // Répondre avec les détails de la réservation
//         res.status(200).json({ message: 'Hotel room booked successfully', totalPrice });
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred while booking the hotel room' });
//     }
// });


// Route pour la réservation d'une chambre de maison d'hôtes
router.post('/roomsM/:roomId/reservation', async (req, res) => {
    const { startDate, endDate } = req.body;
    const roomId = req.params.roomId;
    // const userId = req.session.user._id; // Obtenir l'ID de l'utilisateur depuis la session
    const userId = req.user.id;
    console.log("here userID in users router for booking: ",userId);
    
    try {
        // Récupérer la chambre de maison d'hôtes depuis la base de données
        const room = await RoomM.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Guest house room not found' });
        }

        // Vérifier si la chambre de maison d'hôtes est disponible pour la période de réservation
        const isAvailable = await room.isAvailable(startDate, endDate);
        if (!isAvailable) {
            return res.status(400).json({ message: 'The guest house room is not available for this period' });
        }

        // Calculer le prix total de la réservation
        const totalPrice = room.calculateTotalPrice(startDate, endDate);

        // Mettre à jour l'état de la chambre pour la réserver
        room.status = 'réservée';
        await room.save();

         // Créer une nouvelle réservation avec l'ID de l'utilisateur
         const bookingM = new BookingM({
            room: room._id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userId: userId // Ajouter l'ID de l'utilisateur à la réservation
        });

        // Sauvegarder la réservation dans la base de données
        await bookingM.save();

        // Répondre avec les détails de la réservation
        // res.status(200).json({ message: 'Guest house room successfully booked', totalPrice });

        if (totalPrice == null) {
            // Afficher le message d'erreur à l'utilisateur
            res.status(400).json({ error: 'Dates are not valid' });

        } else {
            // Utiliser le prix calculé normalement
            res.status(200).json({ message: 'Guest house room successfully booked', totalPrice });

        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while booking the guest house room' });
    }
});

module.exports = router;
