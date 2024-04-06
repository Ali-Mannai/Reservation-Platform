const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: String,
    address: String,
    description: String,
    city: String,
    nbRooms: { type: Number, default: 0 }, // Initialiser à 0
    image: String,
    rooms: [{ type: Schema.Types.ObjectId, ref: 'RoomH' }],
    type: { type: String, default: "hotel" }
});

// Méthode personnalisée pour ajouter une chambre à l'hôtel
hotelSchema.methods.addRoom = function(roomId) {
    this.nbRooms++; // Incrémenter le nombre de chambres
    this.rooms.push(roomId); // Ajouter l'ID de la nouvelle chambre
    return this.save(); // Sauvegarder les modifications
};

// Ajouter la méthode findByIdAndUpdate
hotelSchema.statics.findByIdAndUpdate = async function(id, updates) {
    try {
        const hotel = await this.findOneAndUpdate({ _id: id }, updates, { new: true, runValidators: true });
        return hotel;
    } catch (error) {
        throw error;
    }
};

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
