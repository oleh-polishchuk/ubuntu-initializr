const request = require('request');

const config = require('../config');

exports.asyncSendMessage = (message) => {
    try {
        message = encodeURI(message);

        const telegram = config.getConfig().telegram;
        const api = telegram.api;
        const token = telegram.token;
        const chatId = telegram.chat.id;

        console.log(`Sending message to telegram group: ${telegram.chat.title}`);
        const req = request.get(`${api}/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${message}`);

        req.on('response', (res) => {
            if (res.statusCode === 200) {
                console.log(`Successfully sent message to telegram group: ${telegram.chat.title}`)
            } else {
                console.log(`Error occurred while sending message to telegram group: ${telegram.chat.title}`)
            }
        });

        req.on('error', (err) => {
            console.error(`Error occurred while sending message to telegram group: ${telegram.chat.title}`);
            console.error(err);
        });
    } catch (e) {
        console.error(`Error occurred while async sending message to telegram group: ${e}`);
    }
};
