var express = require('express');
var bodyParser = require('body-parser');

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
    });
/*.get(function (req, res, next) {
 var date = new Date();
 date.setHours(0, 0, 0, 0);
 var tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));

 TemperatureResume.find({lastUpdated: {$gte: date, $lte: tomorrow}}, function (err, resume) {
 if (err) throw err;
 return res.status(200).json({resume: resume});
 })

 })*/

/*Reload.find({}, function (err, reload) {
 if (err) throw err;
 var reload = reload[0];
 if (reload) {
 reload.count++;
 reload.accumulated += req.body.recharge;
 if (req.body.recharge > reload.maximum) {
 reload.maximum = req.body.recharge;
 }
 if (req.body.recharge < reload.minimum) {
 reload.minimum = req.body.recharge;
 }
 reload.date = new Date();

 reload.save(function (err, reload) {
 if (err) {
 return res.status(500).json(err);
 }
 console.log('Reload updated!!');
 return res.status(200).json(reload);
 });
 } else {
 var reload = new Reload({
 count: 5,
 accumulated: 150,
 date: new Date(),
 maximum: 50,
 minimum: 10
 });

 reload.save(function (err, reload) {
 if (err) {
 return res.status(500).json(err);
 }
 console.log('Reload created!');
 return res.status(200).json(reload);
 });
 }
 });*/


module.exports = temperatureRoute;

