/* Handles requests to get and delete search history and returns JSON to the client. */

// Imports
const {
    getHistory, 
    deleteHistoryItem, 
} = require('../data/searchHistory');

// Controller Functions
// List all history items
function listHistory(req, res) {
    const history = getHistory();
    res.json(history);
}

// Remove a specific history item by ID
function removeHistoryItem(req, res) {
    // Validate and parse ID parameter
    try {
        const id = Number(req.params.id);

        // Check if ID is a valid number
        if (Number.isNaN(id)) {
            const error = new Error('Invalid ID');
            error.status = 400;
            throw error;
        }

        // Attempt to delete the history item
        const deleted = deleteHistoryItem(id);

        if (!deleted) {
            const error = new Error('History item not found');
            error.status = 404;
            throw error;
        }   

        // Respond with no content status
        res.status(204).end();
    // Catch and forward errors
    } catch (error) {
        next(error);
    }
}

// Export controller functions
module.exports = {
    listHistory,
    removeHistoryItem,
};
