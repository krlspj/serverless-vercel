const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('/home/krls/Documents/Repos/serverless-vercel/classInJs/index.html');
});

router.post('/', (req, res) => {
    res.send('Post orders');
});

module.exports = router