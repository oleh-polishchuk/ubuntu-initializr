const Installer = require('./models/installer'),
    fs = require('fs'),
    async = require('async'),
    config = require('./config');

const bootstrapInstallers = (installer, cb) => {
    Installer.findOne({name: installer.name}, (err, newInstaller) => {
        if (err) {
            cb(err)
        }

        if (newInstaller) {
            console.log(`Installer "${installer.name}" is already exists. Skipped.`);
            return cb();
        }

        newInstaller = new Installer({
            name: installer.name,
            description: installer.description,
            rating: installer.rating,
            script: installer.script.join('\n'),
            dependencies: installer.dependencies
        });

        newInstaller.save(cb);
    });
};

exports.init = (cb) => {
    const bootstrapFromFile = () => {
        if (config.getConfig().bootstrap) {
            fs.readFile(config.getConfig().bootstrap, (err, data) => {
                if (err) {
                    console.error('Unable to read bootstrap file: ' + config.getConfig().bootstrap, err);
                    return
                }
                const fns = [];

                if (data) {
                    data = JSON.parse(data.toString());

                    if (data.installers) {
                        data.installers.forEach((installer) => {
                            fns.push(((installer) => {
                                return (next) => {
                                    bootstrapInstallers(installer, next);
                                }
                            })(installer))
                        });
                    }
                }

                async.series(fns, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    cb()
                });
            })
        } else {
            cb()
        }
    };

    bootstrapFromFile();
};