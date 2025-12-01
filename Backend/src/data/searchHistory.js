/* Stores the in-memory search history array and manages IDs for history items. */  

// Each history item includes an id, term, count, and createdAt timestamp.
const searchHistory = [];
let nextId = 1;

// Adds a new search history item
function addHistoryItem(term, count) {
    const item = {
        id: nextId++,
        term,
        count,
        createdAt: new Date().toISOString()
    };

// Store the new item in the in-memory array
searchHistory.push(item);
    return item;
}

// Retrieves all search history items
function getHistory() {
    return searchHistory;
}

// Deletes a search history item by id
function deleteHistoryItem(id) {
    const index = searchHistory.findIndex(item => item.id === id);
    if (index !== -1) {
        searchHistory.splice(index, 1);
        return true;
    }
    return false;
}

// Export the functions for use in other modules
module.exports = {
    addHistoryItem,
    getHistory,
    deleteHistoryItem
};