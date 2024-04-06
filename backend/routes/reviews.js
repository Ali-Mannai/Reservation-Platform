const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// // Route pour créer un nouvel avis
// router.post('/:hotelId/reviews', async (req, res) => {
//     const { hotelId } = req.params;
//     console.log(hotelId);

//     const { rating, comment } = req.body;
//     // const userId = req.session.user.id; // Obtenez l'ID de l'utilisateur à partir de la session
//     const userId = req.session.user._id;
//     console.log(userId)

// console.log(userId);
//     try {
//         // Créer un nouvel avis dans la base de données
//         const review = new Review({
//             user: userId,
//             hotel: hotelId,
//             rating,
//             comment
//         });

//         // Enregistrer l'avis dans la base de données
//         await review.save();

//         res.status(201).json({ message: 'Avis créé avec succès', review });
//     } catch (error) {
//         res.status(400).json({ message: 'Erreur lors de la création de l\'avis', error });
//     }
// });

// Fonction pour calculer la note moyenne de l'hôtel
async function calculateAverageRating(hotelId) {
    try {
        // Récupérer tous les avis associés à cet hôtel
        const reviews = await Review.find({ hotel: hotelId });

        // Vérifier s'il y a des avis pour cet hôtel
        if (reviews.length === 0) {
            return null; // Ou renvoyez une valeur par défaut
        }

        // Calculer la moyenne des notes
        const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        return totalRating / reviews.length;
    } catch (error) {
        console.error('Erreur lors du calcul de la note moyenne :', error);
        throw error;
    }
}

// Route pour ajouter un nouvel avis
router.post('/:hotelId/reviews', async (req, res) => {
    const { hotelId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.session.user._id;

    try {
        // Créer un nouvel avis dans la base de données
        const review = new Review({
            user: userId, // Associer l'avis à l'utilisateur actuellement connecté
            hotel: hotelId,
            rating,
            comment
        });

        // Enregistrer l'avis dans la base de données
        await review.save();

        // Calculer la note moyenne de l'hôtel après l'ajout de l'avis
        const averageRating = await calculateAverageRating(hotelId);

        // Répondre avec les détails de l'avis et la nouvelle note moyenne
        res.status(201).json({ message: 'Avis créé avec succès', review, averageRating });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l\'avis', error });
    }
});


module.exports = router;
