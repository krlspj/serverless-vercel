"use strict" 
const express = require('express') 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser') 
const cors = require('cors') 

const meals = require('./routes/meals') 
const orders = require('./routes/orders') 
const auth = require('./routes/auth') 

const app = express() 
app.use(bodyParser.json()) 
app.use(cors()) 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 

app.use('/api/meals', meals) 
app.use('/api/orders', orders) 
app.use('/api/auth', auth) 

module.exports = app 


/* start test
const playTest = require('./routes/play') 
app.use('/api/play', playTest) 
app.use('/api/js', express.static('/home/krls/Documents/Repos/serverless-vercel/classInJs/js')) 
//app.use('/api/js', express.static(path.join(__dirname, '../classInJs/js'))) 
app.get('/help', (req, res) => {
    res.send('hello') 
}) 
console.log('dirName -> ' + __dirname) 
// end test
*/
