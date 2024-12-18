const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
