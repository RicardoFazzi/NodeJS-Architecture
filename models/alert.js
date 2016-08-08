var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Alert = new Schema({
    range: {
        type: Schema.Types.ObjectId,
        ref: 'Range'
    },
    name: String,
    frequency: Number,
    sendSMS: {
        type: Boolean,
        default: false
    },
    sendEmail: {
        type: Boolean,
        default: false
    },
    sendPushNotification: {
        type: Boolean,
        default: false
    },
    showInHome: {
        type: Boolean,
        default: true
    },
    enable: {
        type: Boolean,
        default: false
    },
    behavior: {
        type: String,
        default: '>>'
    }
});

module.exports = mongoose.model('Alert', Alert);
