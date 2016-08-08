var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client),
    payloads = [{topic: 'temperature_topic' ,partition: 0}];

process.on('temperature', function (temperature) {
    payloads[0].messages = temperature;
    producer.send(payloads, cb);
    function cb(err, data) {
        if (err) throw err;
        console.log(payloads);
    }
});

producer.on('ready', function(){
    console.log('All good!');
});

producer.on('error', function (err) {
});