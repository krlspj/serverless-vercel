const express = require('express') 
const router = express.Router() 

router.get('/', (req, res) => {
    Meals.find()
    .exec()
    .then(x => res.status(200).send(x)) 
    res.send('Get meals') 
}) 

router.post('/', (req, res) => {
    res.send('Post meals') 
}) 

module.exports = router 