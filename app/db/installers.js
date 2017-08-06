let installers = [
    {
        id: 1,
        name: 'Git',
        cmds: [
            'apt-get update -y',
            'apt-get install -y git'
        ]
    },
    {
        id: 2,
        name: 'Curl',
        cmds: [
            'apt-get update -y',
            'apt-get install -y curl'
        ]
    },
    {
        id: 3,
        name: 'NodeJS',
        cmds: [
            'curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -',
            'apt-get install -y nodejs',
            'apt-get install -y build-essential'
        ]
    },
];

module.exports.getAll = function () {
    return installers
};

module.exports.getById = function (id) {
    return installers.find(function (elem) {
        return elem.id === parseInt(id)
    })
};

module.exports.getByIds = function (ids) {
    return ids.map((id) => {
        return installers.find(function (elem) {
            return elem.id === parseInt(id)
        })
    })
};
