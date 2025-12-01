const express = require('express');
const router = express.Router();

const { listHistory, removeHistoryItem } = require('../controllers/history');

router.get('/', listHistory);

router.delete('/:id', removeHistoryItem);

module.exports = router;
