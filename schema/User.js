const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    rootDeckId: { type: mongoose.Schema.ObjectId, ref: 'Deck'},
});

const User = mongoose.model('User', userSchema);

module.exports = User;