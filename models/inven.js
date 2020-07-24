const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
/**
 * Creating a table in the database with required fields.
 * This table is then exported for the other modules in this applications to use.
 */
var inven = new Schema({
    name: { type: String, required: true},
    category: { type: String, required: false, enum: ["meats", "dairy", "vegetables", "fruits"] },
    quantity: { type: Number, required: true},
    quality: {type: Number, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Inven', inven);