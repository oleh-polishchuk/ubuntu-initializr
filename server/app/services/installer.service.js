const async = require('async');

const Installer = require('../models/installer');

/**
 * Method return list of the instances of {@link Installer}
 * @param cb
 */
exports.getAll = (cb) => {
    Installer.find({}, (err, installers) => {
        if (err) {
            console.error(`Can't get all installers: ${err}`);
            return cb(err)
        }

        cb(null, installers)
    })
};

/**
 * Method return list of the instances of {@link Installer} founded by provided list of installer ids
 * @param ids
 *          - the array of installer ids
 * @param cb
 */
exports.getByIds = (ids, cb) => {
    const tasks = [];

    if (Array.isArray(ids)) {
        ids.forEach((id) => {
            tasks.push((function (id) {
                return function (next) {
                    Installer.find({_id: id}, next)
                }
            })(id))
        });
    }


    async.series(tasks, cb)
};
