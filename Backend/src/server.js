// Imports the app and starts the HTTP server on the chosen port.

// Backend/src/server.js
const app = require('./app');

// Use the PORT environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 