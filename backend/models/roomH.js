const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = require('./bookingH');

const roomSchema = new Schema({
    name: String,
    capacity: Number,
    description: String,
    price: Number,
    image: String,
    status: { type: String, enum: ['disponible', 'réservée', 'occupée'], default: 'disponible' },
    
});

// Méthode pour vérifier si la chambre est disponible pour une période donnée
roomSchema.methods.isAvailable = async function(startDate, endDate) {
    const bookings = await Booking.find({ room: this._id, startDate: { $lte: endDate }, endDate: { $gte: startDate } });
    return bookings.length === 0;
};

roomSchema.methods.calculateTotalPrice = function(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // console.log('startDate:', startDate, typeof startDate);
    // console.log('endDate:', endDate, typeof endDate);

    // Vérifiez si les dates sont valides
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Dates are not valid');
        return null; 
    }

    // Vérifier si les dates sont supérieures à la date actuelle
    const currentDate = new Date();
    if (startDate < currentDate || endDate < currentDate) {
        console.error('Dates cannot be in the past');
        return null;
    }

    // Calculer le nombre de jours de la réservation
    const oneDay = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans un jour
    const durationInDays = Math.ceil(Math.abs((endDate - startDate) / oneDay));
    // console.log('durationInDays:', durationInDays, typeof durationInDays);

    // Calculer le prix total en multipliant le prix par jour par le nombre de jours de la réservation
    return this.price * durationInDays;
};

// Définition de la méthode findByIdAndUpdate dans le modèle de données
roomSchema.statics.findByIdAndUpdate = async function (id, updates, options) {
    console.log("here updates: ",updates);
    console.log("here options: ", options);

    const room = await this.findOneAndUpdate({ _id: id }, updates, options);
    return room;
};

const RoomH = mongoose.model('RoomH', roomSchema);

module.exports = RoomH;
