/* Stores the in-memory search history array and manages IDs for history items. */  

const searchHistory = [];
let nextId = 1;

function addHistoryItem(term, count) {
    const item = {
        id: nextId++,
        term,
        count,
        createdAt: new Date().toISOString()
    };

searchHistory.push(item);
    return item;
}

function getHistory() {
    return searchHistory;
}

function deleteHistoryItem(id) {
    const index = searchHistory.findIndex(item => item.id === id);
    if (index !== -1) {
        searchHistory.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    addHistoryItem,
    getHistory,
    deleteHistoryItem
};