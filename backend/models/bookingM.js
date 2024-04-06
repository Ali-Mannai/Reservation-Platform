const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'RoomM', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } 
});

const BookingM = mongoose.model('BookingM', bookingSchema);

module.exports = BookingM;
