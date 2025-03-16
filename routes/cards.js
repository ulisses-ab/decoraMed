const express = require('express');
const router = express.Router();
const { createCard, getCard, updateCard, deleteCard } = require('./../controllers/cardController');

router.post('/', createCard);
router.get('/:id', getCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;