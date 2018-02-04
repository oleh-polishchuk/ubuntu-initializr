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
        // TODO Polishchuk: check why mongo return model as array
        content += generateBlock(installer[0])
    });

    return content
};

module.exports.generateBlock = generateBlock;
module.exports.generateScript = generateScript;
