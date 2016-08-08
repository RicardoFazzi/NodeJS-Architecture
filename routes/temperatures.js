var express = require('express');
var bodyParser = require('body-parser');
var TemperatureResume = require('../models/temperatureResume');
var Alert = require('../models/alert');
var Range = require('../models/range');

var temperatureRoute = express.Router();
temperatureRoute.use(bodyParser.json());

temperatureRoute.route('/')
    .post(function (req, res, next) {
        var temp = '{"id":' + req.body.id + ',"idSensor":"' + req.body.idSensor +
            '","tipoTerminal":"' + req.body.tipoTerminal + '","valor":"' + req.body.valor +
            '", "unidad":"' + req.body.unidad + '", "fechaUltMod":"' + req.body.fechaUltMod +
            '","tipoProducto":"' + req.body.tipoProducto + '"}';
        process.emit('temperature', temp);
        return res.status(200).json(temp);
    })
    .get(function (req, res, next) {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        var tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));

        TemperatureResume.find({lastUpdated: {$gte: date, $lte: tomorrow}}, function (err, resume) {
            if (err) throw err;
            return res.status(200).json({resume: resume});
        })

    });
temperatureRoute.route('/:sensorId')
    .get(function (req, res, next) {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        var tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));
        Alert.find({})
            .populate('range')
            .exec(function (err, alerts) {
                if (err) throw err;
                var temperatureAlert;
                if (alerts.length > 0) {
                    for (var i = 0; i < alerts.length; i++) {
                        if (alerts[i].range.name == 'Temperature') {
                            temperatureAlert = alerts[i];
                        }
                    }
                }
                TemperatureResume.find({lastUpdated: {$gte: date, $lte: tomorrow}, sensorId: req.params.sensorId}, function (err, resume) {
                    if (err) throw err;
                    var temperatureResume;
                    if (resume.length > 0) {
                        temperatureResume = resume[0];
                    }
                    switch (temperatureAlert.behavior) {
                        case "<<":
                            if(temperatureResume.lastValue < temperatureAlert.range.lowerLimit){
                                temperatureResume.color = "Rojo";
                            }else if(temperatureResume.lastValue < temperatureAlert.range.upperLimit){
                                temperatureResume.color = "Amarillo";
                            }else temperatureResume.color = "Verde";
                            break;
                        case ">>":
                            if(temperatureResume.lastValue > temperatureAlert.range.lowerLimit){
                                temperatureResume.color = "Amarillo";
                            }else if(temperatureResume.lastValue > temperatureAlert.range.upperLimit){
                                temperatureResume.color = "Rojo";
                            }else temperatureResume.color = "Verde";
                            break;
                    }
                    return res.status(200).json({resume: temperatureResume});
                })
            })

    });

module.exports = temperatureRoute;

