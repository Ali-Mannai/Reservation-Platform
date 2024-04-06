const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestHouseSchema = new Schema({
    name: String,
    address: String,
    description: String,
    city: String,
    nbRooms: { type: Number, default: 0 }, // Initialiser à 0
    image: String,
    rooms: [{ type: Schema.Types.ObjectId, ref: 'RoomM' }],
    type: { type: String, default: "guestHouse" }
});

// Méthode personnalisée pour ajouter une chambre à l'hôtel
guestHouseSchema.methods.addRoom = function(roomId) {
    this.nbRooms++; // Incrémenter le nombre de chambres
    this.rooms.push(roomId); // Ajouter l'ID de la nouvelle chambre
    return this.save(); // Sauvegarder les modifications
};

// Ajouter la méthode findByIdAndUpdate
guestHouseSchema.statics.findByIdAndUpdate = async function(id, updates) {
    try {
        const guestHouse = await this.findOneAndUpdate({ _id: id }, updates, { new: true, runValidators: true });
        return guestHouse;
    } catch (error) {
        throw error;
    }
};

const GuestHouse = mongoose.model('GuestHouse', guestHouseSchema);

module.exports = GuestHouse;
