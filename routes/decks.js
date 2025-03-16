const express = require('express');
const router = express.Router();
const { createDeck, getDeck, updateDeck, deleteDeck, getChildren } = require('../controllers/deckController');

router.post('/', createDeck);
router.get('/:id', getDeck);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);
router.get('/children/:id', getChildren);

module.exports = router;

