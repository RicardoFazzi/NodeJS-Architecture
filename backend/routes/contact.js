var express = require('express');
var bodyParser = require('body-parser');
var nodeMail = require('../email/nodeMail');

var alertRouter = express.Router();
alertRouter.use(bodyParser.json());
alertRouter.route('/')
    .get(function (req, res, next) {
        console.log('entro al get')
    })
    .post(function (req, res, next) {
        nodeMail.send(req.body.address, req.body.message, req.body.phone, req.body.name)
    });

module.exports = alertRouter;