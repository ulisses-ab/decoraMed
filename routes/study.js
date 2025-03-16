const express = require('express');
const router = express.Router();
const { getCards, studyCard, getTimes } = require('../controllers/studyController');

router.get('/', getCards);
router.get('/:id', getCards);
router.get('/times/:id', getTimes);
router.get('/send/:id/:difficulty', studyCard )

module.exports = router;

