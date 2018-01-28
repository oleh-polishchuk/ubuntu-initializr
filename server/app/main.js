const init = require('./init'),
    config = require('./config'),
    async = require('async');

exports.init = (conf) => {
    config.setConfig(conf);

    async.series([
        init.db,
        () => {
            require('./server').init(() => {
                console.log('App server is running and listening on port ' + conf.port);
            });
        }
    ]);
};