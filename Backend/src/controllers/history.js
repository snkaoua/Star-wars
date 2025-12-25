/* Handles requests to get and delete search history and returns JSON to the client. */

const {
    getHistory, 
    deleteHistoryItem, 
} = require('../data/searchHistory');

function listHistory(req, res) {
    const history = getHistory();
    res.json(history);
}

function removeHistoryItem(req, res) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            const error = new Error('Invalid ID');
            error.status = 400;
            throw error;
        }

        const deleted = deleteHistoryItem(id);

        if (!deleted) {
            const error = new Error('History item not found');
            error.status = 404;
            throw error;
        }   

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listHistory,
    removeHistoryItem,
};
