// Creates and configures the Express application (middleware, JSON parsing, routes) and exports it.
// src/app.js

const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const healthRoutes = require('./routes/health');
const charactersRoutes = require('./routes/characters');
const historyRoutes = require('./routes/history');

const app = express();

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use('/health', healthRoutes);

app.use('/api/characters', charactersRoutes);

app.use('/api/search-history', historyRoutes);

app.use(errorHandler);

module.exports = app;
