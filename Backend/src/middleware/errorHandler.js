/* Catches errors and sends a consistent JSON error response. */    

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