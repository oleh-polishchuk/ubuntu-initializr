const path = require('path'),
    express = require('express'),
    app = express();

const config = require('./config'),
    index = require('./routes/index'),
    api = require('./routes/api');

exports.init = (next) => {
    "use strict";

    // routes
    app.use('/', index);
    app.use('/api', api);

    // views
    app.use(express.static(path.resolve(__dirname, 'static')));
    app.use(express.static(path.resolve(__dirname, 'views')));

    app.listen(config.getConfig().port, next);
};