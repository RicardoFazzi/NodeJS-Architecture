var mode = process.env.mode;
this.getEnviroment = function () {
    return process.env.mode
};
this.getConfig = function () {
    console.log( mode ? "modo: " + mode : "modo: dev (por defecto)" );
    if (!mode) {
        mode = 'dev';
    }
    if (mode === 'dev') {
        module.exports =
        {
            'secretKey': '12345-67890-09876-54321',
            'mongoUrl': 'mongodb://172.16.81.10:27017/eicas'
        }
    }
    if (mode === 'prod') {
        module.exports =
        {
            'secretKey': '12345-67890-09876-54321',
            'mongoUrl': 'mongodb://192.168.3.12:27017/eicas'
        }
    }
    if (mode === 'test') {
        module.exports =
        {
            'secretKey': '12345-67890-09876-54321',
            'mongoUrl': 'mongodb://192.168.3.56:27017/eicas'
        }
    }

};
this.getConfig();
