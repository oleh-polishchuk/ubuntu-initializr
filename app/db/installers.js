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
        ],
        dependencies: [
            {
                id: 2
            }
        ]
    },
    {
        id: 4,
        name: 'Grunt',
        cmds: [
            'apt-get install -y g++',
            'apt-get install -y libkrb5-dev',
            'npm install -g grunt-cli',
        ],
        dependencies: [
            {
                id: 3
            }
        ]
    },
    {
        id: 5,
        name: 'Bower',
        cmds: [
            'npm install -g bower',
        ],
        dependencies: [
            {
                id: 3
            }
        ]
    },
    {
        id: 6,
        name: 'Gulp',
        cmds: [
            'npm install -g gulpjs/gulp-cli',
            'npm install gulpjs/gulp#4.0 -D',
        ],
        dependencies: [
            {
                id: 3
            }
        ]
    },
    {
        id: 7,
        name: 'Yarn',
        cmds: [
            'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -',
            'echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list',
            'apt-get update -y',
            'apt-get install -y yarn',
        ],
        dependencies: [
            {
                id: 2
            }
        ]
    },
    {
        id: 8,
        name: 'Java',
        cmds: [
            'apt-add-repository -y ppa:webupd8team/java',
            'apt-get update -y',
            'apt-get install -y oracle-java8-installer',
            'java -version',
        ]
    },
    {
        id: 9,
        name: 'Gradle',
        cmds: [
            'add-apt-repository -y ppa:cwchien/gradle',
            'apt-get update -y',
            'apt-get install -y gradle',
        ]
    },
    {
        id: 10,
        name: 'Maven',
        cmds: [
            'apt-get purge -y maven maven2 maven3',
            'add-apt-repository -y ppa:andrei-pozolotin/maven3',
            'apt-get update -y',
            'apt-get install -y maven3',
        ]
    },
    {
        id: 11,
        name: 'Wine',
        cmds: [
            'apt-get install -y wine',
        ]
    },
    {
        id: 12,
        name: 'MySQL',
        cmds: [
            'apt-get update -y',
            'apt-get install -y mysql-server',
            'mysql_secure_installation',
            'systemctl status mysql.service',
        ]
    },
    {
        id: 13,
        name: 'MongoDB',
        cmds: [
            'apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927',
            'echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list',
            'apt-get update -y',
            'apt-get install -y mongodb-org',
            'xdg-open https://www.digitalocean.com/community/tutorials/mongodb-ubuntu-16-04-ru',
        ]
    },
    {
        id: 14,
        name: 'PostgreSQL',
        cmds: [
            'apt-get update -y',
            'apt-get install -y postgresql postgresql-contrib phppgadmin',
            'xdg-open https://www.howtoforge.com/tutorial/ubuntu-postgresql-installation/',
        ]
    },
    {
        id: 15,
        name: 'PgAdmin3',
        cmds: [
            'apt-get update -y',
            'apt-get install -y pgadmin3',
        ]
    },
    {
        id: 16,
        name: 'Vagrant',
        cmds: [
            'apt-get -y update',
            'apt-get -y install virtualbox',
            'apt-get -y install vagrant',
            'apt-get -y install virtualbox-dkms',
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
