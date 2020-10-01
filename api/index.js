"use strict" 
const express = require('express') 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser') 
const cors = require('cors') 

const meals = require('./routes/meals') 
const orders = require('./routes/orders') 
const playTest = require('./routes/play') 

const app = express() 
app.use(bodyParser.json()) 
app.use(cors()) 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 

app.use('/api/meals', meals) 
app.use('/api/orders', orders) 
app.use('/api/play', playTest) 

app.use('/api/js', express.static('/home/krls/Documents/Repos/serverless-vercel/classInJs/js')) 
//app.use('/api/js', express.static(path.join(__dirname, '../classInJs/js'))) 
app.get('*/help', (req, res) => {
    res.send('hello') 
}) 
console.log('dirName -> ' + __dirname) 

module.exports = app 

