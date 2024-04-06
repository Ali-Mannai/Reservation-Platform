const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ID de l'utilisateur qui a donné l'avis
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true }, // ID de l'hôtel concerné
    rating: { type: Number, required: true }, // Note attribuée 
    comment: String, // Commentaire 
    createdAt: { type: Date, default: Date.now } // Date de création de l'avis
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
