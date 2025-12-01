/* Defines the /health endpoint and returns a simple health-check response. */  

// Import necessary modules
const express = require('express');
const router = express.Router();

// Define the /health endpoint
router.get('/', (req, res) => {
    res.json({ ok: true });
});

// Export the router
module.exports = router;