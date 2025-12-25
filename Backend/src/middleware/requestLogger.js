/* Logs basic information about each incoming HTTP request. */  

module.exports = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next(); 
};