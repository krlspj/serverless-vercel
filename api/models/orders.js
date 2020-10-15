const mongoose = require('mongoose') 
const Schema = mongoose.Schema 

const orders = mongoose.model('order', new Schema({
    meal_id: { type: Schema.Types.ObjectId, ref: 'meal' },
    user_id: String,
    oTime: String,
    user_name: String
})) 

module.exports = orders     