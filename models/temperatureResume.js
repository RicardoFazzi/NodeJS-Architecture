var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemperatureResume = new Schema({
    messageCount: Number,
    acum: Number,
    prom: Number,
    lastUpdated: {
        type: Date
    },
    lastModDate: {
        type: Date
    },
    sensorId:String,
    max: Number,
    min: Number,
    productType: String,
    lastValue: Number,
    color: String
}, { collection: 'temperatureResume' });

module.exports = mongoose.model('temperatureResume', TemperatureResume);

