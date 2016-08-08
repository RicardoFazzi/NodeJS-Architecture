var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Range = new Schema({
    name: String,
    nombre: String,
    lowerLimit: Number,
    upperLimit: Number
});

module.exports = mongoose.model('Range', Range);
