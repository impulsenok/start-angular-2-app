const env     = process.env.NODE_ENV || 'development';
const winston = require('winston');
const moment  = require('moment');

let settings = {
    console: {
        level:      "info",
        colorize:   true,
        silent:     env === 'production'
    },
    file: {
        level: "info",
        timestamp: function () {
            return moment().format("YYYY-MM-DD HH:mm:ss Z");
        },
        json:       false,
        maxfiles:   10,
        maxsize:    100000000
    }
};

// some kind of log 'redirect', serve to write express(morgan) log to special log file(access.log)
winston.loggers.mainStream = {
    write: function(message, encoding) {
        winston.loggers.loggers.access.info('[' + moment().format('YYYY-MM-DD HH:mm:ss Z') + ']: ' + message);
    }
};

winston.loggers.add('access', {
    console: settings.console,
    file: {
        filename:   "server/logs/access.log",
        level:      settings.file.level,
        timestamp:  settings.file.timestamp,
        json:       settings.file.json,
        silent:     env === 'production'
    }
});

winston.loggers.add('error_loging', {
    console: settings.console,
    file: {
        filename:   "server/logs/loging_error.log",
        level:      settings.file.level,
        timestamp:  settings.file.timestamp,
        json:       settings.file.json
    }
});

module.exports = winston;
