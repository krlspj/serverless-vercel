const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get Orders');
});

router.post('/', (req, res) => {
    res.send('Post orders');
});

module.exports = router;