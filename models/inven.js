const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var inven = new Schema({
    name: { type: String, required: true},
    category: { type: String, required: false, enum: ["meats", "dairy", "vegetables", "fruits"] },
    quantity: { type: Number, required: true},
    quality: {type: Number, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Inven', inven);