var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

this.send =  function (from, message, phone, name) {

    var to = 'mail@gmail.com';
    // create reusable transporter object using the default SMTP transport

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL,
                      // you can try with TLS, but port is then 587
        auth: {
            user: 'mail@gmail.com', // Your email id
            pass: 'password' // Your password
        }
    };

    var transporter = nodemailer.createTransport(smtpConfig);

    //var transporter = nodemailer.createTransport('smtps://cinveica.indumentaria%40gmail.com:leo66720@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: from,
        to: to,
        subject: 'Consulta - '+name,
        html: message + '<br>' + 'Puede responder el mensaje haciendo click en el siguiente link: ' + from
    };
console.log(mailOptions);
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: '+info);
    });

}