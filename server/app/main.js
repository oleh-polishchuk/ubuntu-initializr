const init = require('./init'),
    bootstrap = require('./bootstrap'),
    config = require('./config'),
    async = require('async');

exports.init = (conf) => {
    config.setConfig(conf);

    async.series([
        init.db,
        bootstrap.init,
        () => {
            require('./server').init(() => {
                console.log('App server is running and listening on port ' + conf.port);
            });
        }
    ]);
};