let generateBlock = function (installer) {
    let content = `#--------------------#\n` +
        `#       ${installer.name}       \n` +
        `#--------------------#\n`;

    content += `${installer.script}\n\n\n`;

    return content
};

let generateScript = function (installers) {
    let content = '#!/bin/bash\n\n';

    installers.forEach((installer) => {
        content += generateBlock(installer)
    });

    return content
};

module.exports.generateBlock = generateBlock;
module.exports.generateScript = generateScript;
