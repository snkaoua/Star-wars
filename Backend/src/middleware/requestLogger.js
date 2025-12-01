/* Logs basic information about each incoming HTTP request. */  

// Backend/middleware/requestLogger.js
module.exports = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next(); // Proceed to the next middleware or route handler
};