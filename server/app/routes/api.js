const express = require('express'),
    router = express.Router();

const ScriptService = require('../services/script.service'),
    InstallerService = require('../services/installer.service');

router.get('/installer/all', (req, res) => {
    InstallerService.getAll((err, installers) => {
        if (err) {
            console.error(err);
            res.status(500).send(err)
        }

        res.send(installers)
    })
});

router.post('/installer', (req, res) => {
    console.log(`Save new installer : ${JSON.stringify(req.body)}`);
    res.send({success: true})
});

router.get('/script/generate', (req, res) => {
    let ids = Array.isArray(req.query.id) ? req.query.id : [req.query.id];

    InstallerService.getByIds(ids, (err, installers) => {
        let content = ScriptService.generateScript(installers);

        res.header('Content-Disposition', `attachment; filename="${req.query.fileName}.sh"`);
        res.header('Content-Type', 'text/plain');
        res.send(content);
    });
});

module.exports = router;
