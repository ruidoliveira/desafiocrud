const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    nome: {type: String, required: true, unique: true, lowercase: true},
    estado: { type: String, required: true, select: false},
    created: { type: Date, default: Date.now}
})

module.exports = mongoose.model('City', CitySchema);


