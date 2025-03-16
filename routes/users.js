const express = require('express');
const router = express.Router();
const { getUser, deleteUser, login, register } = require('./../controllers/usersController');

router.get('/', getUser);
router.delete('/', deleteUser);

module.exports = router;