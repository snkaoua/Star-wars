// Import the searchCharacters function from the SWAPI service module.
// This function is responsible for actually calling the external SWAPI API
// (or a wrapper around it) and returning the search results.
const { searchCharacters } = require('../services/swapi');

// Import the addHistoryItem function from the data/searchHistory module.
// This will be used to record each successful search in your own history storage.
const { addHistoryItem } = require('../data/searchHistory');

/**
 * Express route handler for:
 *   GET /api/characters?search=<term>
 *
 * Responsibilities:
 *  - Validate that the "search" query parameter exists and is not empty.
 *  - Call searchCharacters(term) to get data from SWAPI.
 *  - Add a history record with the search term and result count.
 *  - Send the JSON response back to the client.
 *  - Properly handle and forward errors to Express error middleware.
 */
async function getCharacters(req, res, next) {
  try {
    // Extract the "search" query parameter from the URL.
    // Example: /api/characters?search=luke  → term = "luke"
    const term = req.query.search;

    // Validate that the search term exists and is not just whitespace.
    // If it's missing or blank, we create an error with HTTP 400 (Bad Request).
    if (!term || term.trim() === '') {
      const error = new Error('Query parameter "search" is required');
      error.status = 400; // Custom status property used later by error middleware.
      throw error;        // Throw the error to be caught by the catch block below.
    }

    // Call the SWAPI service to search for characters by this term.
    // This is an async call, so we await the result.
    // Expected result shape (for example):
    // {
    //   search: 'luke',
    //   count: 1,
    //   results: [ ...array of character objects... ]
    // }
    const result = await searchCharacters(term);

    // After getting the result, we record this search in the local history.
    // We store:
    //  - the original search term
    //  - the count of results returned
    // This will later be used by /api/search-history for the frontend.
    addHistoryItem(term, result.count);

    // Send the result back to the client as JSON.
    // Express will automatically set Content-Type: application/json.
    res.json(result);
  } catch (err) {
    // If an error occurs, we check if it's an error coming from an HTTP client
    // like axios (err.response usually exists in that case).
    // This indicates a failure when contacting the external SWAPI service.
    if (err.response) {
      // Set a 502 Bad Gateway status code to indicate the problem is upstream.
      err.status = 502;
      // Overwrite the error message with a generic one
      // so we don't leak internal details to the client.
      err.message = 'Failed to fetch data from SWAPI';
    }

    // Pass the error to the next Express error-handling middleware.
    // That middleware will look at err.status (if defined) and respond accordingly.
    next(err);
  }
}

// Export the controller function so it can be used in your routes file.
// Example usage in routes:
//   const { getCharacters } = require('./controllers/characters');
//   router.get('/characters', getCharacters);
module.exports = {
  getCharacters,
};
