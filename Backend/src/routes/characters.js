// Characters routes: defines the GET / endpoint and connects it to the getCharacters controller function.

const express = require('express');
const router = express.Router();
const { getCharacters } = require('../controllers/characters');

router.get('/', getCharacters);

module.exports = router;