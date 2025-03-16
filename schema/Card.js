const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    type: { type: String,  required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
    path: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required: true }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;