let _config = null;

exports.setConfig = (config) => {
    _config = config;
};

exports.getConfig = () => {
    return _config;
};