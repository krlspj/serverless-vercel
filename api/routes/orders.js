const express = require('express') 
const router = express.Router() 
const { isAuthenticated, hasRoles } = require('../auth')

const Orders = require('../models/orders')

router.get('/', (req, res) => {
    Orders.find()
    .exec()
    .then(x => res.status(200).send(x)) 
    //res.send('Get Orders') 
}) 

router.get('/:id', (req,res) => {
    Orders.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
})

router.post('/', isAuthenticated, (req, res) => {
    const { _id } = req.user
    Orders.create({ ...req.body, user_id: _id }).then(x => res.status(201).send(x))
    console.log({ _id })
}) 

router.put('/:id', isAuthenticated, hasRoles(['admin', 'user']), (req,res) =>{
    Orders.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})
router.delete('/:id', isAuthenticated, (req,res) => {
    Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(() => {
        res.sendStatus(204)
    })
})

module.exports = router