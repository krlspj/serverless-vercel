const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get meals');
});

router.post('/', (req, res) => {
    res.send('Post meals');
});

module.exports = router;