const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    role: String,
    ownedHotels: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }], // Champ pour stocker les IDs des hôtels associés
    ownedGuestHouses: [{ type: Schema.Types.ObjectId, ref: 'GuestHouse' }] // Champ pour stocker les IDs des maisons d'hotes associés

});

// Méthode personnalisée pour mettre à jour les hôtels associés à un administrateur
adminSchema.statics.updateOwnedHotels = async function(adminId, hotelId) {
    try {
        const admin = await this.findByIdAndUpdate(adminId, { $push: { ownedHotels: hotelId } }, { new: true });
        return admin;
    } catch (error) {
        throw error;
    }
};


// Méthode personnalisée pour mettre à jour les hôtels associés à un administrateur
adminSchema.statics.updateOwnedGuestHouses = async function(adminId, guestHouseId) {
    try {
        const admin = await this.findByIdAndUpdate(adminId, { $push: { ownedGuestHouses: guestHouseId } }, { new: true });
        return admin;
    } catch (error) {
        throw error;
    }
};


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
