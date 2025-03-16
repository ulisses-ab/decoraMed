const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentDeckId: { type: mongoose.Schema.ObjectId, ref: 'Deck' },
    subDecks: [{ type: mongoose.Schema.ObjectId, ref: 'Deck' }],
    cards: [{ type: mongoose.Schema.ObjectId, ref: 'Card' }],
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;