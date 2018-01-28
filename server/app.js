const cli = require('commander'),
    fs = require('fs');

cli.version('1.0.0')
    .option('-c, --config <path>', '[required] config file path.')
    .option('-p, --port <port>', '[optional] port');
cli.usage('node app [options]');

const validate = function () {
    if (!cli.config) {
        console.log('Required argument is missing: -c, --config');
        console.log('');
        return false
    }

    return true;
};

cli.parse(process.argv);

if (!validate()) {
    cli.outputHelp();
    return;
}

fs.readFile(cli.config, function (err, data) {
    if (err) {
        console.log('Unable to read config file: ' + cli.config, err);
        console.log('');
        cli.outputHelp();
        return
    }

    let config;
    try {
        config = data.toString();
        config = config.replace(/(%\{tag\})/gi, cli.tag);
        config = JSON.parse(config);
    } catch (e) {
        console.log(`Unable to read config file: ${cli.config}`, e);
        console.log('');
        cli.outputHelp();
        return
    }

    config.port = cli.port;
    config.role = cli.role;
    config.tag = cli.tag;

    if (!config.port) {
        console.log('Application port not specified neither in config file nor via cli arguments.');
        console.log('');
        cli.outputHelp();
        return
    }

    require('./app/main').init(config);
});