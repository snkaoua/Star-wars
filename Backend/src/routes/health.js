// Health route: simple endpoint (GET /) that returns { ok: true } to confirm the server is up.

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

module.exports = router;