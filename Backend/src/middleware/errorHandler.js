/* Catches errors and sends a consistent JSON error response. */    

// Backend/middleware/errorHandler.js
// Error handling middleware
module.exports = (err, req, res, next) => {
    console.error('Error:', err);

    const status = err.status || 500;

    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
};