// Import Express so we can create a router.
const express = require('express');

// Create a new router instance.
// This router will handle routes related to "search history".
const router = express.Router();

// Import the controller functions that implement the logic
// for listing history items and deleting a specific history item.
const { listHistory, removeHistoryItem } = require('../controllers/history');

// Define a route for GET /
// If this router is mounted at /api/search-history,
// then this endpoint is: GET /api/search-history
//
// listHistory is the controller function that:
//  - fetches all history items from storage (e.g. a file, DB, or in-memory list)
//  - sends them back as JSON.
router.get('/', listHistory);

// Define a route for DELETE /:id
// If mounted at /api/search-history, this becomes:
//   DELETE /api/search-history/:id
//
// :id is a route parameter, so inside removeHistoryItem you can access it as:
//   req.params.id
//
// removeHistoryItem is responsible for:
//  - finding the history entry with this id
//  - deleting it from storage
//  - returning an appropriate response (e.g. 204 No Content or 200 with a message)
router.delete('/:id', removeHistoryItem);

// Export the router so it can be mounted in your main server file.
// Example usage in server.js / app.js:
//
//   const historyRoutes = require('./routes/history');
//   app.use('/api/search-history', historyRoutes);
//
module.exports = router;
