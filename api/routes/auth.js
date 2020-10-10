const express = require('express') 
const router = express.Router() 
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../auth')

const Users = require('../models/Users')

router.get('/register', (req, res) => {
    res.send('Registro')
})

const signToken = (_id) => {
    return jwt.sign({_id}, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365
    })
}

router.post('/register', (req, res) => {
    const {email, password } = req.body
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            Users.findOne({email})
            .exec()
            .then(user => {
                if(user){
                    return res.send('user already exists')
                }
                Users.create({
                    email,
                    password: encryptedPassword,
                    salt: newSalt
                }).then(() => {
                    res.send('User successfully created')
                })
            })
        })
    })

}) 

router.post('/login', (req,res) =>{
    const {email, password } = req.body
    Users.findOne({ email }).exec()
    .then(user =>{
        if(!user){
            return res.send('Wrong user or password')
        }
        crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            if(user.password === encryptedPassword){
                const token = signToken(uesr._id)
                return res.send({token})
            }
            return res.send('wrong user or password')
        })
    })
})

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.use)
})

module.exports = router 