const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'RoomH', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
});

const BookingH = mongoose.model('BookingH', bookingSchema);

module.exports = BookingH;
