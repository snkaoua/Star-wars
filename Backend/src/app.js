// Creates and configures the Express application (middleware, JSON parsing, routes) and exports it.
// src/app.js

// Import Express to create the app and define middleware/routes.
const express = require('express');

// Import CORS middleware so the frontend (running on a different origin/port)
// can call this API without being blocked by the browser.
const cors = require('cors');

// Custom middleware that logs incoming requests
// (method, path, maybe time, etc. – depending on implementation).
const requestLogger = require('./middleware/requestLogger');

// Custom error-handling middleware that catches errors from routes/controllers
// and sends a proper HTTP response (status + JSON message).
const errorHandler = require('./middleware/errorHandler');

// Route modules for different parts of the API.
// Each of these exports an Express Router with its own endpoints.
const healthRoutes = require('./routes/health');         // e.g. GET /health
const charactersRoutes = require('./routes/characters'); // e.g. GET /api/characters
const historyRoutes = require('./routes/history');       // e.g. GET/DELETE /api/search-history

// Create the main Express application instance.
const app = express();

/**
 * Global middleware configuration
 */

// Built-in middleware to parse incoming JSON request bodies.
// This enables req.body to contain parsed JSON for POST/PUT/PATCH requests.
app.use(express.json());

// Enable CORS for all routes by default.
// This is important when your frontend runs on http://localhost:5173 (Vite) or similar,
// and your backend runs on http://localhost:3000 – they are different origins.
app.use(cors());

// Custom request logging middleware.
// This runs for every request and can log method, URL, response time, etc.
// Useful for debugging and understanding API usage.
app.use(requestLogger);

/**
 * Route mounting
 */

// Health-check routes.
// Mounted at /health, so if healthRoutes defines GET '/', the final endpoint is:
//   GET /health
// Typically used for uptime checks or "is the server alive?".
app.use('/health', healthRoutes);

// Character-related routes.
// Mounted at /api/characters, so if charactersRoutes defines GET '/',
// the final endpoint is:
//   GET /api/characters?search=...
// This is used by the frontend search (searchCharacters in api.ts).
app.use('/api/characters', charactersRoutes);

// Search-history routes.
// Mounted at /api/search-history, so the endpoints look like:
//   GET    /api/search-history      → list all history items
//   DELETE /api/search-history/:id  → delete a specific history item
// These match the frontend helpers getSearchHistory and deleteHistoryItem.
app.use('/api/search-history', historyRoutes);

/**
 * Error handling
 */

// Error-handling middleware MUST be added after all routes and other middleware.
// Any error thrown or passed to next(err) in controllers/routers will end up here.
// errorHandler will read err.status (if set) and err.message, and send an
// appropriate JSON response to the client.
app.use(errorHandler);

// Export the configured Express app (without calling app.listen here).
// This pattern is useful because:
// - app.js only defines and configures the app.
// - A separate file (e.g. server.js) can import this app and call app.listen(port).
module.exports = app;
