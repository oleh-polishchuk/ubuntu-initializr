const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    returnHTML(res, 'index');
});

function returnHTML(res, view) {
    res.sendFile(path.join(`${__dirname}/../views/${view}.html`));
}

module.exports = router;
