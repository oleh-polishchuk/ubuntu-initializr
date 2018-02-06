const async = require('async');

const Installer = require('../models/installer');

/**
 * Method return list of the instances of {@link Installer}
 * @param cb
 */
exports.getAll = (cb) => {
    let query = {approved: true};

    Installer.find(query, (err, installers) => {
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
                    Installer.findOne({_id: id}, next)
                }
            })(id))
        });
    }


    async.series(tasks, cb)
};

/**
 * Method save instance of {@link Installer}
 * @param installer
 * @param cb
 * @returns {*} saved instance of {@link Installer}
 */
exports.save = (installer, cb) => {
    if (!installer || !installer.name || !installer.script) {
        console.error('Installer or installer name not exist.');
        return cb('Installer or installer name not exist.');
    }

    console.log(`Saving installer with name: ${installer.name} and script: ${installer.script}`);
    installer.approved = !!installer.approved;
    Installer.create(installer, (err, result) => {
        if (err) {
            console.error(`Installer ${installer} could not be saved.`);
            return cb(`Installer ${installer} could not be saved.`);
        }

        console.log(`Successfully saved installer with name: ${result.name} id: ${result.id}`);
        cb(null, result)
    });
};
