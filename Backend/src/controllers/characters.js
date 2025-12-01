const { searchCharacters } = require('../services/swapi');

const { addHistoryItem } = require('../data/searchHistory');

async function getCharacters(req, res, next) {
  try {
    const term = req.query.search;

    if (!term || term.trim() === '') {
      const error = new Error('Query parameter "search" is required');
      error.status = 400;
      throw error;
    }

    const result = await searchCharacters(term);

    addHistoryItem(term, result.count);

    res.json(result);
  } catch (err) {

    if (err.response) {
      err.status = 502;
      err.message = 'Failed to fetch data from SWAPI';
    }

    next(err);
  }
}

module.exports = {
  getCharacters,
};
