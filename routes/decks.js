const express = require('express');
const router = express.Router();
const { createDeck, getDeck, getUserDecks, updateDeck, deleteDeck, getChildren } = require('../controllers/deckController');

router.post('/', createDeck);
router.get('/:id', getDeck);
router.get('/', getUserDecks);
router.get('/children/:id', getChildren);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);

module.exports = router;

