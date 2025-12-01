/* Defines the /api/characters route and maps it to the characters controller. */   

const express = require('express');
const router = express.Router();
const { getCharacters } = require('../controllers/characters');

// GET /api/characters - Retrieve a list of characters
router.get('/', getCharacters);

// Export the router to be used in the main app
module.exports = router;