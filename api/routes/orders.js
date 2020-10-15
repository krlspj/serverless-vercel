const express = require('express') 
const router = express.Router() 
const { isAuthenticated, hasRoles } = require('../auth')

const Orders = require('../models/orders')

router.get('/', (req, res) => {
    Orders.find()
    .exec()
    .then(x => res.status(200).send(x)) 
    //console.log('router get orders')
    //res.send('Get Orders') 
}) 

router.get('/:id', (req,res) => {
    Orders.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
})
router.post('/', isAuthenticated, (req, res) => {
    //console.log('post Order')
    const { _id, email } = req.user
    Orders.create({ ...req.body, user_id: _id, user_name: email, oTime: getTime() }).then(x => res.status(201).send(x))
    //console.log({ _id })
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

const getTime = () => {
    const d = new Date()
    return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`
}

module.exports = router