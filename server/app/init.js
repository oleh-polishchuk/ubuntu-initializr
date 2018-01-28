const mongoose = require('mongoose'),
    config = require('./config');

/**
 * Initialize DB
 * @param cb
 */
exports.db = (cb) => {
    const url = config.getConfig().mongo.url,
        poolSize = config.getConfig().mongo.poolSize;

    const options = {
        poolSize: poolSize,
        keepAlive: 1
    };

    let callbackCalled = false;

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(`Error occurred while establishing new MongoDB connection. ${err}`);
    });

    db.on('connected', () => {
        console.log(`Successfully connected to MongoDB on "${url}" with pool size: ${poolSize}`);
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });

    db.on('disconnected', () => {
        console.error(`Connection lost or not established with MongoDB on "${url}" Reconnecting in 5s.`);
        setTimeout(() => {
            console.debug(`Try to re-establish MongoDB connection on "${url}" with pool size: ${poolSize}`);
            mongoose.connect(url, options);
        }, 5000);

        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });

    console.debug(`Try to establish MongoDB connection on "${url}" with pool size: ${poolSize}`);
    mongoose.connect(url, options);
};